import React, { useRef, useState, useEffect, useCallback } from "react";
import { Loader2, Sparkles, Download, ChevronDown, Info } from "lucide-react";
import axiosClient from "../../lib/axiosClient";  

//  TASK DROPDOWN COMPONENT 
function TaskDropdown({ selectedTask, setSelectedTask }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredTask, setHoveredTask] = useState(null);

  const tasks = [
    { id: 'spiral', label: 'Spiral', description: 'Generate spiral patterns', image: "/assets/Spiral.png"},
    { id: 'l_char', label: 'L Character', description: 'L-shaped character task', image: '/assets/L-Char.png' },
    { id: 'le_char', label: 'Le Character', description: 'LE character variation', image: '/assets/Le-Char.png' },
    { id: 'les', label: 'Les', description: 'Les task variation', image: '/assets/Les-Char.png' },
    { id: 'lektorka', label: 'Lektorka', description: 'Lektorka task type', image: '/assets/Lektorka-Char.png' },
    { id: 'porovnal', label: 'Porovnal', description: 'Comparison task', image: '/assets/Porovnal-Char.png' },
    { id: 'nepopadnout', label: 'Nepopadnout', description: 'Nepopadnout task', image: '/assets/Nepopadnout-Char.png' },
    { id: 'Tramvaj', label: 'Tramvaj', description: 'Tramvaj task type', image: '/assets/Tramvaj-Char.png' }
  ];

  const selectedTaskObj = tasks.find(t => t.id === selectedTask);

  return (
    <div className="p-8">
      <div className="relative w-96">
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Select Task
        </label>
        
        {/* Dropdown Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full bg-white border-2 border-slate-300 rounded-lg px-4 py-3 flex items-center justify-between hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors">
          <div className="flex-1 text-left">
            <div className="font-medium text-slate-800">{selectedTaskObj.label}</div>
            <div className="text-xs text-slate-500">{selectedTaskObj.description}</div>
          </div>
          <ChevronDown 
            className={`w-5 h-5 text-slate-500 transition-transform ml-2 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border-2 border-slate-300 rounded-lg shadow-lg max-h-80 overflow-y-auto">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="relative"
              >
                <button
                  onClick={() => {
                    setSelectedTask(task.id);
                    setIsOpen(false);
                    setHoveredTask(null);
                  }}
                  className={`w-full px-4 py-3 text-left hover:bg-blue-50 flex items-center gap-2 transition-colors${
                    selectedTask === task.id ? 'bg-blue-100' : ''
                  } ${task.id !== tasks[0].id ? 'border-t border-slate-200' : ''}`}
                >
                  <div className="flex-1">
                    <div className={`font-medium ${
                      selectedTask === task.id ? 'text-blue-600' : 'text-slate-800'
                    }`}>
                      {task.label}
                    </div>
                    <div className="text-xs text-slate-500">{task.description}</div>
                  </div>
                     <div
                    onMouseEnter={() => setHoveredTask(task.id)}
                    onMouseLeave={() => setHoveredTask(null)}
                    className="relative"
                    onClick={(e) => e.stopPropagation()}
                  >
                  <Info className="w-4 h-4 text-slate-400 hover:text-blue-500 flex-shrink-0 cursor-help transition-colors" />

                {/* Hover Image Tooltip */}
                {hoveredTask === task.id && (
                      <div className="fixed z-50 pointer-events-none" style={{
                        left: '420px',
                        top: `${document.querySelector(`[data-task-id="${task.id}"]`)?.getBoundingClientRect().top || 0}px`
                      }}>
                        <div className="bg-white border-2 border-blue-400 rounded-lg shadow-2xl p-2 animate-[popIn_0.2s_ease-out]">
                          <img 
                            src={task.image} 
                            alt={task.label}
                            className="w-48 h-32 object-cover rounded"
                          />
                          <div className="mt-2 px-1">
                            <div className="font-semibold text-slate-800 text-xs">{task.label}</div>
                            <div className="text-xs text-slate-600">{task.description}</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </button>
                <div data-task-id={task.id} className="absolute top-0 left-0 w-0 h-0 pointer-events-none" />
              </div>
            ))}
          </div>
        )}
      </div>
      
      <style>{`
        @keyframes popIn {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}

//  MAIN DRAWING PAD
export default function DrawingPad() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [points, setPoints] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);
  const [taskType, setTaskType] = useState("spiral");
  const [inputType, setInputType] = useState(null);
  const isDrawingRef = useRef(false);

  // --- FIXED getPointData ---
  const getPointData = useCallback((e, type) => {
  const canvas = canvasRef.current;
  const rect = canvas.getBoundingClientRect();

  // Scale factors
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;

  const rawX = (e.clientX - rect.left) * scaleX;
  const rawY = (e.clientY - rect.top) * scaleY;

  const x = rawX / canvas.width;
  const y = rawY / canvas.height;


  let pressure = 1;
  if (e.pointerType === "pen") {
  pressure = e.pressure && e.pressure > 0 ? e.pressure : 0.5;
} else if (e.pointerType === "touch") {
    pressure = 0.5;
  }

  return {
    x,
    y,
    time: Date.now(),
    pressure,
    button: type === "end" ? "Released" : "Pressed"
  };
}, []);

  useEffect(() => {
  const canvas = canvasRef.current;
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.strokeStyle = "#000000";

  const startDraw = (e) => {
  e.preventDefault();
  canvas.setPointerCapture(e.pointerId);

  const typeMap = {
    pen: "Stylus",
    touch: "Touch",
    mouse: "Mouse",
  };

  setInputType(typeMap[e.pointerType] || "Unknown");

  isDrawingRef.current = true;   
  setIsDrawing(true);
    setPoints((prev) => [...prev, getPointData(e, "start")]);
  };

  const draw = (e) => {
    if (!isDrawingRef.current) return;  
    e.preventDefault();

    setPoints((prev) => {
      const point = getPointData(e, "draw");
      const updated = [...prev, point];
      const prevPoint = updated[updated.length - 2];

      if (prevPoint) {
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(prevPoint.x * canvas.width, prevPoint.y * canvas.height);
        ctx.lineTo(point.x * canvas.width, point.y * canvas.height);
        ctx.stroke();
      }
      return updated;
    });
  };

  const stopDraw = (e) => {
    if (!isDrawingRef.current) return;

    isDrawingRef.current = false;   
    setIsDrawing(false);
    setPoints((prev) => [...prev, getPointData(e, "end")]);
  };

  canvas.addEventListener("pointerdown", startDraw);
  canvas.addEventListener("pointermove", draw);
  canvas.addEventListener("pointerup", stopDraw);
  canvas.addEventListener("pointerleave", stopDraw);
  canvas.addEventListener("pointercancel", stopDraw);

  return () => {
    canvas.removeEventListener("pointerdown", startDraw);
    canvas.removeEventListener("pointermove", draw);
    canvas.removeEventListener("pointerup", stopDraw);
    canvas.removeEventListener("pointerleave", stopDraw);
    canvas.removeEventListener("pointercancel", stopDraw);
  };
}, [getPointData]);

  // --- Clear Canvas ---
  const clearCanvas = () => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    setPoints([]);
    setPredictionResult(null);
  };

  // --- Save & Analyze Drawing ---
  const saveDrawing = async () => {
    if (points.length === 0) {
      alert("Please draw something before saving!");
      return;
    }

    setIsUploading(true);

    try {
      // convert canvas to PNG
      const canvas = canvasRef.current;
      const blob = await new Promise((resolve) =>
        canvas.toBlob(resolve, "image/png")
      );

      // clean + sort points
      const cleanedPoints = points
        .map((p) => ({
          x: Number(p.x),
          y: Number(p.y),
          time: Number(p.time),
          pressure: Number(p.pressure),
          button: p.button,
        }))
        .sort((a, b) => a.time - b.time);

      // FIXED: formData defined
      const formData = new FormData();
      formData.append("image", blob);
      formData.append("points", JSON.stringify(cleanedPoints));
      formData.append("taskType", taskType);
      const res = await axiosClient.post(
        "/drawings/save-drawing",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      const { prediction, confidence, message } = res.data;

      setPredictionResult({
        prediction,
        confidence,
        message,
      });

      alert("Drawing uploaded & analyzed!");

    } catch (err) {
      console.error("Error saving drawing:", err);
      alert("Upload/analysis failed!");
    } finally {
      setIsUploading(false);
    }
  };
// ✅ FIXED Download Function (correct scaling)
const downloadDrawing = () => {
  const canvas = canvasRef.current;

  // Create an offscreen canvas
  const exportCanvas = document.createElement("canvas");
  exportCanvas.width = canvas.width;
  exportCanvas.height = canvas.height;

  const exportCtx = exportCanvas.getContext("2d");

  // White background (important)
  exportCtx.fillStyle = "#ffffff";
  exportCtx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);

  // Copy drawing exactly
  exportCtx.drawImage(canvas, 0, 0);

  // Download
  const link = document.createElement("a");
  link.download = "drawing.png";
  link.href = exportCanvas.toDataURL("image/png");
  link.click();
};

  return (
    // <div className="flex flex-col items-center space-y-6">
    <div className="flex flex-col items-center space-y-6 max-w-lg mx-auto">
      {/* Download Button */}
      <div className="w-full flex justify-start px-36">
        <button
          onClick={downloadDrawing}
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

      {/* Task Selector */}
      <TaskDropdown selectedTask={taskType} setSelectedTask={setTaskType} />

      <h2 className="text-2xl font-semibold text-gray-800">
        Spiral Drawing Test
      </h2>
{inputType && (
  <div className="flex justify-center items-center mt-2">
    <div
      className={`px-4 py-1 rounded-full text-sm font-medium shadow-sm ${
        inputType === "Stylus"
          ? "bg-green-100 text-green-700"
          : inputType === "Touch"
          ? "bg-orange-100 text-orange-700"
          : "bg-blue-100 text-blue-700"
      }`}
    >
      Device: {inputType}
    </div>
  </div>
)}

   {inputType && inputType !== "Stylus" && (
  <p className="text-orange-500 text-sm text-center mt-1">
    ⚠️ For best accuracy, use a stylus-enabled device
  </p>
)}

<canvas
  ref={canvasRef}
  width={
    window.innerWidth < 640
      ? 300        // mobile
      : window.innerWidth < 1024
      ? 420        // tablet
      : 480        // desktop (smaller)
  }
  height={
    window.innerWidth < 640
      ? 200
      : window.innerWidth < 1024
      ? 300
      : 320
  }
  style={{ touchAction: "none" }}
  className="w-full max-w-md mx-auto border-2 border-gray-600 bg-white rounded-lg shadow-md cursor-crosshair touch-none"
/>

      {/* Buttons */}
      <div className="flex flex-col items-center space-y-2 w-full">
        <div className="flex space-x-3 w-full justify-center">
          <button
            onClick={clearCanvas}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            Clear
          </button>

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

        {points.length === 0 && (
          <p className="text-sm text-gray-700 mt-2 ml-20 text-center">
            Start drawing to enable AI analysis
          </p>
        )}
      </div>

      {/* Prediction Result */}
      {predictionResult && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow text-center w-full max-w-md">
          <h3 className="text-lg font-semibold text-gray-700">
            AI Prediction
          </h3>
          <p className="text-gray-900 mt-1">
            {predictionResult.message}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            Confidence:{" "}
            {(predictionResult.confidence * 100).toFixed(2)}%
          </p>
        </div>
      )}

      {/* Table */}
      <div className="w-full max-w-3xl mt-6 overflow-y-auto bg-white rounded-lg shadow-md">
        <table className="w-full text-sm text-left border border-gray-200">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-3 py-2">#</th>
              <th className="px-3 py-2">X</th>
              <th className="px-3 py-2">Y</th>
              <th className="px-3 py-2">Time (ms)</th>
              <th className="px-3 py-2">Pressure</th>
              <th className="px-3 py-2">Button</th>
            </tr>
          </thead>
          <tbody>
            {points.slice(-20).map((p, i) => (
              <tr key={i} className="border-t">
                <td className="px-3 py-1">{i + 1}</td>
                <td className="px-3 py-1"> {canvasRef.current ? (p.x * canvasRef.current.width).toFixed(1) : 0}</td>
                <td className="px-3 py-1"> {canvasRef.current ? (p.y * canvasRef.current.height).toFixed(1) : 0}</td>
                <td className="px-3 py-1">{p.time}</td>
                <td className="px-3 py-1">{p.pressure?.toFixed(2)}</td>
                <td className="px-3 py-1">{p.button}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}