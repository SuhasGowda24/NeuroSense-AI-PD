import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function PatientReportAdmin() {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  const reportRef = useRef();

  const API = "http://localhost:5000/api";

  useEffect(() => {
    async function load() {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(`${API}/admin/patient/${userId}/report`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error("Report Load Error:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [userId]);

  // PDF EXPORT
  const exportPDF = async () => {
    const element = reportRef.current;

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const imgHeight = (canvas.height * pageWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, pageWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position -= pageHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, pageWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(`Patient-Report-${data.user.username}.pdf`);
  };

  if (loading)
    return (
      <div className="flex justify-center py-40">
        <Loader2 className="w-12 h-12 animate-spin text-indigo-600" />
      </div>
    );

  if (!data || !data.user)
    return <p className="text-center text-gray-600 mt-20">User not found.</p>;

  const { user, predictions, symptoms, medications, journey } = data;

  return (
    <div className="p-6 md:p-10">
      <button
        onClick={() => navigate("/admindashboard")}
        className="mb-6 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
      >
        ← Back
      </button>

      {/* PDF EXPORT BUTTON */}
      <button
        onClick={exportPDF}
        className="mb-6 ml-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Download PDF
      </button>

      {/* REPORT CONTENT */}
      <div
        ref={reportRef}
        className="bg-white shadow-xl mx-auto p-10 max-w-4xl border border-gray-200 rounded-lg"
      >
        {/* HEADER */}
        <div className="text-center border-b pb-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Comprehensive Health Report</h1>
          <p className="text-gray-500 mt-2">
            Generated on: {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* PATIENT INFO */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Patient Information</h2>
          <div className="grid grid-cols-2 gap-4 text-gray-700">
            <p><strong>Name:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Registered:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
          </div>
        </section>

        {/* AI PREDICTION */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Latest AI Assessment</h2>

          {predictions.length > 0 ? (
            <div className="border p-4 rounded-lg bg-gray-50">
              <p><strong>Prediction:</strong> {predictions[0].prediction}</p>
              <p><strong>Date:</strong> {new Date(predictions[0].timestamp).toLocaleString()}</p>

              {predictions[0].overlay_url && (
                <img
                  src={predictions[0].overlay_url}
                  className="mt-4 w-60 rounded shadow"
                  alt="AI overlay"
                />
              )}
            </div>
          ) : (
            <p className="text-gray-500">No prediction available.</p>
          )}
        </section>

        {/* SYMPTOM LOGS */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Symptoms</h2>

          {symptoms.length === 0 ? (
            <p className="text-gray-500">No symptom logs recorded.</p>
          ) : (
            <table className="w-full border-collapse border text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-2">Date</th>
                  <th className="border p-2">Tremor</th>
                  <th className="border p-2">Stiffness</th>
                  <th className="border p-2">Mood</th>
                  <th className="border p-2">Sleep</th>
                </tr>
              </thead>
              <tbody>
                {symptoms.slice(0, 10).map((log, i) => (
                  <tr key={i}>
                    <td className="border p-2">{log.date}</td>
                    <td className="border p-2">{log.tremor_severity}</td>
                    <td className="border p-2">{log.stiffness_level}</td>
                    <td className="border p-2">{log.mood_rating}</td>
                    <td className="border p-2">{log.sleep_quality}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        {/* MEDICATIONS */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Medications</h2>

          {medications.length === 0 ? (
            <p className="text-gray-500">No medications listed.</p>
          ) : (
            medications.map((med) => (
              <p key={med._id} className="text-gray-700">
                <strong>{med.name}</strong> — {med.dosage} ({med.frequency})
              </p>
            ))
          )}
        </section>

        {/* JOURNEY */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Patient Journey</h2>

          {journey.length === 0 ? (
            <p className="text-gray-500">No journey entries available.</p>
          ) : (
            journey.map((ev, idx) => (
              <div key={idx} className="mb-3 p-3 bg-gray-100 rounded-lg">
                <h4 className="font-semibold">{ev.title}</h4>
                <p className="text-sm text-gray-600">{ev.date}</p>
                <p className="text-gray-700">{ev.description}</p>
              </div>
            ))
          )}
        </section>

        {/* DISCLAIMER */}
        <section className="mt-10 text-gray-500 text-sm border-t pt-4">
          <p>
            This report is generated for clinical support purposes. It should not be used as a substitute 
            for a professional medical diagnosis.
          </p>
        </section>

      </div>
    </div>
  );
}










// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
// import { Button } from "../../../components/ui/button";
// import { Loader2, FileDown, Brain, Activity, Pill, BarChart3 } from "lucide-react";
// import { format, parseISO } from "date-fns";

// export default function PatientReportAdmin() {
//   const { userId } = useParams();
//   const [loading, setLoading] = useState(true);
//   const [profile, setProfile] = useState(null);
//   const [symptoms, setSymptoms] = useState([]);
//   const [aiReport, setAiReport] = useState(null);
//   const [medications, setMedications] = useState([]);
//   const [journey, setJourney] = useState([]);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();
  
//   // Use env variable or fallback
//   const API = process.env.REACT_APP_API_BASE || "http://localhost:5000/api";

//   useEffect(() => {
//     let mounted = true;
//     async function load() {
//       setLoading(true);
//       setError(null);
//       try {
//         const token = localStorage.getItem("token");
//         const res = await fetch(`${API}/admin/patient/${userId}/report`, {
//           headers: { Authorization: `Bearer ${token}` }
//         });

//         if (!res.ok) {
//           const txt = await res.text().catch(() => null);
//           throw new Error(`Server error: ${res.status} ${txt || res.statusText}`);
//         }

//         const data = await res.json();

//         if (!mounted) return;

//         // Defensive normalization
//         setProfile(data.user || null);
//         setSymptoms(Array.isArray(data.symptoms) ? data.symptoms : []);
//         setMedications(Array.isArray(data.medications) ? data.medications : []);
//         setJourney(Array.isArray(data.journey) ? data.journey : []);
//         setAiReport(Array.isArray(data.predictions) && data.predictions.length ? data.predictions[0] : null);

//       } catch (err) {
//         console.error("Report load error:", err);
//         if (mounted) setError(err.message || "Failed to load report");
//       } finally {
//         if (mounted) setLoading(false);
//       }
//     }
//     load();
//     return () => { mounted = false; };
//   }, [userId, API]);

//   if (loading) {
//     return (
//       <div className="flex justify-center py-40">
//         <Loader2 className="w-12 h-12 animate-spin text-indigo-600" />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-center py-20 text-red-600">
//         <p className="mb-3">Error loading report:</p>
//         <pre className="text-sm text-left inline-block p-3 bg-red-50 rounded">{error}</pre>
//       </div>
//     );
//   }

//   if (!profile) {
//     return <p className="text-center text-gray-600 mt-20">User not found.</p>;
//   }

//   // helper for safe date formatting
//   const safeFormat = (dateStr, fmt = "PPP") => {
//     try {
//       if (!dateStr) return "N/A";
//       return format(new Date(dateStr), fmt);
//     } catch {
//       try { return format(parseISO(dateStr), fmt); } catch { return "Invalid date"; }
//     }
//   };

//   return (
//     <div className="p-8 space-y-8">
//       <Button onClick={() => navigate("/admindashboard")} className="mb-4 bg-gray-200 hover:bg-gray-300 text-gray-800">
//         ← Back
//       </Button>

//       <Card className="shadow-lg border-none">
//         <CardContent className="p-6">
//           <h1 className="text-3xl font-bold text-gray-900">Patient Full Report</h1>
//           <p className="text-gray-600 mt-1">
//             Viewing report for <strong>{profile.username || profile.name || profile.email || "Unknown"}</strong>
//           </p>
//         </CardContent>
//       </Card>

//       <Card className="shadow-md">
//         <CardHeader>
//           <CardTitle>Patient Information</CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-3">
//           <p><strong>Name:</strong> {profile.username || profile.name || "N/A"}</p>
//           <p><strong>Email:</strong> {profile.email || "N/A"}</p>
//           <p><strong>Registered:</strong> {safeFormat(profile.createdAt || profile.created_date)}</p>
//         </CardContent>
//       </Card>

//       <Card className="shadow-md">
//         <CardHeader className="flex items-center gap-2">
//           <Brain className="text-purple-600" />
//           <CardTitle>Latest AI Assessment</CardTitle>
//         </CardHeader>
//         <CardContent>
//           {aiReport ? (
//             <>
//               <p><strong>Prediction:</strong> {aiReport.prediction ?? aiReport.result ?? "N/A"}</p>
//               <p><strong>Date:</strong> {safeFormat(aiReport.timestamp || aiReport.createdAt)}</p>
//               { (aiReport.overlay_url || aiReport.overlayUrl) && (
//                 <img src={aiReport.overlay_url || aiReport.overlayUrl} alt="overlay" className="w-60 rounded-lg shadow-md mt-3" />
//               )}
//             </>
//           ) : (
//             <p className="text-gray-500">No AI assessment found.</p>
//           )}
//         </CardContent>
//       </Card>

//       <Card className="shadow-md">
//         <CardHeader className="flex items-center gap-2">
//           <Activity className="text-blue-600" />
//           <CardTitle>Symptom Logs (Recent)</CardTitle>
//         </CardHeader>
//         <CardContent>
//           {symptoms.length === 0 ? (
//             <p className="text-gray-500">No symptoms recorded.</p>
//           ) : (
//             <table className="w-full text-left mt-3">
//               <thead>
//                 <tr>
//                   <th>Date</th>
//                   <th>Tremor</th>
//                   <th>Stiffness</th>
//                   <th>Mood</th>
//                   <th>Sleep</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {symptoms.slice(0, 7).map((log, i) => (
//                   <tr key={log._id ?? i}>
//                     <td>{safeFormat(log.date)}</td>
//                     <td>{log.tremor_severity ?? log.tremor ?? "N/A"}</td>
//                     <td>{log.stiffness_level ?? log.stiffness ?? "N/A"}</td>
//                     <td>{log.mood_rating ?? log.mood ?? "N/A"}</td>
//                     <td>{log.sleep_quality ?? log.sleep ?? "N/A"}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </CardContent>
//       </Card>

//       <Card className="shadow-md">
//         <CardHeader className="flex items-center gap-2">
//           <Pill className="text-green-600" />
//           <CardTitle>Medications</CardTitle>
//         </CardHeader>
//         <CardContent>
//           {medications.length === 0 ? (
//             <p className="text-gray-500">No medications found.</p>
//           ) : (
//             medications.map((m) => (
//               <p key={m._id}><strong>{m.name || "Unnamed"}</strong> — {m.dosage || "—"} ({m.frequency || "—"})</p>
//             ))
//           )}
//         </CardContent>
//       </Card>

//       <Card className="shadow-md">
//         <CardHeader className="flex items-center gap-2">
//           <BarChart3 className="text-orange-600" />
//           <CardTitle>Patient Journey</CardTitle>
//         </CardHeader>
//         <CardContent>
//           {journey.length === 0 ? (
//             <p className="text-gray-500">No journey entries available.</p>
//           ) : (
//             journey.map((j, i) => (
//               <div key={j._id ?? i} className="mb-3 p-3 bg-gray-100 rounded-lg">
//                 <strong>{j.title || "Untitled"}</strong>
//                 <p className="text-sm">{safeFormat(j.date)}</p>
//                 <p className="text-gray-600">{j.description || ""}</p>
//               </div>
//             ))
//           )}
//         </CardContent>
//       </Card>

//       <Button
//         onClick={() => {
//           // TODO: implement PDF generation
//           alert("Download not implemented yet");
//         }}
//         className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2 mx-auto"
//       >
//         <FileDown className="w-5 h-5" />
//         Download Full PDF
//       </Button>
//     </div>
//   );
// }

