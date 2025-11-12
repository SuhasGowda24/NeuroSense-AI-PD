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

      <h2 className="text-2xl font-semibold text-gray-800">Spiral Drawing Test</h2>
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
                <td className="px-3 py-1">{p.button}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
