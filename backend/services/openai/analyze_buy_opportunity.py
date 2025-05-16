from services.alpaca import get_historical_price, get_stock_price
from config import OPENAI_API_KEY
import openai

client = openai.OpenAI(api_key=OPENAI_API_KEY)

def analyze_buy_opportunity(symbol: str):
    print(f"✨ Analyzing buy opportunity for {symbol}")
    trend = get_historical_price(symbol)
    current = get_stock_price(symbol)

    if trend["status"] != 200 or current["status"] != 200:
        return {
            "status": 500,
            "data": None,
            "message": "Unable to fetch trend or price data for analysis."
        }

    trend_data = trend["data"]["historical_prices"]
    current_price = current["data"]["ask_price"]

    prompt = (
        f"Analyze if now is a good time to buy the stock {symbol}. "
        f"Base your analysis on this 5-day trend: {trend_data} and current price ${current_price}.\n"
        f"Comment on trends, volatility, and market behavior but DO NOT give financial advice."
    )

    try:
        result = client.chat.completions.create(
            model="gpt-4",
            messages=[{"role": "user", "content": prompt}]
        )

        return {
            "status": 200,
            "data": {"response": result.choices[0].message.content},
            "message": f"Sentiment analysis for {symbol}"
        }
    except Exception as e:
        return {
            "status": 500,
            "data": None,
            "message": str(e)
        }
