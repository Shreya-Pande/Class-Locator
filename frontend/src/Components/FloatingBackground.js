// // FloatingBackground.js
import React from 'react';
import './FloatingBackground.css';

const FloatingBackground = () => {
  return (
    <div className="floating-background">
      {[...Array(10)].map((_, i) => (
        <div key={i} className="floating-box" />
      ))}
    </div>
  );
};

export default FloatingBackground;
