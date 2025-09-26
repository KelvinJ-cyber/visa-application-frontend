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
// If your global styles are in 'src/styles/globals.css', use the following import instead:
import "@/styles/globals.css";
import LogoutButton from "../../utils/LogoutButton.jsx";

interface DashBoardSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}
interface UserInfo {
  firstName?: string;
  lastName?: string;
}

export function DashBoardSidebar({
  activeSection,
  onSectionChange,
}: DashBoardSidebarProps) {
   const userInfo: UserInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
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
    <div className="w-64 bg-card border-r border-border h-full p-4">
      <div className="mb-8">
        <h2 className="mb-2 text-[15] font-bold">Travel Sure</h2>
        Welcome back, {userInfo.firstName ?? "User"}
      </div>
      
      <nav className="space-y-2">
        {sections.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant={activeSection === item.id ? "default" : "ghost"}
              className="w-full justify-start gap-3"
              onClick={() => onSectionChange(item.id)} size={undefined}            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Button>
          );
        })}
        <div className="mt-155">
        <LogoutButton />
        </div>
      </nav>
    </div>

    </>
   )
}
