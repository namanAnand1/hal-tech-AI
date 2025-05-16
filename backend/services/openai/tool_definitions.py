
tools = [
    {
        "type": "function",
        "function": {
            "name": "get_stock_price",
            "description": "Fetch the latest price for a given stock symbol.",
            "parameters": {
                "type": "object",
                "properties": {
                    "symbol": {
                        "type": "string",
                        "description": "Stock symbol (e.g., AAPL, TSLA)"
                    }
                },
                "required": ["symbol"]
            }
        }
    },
    {
    "type": "function",
    "function": {
        "name": "trade_stock",
        "description": "Places a market order to buy or sell a stock immediately at market price. Use this if the user wants to execute a trade, not just check a price.",
        "parameters": {
            "type": "object",
            "properties": {
                "symbol": {"type": "string", "description": "The stock symbol (e.g., AAPL)"},
                "action": {"type": "string", "enum": ["buy", "sell"], "description": "Whether to buy or sell"},
                "quantity": {"type": "integer", "description": "Number of shares to trade"}
            },
                "required": ["symbol", "action", "quantity"]
            }
        }
    },
    {
    "type": "function",
    "function": {
        "name": "get_historical_price",
        "description": "Returns historical closing prices for a given stock symbol over the past few days.",
        "parameters": {
            "type": "object",
            "properties": {
                "symbol": {"type": "string", "description": "The stock symbol (e.g. AAPL)"},
                "days": {"type": "integer", "description": "Number of past days to retrieve", "default": 5}
            },
                "required": ["symbol"]
            }
        }
    },
    {
    "type": "function",
    "function": {
        "name": "get_financial_info",
        "description": "Explains a financial term or gives simulated stock news headlines based on user query.",
        "parameters": {
        "type": "object",
        "properties": {
            "query": {
            "type": "string",
            "description": "The user query, either a financial term to explain (e.g. EPS, limit order), or a stock/company name to get news about (e.g. NVIDIA)."}
            },
            "required": ["query"]
            }
        }
    },
    {
    "type": "function",
    "function": {
        "name": "analyze_buy_opportunity",
        "description": "Simulates whether now is a good time to buy a stock, based on recent trend and current price.",
        "parameters": {
        "type": "object",
        "properties": {
            "symbol": {
            "type": "string",
            "description": "Stock symbol (e.g., AAPL)"
            }
        },
        "required": ["symbol"]
        }
    }
    },
    {
    "type": "function",
    "function": {
        "name": "get_top_performers",
        "description": "Returns top-performing stocks over a selected period (weekly, monthly, or annually).",
        "parameters": {
        "type": "object",
        "properties": {
            "period": {
            "type": "string",
            "enum": ["weekly", "monthly", "annually"],
            "description": "The timeframe over which to rank performance."
            },
            "limit": {
            "type": "integer",
            "description": "Number of top stocks to return (default 5)",
            "default": 5
            }
        },
        "required": ["period"]
        }
    }
    }


]