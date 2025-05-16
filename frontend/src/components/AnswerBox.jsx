import React from 'react';

const AnswerBox = ({ answer, error }) => {
  if (error) return <div style={{ color: 'red', marginTop: 10 }}>{error}</div>;

  const renderAnswer = (text) => {
    return text.split('\n').map((line, index) => (
      <p key={index} style={{ margin: 0 }}>
        {line}
      </p>
    ));
  };

  return answer ? (
    <div style={{
      background: '#fff',
      color: '#222',
      padding: 20,
      borderRadius: 10,
      maxWidth: 520,
      boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
      margin: '0 auto',
      marginBottom: 24
    }}>
      <strong>Agent:</strong>
      <div>{renderAnswer(answer)}</div>
    </div>
  ) : null;
};

export default AnswerBox;

