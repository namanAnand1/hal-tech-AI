import React from 'react';

const TopPerformersTable = ({ data = [], period }) => {
  if (!data.length) return null;

  return (
    <div style={{ maxWidth: 600, margin: '32px auto', background: '#fff', padding: 20, borderRadius: 10, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
      <h2 style={{ textAlign: 'center', marginBottom: 16 }}>Top Performers ({period})</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 16 }}>
        <thead>
          <tr style={{ background: '#f0f4f8' }}>
            <th style={{ padding: 10, borderBottom: '1px solid #ccc', textAlign: 'left' }}>Symbol</th>
            <th style={{ padding: 10, borderBottom: '1px solid #ccc', textAlign: 'right' }}>Change</th>
            <th style={{ padding: 10, borderBottom: '1px solid #ccc', textAlign: 'right' }}>Direction</th>
          </tr>
        </thead>
        <tbody>
          {data.map((stock, i) => (
            <tr key={i}>
              <td style={{ padding: 10, borderBottom: '1px solid #eee' }}>{stock.symbol}</td>
              <td style={{ padding: 10, borderBottom: '1px solid #eee', textAlign: 'right', color: stock.direction === 'gain' ? 'green' : 'red' }}>{stock.change}</td>
              <td style={{ padding: 10, borderBottom: '1px solid #eee', textAlign: 'right' }}>{stock.direction}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopPerformersTable;