import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SkeletonCard } from "@/components/ui/LoadingSpinner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useApi } from "@/hooks/useApi";
import { apiService } from "@/utils/axios";
import { Eye } from "lucide-react";
import { Filter } from "lucide-react";
import { MapPin } from "lucide-react";
import { Calendar } from "lucide-react";
import { Badge } from "lucide-react";
import { Search } from "lucide-react";
import { Plus } from "lucide-react";
import { RefreshCw } from "lucide-react";
import { useState } from "react";

export function ApplicationSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showNewAppForm, setShowNewAppForm] = useState(false);

  // APIs calls
  const {
    data: application,
    loading: applicationLoading,
    error: applicationError,
    refetch: refetchApplications,
  } = useApi(apiService.getApplication, []);

  // Filter applications based on search and status
  const filteredApplications =
    application?.filter((app) => {
      const matchesSearch =
        !searchTerm ||
        app.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.id.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || app.status === statusFilter;

      return matchesSearch && matchesStatus;
    }) || [];

  const getStatusVariant = (color) => {
    switch (color) {
      case "green":
        return "default";
      case "yellow":
        return "secondary";
      case "red":
        return "destructive";
      default:
        return "outline";
    }
  };

  const getStatusColor = (color) => {
    switch (color) {
      case "green":
        return "text-green-600 bg-green-50 border-green-200";
      case "yellow":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "red":
        return "text-red-600 bg-red-50 border-red-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  return (
    <>
      <div className=" space-y-6">
        <div className="flex flex-col  sm:flex-row  sm:justify-between gap-4">
          <div>
            <h1 className="mb-2">My Applications</h1>
            <p className="text-muted-foreground">
              Manage your visa applications
            </p>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={refetchApplications}
              disabled={applicationLoading}
              className="gap-2"
            >
              {" "}
              <RefreshCw
                className={`h-4 w-4 ${
                  applicationLoading ? "animate-spin" : ""
                }`}
              />
              Refresh
            </Button>
            <Button
              onClick={() => setShowNewAppForm(true)}
              className="gap-2 text-base px-6 py-3"
              size="lg"
            >
              <Plus className="h-5 w-5" />
              Start New Application
            </Button>
          </div>
        </div>
        {/* Search and Filter */}
        <Card className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search applications by type, destination, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Draft">Draft</SelectItem>
                  <SelectItem value="Submitted">Submitted</SelectItem>
                  <SelectItem value="Under Review">Under Review</SelectItem>
                  <SelectItem value="Approved">Approved</SelectItem>
                  <SelectItem value="Rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Applications List */}
        {applicationLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : applicationError ? (
          <ErrorCard error={applicationError} onRetry={refetchApplications} />
        ) : filteredApplications.length > 0 ? (
          <div className="grid gap-4">
            {filteredApplications.map((application) => (
              <Card
                key={application.applicationId}
                className="p-6 hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">{application.visaType} Visa</h3>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-muted-foreground text-sm">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {application.countryOfApplication}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(
                            application.createAt
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge
                      variant={getStatusVariant(application.statusColor)}
                      className={getStatusColor(application.statusColor)}
                    >
                      {application.status}
                    </Badge>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Eye className="h-4 w-4" />
                      View Details
                    </Button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 mt-4 border-t border-border gap-2">
                  <span className="text-muted-foreground text-sm">
                    Application ID: {application.applicationId}
                  </span>
                  {application.status === "Draft" && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="self-start sm:self-auto"
                    >
                      Continue Application
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        ) : application && application.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="max-w-sm mx-auto">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="mb-2">No Applications Yet</h3>
              <p className="text-muted-foreground mb-6">
                Get started by creating your first visa application
              </p>
              <Button
                onClick={() => setShowNewAppForm(true)}
                className="gap-2 text-base px-6 py-3"
                size="lg"
              >
                <Plus className="h-5 w-5" />
                Start New Application
              </Button>
            </div>
          </Card>
        ) : (
          <Card className="p-12 text-center">
            <div className="max-w-sm mx-auto">
              <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="mb-2">No Applications Found</h3>
              <p className="text-muted-foreground mb-4">
                No applications match your current search criteria.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("all");
                }}
              >
                Clear Filters
              </Button>
            </div>
          </Card>
        )}
      </div>
    </>
  );
}
