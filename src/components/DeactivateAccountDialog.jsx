import React, { useState, useRef, useEffect } from "react";
import instance from "@/services/axios";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, AlertTriangle, Trash2 } from "lucide-react";

export default function DeactivateAccountModal({
  open,
  onOpenChange,
  onDeactivated,
}) {
  const [password, setPassword] = useState("");
  const [confirmChecked, setConfirmChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const passwordInputRef = useRef(null);

  // Autofocus password input when dialog opens
  useEffect(() => {
    if (open && passwordInputRef.current) {
      passwordInputRef.current.focus();
    }
  }, [open]);

  const reset = () => {
    setPassword("");
    setShowPassword(false);
    setConfirmChecked(false);
    setErrorMsg(null);
  };

  const handleDeactivate = async () => {
    setErrorMsg(null);

    if (!password) {
      setErrorMsg("Please enter your password.");
      return;
    }
    if (!confirmChecked) {
      setErrorMsg("You must confirm before deactivating your account.");
      return;
    }

    setLoading(true);
    try {
      const userId = Number(localStorage.getItem("userId"));
      const res = await instance.post(`/api/user/${userId}/deactivate`, {
        currentPassword: password,
      });
      if (res.status === 200) {
        localStorage.clear();
      }

      const successMessage =
        res.data?.message || "Your account has been deactivated.";
      toast.success(successMessage);

      // Clear local storage / logout
      localStorage.clear();

      reset();
      onOpenChange(false);

      // redirect to login (give time for modal close & toast)
      setTimeout(() => {
        window.location.href = "/login";
      }, 500);
    } catch (err) {
      const backendMessage =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        err?.message ||
        "Failed to deactivate account. Try again.";
      setErrorMsg(backendMessage);
      toast.error(backendMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-2xl bg-white text-black p-0">
        <div className="p-6">
          <DialogHeader>
            <div className="flex items-start gap-3">
              <div className="rounded-full bg-yellow-100 p-2">
                <AlertTriangle size={20} className="text-yellow-600" />
              </div>
              <div>
                <DialogTitle className="text-lg font-semibold text-gray-900">
                  Deactivate Account
                </DialogTitle>
                <DialogDescription className="text-sm text-gray-600">
                  This action will{" "}
                  <span className="font-semibold text-red-600">
                    lock your account
                  </span>
                  . You will not be able to sign in until reactivated.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          {/* Error message at the top */}
          {errorMsg && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-md px-3 py-2 mt-4 mb-2 animate-shake">
              <AlertTriangle size={16} className="text-red-500" />
              <span className="text-sm">{errorMsg}</span>
            </div>
          )}

          <div className="mt-5 space-y-5">
            <div>
              <Label
                htmlFor="deactivatePassword"
                className="text-sm font-medium"
              >
                Confirm password
              </Label>
              <div className="relative mt-1">
                <Input
                  id="deactivatePassword"
                  ref={passwordInputRef}
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your current password"
                  autoComplete="off"
                  name="deactivate-password"
                  className={`pr-10 ${
                    errorMsg && !password
                      ? "border-red-400 focus:border-red-500"
                      : ""
                  }`}
                  disabled={loading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </Button>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Checkbox
                id="confirmDeactivate"
                checked={confirmChecked}
                onCheckedChange={(val) => setConfirmChecked(Boolean(val))}
                disabled={loading}
                className="mt-1 bg-gray-400"
              />
              <div>
                <Label
                  htmlFor="confirmDeactivate"
                  className="text-sm font-medium"
                >
                  I understand this action cannot be undone.
                </Label>
                <p className="text-xs text-gray-500 mt-1">
                  Your account will be locked and you'll be signed out from all
                  devices.
                </p>
              </div>
            </div>
          </div>

          <DialogFooter className="mt-7 flex justify-end gap-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                reset();
                onOpenChange(false);
              }}
              disabled={loading}
              className="text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Button>

            <Button
              type="button"
              onClick={handleDeactivate}
              disabled={!confirmChecked || !password || loading}
              className={`flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold transition-all duration-200 ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              <Trash2 size={16} />
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Deactivating...
                </div>
              ) : (
                "Deactivate"
              )}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
