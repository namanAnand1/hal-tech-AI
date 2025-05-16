import React, { useState } from 'react';

export default function TradeConfirmationBox({ loading, error, data }) {
  const [showOrderId, setShowOrderId] = useState(false);

  // Loading state
  if (loading) {
    return (
      <div style={{ padding: 24 }}>
        <p>Processing trade…</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div style={{ padding: 24 }}>
        <p style={{ color: 'red', margin: 0 }}>{error}</p>
      </div>
    );
  }

  // No data to display
  if (!data) {
    return null;
  }

  const { message, filled_qty, order_id } = data;

  return (
    <div style={{ margin: 24 }}>
      {/* Display each line of the message */}
      <div style={{ marginBottom: 16 }}>
        {message.split('\n').map((line, index) => (
          <p key={index} style={{ margin: '4px 0' }}>{line}</p>
        ))}
      </div>

      {/* Shares filled info */}
      <p style={{ margin: '10px 0', fontWeight: 500 }}>
        Shares filled: {filled_qty}
      </p>

      {/* Toggle order ID */}
      <button onClick={() => setShowOrderId(prev => !prev)}>
        {showOrderId ? 'Hide Order ID' : 'View Order ID'}
      </button>

      {/* Conditional rendering of order ID */}
      {showOrderId && (
        <p style={{ marginTop: 8 }}>Order ID: {order_id}</p>
      )}
    </div>
  );
}

