import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function ProFileSection() {
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");

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
    </>
);
}
