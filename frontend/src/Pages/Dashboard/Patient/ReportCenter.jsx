import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import {
  FileText,
  // Download,
  // Activity,
  // Pill,
  Brain,
  BarChart3,
  AlertCircle,
  Loader2,
  CheckCircle,
  FileDown
} from "lucide-react";
import { format, parseISO } from "date-fns";

// Report Categories
const reportCategories = [
  {
    id: "ai_assessment",
    name: "AI Assessment Reports",
    icon: Brain,
    color: "text-purple-600",
    bg: "bg-purple-50",
    description: "Scan results and risk predictions",
  },
  // {
  //   id: "symptom_tracking",
  //   name: "Symptom Tracking Reports",
  //   icon: Activity,
  //   color: "text-blue-600",
  //   bg: "bg-blue-50",
  //   description: "Daily symptom logs and trends",
  // },
  // {
  //   id: "medication",
  //   name: "Medication Reports",
  //   icon: Pill,
  //   color: "text-pink-600",
  //   bg: "bg-pink-50",
  //   description: "Adherence rates and side effects",
  // },
  {
    id: "comprehensive",
    name: "Comprehensive Health Report",
    icon: BarChart3,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    description: "Complete health summary for doctors",
  },
];

export default function ReportCenter() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatingType, setGeneratingType] = useState("");

  const API_BASE_URL = "http://localhost:5000/api";

  const fetchData = async (endpoint) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_BASE_URL}/${endpoint}`, {
    headers: { "Authorization": `Bearer ${token}` }
  });
  if (!res.ok) throw new Error(`Failed to fetch ${endpoint}`);
  return res.json();
};

  // Queries
  const { data: user = {} } = useQuery({
    queryKey: ["currentUser"],
    queryFn: () => fetchData("profile/me"),
  });

  const { data: aiScans = [] } = useQuery({
    queryKey: ["aiScans"],
    queryFn: () => fetchData("ai-scan-results"),
  });

  const { data: symptomLogs = [] } = useQuery({
    queryKey: ["symptomLogs"],
    queryFn: () => fetchData("symptom-logs"),
  });

  const { data: medications = [] } = useQuery({
    queryKey: ["medications"],
    queryFn: () => fetchData("medications"),
  });

  const { data: journeys = [] } = useQuery({
  queryKey: ["journeys"],
  queryFn: () => fetchData("journey"),
});


  // Report Generator 
  const generateHTMLReport = (reportType, content) => {
    return `
<!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>${reportType} - ${user.userId?.username || 'Patient'}</title>
       <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333;
      background: white;
      padding: 40px;
      max-width: 900px;
      margin: 0 auto;
    }
    .header {
      text-align: center;
      border-bottom: 4px solid #4f46e5;
      padding-bottom: 25px;
      margin-bottom: 40px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 30px;
      border-radius: 10px;
    }
    .header h1 {
      font-size: 32px;
      margin-bottom: 10px;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
    }
    .header p {
      font-size: 16px;
      opacity: 0.95;
    }
    .patient-info {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 8px;
      margin-bottom: 30px;
      border-left: 4px solid #4f46e5;
    }
    .patient-info h2 {
      color: #4f46e5;
      margin-bottom: 15px;
      font-size: 20px;
    }
    .info-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 15px;
    }
    .info-item {
      padding: 10px;
      background: white;
      border-radius: 6px;
      border: 1px solid #e5e7eb;
    }
    .info-label {
      font-weight: 600;
      color: #6b7280;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .info-value {
      color: #111827;
      font-size: 16px;
      margin-top: 5px;
    }
    .section {
      margin-bottom: 35px;
      page-break-inside: avoid;
    }
    .section h2 {
      color: #4f46e5;
      border-bottom: 2px solid #e5e7eb;
      padding-bottom: 12px;
      margin-bottom: 20px;
      font-size: 22px;
    }
    .risk-badge {
      display: inline-block;
      padding: 8px 20px;
      border-radius: 25px;
      font-weight: bold;
      font-size: 14px;
      margin: 10px 0;
    }
    .risk-low { background: #dcfce7; color: #166534; }
    .risk-moderate { background: #fef3c7; color: #92400e; }
    .risk-high { background: #fee2e2; color: #991b1b; }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
      background: white;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
    th {
      background: #4f46e5;
      color: white;
      padding: 12px;
      text-align: left;
      font-weight: 600;
      font-size: 14px;
    }
    td {
      padding: 12px;
      border-bottom: 1px solid #e5e7eb;
      font-size: 14px;
    }
    tr:hover { background: #f9fafb; }
    .chart-container {
      background: #f9fafb;
      padding: 20px;
      border-radius: 8px;
      margin: 20px 0;
    }
    .stat-box {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 20px;
      border-radius: 10px;
      text-align: center;
      margin: 10px 0;
    }
    .stat-box .number {
      font-size: 36px;
      font-weight: bold;
      margin-bottom: 5px;
    }
    .stat-box .label {
      font-size: 14px;
      opacity: 0.9;
    }
    .alert {
      padding: 15px;
      border-radius: 8px;
      margin: 20px 0;
      border-left: 4px solid;
    }
    .alert-warning {
      background: #fef3c7;
      border-color: #f59e0b;
      color: #92400e;
    }
    .alert-info {
      background: #dbeafe;
      border-color: #3b82f6;
      color: #1e40af;
    }
    .footer {
      margin-top: 50px;
      padding-top: 25px;
      border-top: 2px solid #e5e7eb;
      text-align: center;
      color: #6b7280;
      font-size: 12px;
    }
    .disclaimer {
      background: #fef3c7;
      border: 2px solid #f59e0b;
      padding: 20px;
      border-radius: 8px;
      margin: 30px 0;
    }
    .disclaimer h3 {
      color: #92400e;
      margin-bottom: 10px;
    }
    @media print {
      body { padding: 20px; }
      .section { page-break-inside: avoid; }
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>🏥 ${reportType}</h1>
    <p><strong>PD Care Health Platform</strong></p>
    <p>Generated on ${format(new Date(), 'MMMM d, yyyy \'at\' h:mm a')}</p>
  </div>

  <div class="patient-info">
    <h2>Patient Information</h2>
    <div class="info-grid">
      <div class="info-item">
        <div class="info-label">Patient Name</div>
        <div class="info-value">${user.userId?.username || 'Patient'}</div>
      </div>
      <div class="info-item">
        <div class="info-label">Email</div>
        <div class="info-value">${user.userId?.email || 'N/A'}</div>
      </div>
      <div class="info-item">
        <div class="info-label">Report ID</div>
        <div class="info-value">#${Date.now().toString(36).toUpperCase()}</div>
      </div>
      <div class="info-item">
        <div class="info-label">Report Date</div>
        <div class="info-value">${format(new Date(), 'MMM d, yyyy')}</div>
      </div>
    </div>
  </div>
  
  ${content}

  <div class="disclaimer">
    <h3>⚠️ Important Medical Disclaimer</h3>
    <p>This report is generated for informational purposes only and should not be used as a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay in seeking it because of something you have read in this report.</p>
  </div>

  <div class="footer">
    <p><strong>PD Care - NeuroSense : AI Driven Parkinson Disease Health Management Platform</strong></p>
    <p>Confidential Medical Document | © ${new Date().getFullYear()} | All Rights Reserved</p>
    <p>This document contains sensitive health information protected</p>
  </div>
</body>
</html>`;
  };

  // Download Helper
  const downloadHTML = (htmlContent, filename) => {
    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Generate AI Report Example 
  const generateAIAssessmentReport = async () => {
    setIsGenerating(true);
    setGeneratingType("ai_assessment");
    try {
      const latestScan = aiScans[0];
      const content = latestScan
        ? `
        <h2>AI Assessment</h2>
        <p><strong>Risk:</strong> <span class="risk-${latestScan.risk_level}">${latestScan.risk_level}</span></p>
        <p><strong>Confidence:</strong> ${latestScan.confidence_score}%</p>
        `
        : "<p>No AI scan data found.</p>";

      const html = generateHTMLReport("AI Assessment Report", content);
      downloadHTML(html, "AI-Assessment-Report.html");
    } catch (err) {
      console.error(err);
      alert("Error generating report");
    } finally {
      setIsGenerating(false);
      setGeneratingType("");
    }
  };

  // Comprehensive Health Report 
  const generateComprehensiveReport = async () => {
  setIsGenerating(true);
  setGeneratingType('comprehensive');

  try {
    const latestScan = aiScans[0];
    const recentSymptoms = symptomLogs.slice(0, 7); // Changed to last 7 days
    // const adherenceRate = medicationLogs.length > 0
    //   ? Math.round((medicationLogs.filter(log => log.taken).length / medicationLogs.length) * 100)
    //   : 0;
    const reportId = `RPT-${Date.now()}`; // Generate unique report ID
    const reportDate = format(new Date(), 'MMMM d, yyyy'); // Report date

    const content = `
  <div class="section">
    <h2>Comprehensive Health Summary</h2>
    <p>This comprehensive report includes all health data from the PD Companion platform for ${user.userId?.username || 'N/A'}.</p>
  </div>

  <div class="section">
    <h2>Report Details</h2>
    <p><strong>Patient Name:</strong> ${user.userId?.username || 'N/A'}</p>
    <p><strong>Email:</strong> ${user.userId?.email || 'N/A'}</p>
    <p><strong>Report ID:</strong> ${reportId}</p>
    <p><strong>Report Date:</strong> ${reportDate}</p>
  </div>

  <div class="section">
    <h2>1. AI Assessment Status</h2>
    ${latestScan ? `
      <p><strong>Latest Scan:</strong> ${format(parseISO(latestScan.scan_date), 'MMMM d, yyyy')}</p>
      <p><strong>Risk Level:</strong> <span class="risk-badge risk-${latestScan.risk_level}">${latestScan.risk_level.toUpperCase()}</span></p>
      <p><strong>Confidence:</strong> ${latestScan.confidence_score}%</p>
      <p><strong>Total Scans:</strong> ${aiScans.length}</p>
    ` : '<p>No AI assessment data available.</p>'}
  </div>

  <div class="section">
    <h2>2. Symptom Tracking (Last 7 Days)</h2>
    <table>
      <tr>
        <th>Date</th>
        <th>Tremor Severity</th>
        <th>Muscle Stiffness</th>
        <th>Mood & Energy</th>
        <th>Sleep Quality</th>
      </tr>
      ${recentSymptoms.map(log => `
      <tr>
        <td>${format(parseISO(log.date), 'MMM d, yyyy')}</td>
        <td>${log.tremor_severity || 'N/A'}</td>
        <td>${log.stiffness_level || 'N/A'}</td>
        <td>${log.mood_rating || 'N/A'}</td>
        <td>${log.sleep_quality || 'N/A'}</td>
      </tr>`
        )
        .join('')}
    </table>
  </div>

  <div class="section">
    <h2>3. Current Medications</h2>
    <p><strong>Active Medications:</strong> ${medications.filter(m => m.is_active).length}</p>
    <table>
      <tr>
        <th>Medication</th>
        <th>Dosage</th>
        <th>Frequency</th>
      </tr>
      ${medications.filter(m => m.is_active).map(med => `
      <tr>
        <td>${med.name}</td>
        <td>${med.dosage}</td>
        <td>${med.frequency}</td>
      </tr>`).join('')}
    </table>
  </div>

<div class="section">
  <h2>4. Journey Timeline</h2>
  <p><strong>Total Journey Events:</strong> ${journeys.length}</p>
  ${journeys.length > 0 ? journeys.map(journey => `
  <div style="background: #f9fafb; padding: 15px; border-radius: 8px; margin-bottom: 10px; border-left: 4px solid #4f46e5;">
    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
      <strong style="color: #4f46e5;">${journey.title}</strong>
      <span style="background: #e0e7ff; color: #3730a3; padding: 4px 8px; border-radius: 12px; font-size: 12px; font-weight: 600;">
        ${journey.eventType || 'Event'}
      </span>
    </div>
    <div style="color: #6b7280; font-size: 14px; margin-bottom: 8px;">
      <strong>Date:</strong> ${format(parseISO(journey.date), 'MMM d, yyyy')} | 
      <strong>Significance:</strong> ${journey.significantLevel || 'N/A'}
    </div>
    <p style="margin: 0; color: #374151; line-height: 1.5;">
      ${journey.description || 'No description provided.'}
    </p>
  </div>`).join('') : '<p>No journey events recorded yet.</p>'}
</div>


  <div class="section">
    <h2>Clinical Recommendations</h2>
    <ul style="line-height: 2;">
      <li>Continue regular symptom tracking and medication adherence</li>
      <li>Schedule follow-up appointments as recommended by your healthcare provider</li>
      <li>Maintain regular exercise routine to manage symptoms</li>
      <li>Consider joining support groups for additional emotional support</li>
      <li>Keep this report updated and share with your medical team</li>
    </ul>
  </div>
`;

    const html = generateHTMLReport('Comprehensive Health Report', content);
    downloadHTML(html, `Comprehensive-Health-Report-${format(new Date(), 'yyyy-MM-dd')}.html`);
  } catch (error) {
    console.error('Error:', error);
    alert('Error generating report. Please try again.');
  } finally {
    setIsGenerating(false);
    setGeneratingType('');
  }
};

  // Choose correct generator 
const getReportFunction = (id) => {
  switch (id) {
    case "ai_assessment":
      return generateAIAssessmentReport;
    case "comprehensive":
      return generateComprehensiveReport;
    default:
      return null;
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <FileText className="w-8 h-8 text-indigo-600" />
            Report Center
          </h1>
          <p className="text-gray-600">Generate and download comprehensive health reports</p>
        </div>

        {/* Report Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reportCategories.map((category) => {
            const Icon = category.icon;
            const reportFn = getReportFunction(category.id);
            const isCurrent = isGenerating && generatingType === category.id;

            return (
              <Card key={category.id} className={`${category.bg} border-none shadow-lg hover:shadow-xl transition-all`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-lg">
                      <Icon className={`w-6 h-6 ${category.color}`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{category.name}</h3>
                      <p className="text-xs text-gray-600 font-normal">{category.description}</p>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                    onClick={reportFn}
                    disabled={isGenerating || !reportFn}
                  >
                    {isCurrent ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Generating...
                      </>
                    ) : (
                      <>
                        <FileDown className="w-4 h-4 mr-2" /> Generate Report
                      </>
                    )}
                  </Button>
                   <div className="pt-2 border-t border-gray-200">
                    <p className="text-xs text-gray-600">
                      <CheckCircle className="w-3 h-3 inline mr-1 text-green-600" />
                      Last updated: {format(new Date(), 'MMM d, yyyy')}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
            {/* Privacy Notice */}
        <Card className="mt-6 bg-yellow-50 border-2 border-yellow-200">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-yellow-900 mb-1">Privacy & Security Notice</h4>
                <p className="text-sm text-yellow-800">
                  All reports contain sensitive health information. Store them securely and only share with authorized healthcare providers.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
