import { useState } from "react";
import React from "react";
import { useMemo } from "react";
import { apiService } from "../../utils/axios";
import "@/styles/globals.css";
import { useApi } from "@/hooks/useApi";
import {
  AlertCircle,
  Bell,
  Calendar,
  CheckCircle,
  Clock,
  FileText,
  RefreshCw,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { LoadingCard, SkeletonCard } from "@/components/ui/LoadingSpinner";
import { ErrorAlert } from "../../components/ui/ErrorAlert.js";
import "@/styles/globals.css";

export function DashBoardOverView() {
  const [dismissedErrors, setDismissedErrors] = useState(new Set());

  // API calls with loading states
  const {
    data: applicationStatus,
    loading: statusLoading,
    error: statusError,
    refetch: refetchStatus,
  } = useApi(apiService.getApplicationStatus, []);

  const {
    data: upcomingAppointments,
    loading: appointmentsLoading,
    error: appointmentsError,
    refetch: refetchAppointments,
  } = useApi(apiService.getUpcomingAppointments, []);

  const {
    data: notifications,
    loading: notificationsLoading,
    error: notificationsError,
    refetch: refetchNotifications,
  } = useApi(apiService.getNotifications, []);

  const handleRefreshAll = () => {
    refetchStatus();
    refetchAppointments();
    refetchNotifications();
    setDismissedErrors(new Set());
  };

  const STATUS_ORDER = [
    "DRAFT",
    "SUBMITTED",
    "UNDER_REVIEW",
    "APPROVED",
    "REJECTED",
  ];
  const totalWorkflowSteps = STATUS_ORDER.length;

  // derive step info from the API-provided applicationStatus
  const derivedApplication = useMemo(() => {
    if (!applicationStatus) return null;

    const status = (applicationStatus.status || "").toString().toUpperCase();

    let index = STATUS_ORDER.indexOf(status);
    if (index === -1) {
      // fallback: if unknown status, treat as DRAFT (index 0)
      index = 0;
    }

    const step = index + 1; // human-friendly step number (1..totalWorkflowSteps)
    const progressPercent =
      totalWorkflowSteps > 1
        ? Math.round((index / (totalWorkflowSteps - 1)) * 100)
        : 100;

    const stepsLabels = [
      "Draft",
      "Submitted",
      "Under Review",
      "Approved",
      "Rejected",
    ];

    return {
      ...applicationStatus,
      status, // uppercase
      step,
      totalSteps: totalWorkflowSteps,
      steps: stepsLabels,
      progressPercent,
    };
  }, [applicationStatus]);

  const statusStyles = {
    DRAFT: "text-gray-600 bg-gray-50 border-gray-200",
    SUBMITTED: "text-blue-600 bg-blue-50 border-blue-200",
    UNDER_REVIEW: "text-yellow-600 bg-yellow-50 border-yellow-200",
    APPROVED: "text-green-600 bg-green-50 border-green-200",
    REJECTED: "text-red-600 bg-red-50 border-red-200",
  };

  const getStepIcon = (stepIndex, currentStep) => {
    if (stepIndex < currentStep) {
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    } else if (stepIndex === currentStep) {
      return <Clock className="h-5 w-5 text-yellow-500" />;
    } else {
      return <div className="h-5 w-5 rounded-full border-2 border-gray-300" />;
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      default:
        return <Bell className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-6 ">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-2">Dashboard Overview</h1>
          <p className="text-muted-foreground">
            Track your visa application progress and stay updated
          </p>
        </div>
        <Button variant="outline" onClick={handleRefreshAll} className="gap-2">
          <RefreshCw
            className={`h-4 w-4 ${statusLoading ? "animate-spin" : ""}`}
          />
          Refresh
        </Button>
      </div>

      {/* Application Status Tracker */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="h-5 w-5" />
          <h3>Current Application Status</h3>
        </div>

        {statusLoading ? (
          <LoadingCard>Loading application status...</LoadingCard>
        ) : statusError ? (
          !dismissedErrors.has("status") && (
            <ErrorAlert
              error={statusError}
              onRetry={refetchStatus}
              onDismiss={() =>
                setDismissedErrors((prev) => new Set([...prev, "status"]))
              }
              className="mb-4"
            />
          )
        ) : derivedApplication ? (
          <>
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">
                  Application #{derivedApplication.applicationId}
                </span>
                <Badge
                  variant="secondary"
                  className={
                    statusStyles[derivedApplication.status] ||
                    "text-gray-600 bg-gray-50 border-gray-200"
                  }
                >
                  {derivedApplication.status}
                </Badge>
              </div>

              <Progress
                value={derivedApplication.progressPercent}
                className="h-3"
              />

              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>
                  Submitted:{" "}
                  {new Date(
                    derivedApplication.submittedDate ||
                      derivedApplication.createAt
                  ).toLocaleDateString()}
                </span>
                <span>
                  Step {derivedApplication.step} of{" "}
                  {derivedApplication.totalSteps}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              {derivedApplication.steps.map((stepLabel, index) => (
                <div
                  key={stepLabel}
                  className="flex flex-col items-center gap-2 text-center"
                >
                  {getStepIcon(index, derivedApplication.step - 1)}{" "}
                  {/* note: getStepIcon used with zero-based index */}
                  <span
                    className={`text-sm max-w-[80px] ${
                      index <= derivedApplication.step - 1
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {stepLabel}
                  </span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div>No application found</div>
        )}
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Appointments */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <h3>Upcoming Appointments</h3>
            </div>
            {appointmentsError && (
              <Button variant="ghost" size="sm" onClick={refetchAppointments}>
                <RefreshCw className="h-4 w-4" />
              </Button>
            )}
          </div>

          {appointmentsLoading ? (
            <SkeletonCard />
          ) : appointmentsError ? (
            <ErrorCard
              error={appointmentsError}
              onRetry={refetchAppointments}
            />
          ) : upcomingAppointments && upcomingAppointments.length > 0 ? (
            <div className="space-y-3">
              {upcomingAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="border border-border rounded-lg p-4 hover:bg-muted/30 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">{appointment.type}</h4>
                    <Badge
                      variant="outline"
                      className="text-blue-600 bg-blue-50 border-blue-200"
                    >
                      Scheduled
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mb-1 flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {new Date(appointment.date).toLocaleDateString()} at{" "}
                    {appointment.time}
                  </p>
                  <p className="text-muted-foreground">
                    {appointment.location}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Calendar className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No upcoming appointments</p>
            </div>
          )}
        </Card>

        {/* Notifications */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              <h3>Recent Notifications</h3>
            </div>
            {notificationsError && (
              <Button variant="ghost" size="sm" onClick={refetchNotifications}>
                <RefreshCw className="h-4 w-4" />
              </Button>
            )}
          </div>

          {notificationsLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : notificationsError ? (
            <ErrorCard
              error={notificationsError}
              onRetry={refetchNotifications}
            />
          ) : notifications && notifications.length > 0 ? (
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`flex gap-3 p-3 rounded-lg transition-colors hover:bg-muted/50 ${
                    !notification.read
                      ? "bg-muted/30 border border-border"
                      : "bg-muted/10"
                  }`}
                >
                  {getNotificationIcon(notification.type)}
                  <div className="flex-1">
                    <p className="text-sm">{notification.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(notification.time).toLocaleString()}
                    </p>
                  </div>
                  {!notification.read && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Bell className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No new notifications</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
