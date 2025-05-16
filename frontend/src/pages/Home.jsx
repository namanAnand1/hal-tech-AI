import React, { useReducer, useEffect } from 'react';
import QuestionForm from '../components/QuestionForm';
import AnswerBox from '../components/AnswerBox';
import StockPriceBox from '../components/StockPriceBox';
import { askQuestion } from '../services/api';
import HistoricalChart from '../components/HistoricalChart';
import TradeConfirmationBox from '../components/TradeConfirmationBox';
import ExpandableAnswer from '../components/ExpandableAnswer';
import TopPerformersTable from '../components/TopPerformersTable';
import ShimmerBox from '../components/ShimmerBox';

const initialState = {
  question: '',
  answer: '',
  loading: false,
  error: '',
  historical: [],
  priceData: null,
  symbol: '',
  tradeData: null,
  topPerformers: [],
  topPeriod: ''
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: true, error: '' };
    case 'RESET_ALL':
      return { ...initialState, question: state.question, loading: true };
    case 'SET_ANSWER':
      return { ...state, answer: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_PRICE':
      return { ...state, priceData: action.payload };
    case 'SET_HISTORICAL':
      return { ...state, historical: action.payload.prices, symbol: action.payload.symbol };
    case 'SET_TRADE':
      return { ...state, tradeData: action.payload };
    case 'SET_TOP':
      return { ...state, topPerformers: action.payload.data, topPeriod: action.payload.period };
    case 'SET_QUESTION':
      return { ...state, question: action.payload };
    case 'SET_LOADING_COMPLETE':
      return { ...state, loading: false };
    default:
      return state;
  }
}

const Home = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'RESET_ALL' });

    try {
      const response = await askQuestion(state.question);
      console.log("📥 GPT Tool Response:", response);

      if (response.status === 200 && response.data) {
        if (response.data.ask_price) {
          dispatch({ type: 'SET_PRICE', payload: {
            symbol: response.data.symbol,
            ask_price: response.data.ask_price
          }});
        }

        if (response.data.historical_prices) {
          dispatch({ type: 'SET_HISTORICAL', payload: {
            prices: response.data.historical_prices,
            symbol: response.data.symbol
          }});
        }

        if (response.data.order_id) {
          dispatch({ type: 'SET_TRADE', payload: response.data });
        }

        if (Array.isArray(response.data) && response.data[0]?.symbol && response.data[0]?.change) {
          dispatch({ type: 'SET_TOP', payload: { data: response.data, period: 'monthly' }});
        }

        if (response.data.response) {
          dispatch({ type: 'SET_ANSWER', payload: response.data.response });
        } else if (response.message) {
          dispatch({ type: 'SET_ANSWER', payload: response.message });
        }
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.message || "No useful response received." });
      }
    } catch {
      dispatch({ type: 'SET_ERROR', payload: 'Error connecting to backend.' });
    }

    dispatch({ type: 'SET_LOADING_COMPLETE' });
  };

  useEffect(() => {
    const fetchHistorical = async () => {
      try {
        const res = await fetch('/api/ask', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ question: 'Show TSLA trend for past 5 days' })
        });

        const response = await res.json();

        if (response.status === 200 && response.data?.historical_prices) {
          dispatch({
            type: 'SET_HISTORICAL',
            payload: {
              prices: response.data.historical_prices,
              symbol: response.data.symbol || ""
            }
          });
        } else {
          console.error("No historical data in response:", response.message);
        }
      } catch (err) {
        console.error("Error loading historical data:", err);
      }
    };

    fetchHistorical();
  }, []);

  return (
    <div className="App modern-font">
      <header className="App-header">
        <div style={{ height: 60 }} />
        <h1 style={{ marginBottom: 8 }}>IDB Agent</h1>

        <QuestionForm
          question={state.question}
          setQuestion={(q) => dispatch({ type: 'SET_QUESTION', payload: q })}
          handleSubmit={handleSubmit}
          loading={state.loading}
        />

        {state.loading ? (
          <ShimmerBox height={500} />
        ) : (
          <div className="results-block" style={{ maxWidth: '90vw', width: '900px', margin: '0 auto' }}>
            {state.answer && state.answer.split(' ').length > 50 ? (
              <ExpandableAnswer text={state.answer} />
            ) : (
              <AnswerBox answer={state.answer} error={state.error} />
            )}

            {state.priceData && (
              <StockPriceBox price={state.priceData.ask_price} symbol={state.priceData.symbol} />
            )}

            <HistoricalChart data={state.historical} symbol={state.symbol} widthOverride="100%" />

            {state.tradeData && (
              <TradeConfirmationBox data={state.tradeData} />
            )}

            {state.topPerformers?.length > 0 && (
              <TopPerformersTable data={state.topPerformers} period={state.topPeriod} widthOverride="100%" />
            )}
          </div>
        )}
      </header>
    </div>
  );
};

export default Home;
