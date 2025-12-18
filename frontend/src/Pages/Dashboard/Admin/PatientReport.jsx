import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Loader2 } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function PatientReportAdmin() {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  // const [data, setData] = useState(null);

// Core patient data
const [profile, setProfile] = useState(null);
const [symptoms, setSymptoms] = useState([]);
const [medications, setMedications] = useState([]);
const [journey, setJourney] = useState([]);

// ML reports (VERY IMPORTANT)
const [cnnReport, setCnnReport] = useState(null);
const [drawingReport, setDrawingReport] = useState(null);
  // const [cnnReport, setCnnReport] = useState(null); // Calling CNN Predicted Scores
  // const [drawings, setDrawings] = useState([]); // Calling Classification Predicted Scores

  const reportRef = useRef();

  const API = "http://localhost:5000/api";

  useEffect(() => {
  async function load() {
    try {
      const token = localStorage.getItem("token");

      // 1️⃣ Existing admin report (profile, symptoms, meds, journey)
      const baseRes = await fetch(
        `${API}/admin/patient/${userId}/report`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const baseData = await baseRes.json();

      setProfile(baseData.user);
      setSymptoms(baseData.symptoms);
      setMedications(baseData.medications);
      setJourney(baseData.journey);

      // 2️⃣ CNN prediction (SEPARATE BACKEND)
      const cnnRes = await fetch(
        `${API}/predictions/latest?userId=${userId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const cnnData = await cnnRes.json();
      setCnnReport(cnnData.data);

      // 3️⃣ Drawing prediction (SEPARATE BACKEND)
      const drawRes = await fetch(
        `${API}/drawings/user/${userId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const drawings = await drawRes.json();
      setDrawingReport(drawings[0] || null); // latest

    } catch (err) {
      console.error("Report load error:", err);
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

    // pdf.save(`Patient-Report-${data.user.username}.pdf`);
    pdf.save(`Patient-Report-${profile?.username || "Patient"}.pdf`);

  };

  if (loading)
    return (
      <div className="flex justify-center py-40">
        <Loader2 className="w-12 h-12 animate-spin text-indigo-600" />
      </div>
    );

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
          <p><strong>Name:</strong> {profile?.username}</p>
          <p><strong>Email:</strong> {profile?.email}</p>
          </div>
        </section>

        {/* AI PREDICTION */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Latest AI Assessment</h2>
        {drawingReport && (
          <Card>
            <CardHeader>
              <CardTitle>Drawing Analysis - AI Assessment</CardTitle>
            </CardHeader>
            <CardContent>
              <p><b>Task:</b> {drawingReport.task_type}</p>
              <p><b>Result:</b> {drawingReport.message}</p>
              <p>
                <b>Confidence:</b>{" "}
                {Math.round(drawingReport.confidence * 100)}%
              </p>
              <p className="text-sm text-gray-500 mt-2">
                {new Date(drawingReport.createdAt).toLocaleString()}
              </p>
              <img src={drawingReport.imageUrl} />
            </CardContent>
          </Card>
        )}

        {cnnReport && (
          <Card>
            <CardHeader>
              <CardTitle>AI Image Assessment (CNN)</CardTitle>
            </CardHeader>
            <CardContent>
              <p><b>Prediction:</b> {cnnReport.prediction}</p>
              <p>
                <b>Confidence:</b>{" "}
                {cnnReport.probability
                  ? `${Math.round(cnnReport.probability * 100)}%`
                  : "N/A"}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                {new Date(cnnReport.timestamp).toLocaleString()}
              </p>
                  {cnnReport.overlay_url && (
                    <img
                      src={cnnReport.overlay_url}
                      className="w-72 rounded shadow mt-4"
                      alt="Grad-CAM Visualization"
                    />
                  )}
                <details className="mt-2">
                  <summary className="cursor-pointer text-blue-600">
                    View heatmap
                  </summary>
                  <img src={cnnReport.heatmap_url} className="w-60 mt-2" />
                </details>
            </CardContent>
          </Card>
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

