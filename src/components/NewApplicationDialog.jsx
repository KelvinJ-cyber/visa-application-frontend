// src/components/ApplicationFormDialog.jsx
import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import axios from "@/services/axios.js";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { FileText } from "lucide-react";
import { CheckCircle } from "lucide-react";
import { XCircle } from "lucide-react";
export function ApplicationFormDialog({
  children,
  disabled,
  triggerLabel = "Start New Application",
}) {
  const [open, setOpen] = useState(false);
  // form state
  const [visaType, setVisaType] = useState("Tourist");
  const [country, setCountry] = useState("");
  const [passportNumber, setPassportNumber] = useState("");
  const [nationality, setNationality] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState({ type: "", message: "" });

  // basic passport pattern (letters/numbers, 5-20 chars) - adjust to your rules
  const passportPattern = /^[A-Z0-9\-]{5,20}$/i;

  const resetForm = () => {
    setVisaType("Tourist");
    setCountry("");
    setPassportNumber("");
    setNationality("");
    setError(null);
    setSuccessMsg({ type: "", message: "" });
  };

  const validate = () => {
    if (!visaType) return "Please select a visa type.";
    if (!country || !country.trim())
      return "Country of application is required.";
    if (!passportNumber || !passportNumber.trim())
      return "Passport number is required.";
    if (!passportPattern.test(passportNumber.trim()))
      return "Passport number looks invalid. Use letters/numbers (5–20 chars).";
    if (!nationality || !nationality.trim()) return "Nationality is required.";
    return null;
  };

  const handleSubmit = async (e) => {
    const userId = Number(localStorage.getItem("userId"));
    e && e.preventDefault();
    setError(null);
    setSuccessMsg({ type: "", message: "" });

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    const payload = {
      visaType,
      countryOfApplication: country.trim(),
      passportNumber: passportNumber.trim(),
      nationality: nationality.trim(),
      createdAt: new Date().toISOString(),
    };
    
    setLoading(true);
    try {
      const response = await axios.post(
        `/api/user/applications/${userId}`,
        payload
      );
      const { message } = response.data;
      setSuccessMsg({
        type: "success",
        message: "Application started — check your Applications list.",
      });
      setTimeout(() => {
        setOpen(false);
        resetForm();

        toast.success(
          <span className="flex items-center gap-2">
            Begin your journey
            <span className="material-symbols-outlined text-lg">
              flight_takeoff
            </span>
          </span>,
          {
            description: message,
          }
        );
      }, 5200);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to start application. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        setOpen(val);
        if (!val) resetForm();
      }}
    >
      <DialogTrigger asChild>
        <Button
          className="flex items-center gap-2 px-6 py-3 text-base rounded-lg shadow-sm transition-transform transform-gpu hover:-translate-y-0.5 active:translate-y-0 focus:outline-none"
          variant="default"
          size="lg"
          disabled ={disabled}
        >
          {children}
          <span className="font-medium">{triggerLabel}</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-xl w-full bg-white text-black border border-black/5 rounded-2xl shadow-xl p-6">
        <DialogHeader>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-black/5 p-2">
                <FileText className="w-5 h-5 text-black" />
              </div>
              <div>
                <DialogTitle className="text-lg leading-tight font-semibold tracking-tight text-black">
                  Start a new visa application
                </DialogTitle>
                <DialogDescription className="text-sm text-muted-foreground mt-1">
                  Fill out the basic details to create a draft you can continue
                  later.
                </DialogDescription>
              </div>
            </div>

            <div className="text-sm text-muted-foreground italic">
              Drafts saved automatically
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-5">
          {/* Alerts */}
          {error && (
            <Alert variant="destructive" className="flex items-start gap-3">
              <XCircle className="w-5 h-5 text-red-600" />
              <div>
                <AlertTitle className="font-medium">Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </div>
            </Alert>
          )}

          {successMsg.message && (
            <Alert className="flex items-start gap-3 border-black/5">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <AlertTitle className="font-medium">Success</AlertTitle>
                <AlertDescription>{successMsg.message}</AlertDescription>
              </div>
            </Alert>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Visa Type */}
            <div>
              <Label className="mb-2 block text-xs uppercase tracking-wider text-muted-foreground">
                Visa type
              </Label>
              <Select value={visaType} onValueChange={(v) => setVisaType(v)}>
                <SelectTrigger className="w-full bg-white text-black border border-black/10 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black/10 transition">
                  <SelectValue placeholder="Select visa type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tourist">Tourist</SelectItem>
                  <SelectItem value="Work">Work</SelectItem>
                  <SelectItem value="Business">Business</SelectItem>
                  <SelectItem value="Vacation">Vacation</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Nationality */}
            <div>
              <Label className="mb-2 block text-xs uppercase tracking-wider text-muted-foreground">
                Nationality
              </Label>
              <Input
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
                placeholder="e.g. Nigeria"
                className="w-full bg-white text-black rounded-md border border-black/10 shadow-sm focus:ring-2 focus:ring-black/10 transition"
                required
                aria-label="Nationality"
              />
            </div>
          </div>

          {/* Country */}
          <div>
            <Label className="mb-2 block text-xs uppercase tracking-wider text-muted-foreground">
              Country of application
            </Label>
            <Input
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="e.g. United States"
              className="w-full bg-white text-black rounded-md border border-black/10 shadow-sm focus:ring-2 focus:ring-black/10 transition"
              required
              aria-label="Country of application"
            />
          </div>

          {/* Passport */}
          <div>
            <Label className="mb-2 block text-xs uppercase tracking-wider text-muted-foreground">
              Passport number
            </Label>
            <Input
              value={passportNumber}
              onChange={(e) => setPassportNumber(e.target.value)}
              placeholder="Passport number"
              className="w-full bg-white text-black rounded-md border border-black/10 shadow-sm focus:ring-2 focus:ring-black/10 transition"
              required
              aria-label="Passport number"
            />
            <p className="text-xs text-muted-foreground mt-2">
              Enter passport number (letters & numbers). We'll validate basics
              here.
            </p>
          </div>

          <DialogFooter className="flex items-center justify-between pt-2">
            <div className="flex gap-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  setOpen(false);
                  resetForm();
                }}
                disabled={loading}
                className="rounded-md border border-transparent hover:bg-black/5 transition"
              >
                Cancel
              </Button>

              <Button
                className="rounded-md bg-black text-white px-4 py-2 shadow hover:shadow-lg transform transition duration-150 ease-in-out hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20"
                type="submit"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Start Application"}
              </Button>
            </div>

            <div className="text-xs text-muted-foreground flex items-center gap-2">
              <span className="italic">Auto-saved</span>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
