import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent } from "../../../components/ui/card";
// import { Button } from "../../../components/ui/button";
// import { Badge } from "../../../components/ui/badge";
import {
  Brain,
  // AlertTriangle,
  // CheckCircle,
  // Download,
  // Loader2,
  Pencil,
} from "lucide-react";
// import { format, parseISO } from "date-fns";
// import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Tabs, TabsContent } from "../../../components/ui/tabs";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "../../../components/ui/dropdown";

import DrawingPad from "../../../components/PDashboard/DrawingPad";

// const riskLevelConfig = {
//   low: {
//     color: "text-green-600",
//     bg: "bg-green-50",
//     border: "border-green-200",
//     icon: CheckCircle,
//     label: "Low Risk",
//     description: "Your assessments show healthy markers with low risk indicators.",
//   },
//   moderate: {
//     color: "text-yellow-600",
//     bg: "bg-yellow-50",
//     border: "border-yellow-200",
//     icon: AlertTriangle,
//     label: "Moderate Risk",
//     description: "Some biomarkers detected. Continue monitoring and follow medical advice.",
//   },
//   high: {
//     color: "text-red-600",
//     bg: "bg-red-50",
//     border: "border-red-200",
//     icon: AlertTriangle,
//     label: "High Risk",
//     description: "Significant biomarkers detected. Please consult with your neurologist.",
//   },
// };

const assessmentTypes = [
  {
    id: "drawing",
    name: "Motor Skills Test",
    icon: Pencil,
    description: "Drawing and handwriting analysis",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
];

export default function AIAssessment() {
  const [scans, setScans] = useState([]);
  const [user, setUser] = useState({});
  // const [isDownloading, setIsDownloading] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  // Fetch user info
  useEffect(() => {
    axios
      .get("/api/me") // ← Replace with your backend user endpoint
      .then((res) => setUser(res.data))
      .catch((err) => console.error("Error fetching user:", err));
  }, []);

  // Fetch scan results
  useEffect(() => {
    axios
      .get("/api/ai-scans") // ← Replace with your backend scans endpoint
      .then((res) => setScans(res.data || []))
      .catch((err) => console.error("Error fetching scans:", err));
  }, []);

  // const latestScan = scans[0];
  // const chartData = scans
  //   .slice(0, 5)
  //   .reverse()
  //   .map((scan) => ({
  //     date: format(parseISO(scan.scan_date), "MMM d"),
  //     confidence: scan.confidence_score,
  //     risk: scan.risk_level === "low" ? 1 : scan.risk_level === "moderate" ? 2 : 3,
  //   }));

  // const generatePDFReport = async () => {
  //   setIsDownloading(true);
  //   try {
  //     const res = await axios.post("/api/generate-report", {
  //       user,
  //       latestScan,
  //       scans,
  //     });
  //     const blob = new Blob([res.data], { type: "application/pdf" });
  //     const url = window.URL.createObjectURL(blob);
  //     const link = document.createElement("a");
  //     link.href = url;
  //     link.download = `AI-Assessment-${user.full_name || "Report"}.pdf`;
  //     link.click();
  //     window.URL.revokeObjectURL(url);
  //   } catch (error) {
  //     console.error("Error generating report:", error);
  //     alert("Error generating report.");
  //   } finally {
  //     setIsDownloading(false);
  //   }
  // };

  // const downloadJSON = () => {
  //   const data = {
  //     patient: { name: user.full_name, email: user.email },
  //     generated_at: new Date().toISOString(),
  //     latest_scan: latestScan,
  //     historical_scans: scans,
  //   };
  //   const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  //   const url = window.URL.createObjectURL(blob);
  //   const link = document.createElement("a");
  //   link.href = url;
  //   link.download = `AI-Data-${format(new Date(), "yyyy-MM-dd")}.json`;
  //   link.click();
  //   window.URL.revokeObjectURL(url);
  // };

  // const downloadCSV = () => {
  //   const csv = [
  //     ["Date", "Risk Level", "Confidence"],
  //     ...scans.map((s) => [
  //       format(parseISO(s.scan_date), "yyyy-MM-dd"),
  //       s.risk_level,
  //       `${s.confidence_score}%`,
  //     ]),
  //   ]
  //     .map((row) => row.join(","))
  //     .join("\n");
  //   const blob = new Blob([csv], { type: "text/csv" });
  //   const url = window.URL.createObjectURL(blob);
  //   const link = document.createElement("a");
  //   link.href = url;
  //   link.download = `AI-History-${format(new Date(), "yyyy-MM-dd")}.csv`;
  //   link.click();
  //   window.URL.revokeObjectURL(url);
  // };

  // const config = latestScan ? riskLevelConfig[latestScan.risk_level] : null;
  // const Icon = config?.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
              <Brain className="w-8 h-8 text-indigo-600" />
              AI Health Assessment Center
            </h1>
            <p className="text-gray-600">
              Comprehensive multi-modal Parkinson's disease screening
            </p>
          </div>
{/* 
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="lg"
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                disabled={isDownloading}
              >
                {isDownloading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5 mr-2" />
                    Download Report
                  </>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={generatePDFReport}>
                <FileText className="w-4 h-4 mr-2" /> PDF Report
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */}
        </div>

        {/* Assessment Types Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {assessmentTypes.map((type) => {
            const TypeIcon = type.icon;
            return (
              <Card
                key={type.id}
                className={`${type.bg} border-none shadow-lg hover:shadow-xl transition-all cursor-pointer`}
                onClick={() => setActiveTab(type.id)}
              >
                <CardContent className="pt-6 pb-6 text-center">
                  <TypeIcon className={`w-10 h-10 ${type.color} mx-auto mb-3`} />
                  <p className="font-semibold text-gray-900 text-sm">{type.name}</p>
                  <p className="text-xs text-gray-600 mt-1">{type.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsContent value="drawing">
            <DrawingPad />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
