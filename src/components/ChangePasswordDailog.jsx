import React, { useState, useMemo } from "react";
import instance from "@/services/axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialogTwo";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

export function ChangePasswordDailog({ open, onOpenChange }) {
  const [recentPassword, setRecentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showRecent, setShowRecent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [touched, setTouched] = useState({ recent: false, new: false });

  const error = useMemo(() => {
    const e = {};
    if (!recentPassword && touched.recent)
      e.recent = "Current password is required.";
    if (!newPassword && touched.new) e.new = "New password is required.";
    if (newPassword && newPassword.length < 6)
      e.new = "New password must be at least 6 characters.";
    if (newPassword && recentPassword && newPassword === recentPassword)
      e.new = "New password must be different from current password.";
    return e;
  }, [recentPassword, newPassword, touched]);

  const passwordStrength = useMemo(() => {
    let score = 0;
    if (/[A-Z]/.test(newPassword)) score++; // Uppercase
    if (/[a-z]/.test(newPassword)) score++; // Lowercase
    if (/[0-9]/.test(newPassword)) score++; // Numbers
    if (/[!@#$%^&*]/.test(newPassword)) score++; // Special chars
    if (newPassword.length >= 8) score++; // Lengt
    return score;
  }, [newPassword]);

  const handleSubmit = async (e) => {
    const userId = Number(localStorage.getItem("userId"));
    e.preventDefault();

    setTouched({ recent: true, new: true });
    setErrorMsg(null);

    if (
      !recentPassword ||
      !newPassword ||
      newPassword.length < 6 ||
      recentPassword === newPassword
    ) {
      return;
    }

    setLoading(true);
    try {
      const response = await instance.post(
        `/api/user/change-password/${userId}`,
        {
          recentPassword,
          newPassword,
        }
      );

      setRecentPassword("");
      setNewPassword("");
      setTouched({ recent: false, new: false });
      toast.success("Password change successful, Logout to confirm");
      onOpenChange(false);
    } catch (err) {
      toast.error(
        "Your password is incorrect, Enter your Current password to change"
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-2xl bg-white text-black">
        <div className="p-6">
          <DialogHeader>
            <DialogTitle className="text-lg font-medium">
              Change Password
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-500">
              Enter your current password and a new one (at least 6 characters).
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            {/* Current password */}
            <div>
              <Label htmlFor="recentPassword" className="text-sm">
                Current password
              </Label>
              <div className="relative mt-1">
                <Input
                  id="recentPassword"
                  type={showRecent ? "text" : "password"}
                  value={recentPassword}
                  onChange={(e) => setRecentPassword(e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, recent: true }))}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowRecent((s) => !s)}
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                  aria-label={
                    showRecent
                      ? "Hide current password"
                      : "Show current password"
                  }
                >
                  {showRecent ? <EyeOff size={16} /> : <Eye size={16} />}
                </Button>
              </div>
              {error.recent && (
                <p className="mt-1 text-sm text-red-600">{error.recent}</p>
              )}
            </div>

            {/* New password */}
            <div>
              <Label htmlFor="newPassword" className="text-sm">
                New password
              </Label>
              <div className="relative mt-1">
                <Input
                  id="newPassword"
                  type={showNew ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, new: true }))}
                  placeholder="At least 8 characters"
                  autoComplete="new-password"
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowNew((s) => !s)}
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                  aria-label={
                    showNew ? "Hide new password" : "Show new password"
                  }
                >
                  {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                </Button>
              </div>
              {error.new && (
                <p className="mt-1 text-sm text-red-600">{error.new}</p>
              )}

              {/* strength meter */}
              <div className="mt-2 flex items-center gap-3">
                <div className="flex items-center gap-1" aria-hidden>
                  <div
                    className={`h-1 w-8 rounded ${
                      passwordStrength >= 1 ? "bg-red-500" : "bg-gray-200"
                    }`}
                  />
                  <div
                    className={`h-1 w-8 rounded ${
                      passwordStrength >= 2 ? "bg-red-400" : "bg-gray-200"
                    }`}
                  />
                  <div
                    className={`h-1 w-8 rounded ${
                      passwordStrength >= 3 ? "bg-yellow-500" : "bg-gray-200"
                    }`}
                  />
                  <div
                    className={`h-1 w-8 rounded ${
                      passwordStrength >= 4 ? "bg-green-400" : "bg-gray-200"
                    }`}
                  />
                  <div
                    className={`h-1 w-8 rounded ${
                      passwordStrength >= 5 ? "bg-green-700" : "bg-gray-200"
                    }`}
                  />
                </div>
                <span className="text-xs text-gray-500">
                  {newPassword.length === 0
                    ? "No password entered"
                    : passwordStrength === 1
                    ? "Weak"
                    : passwordStrength === 2
                    ? "Okay"
                    : passwordStrength === 3
                    ? "Good"
                    : passwordStrength === 4
                    ? "Strong"
                    : passwordStrength === 5
                    ? "Very Strong"
                    : ""}
                </span>
              </div>
            </div>

            {errorMsg && <p className="text-sm text-red-600">{errorMsg}</p>}

            <DialogFooter className="mt-3 flex justify-end gap-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => onOpenChange(false)}
                disabled={loading}
                className="text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={
                  loading ||
                  !recentPassword ||
                  !newPassword ||
                  newPassword.length < 6 ||
                  newPassword === recentPassword
                }
                className="bg-black text-white hover:brightness-90"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Saving...
                  </div>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
