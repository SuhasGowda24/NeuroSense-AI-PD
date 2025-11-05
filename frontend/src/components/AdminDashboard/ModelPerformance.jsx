// import React, { useState, useEffect } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
// import { Button } from "../../components/ui/button";
// import { Badge } from "../../components/ui/badge";
// import {
//   Activity,
//   TrendingUp,
//   CheckCircle,
//   AlertCircle,
//   RefreshCw,
//   Award,
// } from "lucide-react";
// import { motion } from "framer-motion";
// import { format } from "date-fns";
// import {
//   LineChart,
//   Line,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   RadarChart,
//   PolarGrid,
//   PolarAngleAxis,
//   PolarRadiusAxis,
//   Radar,
// } from "recharts";

// export default function ModelPerformance() {
//   const [models, setModels] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadSampleModels();
//   }, []);

//   const loadSampleModels = () => {
//     const sampleModels = [
//       {
//         id: 1,
//         model_version: "v1.0.0",
//         dataset_used: "PaHaW Dataset",
//         accuracy: 0.87,
//         precision: 0.85,
//         recall: 0.89,
//         f1_score: 0.87,
//         test_samples: 500,
//         is_active: false,
//         evaluation_date: "2025-06-15",
//         confusion_matrix: {
//           true_positive: 178,
//           false_positive: 22,
//           true_negative: 258,
//           false_negative: 42,
//         },
//       },
//       {
//         id: 2,
//         model_version: "v1.1.0",
//         dataset_used: "PaHaW + Arabic Dataset",
//         accuracy: 0.91,
//         precision: 0.89,
//         recall: 0.93,
//         f1_score: 0.91,
//         test_samples: 750,
//         is_active: false,
//         evaluation_date: "2025-08-02",
//         confusion_matrix: {
//           true_positive: 348,
//           false_positive: 27,
//           true_negative: 328,
//           false_negative: 47,
//         },
//       },
//       {
//         id: 3,
//         model_version: "v2.0.0",
//         dataset_used: "Combined + User Samples",
//         accuracy: 0.94,
//         precision: 0.93,
//         recall: 0.95,
//         f1_score: 0.94,
//         test_samples: 1000,
//         is_active: true,
//         evaluation_date: "2025-10-20",
//         confusion_matrix: {
//           true_positive: 475,
//           false_positive: 25,
//           true_negative: 445,
//           false_negative: 55,
//         },
//       },
//     ];

//     setModels(sampleModels);
//     setLoading(false);
//   };

//   const setActiveModel = (modelId) => {
//     const updated = models.map((m) => ({
//       ...m,
//       is_active: m.id === modelId,
//     }));
//     setModels(updated);
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center py-20">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
//       </div>
//     );
//   }

//   const activeModel = models.find((m) => m.is_active);

//   const comparisonData = models.map((m) => ({
//     version: m.model_version,
//     accuracy: (m.accuracy * 100).toFixed(1),
//     precision: (m.precision * 100).toFixed(1),
//     recall: (m.recall * 100).toFixed(1),
//     f1: (m.f1_score * 100).toFixed(1),
//   }));

//   const radarData = activeModel
//     ? [
//         { metric: "Accuracy", value: (activeModel.accuracy * 100).toFixed(0) },
//         { metric: "Precision", value: (activeModel.precision * 100).toFixed(0) },
//         { metric: "Recall", value: (activeModel.recall * 100).toFixed(0) },
//         { metric: "F1 Score", value: (activeModel.f1_score * 100).toFixed(0) },
//       ]
//     : [];

//   return (
//     <div className="space-y-6">
//       {/* Active Model Overview */}
//       {activeModel && (
//         <Card className="border-none shadow-xl bg-gradient-to-br from-green-600 to-emerald-600 text-white">
//           <CardContent className="p-8">
//             <div className="flex items-start justify-between mb-6">
//               <div>
//                 <Badge className="bg-white/20 border-white/30 text-white mb-3">
//                   ACTIVE MODEL
//                 </Badge>
//                 <h2 className="text-3xl font-bold mb-2">
//                   {activeModel.model_version}
//                 </h2>
//                 <p className="text-green-100">
//                   Dataset: {activeModel.dataset_used}
//                 </p>
//               </div>
//               <Award className="w-16 h-16 opacity-50" />
//             </div>

//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//               {[
//                 ["Accuracy", activeModel.accuracy],
//                 ["Precision", activeModel.precision],
//                 ["Recall", activeModel.recall],
//                 ["F1 Score", activeModel.f1_score],
//               ].map(([label, value]) => (
//                 <div
//                   key={label}
//                   className="bg-white/10 rounded-lg p-4 backdrop-blur-sm"
//                 >
//                   <div className="text-2xl font-bold mb-1">
//                     {(value * 100).toFixed(1)}%
//                   </div>
//                   <div className="text-green-100 text-sm">{label}</div>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//       )}

//       {/* Model Comparison Chart */}
//       <Card className="border-none shadow-xl bg-white/90 backdrop-blur-lg">
//         <CardHeader className="border-b border-gray-100">
//           <CardTitle className="flex items-center gap-2">
//             <TrendingUp className="w-5 h-5 text-blue-600" />
//             Model Performance Comparison
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="p-6">
//           <ResponsiveContainer width="100%" height={350}>
//             <BarChart data={comparisonData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="version" />
//               <YAxis domain={[0, 100]} />
//               <Tooltip />
//               <Legend />
//               <Bar dataKey="accuracy" fill="#3b82f6" name="Accuracy %" />
//               <Bar dataKey="precision" fill="#10b981" name="Precision %" />
//               <Bar dataKey="recall" fill="#f59e0b" name="Recall %" />
//               <Bar dataKey="f1" fill="#8b5cf6" name="F1 Score %" />
//             </BarChart>
//           </ResponsiveContainer>
//         </CardContent>
//       </Card>

//       <div className="grid lg:grid-cols-2 gap-6">
//         {/* Radar Chart */}
//         {activeModel && (
//           <Card className="border-none shadow-xl bg-white/90 backdrop-blur-lg">
//             <CardHeader className="border-b border-gray-100">
//               <CardTitle className="flex items-center gap-2">
//                 <Activity className="w-5 h-5 text-purple-600" />
//                 Active Model Metrics
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="p-6">
//               <ResponsiveContainer width="100%" height={300}>
//                 <RadarChart data={radarData}>
//                   <PolarGrid />
//                   <PolarAngleAxis dataKey="metric" />
//                   <PolarRadiusAxis domain={[0, 100]} />
//                   <Radar
//                     name="Performance"
//                     dataKey="value"
//                     stroke="#8b5cf6"
//                     fill="#8b5cf6"
//                     fillOpacity={0.6}
//                   />
//                   <Tooltip />
//                 </RadarChart>
//               </ResponsiveContainer>
//             </CardContent>
//           </Card>
//         )}

//         {/* Confusion Matrix */}
//         {activeModel && activeModel.confusion_matrix && (
//           <Card className="border-none shadow-xl bg-white/90 backdrop-blur-lg">
//             <CardHeader className="border-b border-gray-100">
//               <CardTitle className="flex items-center gap-2">
//                 <CheckCircle className="w-5 h-5 text-green-600" />
//                 Confusion Matrix
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="p-6">
//               <div className="grid grid-cols-2 gap-4">
//                 {Object.entries(activeModel.confusion_matrix).map(
//                   ([key, value]) => {
//                     const isPositive = key.includes("true");
//                     const label = key
//                       .split("_")
//                       .map((w) => w[0].toUpperCase() + w.slice(1))
//                       .join(" ");
//                     return (
//                       <div
//                         key={key}
//                         className={`rounded-xl p-6 text-center border-2 ${
//                           isPositive
//                             ? "bg-green-50 border-green-200 text-green-700"
//                             : "bg-red-50 border-red-200 text-red-700"
//                         }`}
//                       >
//                         <div className="text-3xl font-bold mb-2">{value}</div>
//                         <div className="text-sm font-medium">{label}</div>
//                       </div>
//                     );
//                   }
//                 )}
//               </div>
//             </CardContent>
//           </Card>
//         )}
//       </div>

//       {/* All Models List */}
//       <Card className="border-none shadow-xl bg-white/90 backdrop-blur-lg">
//         <CardHeader className="border-b border-gray-100">
//           <CardTitle>All Model Versions</CardTitle>
//         </CardHeader>
//         <CardContent className="p-6">
//           <div className="space-y-4">
//             {models.map((model, index) => (
//               <motion.div
//                 key={model.id}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.1 }}
//                 className={`p-6 rounded-xl border-2 transition-all ${
//                   model.is_active
//                     ? "border-green-500 bg-green-50"
//                     : "border-gray-200 bg-white hover:border-gray-300"
//                 }`}
//               >
//                 <div className="flex items-start justify-between mb-4">
//                   <div>
//                     <div className="flex items-center gap-3 mb-2">
//                       <h3 className="text-xl font-bold text-gray-900">
//                         {model.model_version}
//                       </h3>
//                       {model.is_active && (
//                         <Badge className="bg-green-600">
//                           <CheckCircle className="w-3 h-3 mr-1" />
//                           ACTIVE
//                         </Badge>
//                       )}
//                     </div>
//                     <p className="text-sm text-gray-600">
//                       Dataset: {model.dataset_used} • {model.test_samples} test samples
//                     </p>
//                     {model.evaluation_date && (
//                       <p className="text-xs text-gray-500 mt-1">
//                         Evaluated:{" "}
//                         {format(new Date(model.evaluation_date), "MMM d, yyyy")}
//                       </p>
//                     )}
//                   </div>
//                   {!model.is_active && (
//                     <Button
//                       onClick={() => setActiveModel(model.id)}
//                       className="bg-gradient-to-r from-green-600 to-emerald-600"
//                     >
//                       <RefreshCw className="w-4 h-4 mr-2" />
//                       Set as Active
//                     </Button>
//                   )}
//                 </div>

//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//                   <Metric label="Accuracy" value={model.accuracy} color="blue" />
//                   <Metric label="Precision" value={model.precision} color="green" />
//                   <Metric label="Recall" value={model.recall} color="yellow" />
//                   <Metric label="F1 Score" value={model.f1_score} color="purple" />
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// function Metric({ label, value, color }) {
//   return (
//     <div
//       className={`bg-${color}-50 rounded-lg p-3 border border-${color}-200`}
//     >
//       <div className={`text-lg font-bold text-${color}-700`}>
//         {(value * 100).toFixed(1)}%
//       </div>
//       <div className={`text-xs text-${color}-600`}>{label}</div>
//     </div>
//   );
// }
