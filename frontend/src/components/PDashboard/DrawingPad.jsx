// import React, { useRef, useState, useEffect } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
// import { Button } from "../../components/ui/button";
// import { Badge } from "../../components/ui/badge";
// import { Pencil, Eraser, RotateCcw, Download, Loader2, Sparkles, FileDown } from 'lucide-react';
// import { jsPDF } from "jspdf";

// const drawingTemplates = {
//   spiral: {
//     name: "Spiral Drawing",
//     description: "Draw a spiral from center outward. This tests tremor and motor control.",
//     instruction: "Start from the center and draw a smooth spiral outward.",
//     templatePath:
//       "M 300 300 m -10 0 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0 M 300 300 m -20 0 a 20 20 0 1 0 40 0 a 20 20 0 1 0 -40 0 M 300 300 m -30 0 a 30 30 0 1 0 60 0 a 30 30 0 1 0 -60 0",
//   },
//   wave: {
//     name: "Wave Pattern",
//     description: "Draw smooth waves. Tests hand steadiness and rhythm.",
//     instruction: "Draw smooth wave patterns from left to right.",
//     templatePath: "M 50 300 Q 100 250, 150 300 T 250 300 T 350 300 T 450 300 T 550 300",
//   },
//   zigzag: {
//     name: "Zigzag Lines",
//     description: "Draw sharp zigzag lines. Tests precision and control.",
//     instruction: "Draw sharp zigzag patterns connecting the points.",
//     templatePath:
//       "M 50 250 L 100 350 L 150 250 L 200 350 L 250 250 L 300 350 L 350 250 L 400 350 L 450 250 L 500 350 L 550 250",
//   },
// };

// export default function DrawingPad() {
//   const canvasRef = useRef(null);
//   const [context, setContext] = useState(null);
//   const [isDrawing, setIsDrawing] = useState(false);
//   const [isEraser, setIsEraser] = useState(false);
//   const [brushSize, setBrushSize] = useState(3);
//   const [selectedTemplate, setSelectedTemplate] = useState("spiral");
//   const [drawingData, setDrawingData] = useState([]);
//   const [startTime, setStartTime] = useState(null);
//   const [isAnalyzing, setIsAnalyzing] = useState(false);
//   const [analysisResult, setAnalysisResult] = useState(null);

//   // Setup canvas, handle responsive sizing and draw template
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const ASPECT = 500 / 400; // default aspect ratio

//     const resizeCanvas = () => {
//       const rect = canvas.getBoundingClientRect();
//       const cssWidth = rect.width || 600;
//       const cssHeight = Math.round(cssWidth / ASPECT);
//       const dpr = window.devicePixelRatio || 1;

//       // preserve existing drawing
//       const temp = document.createElement("canvas");
//       temp.width = canvas.width || cssWidth * dpr;
//       temp.height = canvas.height || cssHeight * dpr;
//       const tctx = temp.getContext("2d");
//       if (canvas.width && canvas.height) tctx.drawImage(canvas, 0, 0);

//       // set new pixel dimensions
//       canvas.width = Math.round(cssWidth * dpr);
//       canvas.height = Math.round(cssHeight * dpr);
//       canvas.style.width = `${cssWidth}px`;
//       canvas.style.height = `${cssHeight}px`;

//       const ctx = canvas.getContext("2d");
//       // reset any transforms and draw preserved image stretched to new size
//       if (ctx.resetTransform) ctx.resetTransform();
//       else ctx.setTransform(1, 0, 0, 1, 0, 0);

//       if (temp.width && temp.height) {
//         // draw previous content (pixel space) to new canvas (pixel space)
//         ctx.drawImage(temp, 0, 0, temp.width, temp.height, 0, 0, canvas.width, canvas.height);
//       } else {
//         // fresh canvas: fill white background
//         ctx.fillStyle = "white";
//         ctx.fillRect(0, 0, canvas.width, canvas.height);
//       }

//       // scale context so drawing uses CSS pixel coordinates
//       ctx.scale(dpr, dpr);
//       ctx.lineCap = "round";
//       ctx.lineJoin = "round";
//       setContext(ctx);

//       // if there was no previous content, draw the template
//       if (!temp.width || !temp.height) drawTemplate();
//     };

//     // initial resize and listeners
//     resizeCanvas();
//     window.addEventListener("resize", resizeCanvas);
//     window.addEventListener("orientationchange", resizeCanvas);

//     return () => {
//       window.removeEventListener("resize", resizeCanvas);
//       window.removeEventListener("orientationchange", resizeCanvas);
//     };
//   }, [selectedTemplate]);

//   const drawTemplate = () => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");

//     // clear to white in pixel space (without transforms)
//     ctx.save();
//     ctx.setTransform(1, 0, 0, 1, 0, 0);
//     ctx.fillStyle = "white";
//     ctx.fillRect(0, 0, canvas.width, canvas.height);
//     ctx.restore();

//     const template = drawingTemplates[selectedTemplate];
//     // Path coordinates are defined for a 600x400 canvas. Scale them to actual canvas pixel size.
//     if (template.templatePath) {
//       const path = new Path2D(template.templatePath);
//       const scaleX = canvas.width / 600;
//       const scaleY = canvas.height / 400;
//       ctx.save();
//       ctx.setLineDash([6, 6]);
//       ctx.strokeStyle = "#e5e7eb";
//       ctx.lineWidth = 2; // will be scaled by transform
//       // map base (600x400) coordinates to canvas pixel space
//       ctx.setTransform(scaleX, 0, 0, scaleY, 0, 0);
//       ctx.stroke(path);
//       ctx.restore();
//     } else if (selectedTemplate === "text") {
//       // draw ruled lines for text mode (base spacing 40px)
//       const scaleX = canvas.width / 600;
//       const scaleY = canvas.height / 400;
//       ctx.save();
//       ctx.setLineDash([6, 6]);
//       ctx.strokeStyle = "#e5e7eb";
//       ctx.lineWidth = 1;
//       ctx.setTransform(scaleX, 0, 0, scaleY, 0, 0);
//       for (let y = 0; y <= 400; y += 40) {
//         ctx.beginPath();
//         ctx.moveTo(0, y);
//         ctx.lineTo(600, y);
//         ctx.stroke();
//       }
//       ctx.restore();
//     }
//   };

//   const startDrawing = (e) => {
//     setIsDrawing(true);
//     if (!startTime) setStartTime(Date.now());
//     const { x, y } = getPointerPos(e);
//     if (!context) return;
//     context.beginPath();
//     // set composite mode depending on eraser
//     context.globalCompositeOperation = isEraser ? "destination-out" : "source-over";
//     context.moveTo(x, y);
//   };

//   const draw = (e) => {
//     if (!isDrawing) return;
//     if (!context) return;
//     const { x, y } = getPointerPos(e);
//     // set composite mode and stroke style for eraser vs pen
//     if (isEraser) {
//       context.globalCompositeOperation = "destination-out"; // erases
//       context.strokeStyle = "rgba(0,0,0,1)";
//       context.lineWidth = brushSize * 6; // make eraser larger relative to brush
//     } else {
//       context.globalCompositeOperation = "source-over";
//       context.strokeStyle = "#4f46e5";
//       context.lineWidth = brushSize;
//     }
//     context.lineTo(x, y);
//     context.stroke();
//   };

//   const stopDrawing = () => {
//     setIsDrawing(false);
//     if (context) {
//       context.beginPath();
//       // reset composite mode to default
//       context.globalCompositeOperation = "source-over";
//     }
//   };

//   // helper to get pointer position adjusted for canvas CSS scaling and device pixel ratio
//   const getPointerPos = (e) => {
//     const canvas = canvasRef.current;
//     const rect = canvas.getBoundingClientRect();
//     // support touch events
//     const clientX = e.touches ? e.touches[0].clientX : e.clientX;
//     const clientY = e.touches ? e.touches[0].clientY : e.clientY;
//     // return CSS pixel coordinates (ctx is scaled by DPR)
//     const x = clientX - rect.left;
//     const y = clientY - rect.top;
//     return { x, y };
//   };

//   const clearCanvas = () => {
//     drawTemplate();
//     setDrawingData([]);
//     setStartTime(null);
//     setAnalysisResult(null);
//   };

//   const downloadDrawing = () => {
//     const canvas = canvasRef.current;
//     const url = canvas.toDataURL("image/png");
//     const link = document.createElement("a");
//     link.download = `${selectedTemplate}-drawing.png`;
//     link.href = url;
//     link.click();
//   };

//   const analyzeDrawing = async () => {
//     setIsAnalyzing(true);
//     try {
//       const canvas = canvasRef.current;
//       const imageUrl = canvas.toDataURL("image/png");

//       // Simulate AI analysis
//       await new Promise((r) => setTimeout(r, 1500));

//       setAnalysisResult({
//         tremor_score: Math.floor(Math.random() * 10),
//         motor_control_score: Math.floor(Math.random() * 10),
//         smoothness_score: Math.floor(Math.random() * 10),
//         observations: ["Slight tremor detected", "Moderate consistency in motion"],
//         clinical_notes:
//           "Patient demonstrates mild tremor during drawing. Recommend continued observation and follow-up test.",
//         recommendations: ["Continue medication", "Add hand-motor exercises"],
//         risk_indicators: ["Mild tremor", "Reduced control"],
//         metrics: { totalTime: 5000, strokeCount: 300, avgSpeed: 0.5, totalDistance: 1000 },
//         imageUrl,
//       });
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setIsAnalyzing(false);
//     }
//   };

//   const downloadReport = () => {
//     const canvas = canvasRef.current;
//     const imageUrl = canvas.toDataURL("image/png");
//     // defensive defaults so missing analysisResult doesn't throw
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
//     ul { 
//       padding-left: 20px; 
//     }
//     li { 
//       margin: 8px 0; 
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

//     <div class="section">
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

//   const blob = new Blob([htmlContent], { type: 'text/html' });
//   const url = window.URL.createObjectURL(blob);
//   const link = document.createElement('a');
//   link.href = url;
//   link.download = `AI-Health-Report-${new Date().toISOString().split('T')[0]}.html`;
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
//   window.URL.revokeObjectURL(url);
  
//   alert('✅ Report downloaded! Open the HTML file in your browser, then use Print > Save as PDF for a professional PDF report.');
// };

//   return (
//     <div className="space-y-6">
//       <Card className="shadow-xl border-none">
//         <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
//           <CardTitle className="flex items-center gap-2">
//             <Pencil className="w-5 h-5 text-purple-600" />
//             Motor Skills Assessment - Drawing Test
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="pt-6">
//          <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
//             {Object.entries(drawingTemplates).map(([key, tmpl]) => (
//               <button
//                 key={key}
//                 onClick={() => setSelectedTemplate(key)}
//                 className={`p-4 rounded-lg border-2 text-left transition-all hover:shadow-md ${
//                   selectedTemplate === key ? "border-purple-600 bg-purple-50" : "border-gray-200 hover:border-purple-300"
//                 }`}
//               >
//                 <p className="font-semibold text-sm mb-1">{tmpl.name}</p>
//                 <p className="text-xs text-gray-600 leading-relaxed">{tmpl.description}</p>
//               </button>
//             ))}
//           </div>

//           <canvas
//             ref={canvasRef}
//             width={600}
//             height={400}
//             className="border-2 border-gray-300 rounded-lg w-full cursor-crosshair mb-4"
//             onMouseDown={startDrawing}
//             onMouseMove={draw}
//             onMouseUp={stopDrawing}
//             onMouseLeave={stopDrawing}
//             onTouchStart={(e) => { e.preventDefault(); startDrawing(e); }}
//             onTouchMove={(e) => { e.preventDefault(); draw(e); }}
//             onTouchEnd={(e) => { e.preventDefault(); stopDrawing(e); }}
//           />

//           <div className="flex flex-wrap gap-3 mb-6">
//             <Button variant={isEraser ? "default" : "outline"} onClick={() => setIsEraser(!isEraser)}>
//               <Eraser className="w-4 h-4 mr-2" />
//               Eraser
//             </Button>
//             <Button variant="outline" onClick={clearCanvas}>
//               <RotateCcw className="w-4 h-4 mr-2" />
//               Clear
//             </Button>
//             <Button variant="outline" onClick={downloadDrawing}>
//               <Download className="w-4 h-4 mr-2" />
//               Download Drawing
//             </Button>
//             <Button
//               onClick={analyzeDrawing}
//               disabled={isAnalyzing}
//               className="ml-auto bg-purple-600 hover:bg-purple-700"
//             >
//               {isAnalyzing ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Sparkles className="w-4 h-4 mr-2" />}
//               Analyze with AI
//             </Button>
//           </div>
//         </CardContent>
//       </Card>

//       {analysisResult && (
//         <Card className="shadow-xl border-none">
//           <CardHeader className="bg-green-50">
//             <CardTitle className="flex items-center gap-2">
//               <Sparkles className="w-5 h-5 text-green-600" />
//               AI Analysis Results
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="grid md:grid-cols-3 gap-4">
//               <div className="text-center">
//                 <p className="text-sm text-gray-600">Tremor Score</p>
//                 <p className="text-3xl font-bold text-purple-700">{analysisResult.tremor_score}/10</p>
//               </div>
//               <div className="text-center">
//                 <p className="text-sm text-gray-600">Motor Control</p>
//                 <p className="text-3xl font-bold text-green-700">{analysisResult.motor_control_score}/10</p>
//               </div>
//               <div className="text-center">
//                 <p className="text-sm text-gray-600">Smoothness</p>
//                 <p className="text-3xl font-bold text-blue-700">{analysisResult.smoothness_score}/10</p>
//               </div>
//             </div>

//             <div className="bg-blue-50 rounded-lg p-3">
//               <p className="font-semibold text-blue-900 mb-2">Clinical Notes:</p>
//               <p className="text-sm text-blue-800">{analysisResult.clinical_notes}</p>
//             </div>

//             <Button onClick={downloadReport} className="bg-green-600 hover:bg-green-700">
//               <FileDown className="w-4 h-4 mr-2" />
//               Download Report (PDF)
//             </Button>
//           </CardContent>
//         </Card>
//       )}
//     </div>
//   );
// }




import React, { useRef, useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Pencil, Eraser, RotateCcw, Download, Loader2, Sparkles, FileDown } from 'lucide-react';

const drawingTemplates = {
  spiral: {
    name: "Spiral Drawing",
    description: "Draw a spiral from center outward. This tests tremor and motor control.",
    instruction: "Start from the center and draw a smooth spiral outward.",
    templatePath:
      "M 200 200 m -10 0 a 10 10 0 1 0 20 0 a 10 10 0 1 0 -20 0 M 200 200 m -20 0 a 20 20 0 1 0 40 0 a 20 20 0 1 0 -40 0 M 200 200 m -30 0 a 30 30 0 1 0 60 0 a 30 30 0 1 0 -60 0",
  },
  wave: {
    name: "Wave Pattern",
    description: "Draw smooth waves. Tests hand steadiness and rhythm.",
    instruction: "Draw smooth wave patterns from left to right.",
    templatePath: "M 30 200 Q 65 150, 100 200 T 170 200 T 240 200 T 310 200 T 380 200",
  },
  zigzag: {
    name: "Zigzag Lines",
    description: "Draw sharp zigzag lines. Tests precision and control.",
    instruction: "Draw sharp zigzag patterns connecting the points.",
    templatePath:
      "M 30 150 L 70 250 L 110 150 L 150 250 L 190 150 L 230 250 L 270 150 L 310 250 L 350 150 L 390 250",
  },
};

export default function DrawingPad() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [context, setContext] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isEraser, setIsEraser] = useState(false);
  const [brushSize, setBrushSize] = useState(3);
  const [selectedTemplate, setSelectedTemplate] = useState("spiral");
  const [drawingData, setDrawingData] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  // Setup canvas with fixed size
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const setupCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      
      // Fixed logical dimensions
      const logicalWidth = 400;
      const logicalHeight = 300;
      
      // Set canvas pixel dimensions for high DPI
      canvas.width = logicalWidth * dpr;
      canvas.height = logicalHeight * dpr;
      
      // Set CSS display size
      canvas.style.width = `${logicalWidth}px`;
      canvas.style.height = `${logicalHeight}px`;

      const ctx = canvas.getContext("2d");
      ctx.scale(dpr, dpr);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      
      // Fill white background
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, logicalWidth, logicalHeight);
      
      setContext(ctx);
      drawTemplate(ctx, logicalWidth, logicalHeight);
    };

    setupCanvas();
  }, [selectedTemplate]);

  const drawTemplate = (ctx, width, height) => {
    const template = drawingTemplates[selectedTemplate];
    
    if (template.templatePath) {
      const path = new Path2D(template.templatePath);
      ctx.save();
      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = "#d1d5db";
      ctx.lineWidth = 1.5;
      ctx.stroke(path);
      ctx.restore();
    }
  };

  const startDrawing = (e) => {
    setIsDrawing(true);
    if (!startTime) setStartTime(Date.now());
    const { x, y } = getPointerPos(e);
    if (!context) return;
    context.beginPath();
    context.globalCompositeOperation = isEraser ? "destination-out" : "source-over";
    context.moveTo(x, y);
  };

  const draw = (e) => {
    if (!isDrawing || !context) return;
    const { x, y } = getPointerPos(e);
    
    if (isEraser) {
      context.globalCompositeOperation = "destination-out";
      context.strokeStyle = "rgba(0,0,0,1)";
      context.lineWidth = brushSize * 6;
    } else {
      context.globalCompositeOperation = "source-over";
      context.strokeStyle = "#4f46e5";
      context.lineWidth = brushSize;
    }
    context.lineTo(x, y);
    context.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    if (context) {
      context.beginPath();
      context.globalCompositeOperation = "source-over";
    }
  };

  const getPointerPos = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    return { x, y };
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const logicalWidth = 400;
    const logicalHeight = 300;
    
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, logicalWidth, logicalHeight);
    drawTemplate(ctx, logicalWidth, logicalHeight);
    
    setDrawingData([]);
    setStartTime(null);
    setAnalysisResult(null);
  };

  const downloadDrawing = () => {
    const canvas = canvasRef.current;
    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = `${selectedTemplate}-drawing.png`;
    link.href = url;
    link.click();
  };

  const analyzeDrawing = async () => {
    setIsAnalyzing(true);
    try {
      const canvas = canvasRef.current;
      const imageUrl = canvas.toDataURL("image/png");

      await new Promise((r) => setTimeout(r, 1500));

      setAnalysisResult({
        tremor_score: Math.floor(Math.random() * 10),
        motor_control_score: Math.floor(Math.random() * 10),
        smoothness_score: Math.floor(Math.random() * 10),
        observations: ["Slight tremor detected", "Moderate consistency in motion"],
        clinical_notes:
          "Patient demonstrates mild tremor during drawing. Recommend continued observation and follow-up test.",
        recommendations: ["Continue medication", "Add hand-motor exercises"],
        risk_indicators: ["Mild tremor", "Reduced control"],
        metrics: { totalTime: 5000, strokeCount: 300, avgSpeed: 0.5, totalDistance: 1000 },
        imageUrl,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const downloadReport = () => {
    const canvas = canvasRef.current;
    const imageUrl = canvas.toDataURL("image/png");
    const ar = analysisResult || {};
    const risk_level = (ar.risk_level || 'unknown').toString();
    const confidenceScore = ar.confidence_score ?? ar.confidence ?? 0;
    const metrics = ar.metrics || { totalTime: 0, strokeCount: 0, avgSpeed: 0, totalDistance: 0 };
    const observations = Array.isArray(ar.observations) ? ar.observations : [];
    const biomarkers = Array.isArray(ar.biomarkers_detected) ? ar.biomarkers_detected : [];
    const recommendations = Array.isArray(ar.recommendations) ? ar.recommendations : [];

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>AI Health Assessment Report</title>
  <style>
    body { 
      font-family: Arial, sans-serif; 
      max-width: 800px; 
      margin: 40px auto; 
      padding: 20px; 
      line-height: 1.6; 
    }
    .header { 
      text-align: center; 
      border-bottom: 3px solid #4f46e5; 
      padding-bottom: 20px; 
      margin-bottom: 30px; 
    }
    .header h1 { 
      color: #4f46e5; 
      margin: 0; 
    }
    .section { 
      margin: 30px 0; 
    }
    .section h2 { 
      color: #4f46e5; 
      border-bottom: 2px solid #e5e7eb; 
      padding-bottom: 10px; 
    }
    .risk-badge { 
      display: inline-block; 
      padding: 8px 16px; 
      border-radius: 20px; 
      font-weight: bold; 
      margin: 10px 0; 
    }
    .risk-low { 
      background: #dcfce7; 
      color: #166534; 
    }
    .risk-moderate { 
      background: #fef3c7; 
      color: #92400e; 
    }
    .risk-high { 
      background: #fee2e2; 
      color: #991b1b; 
    }
    .score-grid { 
      display: grid; 
      grid-template-columns: repeat(3, 1fr); 
      gap: 20px; 
      margin: 20px 0; 
    }
    .score-box { 
      text-align: center; 
      padding: 20px; 
      border: 2px solid #e5e7eb; 
      border-radius: 8px; 
    }
    .score { 
      font-size: 36px; 
      font-weight: bold; 
      color: #4f46e5; 
    }
    .drawing-img { 
      max-width: 100%; 
      border: 2px solid #e5e7eb; 
      border-radius: 8px; 
      margin: 20px 0; 
    }
    .info-box { 
      background: #f9fafb; 
      padding: 15px; 
      border-left: 4px solid #4f46e5; 
      margin: 10px 0; 
    }
    .info-grid { 
      display: grid; 
      grid-template-columns: 1fr 1fr; 
      gap: 15px; 
      margin: 20px 0; 
    }
    .info-item { 
      background: #f9fafb; 
      padding: 15px; 
      border-radius: 8px; 
      border-left: 4px solid #4f46e5; 
    }
    .info-item label { 
      font-weight: bold; 
      color: #4f46e5; 
      display: block; 
      margin-bottom: 5px; 
    }
    .observation-item {
      background: #f3f4f6;
      padding: 12px;
      border-radius: 6px;
      margin: 8px 0;
      border-left: 3px solid #8b5cf6;
    }
    .biomarker-badge {
      display: inline-block;
      background: #e0e7ff;
      color: #3730a3;
      padding: 6px 12px;
      border-radius: 12px;
      margin: 4px;
      font-size: 14px;
    }
    .recommendation-item {
      background: #d1fae5;
      padding: 12px;
      border-radius: 6px;
      margin: 8px 0;
      border-left: 3px solid #10b981;
    }
    @media (max-width: 600px) {
      .score-grid { grid-template-columns: 1fr; }
      .info-grid { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>🧠 AI Health Assessment Report</h1>
    <p><strong>Motor Skills Drawing Test - ${drawingTemplates[selectedTemplate].name}</strong></p>
    <p>Generated on ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
  </div>

  <div class="section">
    <h2>Test Type</h2>
    <p><strong>${drawingTemplates[selectedTemplate].name}</strong></p>
    <p>${drawingTemplates[selectedTemplate].description}</p>
  </div>

  <div class="section">
    <h2>Risk Assessment</h2>
    <div class="risk-badge risk-${risk_level}">
      Risk Level: ${risk_level.toUpperCase()}
    </div>
    <div class="info-grid">
      <div class="info-item">
        <label>AI Confidence Score:</label>
        <div style="font-size: 24px; font-weight: bold; color: #4f46e5;">
          ${confidenceScore}%
        </div>
      </div>
      <div class="info-item">
        <label>Assessment Date:</label>
        ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
      </div>
    </div>
  </div>

  <div class="section">
    <h2>Assessment Scores</h2>
    <div class="score-grid">
      <div class="score-box">
        <div class="score">${analysisResult.tremor_score}/10</div>
        <p>Tremor Score</p>
      </div>
      <div class="score-box">
        <div class="score">${analysisResult.motor_control_score}/10</div>
        <p>Motor Control</p>
      </div>
      <div class="score-box">
        <div class="score">${analysisResult.smoothness_score}/10</div>
        <p>Smoothness</p>
      </div>
    </div>
  </div>

  <div class="section">
    <h2>Your Drawing</h2>
    <img src="${imageUrl}" alt="Patient Drawing" class="drawing-img" />
  </div>

  <div class="section">
    <h2>Clinical Notes</h2>
    <div class="info-box">
      <p>${analysisResult.clinical_notes}</p>
    </div>
  </div>

  <div class="section">
    <h2>🔍 Observations</h2>
    ${observations.map(obs => `
      <div class="observation-item">
        • ${obs}
      </div>
    `).join('')}
  </div>

  <div class="section">
    <h2>🧬 Biomarkers Detected</h2>
    <div style="margin-top: 15px;">
      ${biomarkers.map(marker => `
        <span class="biomarker-badge">${marker}</span>
      `).join('')}
    </div>
  </div>

  <div class="section">
    <h2>💡 Clinical Recommendations</h2>
    ${recommendations.map(rec => `
      <div class="recommendation-item">
        ✓ ${rec}
      </div>
    `).join('')}
  </div>

  <div class="section">
    <h2>📊 Drawing Metrics</h2>
    <div class="info-box">
      <p><strong>Total Time:</strong> ${(metrics.totalTime / 1000).toFixed(1)}s</p>
      <p><strong>Stroke Count:</strong> ${metrics.strokeCount}</p>
      <p><strong>Average Speed:</strong> ${metrics.avgSpeed.toFixed(2)} px/ms</p>
      <p><strong>Total Distance:</strong> ${metrics.totalDistance.toFixed(0)}px</p>
    </div>
  </div>

  <div class="section" style="background: #fef3c7; border: 2px solid #fbbf24; padding: 15px; border-radius: 8px;">
    <strong>⚠️ Important Medical Disclaimer:</strong><br>
    This AI-generated report is for informational purposes only and should not replace professional medical advice.
    Always consult with qualified healthcare providers for diagnosis and treatment decisions.
  </div>
</body>
</html>
  `;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `AI-Health-Report-${new Date().toISOString().split('T')[0]}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    alert('✅ Report downloaded! Open the HTML file in your browser, then use Print > Save as PDF for a professional PDF report.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="shadow-xl border-none">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
            <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
              <Pencil className="w-5 h-5" />
              Motor Skills Assessment - Drawing Test
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {Object.entries(drawingTemplates).map(([key, tmpl]) => (
                <button
                  key={key}
                  onClick={() => setSelectedTemplate(key)}
                  className={`p-3 md:p-4 rounded-lg border-2 text-left transition-all hover:shadow-md ${
                    selectedTemplate === key 
                      ? "border-purple-600 bg-purple-50 shadow-md" 
                      : "border-gray-200 hover:border-purple-300"
                  }`}
                >
                  <p className="font-semibold text-sm mb-1">{tmpl.name}</p>
                  <p className="text-xs text-gray-600 leading-relaxed">{tmpl.description}</p>
                </button>
              ))}
            </div>

            <div className="mb-4 flex justify-center">
              <div className="relative inline-block">
                <canvas
                  ref={canvasRef}
                  className="border-2 border-gray-300 rounded-lg shadow-md cursor-crosshair touch-none"
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={(e) => { e.preventDefault(); startDrawing(e); }}
                  onTouchMove={(e) => { e.preventDefault(); draw(e); }}
                  onTouchEnd={(e) => { e.preventDefault(); stopDrawing(e); }}
                />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <Button 
                  variant={isEraser ? "default" : "outline"} 
                  onClick={() => setIsEraser(!isEraser)}
                  className="w-full"
                >
                  <Eraser className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Eraser</span>
                  <span className="sm:hidden">Erase</span>
                </Button>
                <Button variant="outline" onClick={clearCanvas} className="w-full">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Clear
                </Button>
                <Button variant="outline" onClick={downloadDrawing} className="w-full col-span-2 sm:col-span-1">
                  <Download className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Download Drawing</span>
                  <span className="sm:hidden">Download</span>
                </Button>
              </div>
              <Button
                onClick={analyzeDrawing}
                disabled={isAnalyzing}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              >
                {isAnalyzing ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4 mr-2" />
                )}
                Analyze with AI
              </Button>
            </div>
          </CardContent>
        </Card>

        {analysisResult && (
          <Card className="shadow-xl border-none">
            <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
              <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                <Sparkles className="w-5 h-5" />
                AI Analysis Results
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <p className="text-xs sm:text-sm text-gray-600 mb-2">Tremor Score</p>
                  <p className="text-2xl sm:text-3xl font-bold text-purple-700">
                    {analysisResult.tremor_score}/10
                  </p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-xs sm:text-sm text-gray-600 mb-2">Motor Control</p>
                  <p className="text-2xl sm:text-3xl font-bold text-green-700">
                    {analysisResult.motor_control_score}/10
                  </p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-xs sm:text-sm text-gray-600 mb-2">Smoothness</p>
                  <p className="text-2xl sm:text-3xl font-bold text-blue-700">
                    {analysisResult.smoothness_score}/10
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <p className="font-semibold text-blue-900 mb-2 text-sm sm:text-base">
                  Clinical Notes:
                </p>
                <p className="text-xs sm:text-sm text-blue-800">
                  {analysisResult.clinical_notes}
                </p>
              </div>

              <Button 
                onClick={downloadReport} 
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                <FileDown className="w-4 h-4 mr-2" />
                Download Report (PDF)
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}