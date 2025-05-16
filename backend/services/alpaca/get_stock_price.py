from alpaca.data.historical import StockHistoricalDataClient
from alpaca.data.requests import StockLatestQuoteRequest
from config import ALPACA_API_KEY, ALPACA_API_SECRET

alpaca_client = StockHistoricalDataClient(ALPACA_API_KEY, ALPACA_API_SECRET)

def get_stock_price(symbol: str):
    print(f"📈 Getting stock price for: {symbol}")
    try:
        request_params = StockLatestQuoteRequest(symbol_or_symbols=[symbol])
        quote_data = alpaca_client.get_stock_latest_quote(request_params)
        print(f"📈 Raw Alpaca quote data: {quote_data}")

        if symbol not in quote_data:
            return {
                "status": 404,
                "data": None,
                "message": (
                    f"Alpaca does not support '{symbol.upper()}'. "
                    "It only provides data for US-listed stocks (NYSE, NASDAQ)."
                )
            }

        quote = quote_data[symbol]
        return {
            "status": 200,
            "data": {
                "symbol": symbol,
                "ask_price": quote.ask_price
            },
            "message": f"Current price for {symbol.upper()} retrieved."
        }

    except Exception as e:
        return {
            "status": 500,
            "data": None,
            "message": str(e)
        }


