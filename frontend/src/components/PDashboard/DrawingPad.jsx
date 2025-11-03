import React, { useRef, useState, useEffect, useCallback } from "react";
import { Loader2, Sparkles, Download } from "lucide-react";
import axiosClient from "../../lib/axiosClient";

export default function DrawingPad() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [points, setPoints] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [pausedDuration, setPausedDuration] = useState(0);
  const [lastStopTime, setLastStopTime] = useState(null);
  const [isUploading, setIsUploading] = useState(false);


  const getPointData = useCallback(
    (e, type, elapsedTime = 0) => {
      const rect = canvasRef.current.getBoundingClientRect();
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        time: elapsedTime,
        type,
        pressure: e.pressure || 0.5,
        // azimuth: e.azimuthAngle ? (e.azimuthAngle * 180) / Math.PI : 0,
        // altitude: e.altitudeAngle ? (e.altitudeAngle * 180) / Math.PI : 90,
        button: e.buttons ? "Pressed" : "Released",
      };
    },
    []
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#111";

    let localPaused = pausedDuration;
    let localStop = lastStopTime;

    const startDraw = (e) => {
      setIsDrawing(true);

      // Start timer if it's the first stroke
      if (!startTime) {
        const now = Date.now();
        setStartTime(now);
        setPausedDuration(0);
        localPaused = 0;
        localStop = null;
      }
      // If resuming after pause, update paused duration
      else if (localStop) {
        const now = Date.now();
        const newPaused = localPaused + (now - localStop);
        setPausedDuration(newPaused);
        localPaused = newPaused;
        localStop = null;
      }

      const elapsed = Date.now() - startTime - localPaused;
      const startData = getPointData(e, "start", elapsed);
      setPoints((prev) => [...prev, startData]);
    };

    const draw = (e) => {
      if (!isDrawing) return;
      const currentTime = Date.now();
      const elapsed = currentTime - startTime - localPaused;
      const newPoint = getPointData(e, "draw", elapsed);

      setPoints((prev) => {
        const updated = [...prev, newPoint];
        const prevPoint = updated[updated.length - 2];
        if (prevPoint) {
          ctx.beginPath();
          ctx.moveTo(prevPoint.x, prevPoint.y);
          ctx.lineTo(newPoint.x, newPoint.y);
          ctx.stroke();
        }
        return updated;
      });
    };

    const stopDraw = (e) => {
      if (!isDrawing) return;
      setIsDrawing(false);
      const now = Date.now();
      setLastStopTime(now);
      localStop = now;

      const elapsed = now - startTime - localPaused;
      const endPoint = getPointData(e, "end", elapsed);
      setPoints((prev) => [...prev, endPoint]);
    };

    canvas.addEventListener("mousedown", startDraw);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDraw);
    canvas.addEventListener("mouseleave", stopDraw);

    return () => {
      canvas.removeEventListener("mousedown", startDraw);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mouseup", stopDraw);
      canvas.removeEventListener("mouseleave", stopDraw);
    };
  }, [isDrawing, getPointData, startTime, pausedDuration, lastStopTime]);

  const clearCanvas = () => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    setPoints([]);
    setStartTime(null);
    setPausedDuration(0);
    setLastStopTime(null);
  };

  const saveDrawing = async () => {
  // Check if drawing is empty
  if (points.length === 0) {
    alert("Please draw something before saving!");
    return;
  }
  setIsUploading(true);  

    const canvas = canvasRef.current;
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
    const formData = new FormData();
    formData.append("image", blob);
    formData.append("points", JSON.stringify(points));

    try {
      const res = await axiosClient.post("/drawings/save-drawing", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Drawing uploaded!");
      console.log("Cloudinary URL:", res.data.imageUrl);
    } catch (err) {
      console.error("Error saving drawing:", err);
      alert("Upload failed");
    }  finally {
       setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Download Button */}
      <div className="ml-96">
    <button
      onClick={() => {
        const canvas = canvasRef.current;
        const link = document.createElement("a");
        link.download = "drawing.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
      }}
      disabled={points.length === 0}
      className={`flex items-center justify-center px-6 py-3 rounded-lg text-white font-medium transition-all w-full max-w-xs
        ${
          points.length === 0
            ? "bg-gray-300 cursor-not-allowed text-gray-600"
            : "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-md"
        }`}
    >
      <Download className="w-5 h-5 mr-2" />
      Download Drawing
    </button>
    </div>

      <h2 className="text-2xl font-semibold text-gray-800">Motor Skills Drawing Test</h2>
      
      <canvas
        ref={canvasRef}
        width={600}
        height={400}
        className="border-2 border-gray-600 bg-white rounded-lg shadow-md cursor-crosshair"
      ></canvas>
<div className="flex flex-col items-center space-y-2 w-full">
  <div className="flex space-x-3 w-full justify-center">
    {/* Clear Button */}
    <button
      onClick={clearCanvas}
      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
    >
      Clear
    </button>

    {/* Save / Analyze Button */}
    <button
      onClick={saveDrawing}
      disabled={points.length === 0 || isUploading}
      className={`flex items-center justify-center px-6 py-3 rounded-lg text-white font-medium transition-all w-full max-w-xs
        ${
          points.length === 0 || isDrawing
            ? "bg-purple-300 cursor-not-allowed text-gray-600"
            : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-md"
        }`}
    >
      {isUploading ? (
        <>
          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
          Uploading Drawing...
        </>
      ) : (
        <>
          <Sparkles className="w-5 h-5 mr-2" />
          Save & Analyze Drawing
        </>
      )}
    </button>
  </div>
  {/* Message under button */}
  {points.length === 0 && (
    <p className="text-sm text-gray-700 mt-2 ml-20 text-center">
      Start drawing to enable AI analysis
    </p>
  )}
</div>

      <div className="w-full max-w-3xl mt-6 overflow-y-auto bg-white rounded-lg shadow-md">
        <table className="w-full text-sm text-left border border-gray-200">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-3 py-2">#</th>
              <th className="px-3 py-2">X</th>
              <th className="px-3 py-2">Y</th>
              <th className="px-3 py-2">Time (ms)</th>
              <th className="px-3 py-2">Pressure</th>
              {/* <th className="px-3 py-2">Azimuth (°)</th>
              <th className="px-3 py-2">Altitude (°)</th> */}
              <th className="px-3 py-2">Button</th>
            </tr>
          </thead>
          <tbody>
            {points.slice(-20).map((p, i) => (
              <tr key={i} className="border-t">
                <td className="px-3 py-1">{i + 1}</td>
                <td className="px-3 py-1">{p.x?.toFixed(1)}</td>
                <td className="px-3 py-1">{p.y?.toFixed(1)}</td>
                <td className="px-3 py-1">{p.time}</td>
                <td className="px-3 py-1">{p.pressure?.toFixed(2)}</td>
                {/* <td className="px-3 py-1">{p.azimuth?.toFixed(1)}</td>
                <td className="px-3 py-1">{p.altitude?.toFixed(1)}</td> */}
                <td className="px-3 py-1">{p.button}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}










// import React, { useRef, useState, useEffect } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
// import { Button } from "../../components/ui/button";
// import { Badge } from "../../components/ui/badge";
// import { Pencil, Eraser, RotateCcw, Download, Loader2, Sparkles, FileDown } from 'lucide-react';

// const drawingTemplates = {
//   spiral: {
//     name: "Spiral Drawing",
//     description: "Draw a spiral from center outward. This tests tremor and motor control.",
//     instruction: "Start from the center and draw a smooth spiral outward.",
//     templatePath:
//       "M 200 200 m -10 0 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0 M 200 200 m -20 0 a 20 20 0 1 0 40 0 a 20 20 0 1 0 -40 0 M 200 200 m -30 0 a 30 30 0 1 0 60 0 a 30 30 0 1 0 -60 0",
//   },
//   wave: {
//     name: "Wave Pattern",
//     description: "Draw smooth waves. Tests hand steadiness and rhythm.",
//     instruction: "Draw smooth wave patterns from left to right.",
//     templatePath: "M 30 200 Q 65 150, 100 200 T 170 200 T 240 200 T 310 200 T 380 200",
//   },
//   zigzag: {
//     name: "Zigzag Lines",
//     description: "Draw sharp zigzag lines. Tests precision and control.",
//     instruction: "Draw sharp zigzag patterns connecting the points.",
//     templatePath:
//       "M 30 150 L 70 250 L 110 150 L 150 250 L 190 150 L 230 250 L 270 150 L 310 250 L 350 150 L 390 250",
//   },
// };

// export default function DrawingPad() {
//   const canvasRef = useRef(null);
//   const containerRef = useRef(null);
//   const [context, setContext] = useState(null);
//   const [isDrawing, setIsDrawing] = useState(false);
//   const [isEraser, setIsEraser] = useState(false);
//   const [brushSize, setBrushSize] = useState(3);
//   const [selectedTemplate, setSelectedTemplate] = useState("spiral");
//   const [drawingData, setDrawingData] = useState([]);
//   const [startTime, setStartTime] = useState(null);
//   const [isAnalyzing, setIsAnalyzing] = useState(false);
//   const [analysisResult, setAnalysisResult] = useState(null);



//   const downloadDrawing = () => {
//     const canvas = canvasRef.current;
//     const url = canvas.toDataURL("image/png");
//     const link = document.createElement("a");
//     link.download = `${selectedTemplate}-drawing.png`;
//     link.href = url;
//     link.click();
//   };


//   const downloadReport = () => {
//     const canvas = canvasRef.current;
//     const imageUrl = canvas.toDataURL("image/png");
//     const ar = analysisResult || {};
//     const risk_level = (ar.risk_level || 'unknown').toString();
//     const confidenceScore = ar.confidence_score ?? ar.confidence ?? 0;
//     const metrics = ar.metrics || { totalTime: 0, strokeCount: 0, avgSpeed: 0, totalDistance: 0 };
//     const observations = Array.isArray(ar.observations) ? ar.observations : [];
//     const biomarkers = Array.isArray(ar.biomarkers_detected) ? ar.biomarkers_detected : [];
//     const recommendations = Array.isArray(ar.recommendations) ? ar.recommendations : [];

//     const htmlContent = `
// <!DOCTYPE html>
// <html>
// <head>
//   <meta charset="utf-8">
//   <title>AI Health Assessment Report</title>
//   <style>
//     body { 
//       font-family: Arial, sans-serif; 
//       max-width: 800px; 
//       margin: 40px auto; 
//       padding: 20px; 
//       line-height: 1.6; 
//     }
//     .header { 
//       text-align: center; 
//       border-bottom: 3px solid #4f46e5; 
//       padding-bottom: 20px; 
//       margin-bottom: 30px; 
//     }
//     .header h1 { 
//       color: #4f46e5; 
//       margin: 0; 
//     }
//     .section { 
//       margin: 30px 0; 
//     }
//     .section h2 { 
//       color: #4f46e5; 
//       border-bottom: 2px solid #e5e7eb; 
//       padding-bottom: 10px; 
//     }
//     .risk-badge { 
//       display: inline-block; 
//       padding: 8px 16px; 
//       border-radius: 20px; 
//       font-weight: bold; 
//       margin: 10px 0; 
//     }
//     .risk-low { 
//       background: #dcfce7; 
//       color: #166534; 
//     }
//     .risk-moderate { 
//       background: #fef3c7; 
//       color: #92400e; 
//     }
//     .risk-high { 
//       background: #fee2e2; 
//       color: #991b1b; 
//     }
//     .score-grid { 
//       display: grid; 
//       grid-template-columns: repeat(3, 1fr); 
//       gap: 20px; 
//       margin: 20px 0; 
//     }
//     .score-box { 
//       text-align: center; 
//       padding: 20px; 
//       border: 2px solid #e5e7eb; 
//       border-radius: 8px; 
//     }
//     .score { 
//       font-size: 36px; 
//       font-weight: bold; 
//       color: #4f46e5; 
//     }
//     .drawing-img { 
//       max-width: 100%; 
//       border: 2px solid #e5e7eb; 
//       border-radius: 8px; 
//       margin: 20px 0; 
//     }
//     .info-box { 
//       background: #f9fafb; 
//       padding: 15px; 
//       border-left: 4px solid #4f46e5; 
//       margin: 10px 0; 
//     }
//     .info-grid { 
//       display: grid; 
//       grid-template-columns: 1fr 1fr; 
//       gap: 15px; 
//       margin: 20px 0; 
//     }
//     .info-item { 
//       background: #f9fafb; 
//       padding: 15px; 
//       border-radius: 8px; 
//       border-left: 4px solid #4f46e5; 
//     }
//     .info-item label { 
//       font-weight: bold; 
//       color: #4f46e5; 
//       display: block; 
//       margin-bottom: 5px; 
//     }
//     .observation-item {
//       background: #f3f4f6;
//       padding: 12px;
//       border-radius: 6px;
//       margin: 8px 0;
//       border-left: 3px solid #8b5cf6;
//     }
//     .biomarker-badge {
//       display: inline-block;
//       background: #e0e7ff;
//       color: #3730a3;
//       padding: 6px 12px;
//       border-radius: 12px;
//       margin: 4px;
//       font-size: 14px;
//     }
//     .recommendation-item {
//       background: #d1fae5;
//       padding: 12px;
//       border-radius: 6px;
//       margin: 8px 0;
//       border-left: 3px solid #10b981;
//     }
//     @media (max-width: 600px) {
//       .score-grid { grid-template-columns: 1fr; }
//       .info-grid { grid-template-columns: 1fr; }
//     }
//   </style>
// </head>
// <body>
//   <div class="header">
//     <h1>🧠 AI Health Assessment Report</h1>
//     <p><strong>Motor Skills Drawing Test - ${drawingTemplates[selectedTemplate].name}</strong></p>
//     <p>Generated on ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
//   </div>

//   <div class="section">
//     <h2>Test Type</h2>
//     <p><strong>${drawingTemplates[selectedTemplate].name}</strong></p>
//     <p>${drawingTemplates[selectedTemplate].description}</p>
//   </div>

//   <div class="section">
//     <h2>Risk Assessment</h2>
//     <div class="risk-badge risk-${risk_level}">
//       Risk Level: ${risk_level.toUpperCase()}
//     </div>
//     <div class="info-grid">
//       <div class="info-item">
//         <label>AI Confidence Score:</label>
//         <div style="font-size: 24px; font-weight: bold; color: #4f46e5;">
//           ${confidenceScore}%
//         </div>
//       </div>
//       <div class="info-item">
//         <label>Assessment Date:</label>
//         ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
//       </div>
//     </div>
//   </div>

//   <div class="section">
//     <h2>Assessment Scores</h2>
//     <div class="score-grid">
//       <div class="score-box">
//         <div class="score">${analysisResult.tremor_score}/10</div>
//         <p>Tremor Score</p>
//       </div>
//       <div class="score-box">
//         <div class="score">${analysisResult.motor_control_score}/10</div>
//         <p>Motor Control</p>
//       </div>
//       <div class="score-box">
//         <div class="score">${analysisResult.smoothness_score}/10</div>
//         <p>Smoothness</p>
//       </div>
//     </div>
//   </div>

//   <div class="section">
//     <h2>Your Drawing</h2>
//     <img src="${imageUrl}" alt="Patient Drawing" class="drawing-img" />
//   </div>

//   <div class="section">
//     <h2>Clinical Notes</h2>
//     <div class="info-box">
//       <p>${analysisResult.clinical_notes}</p>
//     </div>
//   </div>

//   <div class="section">
//     <h2>🔍 Observations</h2>
//     ${observations.map(obs => `
//       <div class="observation-item">
//         • ${obs}
//       </div>
//     `).join('')}
//   </div>

//   <div class="section">
//     <h2>🧬 Biomarkers Detected</h2>
//     <div style="margin-top: 15px;">
//       ${biomarkers.map(marker => `
//         <span class="biomarker-badge">${marker}</span>
//       `).join('')}
//     </div>
//   </div>

//   <div class="section">
//     <h2>💡 Clinical Recommendations</h2>
//     ${recommendations.map(rec => `
//       <div class="recommendation-item">
//         ✓ ${rec}
//       </div>
//     `).join('')}
//   </div>

//   <div class="section">
//     <h2>📊 Drawing Metrics</h2>
//     <div class="info-box">
//       <p><strong>Total Time:</strong> ${(metrics.totalTime / 1000).toFixed(1)}s</p>
//       <p><strong>Stroke Count:</strong> ${metrics.strokeCount}</p>
//       <p><strong>Average Speed:</strong> ${metrics.avgSpeed.toFixed(2)} px/ms</p>
//       <p><strong>Total Distance:</strong> ${metrics.totalDistance.toFixed(0)}px</p>
//     </div>
//   </div>

//   <div class="section" style="background: #fef3c7; border: 2px solid #fbbf24; padding: 15px; border-radius: 8px;">
//     <strong>⚠️ Important Medical Disclaimer:</strong><br>
//     This AI-generated report is for informational purposes only and should not replace professional medical advice.
//     Always consult with qualified healthcare providers for diagnosis and treatment decisions.
//   </div>
// </body>
// </html>
//   `;

//     const blob = new Blob([htmlContent], { type: 'text/html' });
//     const url = window.URL.createObjectURL(blob);
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = `AI-Health-Report-${new Date().toISOString().split('T')[0]}.html`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     window.URL.revokeObjectURL(url);
    
//     alert('✅ Report downloaded! Open the HTML file in your browser, then use Print > Save as PDF for a professional PDF report.');
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-4 md:p-6 lg:p-8">
//       <div className="max-w-4xl mx-auto space-y-6">
//         <Card className="shadow-xl border-none">
//           <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
//             <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
//               <Pencil className="w-5 h-5" />
//               Motor Skills Assessment - Drawing Test
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="pt-6">
//             <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
//               {Object.entries(drawingTemplates).map(([key, tmpl]) => (
//                 <button
//                   key={key}
//                   onClick={() => setSelectedTemplate(key)}
//                   className={`p-3 md:p-4 rounded-lg border-2 text-left transition-all hover:shadow-md ${
//                     selectedTemplate === key 
//                       ? "border-purple-600 bg-purple-50 shadow-md" 
//                       : "border-gray-200 hover:border-purple-300"
//                   }`}
//                 >
//                   <p className="font-semibold text-sm mb-1">{tmpl.name}</p>
//                   <p className="text-xs text-gray-600 leading-relaxed">{tmpl.description}</p>
//                 </button>
//               ))}
//             </div>

//             <div className="mb-4 flex justify-center">
//               <div className="relative inline-block">
//                 <canvas
//                   ref={canvasRef}
//                   className="border-2 border-gray-300 rounded-lg shadow-md cursor-crosshair touch-none"
//                   onMouseDown={startDrawing}
//                   onMouseMove={draw}
//                   onMouseUp={stopDrawing}
//                   onMouseLeave={stopDrawing}
//                   onTouchStart={(e) => { e.preventDefault(); startDrawing(e); }}
//                   onTouchMove={(e) => { e.preventDefault(); draw(e); }}
//                   onTouchEnd={(e) => { e.preventDefault(); stopDrawing(e); }}
//                 />
//               </div>
//             </div>

//             <div className="flex flex-col gap-3">
//               <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
//                
//                 <Button variant="outline" onClick={downloadDrawing} className="w-full col-span-2 sm:col-span-1">
//                   <Download className="w-4 h-4 mr-2" />
//                   <span className="hidden sm:inline">Download Drawing</span>
//                   <span className="sm:hidden">Download</span>
//                 </Button>
//               </div>
//               <Button
//                 onClick={analyzeDrawing}
//                 disabled={isAnalyzing}
//                 className="w-full bg-purple-600 hover:bg-purple-700 text-white"
//               >
//                 {isAnalyzing ? (
//                   <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                 ) : (
//                   <Sparkles className="w-4 h-4 mr-2" />
//                 )}
//                 Analyze with AI
//               </Button>
//             </div>
//           </CardContent>
//         </Card>


//               <Button 
//                 onClick={downloadReport} 
//                 className="w-full bg-green-600 hover:bg-green-700 text-white"
//               >
//                 <FileDown className="w-4 h-4 mr-2" />
//                 Download Report (PDF)
//               </Button>

//         )}
//       </div>
//     </div>
//   );
// }