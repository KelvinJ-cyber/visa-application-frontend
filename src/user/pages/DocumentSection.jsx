import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LoadingCard } from "@/components/ui/LoadingSpinner";
import { useApi, useApiCall } from "@/hooks/useApi";
import { apiService } from "@/services/axios.js";
import { Badge } from "@/components/ui/badge";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { ErrorAlert } from "@/components/ui/ErrorAlert.js";
import {
  AlertCircle,
  X,
  Download,
  RefreshCw,
  Upload,
  CheckCircle,
  Eye,
} from "lucide-react";
import { useRef, useEffect } from "react";
import { useState } from "react";
import { toast } from "sonner";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function DocumentSection() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);
  const [mainApplicationId, setMainApplicationId] = useState(null);
  // Track which document is being uploaded
  const [targetDocumentId, setTargetDocumentId] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  // API calls (assumed hooks)
  const {
    data: documentsChecklist,
    loading: checklistLoading,
    error: checklistError,
    refetch: refetchChecklist,
  } = useApi(apiService.getDocumentsChecklist, []);

  const {
    loading: uploadLoading,
    error: uploadError,
    success: uploadSuccess,
    execute: uploadDocument,
    reset: resetUpload,
  } = useApiCall(apiService.uploadDocument);

  // Derived counts
  const completedCount =
    (documentsChecklist &&
      documentsChecklist.filter((doc) => doc.status === "completed").length) ||
    0;
  const totalCount = (documentsChecklist && documentsChecklist.length) || 0;
  const requiredCount =
    (documentsChecklist &&
      documentsChecklist.filter((doc) => doc.required).length) ||
    0;
  const completedRequiredCount =
    (documentsChecklist &&
      documentsChecklist.filter(
        (doc) => doc.required && doc.status === "completed"
      ).length) ||
    0;

  // fetch mainApplicationId and check application status on mount
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await apiService.getApplication();
        if (!mounted) return;
        setMainApplicationId(res?.mainApplicationId ?? null);
        
        // Check if application is already submitted
        if (res?.data && res.data.length > 0) {
          const mainApplication = res.data[0];
          const isSubmitted = mainApplication.status === "SUBMITTED" || mainApplication.status === "UNDER_REVIEW" || mainApplication.status === "APPROVED" || mainApplication.status === "REJECTED" ;
          setSubmitted(isSubmitted);
        }
      } catch (err) {
        console.warn("Could not fetch main application id", err);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const handleSubmitApplication = async () => {
    try {
      const { data } = await apiService.submitApplication(mainApplicationId);
      setSubmitted(true);
      toast.info(data.message || "Application submitted successfully!");
      return data;
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to submit application. Please try again."
      );
    }
  };

  const handleFileUpload = async (file) => {
    if (!file || !targetDocumentId) return;

    // Basic validations
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];

    if (file.size > maxSize) {
      alert("File size must be less than 5MB");
      return;
    }

    if (!allowedTypes.includes(file.type)) {
      alert("Only PDF, JPG, and PNG files are allowed");
      return;
    }

    try {
      setUploadProgress(0);

      const progressCallback = (percent) => {
        if (typeof percent === "number") setUploadProgress(percent);
      };

      // ensure we have app id
      let appId = mainApplicationId;
      if (!appId) {
        const fetched = await apiService.getApplication();
        appId =
          fetched && fetched.mainApplicationId
            ? fetched.mainApplicationId
            : null;
        setMainApplicationId(appId);
      }

      // call uploadDocument(applicationId, documentId, file, onProgress)
      const response = await uploadDocument(
        appId,
        targetDocumentId,
        file,
        progressCallback
      );

      // Animate progress from 10% to 100% for visual effect
      let start = uploadProgress < 10 ? 10 : uploadProgress;
      for (let i = start; i <= 100; i += 10) {
        setUploadProgress(i);
        // eslint-disable-next-line no-await-in-loop
        await new Promise((resolve) => setTimeout(resolve, 60));
      }
      setUploadProgress(100);

      // Keep the bar at 100% for a short moment
      await new Promise((resolve) => setTimeout(resolve, 600));
      setUploadProgress(0);

      refetchChecklist();

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      setTargetDocumentId(null);
      console.log("Upload response:", response);
    } catch (err) {
      setTargetDocumentId(null);
      console.error("Upload failed:", err);
    }
  };

  // Accept documentId to know which document is being uploaded
  const triggerFileUpload = (documentId) => {
    setTargetDocumentId(documentId);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // reset file input
      fileInputRef.current.click();
    }
  };

  const onFileInputChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const getStatusIcon = (status) =>
    status === "completed" ? (
      <CheckCircle className="h-5 w-5 text-green-500" />
    ) : (
      <X className="h-5 w-5 text-red-500" />
    );

  const getStatusBadge = (status) =>
    status === "completed" ? (
      <Badge className="text-green-600 bg-green-50 border-green-200">
        Uploaded
      </Badge>
    ) : (
      <Badge
        variant="outline"
        className="text-red-600 bg-red-50 border-red-200"
      >
        Missing
      </Badge>
    );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="mb-2">Required Documents</h1>
          <p className="text-muted-foreground">
            Upload all required documents for your visa application
          </p>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={refetchChecklist}
            disabled={checklistLoading}
            className="gap-2"
          >
            <RefreshCw
              className={`h-4 w-4 ${checklistLoading ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>

          {/* General upload button (optional, can be hidden or disabled if not needed) */}
          <Button
            disabled={true}
            onClick={() => triggerFileUpload(null)}
            className="gap-2 text-base px-6 py-3"
            size="lg"
          >
            <Upload className="h-5 w-5" />
            Upload Documents
          </Button>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept=".pdf,.jpg,.jpeg,.png"
        onChange={onFileInputChange}
      />

      {/* Upload Success/Error Messages */}
      {uploadError && (
        <ErrorAlert error={uploadError} onDismiss={resetUpload} />
      )}
      {uploadSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-green-800">Document uploaded successfully!</p>
        </div>
      )}

      {/* Upload Progress */}
      {mainApplicationId && uploadProgress > 0 && (
        <Card className="p-4 border-blue-200 bg-blue-50">
          <div className="flex items-center gap-3 mb-2">
            <LoadingSpinner size="sm" />
            <span className="text-blue-800">Uploading document...</span>
            <span className="text-blue-600 ml-auto">
              {Math.round(uploadProgress)}%
            </span>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </Card>
      )}

      {checklistLoading ? (
        <LoadingCard>Loading document checklist...</LoadingCard>
      ) : checklistError ? (
        <ErrorCard error={checklistError} onRetry={refetchChecklist} />
      ) : documentsChecklist ? (
        <>
          {/* Progress Overview */}
          <Card className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <h3>Document Completion Progress</h3>
              <div className="text-right">
                <div className="text-2xl font-medium mb-1">
                  {completedRequiredCount}/{requiredCount}
                </div>
                <div className="text-sm text-muted-foreground">
                  Required documents
                </div>
              </div>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
              <div
                className="bg-green-500 h-3 rounded-full transition-all duration-500"
                style={{
                  width: `${
                    requiredCount > 0
                      ? (completedRequiredCount / requiredCount) * 100
                      : 0
                  }%`,
                }}
              />
            </div>

            <div className="flex items-center justify-between">
              <p className="text-muted-foreground">
                {completedRequiredCount === requiredCount
                  ? "All required documents uploaded! Your application is ready for submission."
                  : `${
                      requiredCount - completedRequiredCount
                    } required document(s) still needed`}
              </p>
              <div className="text-sm text-muted-foreground">
                Total: {completedCount}/{totalCount}
              </div>
            </div>
          </Card>

          {/* Document Checklist */}
          <div className="grid gap-4">
            {documentsChecklist.map((document) => (
              <Card
                key={document.id}
                className={`p-6 transition-all duration-200 ${
                  document.status === "completed"
                    ? "border-green-200 bg-green-50/30"
                    : document.required
                    ? "border-yellow-200 bg-yellow-50/30"
                    : ""
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">
                      {getStatusIcon(document.status)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{document.name}</h4>
                        {document.required && (
                          <Badge
                            variant="outline"
                            className="text-orange-600 bg-orange-50 border-orange-200 text-xs"
                          >
                            Required
                          </Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground text-sm mb-2">
                        {document.description}
                      </p>
                      {document.uploadedDate && (
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          Uploaded on{" "}
                          {new Date(document.uploadedDate).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-start sm:self-center">
                    {getStatusBadge(document.status)}

                    {document.status === "completed" ? (
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="gap-2">
                          <Eye className="h-4 w-4" />
                          View
                        </Button>
                        <Button variant="outline" size="sm" className="gap-2">
                          <Download className="h-4 w-4" />
                          Download
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-2"
                          onClick={() => triggerFileUpload(document.id)}
                          disabled={uploadLoading}
                        >
                          {uploadLoading ? (
                            <LoadingSpinner size="sm" />
                          ) : (
                            <Upload className="h-4 w-4" />
                          )}
                          Replace
                        </Button>
                      </div>
                    ) : (
                      <Button
                        size="sm"
                        className="gap-2 px-6"
                        onClick={() => triggerFileUpload(document.id)}
                        disabled={uploadLoading}
                      >
                        {uploadLoading ? (
                          <LoadingSpinner size="sm" />
                        ) : (
                          <Upload className="h-4 w-4" />
                        )}
                        Upload
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Application Readiness Status */}
          {completedRequiredCount === requiredCount && (
            <Card className="p-6 border-green-200 bg-green-50">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-8 w-8 text-green-600" />
                <div>
                  <h3 className="text-green-800 mb-1">Ready for Submission!</h3>
                  <p className="text-green-700 text-sm">
                    All required documents have been uploaded. You can now
                    submit your application.
                  </p>
                </div>
                {submitted ? (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="ml-auto">
                        <Button
                          className="gap-2"
                          disabled={true}
                        >
                          Submit Application
                        </Button>
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>You have submitted your application</p>
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  <Button
                    onClick={handleSubmitApplication}
                    className="ml-auto gap-2"
                  >
                    Submit Application
                  </Button>
                )}
              </div>
            </Card>
          )}

          {/* Upload Guidelines */}
          <Card className="p-6 bg-muted/30">
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className="h-5 w-5 text-muted-foreground" />
              <h3>Upload Guidelines</h3>
            </div>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>• All documents must be in PDF, JPG, or PNG format</li>
              <li>• Maximum file size: 5MB per document</li>
              <li>• Documents must be clear and readable</li>
              <li>• Ensure all information is visible and not cut off</li>
              <li>• Documents should be recent and valid</li>
              <li>• Required documents must be uploaded before submission</li>
            </ul>
          </Card>
        </>
      ) : null}
    </div>
  );
}
