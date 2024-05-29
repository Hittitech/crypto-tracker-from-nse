import React from "react";
import "./loading.css";

const Loading = () => {
  return (
    <div className="loading-overlay">
      <div className="spinner"></div>
      <div className="loading-text">Loading ...</div>
    </div>
  );
};

export default Loading;
