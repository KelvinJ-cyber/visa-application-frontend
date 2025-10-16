import React from "react";
import { LogOut } from "lucide-react";


export default function LogoutButton() {
  const handleLogout = () => {
    try {
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("userId")
      localStorage.removeItem("expiresAt")
      localStorage.removeItem("userInfo");
    } catch (e) {
      // ignore storage errors
    }
  
    window.location.href = "/login";
  };

  return (
    <button
      onClick={handleLogout}
      aria-label="Log out"
      title="Log out"
    className="
        inline-flex items-center gap-3 rounded-2xl px-4 py-2 shadow-sm
        bg-[#1c1b2a]  text-white border border-[#1c1b2a]
        transition transform hover:-translate-y-0.5 hover:shadow-md active:scale-95
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black/20
      "
    >
      <span className="bg-white text-black rounded-full p-1.5 flex items-center justify-center">
        <LogOut className="h-4 w-4" />
      </span>

      <span className="font-medium tracking-wide text-sm">Logout</span>
    </button>
  );
}
