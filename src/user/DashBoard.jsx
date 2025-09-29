import React from "react";
import { useState } from "react";
import { DashBoardSidebar } from "./pages/DashBoardSidebar";
import { DashBoardOverView } from "./pages/DashboardOverView";
import { ApplicationSection } from "./pages/ApplicationSection";
import { DocumentSection } from "./pages/DocumentSection";
import ComingSoon from "./pages/ComingSoon";
import { ProFileSection } from "./pages/ProfileSection";


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
      case "payments":
        return <ComingSoon />;  
      case "support":
        return <ComingSoon />;
      case "profile":
        return <ProFileSection/>;        
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
        </main>
      </div>
    );
};
