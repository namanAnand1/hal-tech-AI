const StockPriceBox = ({ price, loading, error, symbol = "AAPL" }) => {
  console.log("📦 StockPriceBox received:", { price, symbol, loading, error });

  return (
    <div style={{
      margin: '24px auto 0 auto',
      maxWidth: 520,
      background: '#e3f2fd',
      color: '#0d47a1',
      padding: 20,
      borderRadius: 10,
      boxShadow: '0 2px 12px rgba(33,150,243,0.08)',
      fontSize: 20,
      fontWeight: 600,
      textAlign: 'center'
    }}>
      <div style={{ fontSize: 18, fontWeight: 500, marginBottom: 6 }}>
        Current {symbol} Stock Price
      </div>
      {loading ? (
        <span>Loading...</span>
      ) : error ? (
        <span style={{ color: 'red' }}>{error}</span>
      ) : (
        <span style={{ fontSize: 28, fontWeight: 700 }}>
          ${typeof price === 'number' ? price.toFixed(2) : price}
        </span>
      )}
    </div>
  );
};

export default StockPriceBox;
