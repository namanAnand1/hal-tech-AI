// components/ShimmerBox.jsx
import React from 'react';

const ShimmerBox = ({ height = 400 }) => (
  <div
    style={{
      margin: '24px auto',
      maxWidth: 600,
      width: '100%',
      height,
      borderRadius: 16,
      background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
      backgroundSize: '200% 100%',
      animation: 'shimmer 1.5s infinite',
    }}
  />
);

export default ShimmerBox;
