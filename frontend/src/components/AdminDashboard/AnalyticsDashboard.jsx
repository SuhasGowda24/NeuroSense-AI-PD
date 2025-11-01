import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { 
  BarChart3, 
  TrendingUp, 
  Users,
  Activity,
  AlertCircle,
  CheckCircle
} from "lucide-react";
import { motion } from "framer-motion";
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";

export default function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState({
    totalTests: 0,
    riskDistribution: [],
    testsOverTime: [],
    symptomData: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      // Simulate async loading
      await new Promise((res) => setTimeout(res, 500));

      // --- Mock Data (replace later with real API) ---
      const mockSymptoms = [
        { date: "2025-10-01", tremor_severity: 5, rigidity_severity: 3, mobility_difficulty: 4, fatigue_level: 6, pain_level: 3 },
        { date: "2025-10-02", tremor_severity: 6, rigidity_severity: 4, mobility_difficulty: 5, fatigue_level: 7, pain_level: 4 },
        { date: "2025-10-03", tremor_severity: 4, rigidity_severity: 2, mobility_difficulty: 3, fatigue_level: 5, pain_level: 2 },
        { date: "2025-10-04", tremor_severity: 7, rigidity_severity: 5, mobility_difficulty: 6, fatigue_level: 8, pain_level: 5 },
      ];

      const riskDist = [
        { name: "Low Risk", value: 45, color: "#10b981" },
        { name: "Medium Risk", value: 35, color: "#f59e0b" },
        { name: "High Risk", value: 20, color: "#ef4444" }
      ];

      const testsData = mockSymptoms.reduce((acc, symptom) => {
        const date = symptom.date;
        if (date) acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {});

      const testsOverTime = Object.entries(testsData)
        .map(([date, count]) => ({ date, tests: count }));

      const symptomTypes = [
        { name: "Tremor", key: "tremor_severity" },
        { name: "Rigidity", key: "rigidity_severity" },
        { name: "Mobility", key: "mobility_difficulty" },
        { name: "Fatigue", key: "fatigue_level" },
        { name: "Pain", key: "pain_level" }
      ];

      const symptomData = symptomTypes.map(({ name, key }) => {
        const values = mockSymptoms.filter(s => s[key]).map(s => s[key]);
        const avg = values.length > 0
          ? values.reduce((a, b) => a + b, 0) / values.length
          : 0;
        return { name, average: avg.toFixed(1) };
      });

      setAnalytics({
        totalTests: mockSymptoms.length,
        riskDistribution: riskDist,
        testsOverTime,
        symptomData
      });
    } catch (error) {
      console.error("Error loading analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="border-none shadow-lg bg-gradient-to-br from-blue-500 to-indigo-500 text-white">
          <CardContent className="p-6">
            <Activity className="w-8 h-8 mb-3 opacity-80" />
            <div className="text-3xl font-bold mb-1">{analytics.totalTests}</div>
            <div className="text-blue-100">Total Tests</div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-lg bg-gradient-to-br from-green-500 to-emerald-500 text-white">
          <CardContent className="p-6">
            <CheckCircle className="w-8 h-8 mb-3 opacity-80" />
            <div className="text-3xl font-bold mb-1">
              {analytics.riskDistribution[0]?.value || 0}%
            </div>
            <div className="text-green-100">Low Risk</div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-lg bg-gradient-to-br from-yellow-500 to-orange-500 text-white">
          <CardContent className="p-6">
            <AlertCircle className="w-8 h-8 mb-3 opacity-80" />
            <div className="text-3xl font-bold mb-1">
              {analytics.riskDistribution[1]?.value || 0}%
            </div>
            <div className="text-yellow-100">Medium Risk</div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-lg bg-gradient-to-br from-red-500 to-pink-500 text-white">
          <CardContent className="p-6">
            <AlertCircle className="w-8 h-8 mb-3 opacity-80" />
            <div className="text-3xl font-bold mb-1">
              {analytics.riskDistribution[2]?.value || 0}%
            </div>
            <div className="text-red-100">High Risk</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Risk Distribution Pie Chart */}
        <Card className="border-none shadow-xl bg-white/90 backdrop-blur-lg">
          <CardHeader className="border-b border-gray-100">
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-purple-600" />
              Risk Level Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analytics.riskDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {analytics.riskDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Average Symptom Severity */}
        <Card className="border-none shadow-xl bg-white/90 backdrop-blur-lg">
          <CardHeader className="border-b border-gray-100">
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-teal-600" />
              Average Symptom Severity
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analytics.symptomData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 10]} />
                <Tooltip />
                <Bar dataKey="average" fill="#14b8a6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Tests Over Time */}
      <Card className="border-none shadow-xl bg-white/90 backdrop-blur-lg">
        <CardHeader className="border-b border-gray-100">
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            Tests Over Time (Last 30 Days)
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analytics.testsOverTime}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="tests" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Additional Insights */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-none shadow-xl bg-gradient-to-br from-purple-600 to-pink-600 text-white">
          <CardContent className="p-8">
            <h3 className="text-xl font-bold mb-4">Key Insights</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p className="text-purple-100">
                  {analytics.totalTests} symptom assessments completed
                </p>
              </div>
              <div className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p className="text-purple-100">
                  Majority of patients in low-risk category
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Activity className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p className="text-purple-100">
                  Consistent monitoring across all symptom types
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-xl bg-gradient-to-br from-orange-600 to-red-600 text-white">
          <CardContent className="p-8">
            <h3 className="text-xl font-bold mb-4">Recommendations</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p className="text-orange-100">
                  Monitor high-risk patients more frequently
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p className="text-orange-100">
                  Encourage patient engagement in symptom tracking
                </p>
              </div>
              <div className="flex items-start gap-3">
                <BarChart3 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p className="text-orange-100">
                  Continue collecting diverse dataset samples
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
