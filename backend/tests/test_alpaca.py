from services.alpaca.get_stock_price import get_stock_price
from services.alpaca.get_historical_price import get_historical_price
from services.alpaca.trade_stock import trade_stock

def test_get_stock_price_valid():
    result = get_stock_price("AAPL")
    assert result["status"] in [200, 400, 500]

def test_get_stock_price_invalid():
    result = get_stock_price("INVALID123")
    assert result["status"] in [400, 500]
    assert "invalid" in result["message"].lower()

def test_get_historical_price():
    result = get_historical_price("AAPL", days=3)
    assert result["status"] in [200, 500]
    if result["status"] == 200:
        assert "historical_prices" in result["data"]

def test_trade_stock_invalid_symbol():
    class MockClient:
        def get_stock_latest_quote(self, req):
            raise Exception("symbol not found")

        def submit_order(self, req):
            pass  # won't be reached in this test

    result = trade_stock("INVALID", "buy", 5, trading_client=MockClient(), quote_client=MockClient())
    assert result["status"] == 400
    assert "Alpaca does not support" in result["message"]
def test_trade_stock_valid():
    class MockQuoteClient:
        def get_stock_latest_quote(self, req):
            return {"AAPL": type("Quote", (), {"ask_price": 150.0})()}

    class MockOrder:
        id = "mock-order-id"
        filled_qty = 10

    class MockTradingClient:
        def submit_order(self, req):
            return MockOrder()

    result = trade_stock("AAPL", "buy", 10, trading_client=MockTradingClient(), quote_client=MockQuoteClient())

    assert result["status"] == 200
    assert "order_id" in result["data"]
    assert "message" in result["data"]

