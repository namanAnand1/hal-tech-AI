from alpaca.data.historical import StockHistoricalDataClient
from alpaca.data.requests import StockBarsRequest
from alpaca.data.timeframe import TimeFrame
from alpaca.data.enums import DataFeed
from config import ALPACA_API_KEY, ALPACA_API_SECRET
from datetime import datetime, timedelta

alpaca_client = StockHistoricalDataClient(ALPACA_API_KEY, ALPACA_API_SECRET)

def get_historical_price(symbol: str, days: int = 5):
    print(f"📉 Fetching historical prices for: {symbol}, last {days} days")
    try:
        end_date = datetime.now()
        start_date = end_date - timedelta(days=days)
        request_params = StockBarsRequest(
            symbol_or_symbols=symbol,
            timeframe=TimeFrame.Day,
            start=start_date,
            end=end_date,
            feed=DataFeed.IEX
        )
        bars = alpaca_client.get_stock_bars(request_params)
        prices = [
            {"date": str(bar.timestamp.date()), "close": bar.close}
            for bar in bars[symbol]
        ]
        return {
            "status": 200,
            "data": {
                "symbol": symbol,
                "historical_prices": prices
            },
            "message": f"{symbol} historical prices retrieved."
        }
    except Exception as e:
        print(f"❌ Error fetching historical prices: {e}")
        return {
            "status": 500,
            "data": None,
            "message": str(e)
        }
