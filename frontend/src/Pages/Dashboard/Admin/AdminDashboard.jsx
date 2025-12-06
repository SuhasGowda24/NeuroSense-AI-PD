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
// import ModelPerformance from "../../../components/AdminDashboard/ModelPerformance";
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
    lastLogin: "",
    loginCount: 0
  });

  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setAdminInfo({
        name: "John Doe",
        email: "john.doe@example.com",
        avatar: "JD",
        lastLogin: new Date().toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit"
        }),
        loginCount: 0
      });

      setRecentActivity([
        { action: "New user registered", user: "Alice Johnson", time: "5 mins ago", type: "success", icon: Users },
        { action: "Dataset uploaded", user: "Bob Smith", time: "20 mins ago", type: "info", icon: Upload },
        { action: "System alert resolved", user: "Admin", time: "1 hour ago", type: "success", icon: Shield },
        { action: "Failed login attempt", user: "Unknown", time: "2 hours ago", type: "warning", icon: Shield }
      ]);

      setLoading(false);
    }, 800);
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
    {
      label: "Add User",
      icon: Users,
      color: "blue",
      bg: "bg-blue-100",
      onClick: () => console.log("Add User clicked")
    },
    {
      label: "Upload Data",
      icon: Upload,
      color: "green",
      bg: "bg-green-100",
      onClick: () => console.log("Upload clicked")
    },
    {
      label: "Export Report",
      icon: Download,
      color: "purple",
      bg: "bg-purple-100",
      onClick: () => console.log("Export Report clicked")
    },
    {
      label: "Schedule Task",
      icon: Calendar,
      color: "orange",
      bg: "bg-orange-100",
      onClick: () => console.log("Schedule Task clicked")
    }
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
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-[1600px] mx-auto"
      >

        {/* =================== ADMIN WELCOME BANNER =================== */}
        <Card className="border-none shadow-xl bg-gradient-to-r from-red-500 to-pink-500 text-white mb-6">
          <CardContent className="p-6 flex flex-col md:flex-row justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold border border-white/30">
                {adminInfo.avatar}
              </div>

              <div>
                <h1 className="text-2xl font-bold">Welcome back, {adminInfo.name}!</h1>
                <p className="text-white/80 text-sm">{adminInfo.email}</p>

                <div className="flex gap-3 mt-2 text-sm">
                  <span className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-md">
                    <Shield className="w-4 h-4" /> {adminInfo.role}
                  </span>
                  <span className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-md">
                    <Clock className="w-4 h-4" /> Last login: {adminInfo.lastLogin}
                  </span>
                  <span className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-md">
                    <Activity className="w-4 h-4" /> {adminInfo.loginCount} logins
                  </span>
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
                className={activeTab === tab.id 
                  ? "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg"
                  : "hover:bg-red-50"}
              >
                <tab.icon className="w-4 h-4 mr-1" />
                {tab.label}
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* =================== PAGE CONTENT =================== */}
        {activeTab === "overview" && (
          <div className="grid lg:grid-cols-2 gap-6">

            {/* =================== RECENT ACTIVITY =================== */}
            <Card className="border-none shadow-xl bg-white/90 backdrop-blur-lg">
              <CardHeader className="border-b">
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-red-600" />
                  Recent Activity
                </CardTitle>
              </CardHeader>

              <CardContent className="p-6 space-y-4">
                {recentActivity.map((act, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg">
                    <div className={`w-8 h-8 flex items-center justify-center rounded-full ${
                      act.type === "success" ? "bg-green-100" :
                      act.type === "warning" ? "bg-orange-100" :
                      "bg-blue-100"
                    }`}>
                      <act.icon className="w-4 h-4" />
                    </div>

                    <div className="flex-1">
                      <p className="text-sm font-semibold">{act.action}</p>
                      <p className="text-xs text-gray-500">by {act.user}</p>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      {act.time}
                      <div className={`w-2 h-2 rounded-full ${getDotColor(act.type)}`}></div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* =================== QUICK ACTIONS =================== */}
            <Card className="border-none shadow-xl bg-white/90 backdrop-blur-lg">
              <CardHeader className="border-b">
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-purple-600" />
                  Quick Actions
                </CardTitle>
              </CardHeader>

              <CardContent className="p-6 grid grid-cols-2 gap-4">
                {quickActions.map((act, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button className="w-full h-28 flex flex-col border border-gray-300">
                      <div className={`w-12 h-12 rounded-full ${act.bg} flex items-center justify-center`}>
                        <act.icon className="w-6 h-6 text-gray-700" />
                      </div>
                      <span className="text-sm mt-2">{act.label}</span>
                    </Button>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Page Tabs */}
        {activeTab === "users" && <UserManagement />}
        {activeTab === "analytics" && <AnalyticsDashboard />}
        {activeTab === "datasets" && <DatasetManagement />}
        {activeTab === "logs" && <SystemLogs />}
        {activeTab === "feedback" && <FeedbackManagement />}

      </motion.div>
    </div>
  );
}









// import React, { useState, useEffect } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
// import { Button } from "../../../components/ui/button";
// import {
//   Shield,
//   Users,
//   Database,
//   BarChart3,
//   Activity,
//   AlertCircle,
//   TrendingUp,
//   FileText,
//   Lock,
//   Calendar
// } from "lucide-react";
// import { color, motion } from "framer-motion";

// import UserManagement from "../../../components/AdminDashboard/UserManagement";
// import AnalyticsDashboard from "../../../components/AdminDashboard/AnalyticsDashboard";
// import DatasetManagement from "../../../components/AdminDashboard/DatasetManagement";
// // import ModelPerformance from "../../../components/AdminDashboard/ModelPerformance";
// import SystemLogs from "../../../components/AdminDashboard/SystemLogs";
// import FeedbackManagement from "../../../components/AdminDashboard/FeedbackManagement";

// export default function Admin() {
//   const [activeTab, setActiveTab] = useState("overview");
//   const [isAdmin, setIsAdmin] = useState(true);
//   const [loading, setLoading] = useState(true);
//   const [stats, setStats] = useState({
//     totalUsers: 0,
//     totalTests: 0,
//     datasets: 0,
//     activeSessions: 0,
//   });

//   useEffect(() => {
//     // Simulated loading delay
//     setTimeout(() => {
//       // Mock data instead of base44 fetch
//       setStats({
//         totalUsers: 10,
//         totalTests: 30,
//         datasets: 12,
//         activeSessions: 34,
//       });
//       setIsAdmin(true);
//       setLoading(false);
//     }, 800);
//   }, []);

// if (loading) {
//   return (
//     <div className="flex items-center justify-center min-h-screen">
//       <p className="text-lg  text-gray-600">Loading...</p>
//     </div>
//   );
// }

//   const tabs = [
//     { id: "overview", label: "Overview", icon: BarChart3 },
//     { id: "users", label: "Users", icon: Users },
//     { id: "analytics", label: "Analytics", icon: TrendingUp },
//     { id: "datasets", label: "Datasets", icon: Database },
//     // { id: "models", label: "Model Performance", icon: Activity },
//     { id: "logs", label: "System Logs", icon: FileText },
//     { id: "feedback", label: "Feedback", icon: AlertCircle }
//   ];

//   const quickStats = [
//     {
//       title: "Total Users",
//       icon: Users,
//       color: "bg-gradient-to-br from-blue-500 to-blue-600",
//     },
//     {
//       title: "Total Tests",
//       icon: Activity,
//       color: "from-green-500 to-emerald-500",
//     },
//      {
//       title: "Schedule Appointment",
//       icon: Calendar,
//       color: "from-purple-500 to-purple-600",
//     },
//     {
//       title: "Active Sessions",
//       icon: TrendingUp,
//       color: "from-orange-500 to-red-500",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50/20 to-pink-50/20 p-4 lg:p-8">
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="max-w-[1600px] mx-auto"
//       >

//         {/* Quick Stats */}
//         {activeTab === "overview" && (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
//           >
//             {quickStats.map((stat, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ delay: index * 0.1 }}
//                 whileHover={{ y: -4 }}
//               >
//                 <Card className="border-none shadow-xl bg-white/90 backdrop-blur-lg hover:shadow-2xl transition-all cursor-pointer">
//                   <CardContent className="p-6">
//                     <div
//                       className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4 shadow-lg`}
//                     >
//                       <stat.icon className="w-7 h-7 text-white" />
//                     </div>
//                     <div className="text-4xl font-bold text-gray-900 mb-1">
//                       {stat.value}
//                     </div>
//                     <div className="text-sm font-medium text-gray-600">
//                       {stat.title}
//                     </div>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             ))}
//           </motion.div>
//         )}

//         {/* Navigation Tabs */}
//         <Card className="border-none shadow-xl bg-white/90 backdrop-blur-lg mb-6">
//           <CardContent className="p-4">
//             <div className="flex flex-wrap gap-2">
//               {tabs.map((tab) => (
//                 <Button
//                   key={tab.id}
//                   onClick={() => setActiveTab(tab.id)}
//                   variant={activeTab === tab.id ? "default" : "outline"}
//                   className={`flex items-center gap-2 ${
//                     activeTab === tab.id
//                       ? "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg"
//                       : "hover:bg-red-50"
//                   }`}
//                 >
//                   <tab.icon className="w-4 h-4" />
//                   {tab.label}
//                 </Button>
//               ))}
//             </div>
//           </CardContent>
//         </Card>

//         {/* Content Area */}
//         <motion.div
//           key={activeTab}
//           initial={{ opacity: 0, x: 20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.3 }}
//         >
//           {activeTab === "overview" && (
//             <div className="grid lg:grid-cols-2 gap-6">
//               <Card className="border-none shadow-xl bg-white/90 backdrop-blur-lg">
//                 <CardHeader className="border-b border-red-50">
//                   <CardTitle className="flex items-center gap-2">
//                     <Activity className="w-5 h-5 text-red-600" />
//                     Recent Activity
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="p-6 text-gray-600">
//                   System activity will be displayed here.
//                 </CardContent>
//               </Card>

//               <Card className="border-none shadow-xl bg-white/90 backdrop-blur-lg">
//                 <CardHeader className="border-b border-red-50">
//                   <CardTitle className="flex items-center gap-2">
//                     <AlertCircle className="w-5 h-5 text-orange-600" />
//                     System Alerts
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="p-6">
//                   <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
//                     <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
//                     <span className="text-sm text-green-800">
//                       All systems operational
//                     </span>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>
//           )}

//           {activeTab === "users" && <UserManagement />}
//           {activeTab === "analytics" && <AnalyticsDashboard />}
//           {activeTab === "datasets" && <DatasetManagement />}
//           {/* {activeTab === "models" && <ModelPerformance />} */}
//           {activeTab === "logs" && <SystemLogs />}
//           {activeTab === "feedback" && <FeedbackManagement />}
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// }
