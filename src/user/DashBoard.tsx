import React from "react";
import { useState } from "react";
import { DashBoardSidebar } from "./pages/DashBoardSidebar";


export default function DashBoard() {
  const [activeSection, setActiveSection] = useState("overview");

  return (
    <div className="h-screen flex bg-background">
      <DashBoardSidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      <main className="flex-1 overflow-auto">
        {/* <div className="p-8">{renderSection()}</div> */}
      </main>
    </div>
  );
}
