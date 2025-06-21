"use client";

import { useState } from "react";
import axios from "axios";

interface Props {
  onClose: () => void;
  onUploadComplete: (url: string) => void;
}

export default function ImageUploadModal({ onClose, onUploadComplete }: Props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await axios.post("/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      onUploadComplete(res.data.url);
      onClose();
    } catch (err) {
      setError("Failed to upload image");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-lg font-semibold mb-4">Upload Profile Image</h2>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {uploading && <p className="mt-2 text-blue-500">Uploading...</p>}
        {error && <p className="mt-2 text-red-500">{error}</p>}
        <button onClick={onClose} className="mt-4 bg-gray-500 px-4 py-2 rounded text-white">
          Close
        </button>
      </div>
    </div>
  );
}
