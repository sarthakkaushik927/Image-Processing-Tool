import React, { useState } from "react";
import axios from "axios";

const YOLOUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [detectedImage, setDetectedImage] = useState(null);
  const [detections, setDetections] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
    setDetections([]);
    setDetectedImage(null);
  };

  const handleUpload = async () => {
    if (!selectedFile) return alert("Please select an image first!");
    setLoading(true);

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/detect`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setDetections(res.data.detections);
      setDetectedImage(res.data.output_image_url);
    } catch (err) {
      console.error(err);
      alert("Detection failed. Check backend logs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-gray-800 to-slate-950 text-white px-4 py-10">
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8 w-full max-w-lg transition-all hover:scale-[1.01]">
        <h2 className="text-2xl font-semibold mb-6 text-center bg-gradient-to-r from-teal-300 to-lime-400 text-transparent bg-clip-text">
          YOLO Object Detection
        </h2>

        {/* File Upload */}
        <div className="flex flex-col items-center">
          <label
            htmlFor="file"
            className="cursor-pointer px-6 py-3 bg-teal-500/80 rounded-lg shadow hover:bg-teal-400 transition duration-200"
          >
            {selectedFile ? "Change Image" : "Upload Image"}
          </label>
          <input
            id="file"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

          <button
            onClick={handleUpload}
            disabled={!selectedFile || loading}
            className={`mt-4 px-6 py-3 rounded-lg font-medium shadow-md transition ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-lime-500 hover:bg-lime-400"
            }`}
          >
            {loading ? "Detecting..." : "Run Detection"}
          </button>
        </div>

        {/* Image Preview */}
        {preview && (
          <div className="mt-6">
            <h4 className="font-medium text-lg text-center mb-2 text-gray-200">
              Original Image
            </h4>
            <img
              src={preview}
              alt="preview"
              className="rounded-lg shadow-lg mx-auto w-full max-h-[350px] object-contain"
            />
          </div>
        )}

        {/* Detected Image */}
        {detectedImage && (
          <div className="mt-6">
            <h4 className="font-medium text-lg text-center mb-2 text-gray-200">
              Detected Image
            </h4>
            <img
              src={detectedImage}
              alt="detection"
              className="rounded-lg shadow-lg mx-auto w-full max-h-[350px] object-contain"
            />
          </div>
        )}

        {/* Detections List */}
        {detections.length > 0 && (
          <div className="mt-6">
            <h4 className="font-medium text-lg mb-2 text-center text-gray-200">
              Detections
            </h4>
            <div className="flex flex-wrap justify-center gap-2">
              {detections.map((d, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full text-sm bg-gradient-to-r from-emerald-500 to-lime-400 text-black font-semibold shadow"
                >
                  {d.class} — {Math.round(d.confidence * 100)}%
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default YOLOUploader;
