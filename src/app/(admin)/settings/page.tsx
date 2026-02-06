"use client";

import { Save, Bell, Shield, Globe } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Switch } from "@/components/ui/Switch";

export default function SettingsPage() {
  return (
    <div className="space-y-8 max-w-4xl">
      {/* Page header */}
      <div className="opacity-0 animate-fade-in">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Configure your admin panel preferences.
        </p>
      </div>

      {/* General Settings */}
      <div
        className="glass rounded-xl p-6 space-y-6 opacity-0 animate-fade-in"
        style={{ animationDelay: "100ms" }}
      >
        <div className="flex items-center gap-3 pb-4 border-b border-border/50">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Globe className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="font-semibold">General Settings</h2>
            <p className="text-sm text-muted-foreground">
              Basic platform configuration
            </p>
          </div>
        </div>

        <div className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="platform-name">Platform Name</Label>
            <Input
              id="platform-name"
              defaultValue="MarketPlace"
              className="bg-secondary/50"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="support-email">Support Email</Label>
            <Input
              id="support-email"
              type="email"
              defaultValue="support@marketplace.com"
              className="bg-secondary/50"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="timezone">Timezone</Label>
            <Input
              id="timezone"
              defaultValue="UTC-5 (Eastern Time)"
              className="bg-secondary/50"
            />
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div
        className="glass rounded-xl p-6 space-y-6 opacity-0 animate-fade-in"
        style={{ animationDelay: "200ms" }}
      >
        <div className="flex items-center gap-3 pb-4 border-b border-border/50">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Bell className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="font-semibold">Notifications</h2>
            <p className="text-sm text-muted-foreground">
              Manage your notification preferences
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">New provider applications</p>
              <p className="text-sm text-muted-foreground">
                Get notified when new providers apply
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Booking alerts</p>
              <p className="text-sm text-muted-foreground">
                Notifications for booking issues
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Weekly reports</p>
              <p className="text-sm text-muted-foreground">
                Receive weekly platform summaries
              </p>
            </div>
            <Switch />
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div
        className="glass rounded-xl p-6 space-y-6 opacity-0 animate-fade-in"
        style={{ animationDelay: "300ms" }}
      >
        <div className="flex items-center gap-3 pb-4 border-b border-border/50">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="font-semibold">Security</h2>
            <p className="text-sm text-muted-foreground">
              Account security settings
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Two-factor authentication</p>
              <p className="text-sm text-muted-foreground">
                Add an extra layer of security
              </p>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Session timeout</p>
              <p className="text-sm text-muted-foreground">
                Auto-logout after inactivity
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </div>

      {/* Save button */}
      <div
        className="flex justify-end opacity-0 animate-fade-in"
        style={{ animationDelay: "400ms" }}
      >
        <Button className="bg-gradient-primary text-primary-foreground gap-2">
          <Save className="w-4 h-4" />
          Save Changes
        </Button>
      </div>
    </div>
  );
}
