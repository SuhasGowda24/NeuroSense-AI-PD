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
  Lock,
  Calendar
} from "lucide-react";
import { color, motion } from "framer-motion";

import UserManagement from "../../../components/AdminDashboard/UserManagement";
import DatasetManagement from "../../../components/AdminDashboard/DatasetManagement";
import AnalyticsDashboard from "../../../components/AdminDashboard/AnalyticsDashboard";
// import ModelPerformance from "../../../components/AdminDashboard/ModelPerformance";
import SystemLogs from "../../../components/AdminDashboard/SystemLogs";
import FeedbackManagement from "../../../components/AdminDashboard/FeedbackManagement";

export default function Admin() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isAdmin, setIsAdmin] = useState(true);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTests: 0,
    datasets: 0,
    activeSessions: 0,
  });

  useEffect(() => {
    // Simulated loading delay
    setTimeout(() => {
      // Mock data instead of base44 fetch
      setStats({
        totalUsers: 10,
        totalTests: 30,
        datasets: 12,
        activeSessions: 34,
      });
      setIsAdmin(true);
      setLoading(false);
    }, 800);
  }, []);

if (loading) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-lg  text-gray-600">Loading...</p>
    </div>
  );
}

  const tabs = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "users", label: "Users", icon: Users },
    { id: "datasets", label: "Datasets", icon: Database },
    { id: "analytics", label: "Analytics", icon: TrendingUp },
    // { id: "models", label: "Model Performance", icon: Activity },
    { id: "logs", label: "System Logs", icon: FileText },
    { id: "feedback", label: "Feedback", icon: AlertCircle }
  ];

  const quickStats = [
    {
      title: "Total Users",
      icon: Users,
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
    },
    {
      title: "Total Tests",
      icon: Activity,
      color: "from-green-500 to-emerald-500",
    },
     {
      title: "Schedule Appointment",
      icon: Calendar,
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "Active Sessions",
      icon: TrendingUp,
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50/20 to-pink-50/20 p-4 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-[1600px] mx-auto"
      >

        {/* Quick Stats */}
        {activeTab === "overview" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            {quickStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <Card className="border-none shadow-xl bg-white/90 backdrop-blur-lg hover:shadow-2xl transition-all cursor-pointer">
                  <CardContent className="p-6">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4 shadow-lg`}
                    >
                      <stat.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="text-4xl font-bold text-gray-900 mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm font-medium text-gray-600">
                      {stat.title}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Navigation Tabs */}
        <Card className="border-none shadow-xl bg-white/90 backdrop-blur-lg mb-6">
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-2">
              {tabs.map((tab) => (
                <Button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  variant={activeTab === tab.id ? "default" : "outline"}
                  className={`flex items-center gap-2 ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg"
                      : "hover:bg-red-50"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Content Area */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === "overview" && (
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-none shadow-xl bg-white/90 backdrop-blur-lg">
                <CardHeader className="border-b border-red-50">
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-red-600" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 text-gray-600">
                  System activity will be displayed here.
                </CardContent>
              </Card>

              <Card className="border-none shadow-xl bg-white/90 backdrop-blur-lg">
                <CardHeader className="border-b border-red-50">
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-orange-600" />
                    System Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-green-800">
                      All systems operational
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "users" && <UserManagement />}
          {activeTab === "datasets" && <DatasetManagement />}
          {activeTab === "analytics" && <AnalyticsDashboard />}
          {/* {activeTab === "models" && <ModelPerformance />} */}
          {activeTab === "logs" && <SystemLogs />}
          {activeTab === "feedback" && <FeedbackManagement />}
        </motion.div>
      </motion.div>
    </div>
  );
}
