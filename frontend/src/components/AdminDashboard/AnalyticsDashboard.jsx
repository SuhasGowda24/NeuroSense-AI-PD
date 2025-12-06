import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { 
  BarChart3, 
  TrendingUp, 
  Activity,
  AlertCircle,
  CheckCircle
} from "lucide-react";
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
  const [highRiskPatients, setHighRiskPatients] = useState([]);

  // We don't actually need aiTests state for rendering yet,
  // but we'll keep it if you want to show them later.
  const [aiTests, setAiTests] = useState([]);

  useEffect(() => {
    const init = async () => {
      try {
        const aiData = await loadAiTests();     // load AI assessments
        await loadAnalytics(aiData);           // build analytics using aiData
        await loadHighRiskPatients();          // high-risk table
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  // ----------------- Load AI assessment tests -----------------
  const loadAiTests = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/predictions/all", {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!res.ok) {
        console.error("Failed to load AI tests:", res.status);
        setAiTests([]);
        return [];
      }

      const data = await res.json();
      setAiTests(data || []);
      return data || [];
    } catch (err) {
      console.error("Error loading AI tests:", err);
      setAiTests([]);
      return [];
    }
  };

  // ----------------- Load high-risk patients table -----------------
  const loadHighRiskPatients = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/symptom-logs/risk/high", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        console.error("Failed to load high-risk patients:", res.status);
        setHighRiskPatients([]);
        return;
      }

      const data = await res.json();
      setHighRiskPatients(data || []);
    } catch (err) {
      console.error("Error loading high-risk patients:", err);
      setHighRiskPatients([]);
    }
  };

  // ----------------- Main analytics (symptoms + AI tests) -----------------
  const loadAnalytics = async (aiTestsData = []) => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await fetch("/api/symptom-logs/all", {
        headers: { "Authorization": `Bearer ${token}` }
      });

      if (!res.ok) {
        console.error("Failed to load analytics:", res.status);
        setAnalytics({
          totalTests: 0,
          riskDistribution: [],
          testsOverTime: [],
          symptomData: []
        });
        return;
      }

      const symptoms = await res.json();

      // ---------------- Tests Over Time (merge symptoms + AI tests) ----------------

      // Symptom logs: treat each as 1 "test"
      const symptomTests = symptoms.map(log => ({
        date: log.date,
        tests: 1
      }));

      // AI assessments: group by date
      const aiCountsByDate = aiTestsData.reduce((acc, test) => {
        const date = new Date(test.timestamp).toISOString().split("T")[0];
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {});

      const aiTestData = Object.keys(aiCountsByDate).map(date => ({
        date,
        tests: aiCountsByDate[date]
      }));

      // Merge both sources
      const merged = [...symptomTests, ...aiTestData];

      // Group by date again to get final count
      const grouped = merged.reduce((acc, item) => {
        acc[item.date] = (acc[item.date] || 0) + item.tests;
        return acc;
      }, {});

      const testsOverTime = Object.keys(grouped).map(date => ({
        date,
        tests: grouped[date]
      }));

      // ---------------- Symptom Averages ----------------
      const symptomTypes = [
        { name: "Tremor", key: "tremor_severity" },
        { name: "Stiffness", key: "stiffness_level" },
        { name: "Mood", key: "mood_rating" },
        { name: "Sleep", key: "sleep_quality" }
      ];

      const symptomData = symptomTypes.map(({ name, key }) => {
        const values = symptoms.map(s => s[key]);
        const avg = values.length
          ? values.reduce((a, b) => a + b, 0) / values.length
          : 0;

        return { name, average: Number(avg.toFixed(1)) };
      });

      // ---------------- Risk Distribution ----------------
      const total = symptoms.length || 1;

      const highRisk = symptoms.filter(
        s => s.tremor_severity >= 7 || s.stiffness_level >= 7
      ).length;

      const mediumRisk = symptoms.filter(
        s =>
          (s.tremor_severity >= 4 && s.tremor_severity <= 6) ||
          (s.stiffness_level >= 4 && s.stiffness_level <= 6)
      ).length;

      const lowRisk = symptoms.length - highRisk - mediumRisk;

      const riskDistribution = [
        { name: "Low Risk", value: Math.round((lowRisk / total) * 100), color: "#10b981" },
        { name: "Medium Risk", value: Math.round((mediumRisk / total) * 100), color: "#f59e0b" },
        { name: "High Risk", value: Math.round((highRisk / total) * 100), color: "#ef4444" }
      ];

      // ---------------- Update State ----------------
      setAnalytics({
        totalTests: symptoms.length + aiTestsData.length, // combine
        riskDistribution,
        testsOverTime,          // ✅ always an array
        symptomData
      });

    } catch (error) {
      console.error("Error fetching analytics:", error);
      setAnalytics({
        totalTests: 0,
        riskDistribution: [],
        testsOverTime: [],
        symptomData: []
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* ====================== Overview Stats ====================== */}
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

      {/* ====================== Charts & High-Risk Table ====================== */}
      <div className="grid lg:grid-cols-2 gap-6">

        <Card className="border-none shadow-xl bg-white/90 backdrop-blur-lg">
          <CardHeader className="border-b border-gray-100">
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-purple-600" />
              Risk Level Distribution
            </CardTitle>
          </CardHeader>

          <CardContent className="p-6 space-y-6">
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={analytics.riskDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={100}
                  dataKey="value"
                >
                  {analytics.riskDistribution.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>

            <h3 className="text-lg font-semibold">High-Risk Patients</h3>

            {highRiskPatients.length === 0 ? (
              <p className="text-gray-600 text-sm">No high-risk patients currently.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b">
                      <th>User ID</th>
                      <th>Date</th>
                      <th>Tremor</th>
                      <th>Stiffness</th>
                      <th>Mood</th>
                    </tr>
                  </thead>
                  <tbody>
                    {highRiskPatients.map((p, i) => (
                      <tr key={i} className="border-b">
                        <td>{p.userId}</td>
                        <td>{p.date}</td>
                        <td>{p.tremor}</td>
                        <td>{p.stiffness}</td>
                        <td>{p.mood}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* ============ Average Symptom Severity Chart ============ */}
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

      {/* ================= Tests Over Time Chart ================= */}
      <Card className="border-none shadow-xl bg-white/90 backdrop-blur-lg">
        <CardHeader className="border-b border-gray-100">
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            Tests Over Time
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
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

