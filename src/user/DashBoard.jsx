import React from "react";
import { useState } from "react";
import { DashBoardSidebar } from "./pages/DashBoardSidebar";
import { DashBoardOverView } from "./pages/DashboardOverView";
import { Toaster } from "sonner";
import { ApplicationSection } from "./pages/ApplicationSection";
import { DocumentSection } from "./pages/DocumentSection";


export default function DashBoard() {
  const [activeSection, setActiveSection] = useState("overview");

  const renderSection = () => {
    switch (activeSection) {
      case "overview":
        return <DashBoardOverView />;
      case "applications":
        return <ApplicationSection />
      case "documents":
        return <DocumentSection />
      default:
        return <DashBoardOverView />;
    }
  }
    return (
      <div className="h-screen flex bg-background">
        <DashBoardSidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
        <main className="flex-1 overflow-auto">
          <div className="p-8">{renderSection()}</div>
          <Toaster richColors position="bottom-right" />
        </main>
      </div>
    );
};
