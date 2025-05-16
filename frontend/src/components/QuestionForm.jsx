import React, { useState, useEffect } from 'react';

const QuestionForm = ({ question, setQuestion, handleSubmit, loading }) => {
  const [listening, setListening] = useState(false);
  const [voiceTriggered, setVoiceTriggered] = useState(false);

  const handleVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice recognition not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    recognition.onstart = () => {
      setListening(true);
      setVoiceTriggered(false);
    };

    recognition.onresult = (event) => {
      const spokenText = event.results[0][0].transcript;
      console.log("🎤 Heard:", spokenText);
      setQuestion(spokenText);
      setVoiceTriggered(true);
    };

    recognition.onerror = (event) => {
      console.error("❌ Voice error:", event.error);
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.start();
  };

  // When question updates from voice *and* we've stopped listening, submit
  useEffect(() => {
    if (voiceTriggered && !listening) {
      handleSubmit({ preventDefault: () => {} });
      setVoiceTriggered(false);
    }
  }, [question, listening, voiceTriggered, handleSubmit]);

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

      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <button
          type="button"
          onClick={handleVoiceInput}
          disabled={loading}
          style={{
            position: 'relative',
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
          {listening && (
            <span
              style={{
                position: 'absolute',
                top: -4,
                right: -4,
                width: 12,
                height: 12,
                borderRadius: '50%',
                boxShadow: '0 0 3px #000',
                animation: 'pulse 1s infinite'
              }}
            />
          )}
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

      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.4); }
            100% { transform: scale(1); }
          }
        `}
      </style>
    </form>
  );
};

export default QuestionForm;
