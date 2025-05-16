from alpaca.data.historical import StockHistoricalDataClient
from alpaca.data.requests import StockLatestQuoteRequest
from alpaca.trading.client import TradingClient
from alpaca.trading.requests import MarketOrderRequest
from alpaca.trading.enums import OrderSide, TimeInForce
from config import ALPACA_API_KEY, ALPACA_API_SECRET

# Default Alpaca clients
default_trading_client = TradingClient(ALPACA_API_KEY, ALPACA_API_SECRET, paper=True)
default_quote_client = StockHistoricalDataClient(ALPACA_API_KEY, ALPACA_API_SECRET)

def trade_stock(symbol: str, action: str, quantity: int, trading_client=default_trading_client, quote_client=default_quote_client):
    print(f"📈 Trading stock: {symbol} - {action} - {quantity}")
    try:
        # Fetch latest ask price for estimate
        request_params = StockLatestQuoteRequest(symbol_or_symbols=[symbol])
        quote_data = quote_client.get_stock_latest_quote(request_params)
        ask_price = quote_data[symbol].ask_price
        estimated_total = round(ask_price * quantity, 2)

        # Submit order
        order_data = MarketOrderRequest(
            symbol=symbol,
            qty=quantity,
            side=OrderSide.BUY if action == "buy" else OrderSide.SELL,
            time_in_force=TimeInForce.GTC
        )
        order = trading_client.submit_order(order_data)

        return {
            "status": 200,
            "data": {
                "order_id": order.id,
                "filled_qty": order.filled_qty,
                "message": (
                    f"{action.title()} order placed for {quantity} share(s) of {symbol.upper()}.\n"
                    f"Estimated price per share: ${ask_price:.2f}\n"
                    f"Estimated total: ${estimated_total:.2f}"
                )
            },
            "message": f"Trade executed for {symbol.upper()}."
        }

    except Exception as e:
        error_msg = str(e)
        if "symbol" in error_msg.lower() or "not found" in error_msg.lower():
            error_msg = (
                f"Alpaca does not support trading for '{symbol.upper()}'. "
                "Only US-listed stocks (NYSE, NASDAQ) are available for trading."
            )
        print(f"❌ Trade error: {error_msg}")
        return {
            "status": 400,
            "data": None,
            "message": error_msg
        }
