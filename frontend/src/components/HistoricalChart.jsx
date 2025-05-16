import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';

// Format "2025-05-07" → "07 May"
const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short' // May, Jun, etc.
  });
};

const HistoricalChart = ({ data, symbol }) => {
  if (!data || data.length === 0) return null;

  return (
    <div style={{ maxWidth: 600, width: '100%', margin: '24px auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: 10 }}>
        {symbol} 5-Day Trend
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickFormatter={formatDate}
            tick={{ fontSize: 12 }}
          />
          <YAxis domain={['auto', 'auto']} />
          <Tooltip
            labelFormatter={formatDate}
            formatter={(value) => [`$${value.toFixed(2)}`, 'Close']}
          />
          <Line
            type="monotone"
            dataKey="close"
            stroke="#007bff"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HistoricalChart;
