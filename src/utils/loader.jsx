import React from "react";

const Loader = ({ color = "gray-100", size=6 }) => {
  return (
    <div className="flex items-center justify-center">
      <div
        className={`animate-spin rounded-full h-${size} w-${size} border0 border-b-1 border-${color} `}
      ></div>
    </div>
  );
};
const LoaderFull = () => (
  <div className="flex justify-center items-center min-h-screen">
    <div className="w-16 h-16 border-l-1 border-t-2 border-blue-500 rounded-full animate-spin"></div>
  </div>
);
export {Loader,LoaderFull};