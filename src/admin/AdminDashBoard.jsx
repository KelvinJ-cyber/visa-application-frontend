import { 
  LayoutDashboard, 
  FileText, 
  Calendar, 
  FolderOpen, 
  CreditCard, 
  Users, 
  MessageSquare, 
  Settings,
  Shield
} from "lucide-react";



export function AdminSidebar({ activeSection, onSectionChange }) {
  const navigationItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      description: "Overview & Stats"
    },
    {
      id: "applications",
      label: "Applications",
      icon: FileText,
      description: "Manage Applications"
    },
    {
      id: "appointments",
      label: "Appointments",
      icon: Calendar,
      description: "Schedule & Manage"
    },
    {
      id: "documents",
      label: "Documents",
      icon: FolderOpen,
      description: "Verify Documents"
    },
    {
      id: "payments",
      label: "Payments",
      icon: CreditCard,
      description: "Payment Overview"
    },
    {
      id: "users",
      label: "User Management",
      icon: Users,
      description: "Manage Accounts"
    },
    {
      id: "support",
      label: "Support & Communication",
      icon: MessageSquare,
      description: "Send Updates"
    },
    {
      id: "profile",
      label: "Profile & Settings",
      icon: Settings,
      description: "Admin Settings"
    }
  ];

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-sidebar-primary rounded-lg flex items-center justify-center">
            <Shield className="h-6 w-6 text-sidebar-primary-foreground" />
          </div>
          <div>
            <h2 className="text-sidebar-foreground font-medium">System Administration</h2>
            <p className="text-sm text-sidebar-foreground/60">Visa Management</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-all duration-200 group ${
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                }`}
              >
                <Icon className={`h-5 w-5 flex-shrink-0 ${
                  isActive ? "text-sidebar-primary" : "text-sidebar-foreground/60 group-hover:text-sidebar-primary"
                }`} />
                <div className="flex-1 min-w-0">
                  <div className={`font-medium text-sm ${
                    isActive ? "text-sidebar-accent-foreground" : ""
                  }`}>
                    {item.label}
                  </div>
                  <div className={`text-xs ${
                    isActive 
                      ? "text-sidebar-accent-foreground/60" 
                      : "text-sidebar-foreground/50 group-hover:text-sidebar-accent-foreground/60"
                  }`}>
                    {item.description}
                  </div>
                </div>
                {isActive && (
                  <div className="w-1 h-8 bg-sidebar-primary rounded-full"></div>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="text-xs text-sidebar-foreground/50 text-center">
          Admin Dashboard 
        </div>
      </div>
    </aside>
  );
}