import json
import openai
from config import OPENAI_API_KEY
from services.alpaca import get_stock_price, trade_stock, get_historical_price
from services.openai.get_financial_info import get_financial_info
from services.openai.tool_definitions import tools
from services.openai.get_top_performers import get_top_performers
from services.openai.analyze_buy_opportunity import analyze_buy_opportunity

client = openai.OpenAI(api_key=OPENAI_API_KEY)


def process_question(user_input):
    messages = [
        {
            "role": "system",
            "content": (
                "You are a helpful trading assistant. "
                "You can do the following:\n"
                "1. Check the current stock price using `get_stock_price`.\n"
                "2. Place a market order to buy or sell using `trade_stock`.\n"
                "3. Fetch recent historical prices using `get_historical_price`, for users who want to see stock performance over time.\n"
                "4. Explain a financial term or simulate news headlines using `get_financial_info`.\n"
                "5. Suggest if it's a good time to buy a stock using `analyze_buy_opportunity`.\n"
                "6. Show top-performing stocks over weekly/monthly/annual periods using `get_top_performers`.\n\n"
                "If the user asks how a stock has performed, or mentions trends, history, past days, or graphs — use `get_historical_price`.\n"
                "Only use one tool per response. If the query is unrelated to finance or stocks, respond politely with a fallback message."
            )
        },
        {
            "role": "user",
            "content": user_input
        }
    ]

    response = client.chat.completions.create(
        model="gpt-4",
        messages=messages,
        tools=tools,
        tool_choice="auto"
    )

    message = response.choices[0].message

    if message.tool_calls:
        tool_call = message.tool_calls[0]
        args = json.loads(tool_call.function.arguments)

        if tool_call.function.name == "get_stock_price":
            return get_stock_price(args.get("symbol"))
        elif tool_call.function.name == "trade_stock":
            return trade_stock(args["symbol"], args["action"], args["quantity"])
        elif tool_call.function.name == "get_historical_price":
            return get_historical_price(args["symbol"], args.get("days", 5))
        elif tool_call.function.name == "get_financial_info":
            return get_financial_info(args["query"])
        elif tool_call.function.name == "get_top_performers":
            return get_top_performers(args["period"], args.get("limit", 5))
        elif tool_call.function.name == "analyze_buy_opportunity":
            return analyze_buy_opportunity(args["symbol"])

    # No tool used — check if GPT’s message is still helpful
    content = (message.content or "").strip().lower()
    helpful_keywords = ["stock", "price", "share", "buy", "sell", "trade", "market", "ticker", "order"]
    if any(word in content for word in helpful_keywords) and len(content) > 20:
        return {
            "status": 200,
            "data": {"response": message.content},
            "message": "Direct GPT response"
        }

    # Fallback response
    fallback_msg = (
        "I can help with stock prices, trades, or trends. Try something like 'Price of AAPL' or 'Buy 10 TSLA shares'."
    )
    return {
        "status": 200,
        "data": {"response": fallback_msg},
        "message": "Fallback used due to off-topic or vague GPT response"
    }
