import openai
from config import OPENAI_API_KEY

client = openai.OpenAI(api_key=OPENAI_API_KEY)

def get_financial_info(query: str):
    try:
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are a financial assistant. If the user provides a company name like 'Tesla', "
                        "generate 3 simulated news headlines about the company. "
                        "If the user asks for a financial concept (like 'EPS', 'limit order', or 'trading'), "
                        "give a clear, beginner-friendly explanation."
                    )
                },
                {
                    "role": "user",
                    "content": query
                }
            ]
        )

        message = response.choices[0].message.content

        return {
            "status": 200,
            "data": {
                "response": message
            },
            "message": f"Response generated for: {query}"
        }

    except Exception as e:
        return {
            "status": 500,
            "data": None,
            "message": str(e)
        }
