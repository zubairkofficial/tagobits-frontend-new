import React, { useState, useEffect } from "react";
import axiosInstance from '../helper/axios';
import { API_BASE_URL } from '../helper/axios';
import { FaCloudUploadAlt, FaTrashAlt, FaStar, FaEdit } from 'react-icons/fa';
import { useDropzone } from 'react-dropzone';

interface Logo {
  id: number;
  image_path: string;
  title: string | null;
  is_center: boolean;
}

const LogoUpload: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [logos, setLogos] = useState<Logo[]>([]);
  const [titles, setTitles] = useState<string[]>([]);
  const [centerIndex, setCenterIndex] = useState<number | null>(null);
  const [editLogoId, setEditLogoId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState<string>("");

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      const newPreviews = acceptedFiles.map((file) => URL.createObjectURL(file));
      setFiles((prev) => [...prev, ...acceptedFiles]);
      setPreviews((prev) => [...prev, ...newPreviews]);
      setTitles((prev) => [...prev, ""]);
    },
    multiple: true,
    accept: 'image/*',
  });

  const handleTitleChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const newTitles = [...titles];
    newTitles[index] = event.target.value;
    setTitles(newTitles);
  };

  const onUpload = async () => {
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append("logos", file);
      formData.append("titles", titles[index] || "");
      const is_center = (centerIndex === index).toString();
      formData.append("is_centers", is_center);
    });

    try {
      const response = await axiosInstance.post(
        "/partnerlogos",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setLogos((prev) => [...prev, ...response.data]);
      setFiles([]);
      setPreviews([]);
      setTitles([]);
      setCenterIndex(null);
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  const fetchLogos = async () => {
    try {
      const response = await axiosInstance.get<Logo[]>("/partnerlogos");
      setLogos(response.data);
    } catch (error) {
      console.error("Error fetching logos:", error);
    }
  };

  const deleteLogo = async (id: number) => {
    try {
      await axiosInstance.delete(`/partnerlogos/${id}`);
      setLogos((prev) => prev.filter((logo) => logo.id !== id));
    } catch (error) {
      console.error("Error deleting logo:", error);
    }
  };

  const setAsCenter = async (id: number) => {
    try {
      await axiosInstance.put(`/partnerlogos/${id}/set_center`);
      fetchLogos();
    } catch (error) {
      console.error("Error setting as center:", error);
    }
  };

  const startEditing = (id: number, currentTitle: string | null) => {
    setEditLogoId(id);
    setEditTitle(currentTitle || "");
  };

  const saveTitle = async (id: number) => {
    try {
      await axiosInstance.put(`/partnerlogos/${id}/title`, { title: editTitle });
      fetchLogos();
      setEditLogoId(null);
      setEditTitle("");
    } catch (error) {
      console.error("Error updating title:", error);
    }
  };

  const cancelEditing = () => {
    setEditLogoId(null);
    setEditTitle("");
  };

  const deletePreview = (index: number) => {
    setPreviews((prev) => prev.filter((_, i) => i !== index));
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setTitles((prev) => prev.filter((_, i) => i !== index));
    if (centerIndex === index) {
      setCenterIndex(null);
    } else if (centerIndex !== null && centerIndex > index) {
      setCenterIndex(centerIndex - 1);
    }
  };

  useEffect(() => {
    fetchLogos();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">TagoCash Partners</h2>

      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
        <div
          {...getRootProps()}
          className="cursor-pointer bg-gray-100 border-2 border-gray-300 border-dashed p-6 rounded-lg text-center hover:bg-gray-200 transition duration-200 ease-in-out transform hover:scale-102 hover:shadow-lg w-full sm:w-auto"
        >
          <input {...getInputProps()} />
          <p className="text-sm text-gray-600">
            {previews.length > 0 ? "Change Files" : "Drag & Drop Files Here or Click to Browse"}
          </p>
        </div>

        <button
          onClick={onUpload}
          className="bg-blue-500 text-white py-2 px-4 rounded-md text-sm hover:bg-blue-600 transition duration-200 flex items-center space-x-2 w-full sm:w-auto"
        >
          <FaCloudUploadAlt />
          <span>Upload</span>
        </button>
      </div>

      {previews.length > 0 && (
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          {previews.map((preview, index) => (
            <div
              key={index}
              className="relative group w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 overflow-hidden rounded-lg border-2 border-gray-300 shadow-lg transform transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-xl"
            >
              <img
                src={preview}
                alt={`Preview ${index}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity duration-200 ease-in-out"></div>
              <button
                onClick={() => deletePreview(index)}
                className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out"
              >
                <FaTrashAlt className="text-red-500 text-xl transform transition-transform duration-200 hover:rotate-45" />
              </button>
              <input
                type="text"
                value={titles[index]}
                onChange={(e) => handleTitleChange(index, e)}
                placeholder="Enter title (optional)"
                className="absolute bottom-6 left-2 text-sm text-white bg-gray-700 opacity-75 px-2 py-1 rounded max-w-30"
              />
              <label className="absolute bottom-0 left-2 text-sm text-white bg-gray-700 opacity-75 px-2 py-1 rounded">
                <input
                  type="radio"
                  name="center"
                  checked={centerIndex === index}
                  onChange={() => setCenterIndex(index)}
                  className="mr-1"
                />
                Set as center
              </label>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-8 mt-13">
        {logos.map((logo) => (
          <div key={logo.id} className="flex flex-col justify-end relative group max-w-60 max-h-70">
            <img
              src={`${API_BASE_URL}/fetch-partnerlogo/${logo.image_path}`}
              alt={logo.title || "Logo"}
              className="max-w-70 max-h-70 object-contain rounded-md shadow-md transition-all duration-200 ease-in-out transform group-hover:scale-102 hover:shadow-lg"
            />
            <div className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out">
              <FaTrashAlt
                className="text-red-500 text-xl transform transition-transform duration-200 hover:rotate-45"
                onClick={() => deleteLogo(logo.id)}
              />
            </div>
            {logo.is_center ? (
              <div className="absolute top-2 left-2 p-2 bg-yellow-500 rounded-full shadow-md text-white">
                <FaStar />
              </div>
            ) : (
              <button
                onClick={() => setAsCenter(logo.id)}
                className="absolute bottom-2 left-2 bg-blue-500 text-white py-1 px-2 rounded-md text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              >
                Set as center
              </button>
            )}
            <button
              onClick={() => startEditing(logo.id, logo.title)}
              className="absolute bottom-2 right-2 bg-green-500 text-white py-1 px-2 rounded-md text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              <FaEdit />
            </button>
            {editLogoId === logo.id ? (
              <div className="absolute bottom-2 left-0 right-0 mx-2 flex items-center justify-between bg-gray-100 rounded-md p-1">
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  placeholder="Enter title (optional)"
                  className="text-sm text-gray-800 px-2 py-1 rounded w-full"
                />
                <button
                  onClick={() => saveTitle(logo.id)}
                  className="ml-2 bg-blue-500 text-white py-1 px-2 rounded-md text-xs"
                >
                  Save
                </button>
                <button
                  onClick={cancelEditing}
                  className="ml-2 bg-red-500 text-white py-1 px-2 rounded-md text-xs"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="mt-2 text-center text-sm text-gray-600">{logo.title || "No title"}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogoUpload;