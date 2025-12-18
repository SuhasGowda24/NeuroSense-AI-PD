// import React, { useState, useEffect } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
// import { Input } from "../../components/ui/input";
// import { Badge } from "../../components/ui/badge";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
// import { 
//   FileText, 
//   Search,
//   AlertCircle,
//   Info,
//   AlertTriangle,
//   XCircle
// } from "lucide-react";
// import { motion } from "framer-motion";
// import { format } from "date-fns";

// export default function SystemLogs() {
//   const [logs, setLogs] = useState([]);
//   const [filteredLogs, setFilteredLogs] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [severityFilter, setSeverityFilter] = useState("all");
//   const [actionFilter, setActionFilter] = useState("all");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // simulate async data load
//     setTimeout(() => {
//       createSampleLogs();
//       setLoading(false);
//     }, 600);
//   }, []);

//   useEffect(() => {
//     filterLogs();
//   }, [logs, searchTerm, severityFilter, actionFilter]);

//   const createSampleLogs = () => {
//     const sampleLogs = [
//       {
//         id: 1,
//         action_type: "login",
//         description: "User logged in successfully",
//         user_email: "admin@pdcare.com",
//         severity: "info",
//         ip_address: "192.168.1.1",
//         timestamp: new Date()
//       },
//       {
//         id: 2,
//         action_type: "dataset_upload",
//         description: "New dataset uploaded: PaHaW 2024",
//         user_email: "researcher@pdcare.com",
//         severity: "info",
//         ip_address: "192.168.1.2",
//         timestamp: new Date()
//       },
//       {
//         id: 3,
//         action_type: "model_update",
//         description: "Model updated to version 2.0.0",
//         user_email: "admin@pdcare.com",
//         severity: "warning",
//         ip_address: "192.168.1.1",
//         timestamp: new Date()
//       },
//       {
//         id: 4,
//         action_type: "error",
//         description: "Failed to process handwriting sample",
//         user_email: "system",
//         severity: "error",
//         ip_address: "0.0.0.0",
//         timestamp: new Date()
//       },
//       {
//         id: 5,
//         action_type: "settings_changed",
//         description: "System threshold adjusted to 0.85",
//         user_email: "admin@pdcare.com",
//         severity: "warning",
//         ip_address: "192.168.1.1",
//         timestamp: new Date()
//       }
//     ];
//     setLogs(sampleLogs);
//   };

//   const filterLogs = () => {
//     let filtered = logs;

//     if (severityFilter !== "all") {
//       filtered = filtered.filter(l => l.severity === severityFilter);
//     }

//     if (actionFilter !== "all") {
//       filtered = filtered.filter(l => l.action_type === actionFilter);
//     }

//     if (searchTerm) {
//       filtered = filtered.filter(l =>
//         l.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         l.user_email?.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     setFilteredLogs(filtered);
//   };

//   const getSeverityIcon = (severity) => {
//     const icons = {
//       info: { icon: Info, color: "text-blue-500" },
//       warning: { icon: AlertTriangle, color: "text-yellow-500" },
//       error: { icon: AlertCircle, color: "text-red-500" },
//       critical: { icon: XCircle, color: "text-red-600" }
//     };
//     return icons[severity] || icons.info;
//   };

//   const getSeverityBadge = (severity) => {
//     const badges = {
//       info: "bg-blue-100 text-blue-700",
//       warning: "bg-yellow-100 text-yellow-700",
//       error: "bg-red-100 text-red-700",
//       critical: "bg-red-200 text-red-800"
//     };
//     return badges[severity] || badges.info;
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center py-20">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* Filters */}
//       <Card className="border-none shadow-xl bg-white/90 backdrop-blur-lg">
//         <CardContent className="p-6">
//           <div className="grid md:grid-cols-3 gap-4">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//               <Input
//                 placeholder="Search logs..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10 h-12"
//               />
//             </div>
//             <Select value={severityFilter} onValueChange={setSeverityFilter}>
//               <SelectTrigger className="h-12">
//                 <SelectValue placeholder="Filter by severity" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Severities</SelectItem>
//                 <SelectItem value="info">Info</SelectItem>
//                 <SelectItem value="warning">Warning</SelectItem>
//                 <SelectItem value="error">Error</SelectItem>
//                 <SelectItem value="critical">Critical</SelectItem>
//               </SelectContent>
//             </Select>
//             <Select value={actionFilter} onValueChange={setActionFilter}>
//               <SelectTrigger className="h-12">
//                 <SelectValue placeholder="Filter by action" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Actions</SelectItem>
//                 <SelectItem value="login">Login</SelectItem>
//                 <SelectItem value="logout">Logout</SelectItem>
//                 <SelectItem value="data_access">Data Access</SelectItem>
//                 <SelectItem value="model_update">Model Update</SelectItem>
//                 <SelectItem value="dataset_upload">Dataset Upload</SelectItem>
//                 <SelectItem value="settings_changed">Settings Changed</SelectItem>
//                 <SelectItem value="error">Error</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Log Summary Stats */}
//       <div className="grid md:grid-cols-4 gap-6">
//         <Card className="border-none shadow-lg bg-gradient-to-br from-blue-500 to-indigo-500 text-white">
//           <CardContent className="p-6">
//             <Info className="w-8 h-8 mb-3 opacity-80" />
//             <div className="text-3xl font-bold mb-1">
//               {logs.filter(l => l.severity === "info").length}
//             </div>
//             <div className="text-blue-100">Info Logs</div>
//           </CardContent>
//         </Card>

//         <Card className="border-none shadow-lg bg-gradient-to-br from-yellow-500 to-orange-500 text-white">
//           <CardContent className="p-6">
//             <AlertTriangle className="w-8 h-8 mb-3 opacity-80" />
//             <div className="text-3xl font-bold mb-1">
//               {logs.filter(l => l.severity === "warning").length}
//             </div>
//             <div className="text-yellow-100">Warnings</div>
//           </CardContent>
//         </Card>

//         <Card className="border-none shadow-lg bg-gradient-to-br from-red-500 to-pink-500 text-white">
//           <CardContent className="p-6">
//             <AlertCircle className="w-8 h-8 mb-3 opacity-80" />
//             <div className="text-3xl font-bold mb-1">
//               {logs.filter(l => l.severity === "error").length}
//             </div>
//             <div className="text-red-100">Errors</div>
//           </CardContent>
//         </Card>

//         <Card className="border-none shadow-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white">
//           <CardContent className="p-6">
//             <FileText className="w-8 h-8 mb-3 opacity-80" />
//             <div className="text-3xl font-bold mb-1">{logs.length}</div>
//             <div className="text-purple-100">Total Logs</div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Logs List */}
//       <Card className="border-none shadow-xl bg-white/90 backdrop-blur-lg">
//         <CardHeader className="border-b border-gray-100">
//           <CardTitle className="flex items-center gap-2">
//             <FileText className="w-5 h-5 text-red-600" />
//             System Activity Logs ({filteredLogs.length})
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="p-6">
//           {filteredLogs.length === 0 ? (
//             <div className="text-center py-12">
//               <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//               <p className="text-gray-600">No logs found</p>
//             </div>
//           ) : (
//             <div className="space-y-3">
//               {filteredLogs.map((log, index) => {
//                 const SeverityIcon = getSeverityIcon(log.severity).icon;
//                 const iconColor = getSeverityIcon(log.severity).color;
                
//                 return (
//                   <motion.div
//                     key={log.id}
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: index * 0.05 }}
//                     className="p-4 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all bg-white"
//                   >
//                     <div className="flex items-start gap-4">
//                       <div className={`w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0 ${iconColor}`}>
//                         <SeverityIcon className="w-5 h-5" />
//                       </div>
//                       <div className="flex-1 min-w-0">
//                         <div className="flex items-center gap-3 mb-2">
//                           <Badge className={getSeverityBadge(log.severity)}>
//                             {log.severity.toUpperCase()}
//                           </Badge>
//                           <Badge variant="outline" className="text-xs">
//                             {log.action_type}
//                           </Badge>
//                           <span className="text-xs text-gray-500">
//                             {format(new Date(log.timestamp), "MMM d, yyyy HH:mm:ss")}
//                           </span>
//                         </div>
//                         <p className="text-sm text-gray-900 font-medium mb-1">
//                           {log.description}
//                         </p>
//                         <div className="flex items-center gap-4 text-xs text-gray-500">
//                           <span>User: {log.user_email || "N/A"}</span>
//                           {log.ip_address && <span>IP: {log.ip_address}</span>}
//                         </div>
//                       </div>
//                     </div>
//                   </motion.div>
//                 );
//               })}
//             </div>
//           )}
//         </CardContent>
//       </Card>

//       {/* Compliance Notice */}
//       <Card className="border-none shadow-xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white">
//         <CardContent className="p-8">
//           <div className="flex items-start gap-4">
//             <AlertCircle className="w-12 h-12 flex-shrink-0 opacity-80" />
//             <div>
//               <h3 className="text-xl font-bold mb-2">Security & Compliance</h3>
//               <p className="text-indigo-100 leading-relaxed mb-4">
//                 All system activities are logged and monitored for security purposes. 
//                 This system complies with HIPAA and GDPR regulations for handling sensitive health data.
//               </p>
//               <div className="flex flex-wrap gap-2">
//                 <Badge className="bg-white/20 text-white border-white/30">HIPAA Compliant</Badge>
//                 <Badge className="bg-white/20 text-white border-white/30">GDPR Compliant</Badge>
//                 <Badge className="bg-white/20 text-white border-white/30">Encrypted</Badge>
//                 <Badge className="bg-white/20 text-white border-white/30">Audit Trail</Badge>
//               </div>
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
