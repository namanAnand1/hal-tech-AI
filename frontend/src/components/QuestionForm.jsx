import React from 'react';

const QuestionForm = ({ question, setQuestion, handleSubmit, loading }) => {
  const handleVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice recognition not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const spokenText = event.results[0][0].transcript;
      console.log("🎤 Heard:", spokenText);
      setQuestion(spokenText);
    };

    recognition.onerror = (event) => {
      console.error("❌ Voice error:", event.error);
    };

    recognition.start();
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        marginBottom: 20,
        display: 'flex',
        gap: 8,
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <input
        type="text"
        value={question}
        onChange={e => setQuestion(e.target.value)}
        placeholder="Ask a question..."
        style={{
          width: 320,
          padding: 12,
          borderRadius: 6,
          border: '1px solid #ccc',
          fontSize: 16
        }}
        disabled={loading}
      />
      <div style={{ display: 'flex', gap: 8 }}>
      <button
        type="button"
        onClick={handleVoiceInput}
        disabled={loading}
        style={{
          padding: '10px 14px',
          borderRadius: 6,
          fontSize: 18,
          background: '#007bff',
          color: '#fff',
          border: 'none',
          cursor: 'pointer'
        }}
        title="Use voice"
      >
        🔉
      </button>
      <button
        type="submit"
        disabled={loading || !question}
        style={{
          padding: '12px 20px',
          borderRadius: 6,
          fontSize: 16,
          background: '#007bff',
          color: '#fff',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        {loading ? 'Asking...' : 'Ask'}
      </button>
      </div>
    </form>
  );
};

export default QuestionForm;
