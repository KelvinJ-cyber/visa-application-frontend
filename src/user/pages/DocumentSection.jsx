import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LoadingCard } from "@/components/ui/LoadingSpinner";
import { useApi, useApiCall } from "@/hooks/useApi";
import { apiService } from "@/utils/axios";
import { Badge } from "@/components/ui/badge";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { AlertCircle } from "lucide-react";
import { X } from "lucide-react";
import { Download, RefreshCw, } from "lucide-react";
import { Upload } from "lucide-react";
import { CheckCircle } from "lucide-react";
import { Eye } from "lucide-react";
import { useRef } from "react";
import { useState } from "react";

export function DocumentSection() {
   const [uploadingDocId, setUploadingDocId] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);

  // API calls
  const {
    data: documentsChecklist,
    loading: checklistLoading,
    error: checklistError,
    refetch: refetchChecklist
  } = useApi(apiService.getDocumentsChecklist, []);

  const {
    loading: uploadLoading,
    error: uploadError,
    success: uploadSuccess,
    execute: uploadDocument,
    reset: resetUpload
  } = useApiCall(apiService.uploadDocument);

  const completedCount = documentsChecklist?.filter(doc => doc.status === "completed").length || 0;
  const totalCount = documentsChecklist?.length || 0;
  const requiredCount = documentsChecklist?.filter(doc => doc.required).length || 0;
  const completedRequiredCount = documentsChecklist?.filter(doc => doc.required && doc.status === "completed").length || 0;

  const handleFileUpload = async (documentId, file) => {
    if (!file) return;
    
    // Basic file validation
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    
    if (file.size > maxSize) {
      alert('File size must be less than 5MB');
      return;
    }
    
    if (!allowedTypes.includes(file.type)) {
      alert('Only PDF, JPG, and PNG files are allowed');
      return;
    }

    try {
      setUploadingDocId(documentId);
      console.log('📤 Starting file upload:', {
        fileName: file.name,
        fileSize: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        fileType: file.type,
        documentId: documentId,
        applicationId: 'VA-2025-001'
      });
      
      // Reset progress
      setUploadProgress(0);
      
      // Create progress callback for real upload progress
      const handleProgressUpdate = (progressPercent) => {
        setUploadProgress(progressPercent);
      };
      
      const response = await uploadDocument('VA-2025-001', documentId, file, handleProgressUpdate);
      
      // Complete progress
      setUploadProgress(100);
      
      console.log('✅ Upload successful! Server response:', {
        message: response.data.message,
        documentId: response.data.document.id,
        documentType: response.data.document.documentType,
        fileName: response.data.document.fileName,
        uploadedAt: response.data.document.uploadedAt,
        applicationId: response.data.document.applicationId,
        fileSize: `${(response.data.document.fileSize / 1024 / 1024).toFixed(2)} MB`,
        timestamp: response.data.timestamp
      });
      
      // Show success briefly before clearing
      setTimeout(() => setUploadProgress(0), 1000);
      
      refetchChecklist();
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Upload failed:', error);
      // Error handled by hook
    } finally {
      setUploadingDocId(null);
    }
  };

  const triggerFileUpload = (documentId) => {
    setUploadingDocId(documentId);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const getStatusIcon = (status) => {
    if (status === "completed") {
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    } else {
      return <X className="h-5 w-5 text-red-500" />;
    }
  };

  const getStatusBadge = (status) => {
    if (status === "completed") {
      return <Badge className="text-green-600 bg-green-50 border-green-200">Uploaded</Badge>;
    } else {
      return <Badge variant="outline" className="text-red-600 bg-red-50 border-red-200">Missing</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="mb-2">Required Documents</h1>
          <p className="text-muted-foreground">Upload all required documents for your visa application</p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            onClick={refetchChecklist}
            disabled={checklistLoading}
            className="gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${checklistLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button 
            onClick={() => fileInputRef.current?.click()}
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
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file && uploadingDocId) {
            handleFileUpload(uploadingDocId, file);
          }
        }}
      />

      {/* Upload Success/Error Messages */}
      {uploadError && (
        <ErrorAlert 
          error={uploadError}
          onDismiss={resetUpload}
        />
      )}
      {uploadSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-green-800">Document uploaded successfully!</p>
        </div>
      )}

      {/* Upload Progress */}
      {uploadingDocId && uploadProgress > 0 && uploadProgress < 100 && (
        <Card className="p-4 border-blue-200 bg-blue-50">
          <div className="flex items-center gap-3 mb-2">
            <LoadingSpinner size="sm" />
            <span className="text-blue-800">Uploading document...</span>
            <span className="text-blue-600 ml-auto">{Math.round(uploadProgress)}%</span>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            ></div>
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
                style={{ width: `${requiredCount > 0 ? (completedRequiredCount / requiredCount) * 100 : 0}%` }}
              ></div>
            </div>
            
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground">
                {completedRequiredCount === requiredCount 
                  ? "All required documents uploaded! Your application is ready for submission."
                  : `${requiredCount - completedRequiredCount} required document(s) still needed`
                }
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
                  document.status === 'completed' 
                    ? 'border-green-200 bg-green-50/30' 
                    : document.required 
                      ? 'border-yellow-200 bg-yellow-50/30' 
                      : ''
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
                          <Badge variant="outline" className="text-orange-600 bg-orange-50 border-orange-200 text-xs">
                            Required
                          </Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground text-sm mb-2">{document.description}</p>
                      {document.uploadedDate && (
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          Uploaded on {new Date(document.uploadedDate).toLocaleDateString()}
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
                          disabled={uploadingDocId === document.id}
                        >
                          {uploadingDocId === document.id ? (
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
                        disabled={uploadingDocId === document.id}
                      >
                        {uploadingDocId === document.id ? (
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
                    All required documents have been uploaded. You can now submit your application.
                  </p>
                </div>
                <Button className="ml-auto gap-2">
                  <FileText className="h-4 w-4" />
                  Submit Application
                </Button>
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
