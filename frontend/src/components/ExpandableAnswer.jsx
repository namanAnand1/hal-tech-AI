import React, { useState } from 'react';

const ExpandableAnswer = ({ text }) => {
  const [expanded, setExpanded] = useState(false);

  if (!text) return null;

  const words = text.split(' ');
  const shouldTruncate = words.length > 50;
  const preview = shouldTruncate ? words.slice(0, 50).join(' ') + '...' : text;

  return (
    <div style={{
      background: '#fff',
      color: '#222',
      padding: 20,
      borderRadius: 10,
      maxWidth: 520,
      boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
      margin: '0 auto',
      marginBottom: 24,
      fontSize: 16
    }}>
      <strong>Assistant:</strong>
      <p style={{ marginTop: 8, whiteSpace: 'pre-line' }}>
        {expanded || !shouldTruncate ? text : preview}
      </p>
      {shouldTruncate && (
        <button
          onClick={() => setExpanded(!expanded)}
          style={{
            marginTop: 8,
            padding: '6px 12px',
            fontSize: 14,
            background: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            cursor: 'pointer'
          }}
        >
          {expanded ? 'Show Less' : 'Read More'}
        </button>
      )}
    </div>
  );
};

export default ExpandableAnswer;
