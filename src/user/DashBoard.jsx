import React, { useState } from "react";
import { DashBoardSidebar } from "./pages/DashBoardSidebar";
import { DashBoardOverView } from "./pages/DashboardOverView";
import { ApplicationSection } from "./pages/ApplicationSection";
import { DocumentSection } from "./pages/DocumentSection";
import ComingSoon from "./pages/ComingSoon";
import { ProFileSection } from "./pages/ProfileSection";


export default function DashBoard() {
  const [activeSection, setActiveSection] = useState("overview");
  const [mobileOpen, setMobileOpen] = useState(false);

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
        onSectionChange={(id) => {
          setActiveSection(id);
          setMobileOpen(false);
        }}
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      <main className="flex-1 overflow-auto min-h-screen">
        {/* Mobile header with hamburger */}
        <div className="md:hidden flex items-center justify-between p-3 border-b bg-white">
          <button
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-md bg-gray-100"
          >
            <span className="block w-5 h-0.5 bg-black my-1" />
            <span className="block w-5 h-0.5 bg-black my-1" />
            <span className="block w-5 h-0.5 bg-black my-1" />
          </button>
          <div className="font-semibold">Dashboard</div>
          <div />
        </div>

        <div className="p-4 md:p-8">{renderSection()}</div>
      </main>
    </div>
  );
};
