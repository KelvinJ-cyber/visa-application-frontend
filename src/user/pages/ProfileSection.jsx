import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Lock, Bell, Globe, Shield, Eye } from "lucide-react";
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { ChangePasswordDailog } from "@/components/ChangePasswordDailog";

export function ProFileSection() {
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="space-y-6">
        <div>
          <h1 className="mb-2">Profile & Settings</h1>
          <p className="text-muted-foreground">
            Manage your personal information and preferences
          </p>
        </div>

        {/* Profile Information */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <User className="h-5 w-5" />
            <h3>Personal Information</h3>
          </div>

          <div className="flex item-center gap-6 mb-6">
            <Avatar className="w-22 h-22">
              <AvatarImage src="" />
              <AvatarFallback className="text-lg">
                {userInfo.firstName?.[0]}
                {userInfo.lastName?.[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <h4 className="mb-1 font-semibold text-lg">
                {userInfo.firstName} {userInfo.lastName}
              </h4>
              <p className="text-muted-foreground mb-3">{userInfo.email}</p>
              <Badge
                variant="outline"
                className="text-green-400 text-[10px] border-green-400"
              >
                Verified {userInfo.role || "User"}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                First Name
              </Label>
              <Input
                id="firstName"
                defaultValue={userInfo.firstName}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition"
                disabled
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Last Name
              </Label>
              <Input
                id="lastName"
                defaultValue={userInfo.lastName}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition"
                disabled
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                defaultValue={userInfo.email}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition"
                disabled
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone Number
              </Label>
              <Input
                id="phone"
                defaultValue={userInfo.phone}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition"
                disabled
              />
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <Button>Save Changes</Button>
            <Button variant="outline">Cancel</Button>
          </div>
        </Card>
      </div>

      {/* Security Settings */}
      <Card className="p-6 mt-5">
        <div className="flex items-center gap-3 mb-6">
          <Lock className="h-5 w-5" />
          <h3>Security Settings</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
            <div>
              <h4 className="mb-1">Change Password</h4>
              <p className="text-muted-foreground text-sm">
                Update your account password
              </p>
            </div>
            <Button
              onClick={() => setOpen(true)}
              variant="outline"
              className="gap-2"
            >
              <Lock className="h-4 w-4" />
              Change Password
            </Button>
            <ChangePasswordDailog open={open} onOpenChange={setOpen} />
          </div>

          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
            <div>
              <h4 className="mb-1">Two-Factor Authentication</h4>
              <p className="text-muted-foreground text-sm">
                Add an extra layer of security to your account
              </p>
            </div>
            <Button disabled variant="outline" className="gap-2">
              <Shield className="h-4 w-4" />
              Enable 2FA
            </Button>
          </div>
        </div>
      </Card>
      <Card className="p-6 border-red-200 mt-5">
        <h3 className="mb-4 text-red-600">Danger Zone</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
            <div>
              <h4 className="mb-1 text-red-800">Delete Account</h4>
              <p className="text-red-600 text-sm">
                Permanently delete your account and all associated data
              </p>
            </div>
            <Button variant="destructive">Delete Account</Button>
          </div>
        </div>
      </Card>
    </>
  );
}
