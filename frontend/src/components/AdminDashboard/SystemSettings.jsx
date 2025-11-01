import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Switch } from "../../components/ui/switch";
import { Slider } from "../../components/ui/slider";
import { Badge } from "../../components/ui/badge";
import { 
  Save,
  AlertCircle,
  CheckCircle,
  Shield,
  Bell,
  Database
} from "lucide-react";
import { motion } from "framer-motion";

export default function SystemSettings() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  // 🔹 Simulate loading settings (replace later with API)
  const loadSettings = async () => {
    setLoading(true);
    try {
      const saved = localStorage.getItem("system_settings");
      if (saved) {
        setSettings(JSON.parse(saved));
      } else {
        createDefaultSettings();
      }
    } catch (error) {
      console.error("Error loading settings:", error);
    } finally {
      setLoading(false);
    }
  };

  const createDefaultSettings = () => {
    const defaultSettings = {
      setting_name: "System Configuration",
      detection_threshold: 0.75,
      max_upload_size_mb: 10,
      session_timeout_minutes: 30,
      enable_notifications: true,
      enable_2fa: false,
      auto_backup: true,
      backup_frequency_days: 7,
      data_retention_days: 365
    };
    setSettings(defaultSettings);
    localStorage.setItem("system_settings", JSON.stringify(defaultSettings));
  };

  const handleSave = async () => {
    if (!settings) return;
    setSaving(true);
    try {
      localStorage.setItem("system_settings", JSON.stringify(settings));
      alert("✅ Settings saved successfully!");
    } catch (error) {
      console.error("Error saving settings:", error);
      alert("❌ Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  const updateSetting = (key, value) => {
    setSettings({ ...settings, [key]: value });
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (!settings) {
    return (
      <Card className="border-none shadow-xl bg-white/90 backdrop-blur-lg">
        <CardContent className="p-8 text-center">
          <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600">Unable to load settings</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={saving}
          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg"
        >
          <Save className="w-4 h-4 mr-2" />
          {saving ? "Saving..." : "Save All Settings"}
        </Button>
      </div>

      {/* Detection Settings */}
      <Card className="border-none shadow-xl bg-white/90 backdrop-blur-lg">
        <CardHeader className="border-b border-purple-50 bg-gradient-to-r from-purple-50 to-pink-50">
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5 text-purple-600" />
            Detection & Model Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-base font-semibold">
                Detection Threshold
              </Label>
              <Badge className="bg-purple-100 text-purple-700">
                {(settings.detection_threshold * 100).toFixed(0)}%
              </Badge>
            </div>
            <p className="text-sm text-gray-600">
              Minimum confidence level required for detection
            </p>
            <Slider
              value={[settings.detection_threshold * 100]}
              onValueChange={(value) =>
                updateSetting("detection_threshold", value[0] / 100)
              }
              max={100}
              step={5}
              className="py-4"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Low Sensitivity (50%)</span>
              <span>High Sensitivity (100%)</span>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-200 space-y-3">
            <Label className="text-base font-semibold">Maximum Upload Size</Label>
            <div className="flex items-center gap-4">
              <Input
                type="number"
                value={settings.max_upload_size_mb}
                onChange={(e) =>
                  updateSetting("max_upload_size_mb", parseInt(e.target.value))
                }
                className="w-32"
                min={1}
                max={100}
              />
              <span className="text-gray-600">MB per file</span>
            </div>
            <p className="text-sm text-gray-600">
              Maximum size for handwriting sample uploads
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card className="border-none shadow-xl bg-white/90 backdrop-blur-lg">
        <CardHeader className="border-b border-red-50 bg-gradient-to-r from-red-50 to-orange-50">
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-red-600" />
            Security & Access Control
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200"
          >
            <div>
              <Label className="text-base font-semibold text-gray-900">
                Two-Factor Authentication
              </Label>
              <p className="text-sm text-gray-600 mt-1">
                Require 2FA for all admin accounts
              </p>
            </div>
            <Switch
              checked={settings.enable_2fa}
              onCheckedChange={(checked) =>
                updateSetting("enable_2fa", checked)
              }
            />
          </motion.div>

          <div className="space-y-3">
            <Label className="text-base font-semibold">Session Timeout</Label>
            <div className="flex items-center gap-4">
              <Input
                type="number"
                value={settings.session_timeout_minutes}
                onChange={(e) =>
                  updateSetting(
                    "session_timeout_minutes",
                    parseInt(e.target.value)
                  )
                }
                className="w-32"
                min={5}
                max={1440}
              />
              <span className="text-gray-600">minutes</span>
            </div>
            <p className="text-sm text-gray-600">
              Auto-logout inactive users after this duration
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card className="border-none shadow-xl bg-white/90 backdrop-blur-lg">
        <CardHeader className="border-b border-green-50 bg-gradient-to-r from-green-50 to-emerald-50">
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-green-600" />
            Notifications & Alerts
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200"
          >
            <div>
              <Label className="text-base font-semibold text-gray-900">
                Email Notifications
              </Label>
              <p className="text-sm text-gray-600 mt-1">
                Send email alerts for critical system events
              </p>
            </div>
            <Switch
              checked={settings.enable_notifications}
              onCheckedChange={(checked) =>
                updateSetting("enable_notifications", checked)
              }
            />
          </motion.div>

          {settings.enable_notifications && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="pl-4 border-l-4 border-green-500 space-y-3"
            >
              {["High-risk detections", "System errors & crashes", "Security alerts", "User feedback"].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-gray-700">{item}</span>
                </div>
              ))}
            </motion.div>
          )}
        </CardContent>
      </Card>

      {/* Backup & Data Retention */}
      <Card className="border-none shadow-xl bg-white/90 backdrop-blur-lg">
        <CardHeader className="border-b border-blue-50 bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5 text-blue-600" />
            Backup & Data Retention
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200"
          >
            <div>
              <Label className="text-base font-semibold text-gray-900">
                Automatic Backups
              </Label>
              <p className="text-sm text-gray-600 mt-1">
                Regularly backup system data
              </p>
            </div>
            <Switch
              checked={settings.auto_backup}
              onCheckedChange={(checked) =>
                updateSetting("auto_backup", checked)
              }
            />
          </motion.div>

          {settings.auto_backup && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="space-y-4"
            >
              <div className="space-y-3">
                <Label className="text-base font-semibold">Backup Frequency</Label>
                <div className="flex items-center gap-4">
                  <Input
                    type="number"
                    value={settings.backup_frequency_days}
                    onChange={(e) =>
                      updateSetting(
                        "backup_frequency_days",
                        parseInt(e.target.value)
                      )
                    }
                    className="w-32"
                    min={1}
                    max={30}
                  />
                  <span className="text-gray-600">days</span>
                </div>
              </div>
            </motion.div>
          )}

          <div className="pt-6 border-t border-gray-200 space-y-3">
            <Label className="text-base font-semibold">
              Data Retention Period
            </Label>
            <div className="flex items-center gap-4">
              <Input
                type="number"
                value={settings.data_retention_days}
                onChange={(e) =>
                  updateSetting("data_retention_days", parseInt(e.target.value))
                }
                className="w-32"
                min={30}
                max={3650}
              />
              <span className="text-gray-600">days</span>
            </div>
            <p className="text-sm text-gray-600">
              Automatically delete old data after this period (GDPR compliance)
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Save Button Bottom */}
      <div className="flex justify-center">
        <Button
          onClick={handleSave}
          disabled={saving}
          size="lg"
          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-xl px-12"
        >
          <Save className="w-5 h-5 mr-2" />
          {saving ? "Saving Changes..." : "Save All Settings"}
        </Button>
      </div>
    </div>
  );
}
