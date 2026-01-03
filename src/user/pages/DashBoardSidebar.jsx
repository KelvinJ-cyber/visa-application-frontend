import { Button } from "@/components/ui/button";
import {
  Home,
  FileText,
  Upload,
  CreditCard,
  HelpCircle,
  User,
  Bell,
  Plus,
} from "lucide-react";
import { useEffect } from "react";
import React from "react";
import "@/styles/globals.css";
import LogoutButton from "@/components/LogoutButton.jsx";



export function DashBoardSidebar({
  activeSection,
  onSectionChange,
  mobileOpen = false,
  onClose = () => {},
}) {
   const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
  useEffect(() => {
    if (userInfo && userInfo.firstName) {
      document.title = `${userInfo.firstName}'s Dashboard`;
    }
  }, []);

  const sections = [
    { id: "overview", label: "Dashboard", icon: Home },
    { id: "applications", label: "Applications", icon: FileText },
    { id: "documents", label: "Documents", icon: Upload },
    { id: "payments", label: "Payments", icon: CreditCard },
    { id: "support", label: "Support", icon: HelpCircle },
    { id: "profile", label: "Profile & Settings", icon: User },
  ];

   return (
    <>
    {/* Overlay for mobile when sidebar open */}
    {mobileOpen && (
      <div
        className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden"
        onClick={onClose}
      />
    )}

    <div className={`fixed z-40 inset-y-0 left-0 w-64 transform ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-200 md:relative md:translate-x-0 md:w-64 bg-card border-r border-border h-full p-4`}>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <h2 className="mb-2 text-[15] font-bold">Travel Sure</h2>
          {/* Close on mobile */}
          <button
            className="md:hidden p-1 rounded hover:bg-gray-100"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            ✕
          </button>
        </div>
        <div>Welcome back, {userInfo.firstName ?? "User"}</div>
      </div>
      
      <nav className="space-y-2">
        {sections.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant={activeSection === item.id ? "default" : "ghost"}
              className="w-full justify-start gap-3"
              onClick={() => onSectionChange(item.id)}        >
              <Icon className="h-4 w-4" />
              {item.label}
            </Button>
          );
        })}
        <div className="mt-4 md:mt-40">
        <LogoutButton />
        </div>
      </nav>
    </div>

    </>
   )
}
