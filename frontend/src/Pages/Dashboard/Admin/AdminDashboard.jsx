import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";

import {
  Shield,
  Users,
  Database,
  BarChart3,
  Activity,
  AlertCircle,
  TrendingUp,
  FileText,
  Settings,
  Calendar,
  Upload,
  Download,
  Clock
} from "lucide-react";

import { motion } from "framer-motion";

import UserManagement from "../../../components/AdminDashboard/UserManagement";
import AnalyticsDashboard from "../../../components/AdminDashboard/AnalyticsDashboard";
import DatasetManagement from "../../../components/AdminDashboard/DatasetManagement";
import SystemLogs from "../../../components/AdminDashboard/SystemLogs";
import FeedbackManagement from "../../../components/AdminDashboard/FeedbackManagement";

export default function Admin() {
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);

  const [adminInfo, setAdminInfo] = useState({
    name: "",
    email: "",
    role: "",
    avatar: "",
    createdAt: "",
    lastLogin: "",
    loginCount: 0,
  });

  const [recentActivity, setRecentActivity] = useState([]);

  // FETCH ADMIN DETAILS
  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("/api/dashboard/", {
          headers: { Authorization: `Bearer ${token}` }
        });

        const data = await res.json();

        if (data.admin) {
      setAdminInfo({
        name: data.admin.username,
        email: data.admin.email,
        avatar: data.admin.avatar || data.admin.username[0].toUpperCase(),
        role: data.admin.role,
        lastLogin: data.admin.lastLogin
    ? new Date(data.admin.lastLogin).toLocaleString()
    : "N/A",

  loginCount: data.admin.loginCount || 0,
  createdAt: data.admin.createdAt
    ? new Date(data.admin.createdAt).toLocaleDateString()
    : "N/A"
      });
        }

        // Mock Recent Activity
        setRecentActivity([
          { action: "New user registered", user: "Alice Johnson", time: "5 mins ago", type: "success", icon: Users },
          { action: "Dataset uploaded", user: "Bob Smith", time: "20 mins ago", type: "info", icon: Upload },
          { action: "System alert resolved", user: "Admin", time: "1 hour ago", type: "success", icon: Shield },
          { action: "Failed login attempt", user: "Unknown", time: "2 hours ago", type: "warning", icon: Shield }
        ]);

      } catch (err) {
        console.error("Error fetching admin info:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmin();
  }, []);

  const tabs = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "users", label: "Users", icon: Users },
    { id: "analytics", label: "Analytics", icon: TrendingUp },
    { id: "datasets", label: "Datasets", icon: Database },
    { id: "logs", label: "System Logs", icon: FileText },
    { id: "feedback", label: "Feedback", icon: AlertCircle }
  ];

  const quickActions = [
    // { label: "Add User", icon: Users, bg: "bg-blue-100" },
    { label: "Upload Data", icon: Upload, bg: "bg-green-100", onClick: () => setActiveTab("datasets") },
    { label: "Export Report", icon: Download, bg: "bg-purple-100" },
    // { label: "Schedule Task", icon: Calendar, bg: "bg-orange-100" }
  ];

  const getDotColor = (type) => {
    switch (type) {
      case "success": return "bg-green-500";
      case "warning": return "bg-orange-500";
      case "info": return "bg-blue-500";
      default: return "bg-gray-500";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-gray-600">Loading Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50/20 to-pink-50/20 p-4 lg:p-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="max-w-[1600px] mx-auto">

        {/* =================== ADMIN HEADER =================== */}
        <Card className="border-none shadow-xl bg-gradient-to-r from-red-500 to-pink-500 text-white mb-6">
          <CardContent className="p-6 flex flex-col md:flex-row justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold">
                {adminInfo.avatar}
              </div>

              <div>
                <h1 className="text-2xl font-bold">Welcome back, {adminInfo.name}!</h1>
                <p className="text-sm text-white/80">{adminInfo.email}</p>

                <div className="flex gap-3 mt-2 text-sm">
                  <span className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-md"><Shield className="w-4 h-4" /> {adminInfo.role}</span>
                  <span className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-md"><Clock className="w-4 h-4" />Last login: {adminInfo.lastLogin}</span>
                  <span className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-md"><Activity className="w-4 h-4" />{adminInfo.loginCount} logins</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* =================== TAB NAVIGATION =================== */}
        <Card className="border-none shadow-xl bg-white/90 backdrop-blur-lg mb-6">
          <CardContent className="p-4 flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                variant={activeTab === tab.id ? "default" : "outline"}
                className={
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg"
                    : "hover:bg-red-50"
                }
              >
                <tab.icon className="w-4 h-4 mr-1" />
                {tab.label}
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* =================== TABS CONTENT =================== */}
        {activeTab === "overview" && (
          <div className="grid lg:grid-cols-2 gap-6">

            {/* Recent Activity */}
            <Card className="shadow-xl bg-white/90 backdrop-blur-lg">
              <CardHeader className="border-b">
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-red-600" /> Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {recentActivity.map((a, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      a.type === "success" ? "bg-green-100" :
                      a.type === "warning" ? "bg-orange-100" :
                      "bg-blue-100"
                    }`}>
                      <a.icon className="w-4 h-4" />
                    </div>

                    <div className="flex-1">
                      <p className="text-sm font-semibold">{a.action}</p>
                      <p className="text-xs text-gray-500">by {a.user}</p>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      {a.time}
                      <div className={`w-2 h-2 rounded-full ${getDotColor(a.type)}`}></div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-xl bg-white/90 backdrop-blur-lg">
              <CardHeader className="border-b">
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-purple-600" /> Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 grid grid-cols-2 gap-4">
                {quickActions.map((a, i) => (
                  <motion.div key={i} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button className="w-full h-28 flex flex-col" onClick={a.onClick}>
                      <div className={`w-12 h-12 rounded-full ${a.bg} flex items-center justify-center`}>
                        <a.icon className="w-6 h-6" />
                      </div>
                      <span className="text-sm mt-2">{a.label}</span>
                    </Button>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

          </div>
        )}

        {activeTab === "users" && <UserManagement />}
        {activeTab === "analytics" && <AnalyticsDashboard />}
        {activeTab === "datasets" && <DatasetManagement />}
        {activeTab === "logs" && <SystemLogs />}
        {activeTab === "feedback" && <FeedbackManagement />}

      </motion.div>
    </div>
  );
}
