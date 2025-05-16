# services/openai/get_top_performers.py
from random import uniform

# Fake/mock data source
MOCK_SYMBOLS = ["AAPL", "TSLA", "MSFT", "NVDA", "AMZN", "META", "GOOGL", "NFLX", "INTC", "AMD"]

def get_top_performers(period: str, limit: int = 5):
    print(f"🔢 Fetching top performers for period: {period}, limit: {limit}")

    try:
        # Mock stock performance data
        performers = []
        for symbol in MOCK_SYMBOLS:
            change = round(uniform(-10, 15), 2)  # simulate % gain/loss
            performers.append({
                "symbol": symbol,
                "change": f"{change:+.2f}%",
                "direction": "gain" if change >= 0 else "loss"
            })

        # Sort by biggest gain
        performers.sort(key=lambda x: float(x["change"].replace("%", "")), reverse=True)
        top = performers[:limit]

        return {
            "status": 200,
            "data": top,
            "message": f"Top {limit} performers for {period}"
        }

    except Exception as e:
        return {
            "status": 500,
            "data": None,
            "message": str(e)
        }
