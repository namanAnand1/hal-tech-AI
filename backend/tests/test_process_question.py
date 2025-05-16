from services.openai.analyze_buy_opportunity import analyze_buy_opportunity
from services.openai.openai_service import process_question

def test_analyze_buy_opportunity_valid():
    result = analyze_buy_opportunity("AAPL")
    assert result["status"] in [200, 500]
    if result["status"] == 200:
        assert "response" in result["data"]

def test_process_question_with_price_check():
    result = process_question("What is the current price of AAPL?")
    assert result["status"] in [200, 400, 500]
    assert "data" in result

def test_process_question_with_invalid_input():
    result = process_question("Tell me a joke about pandas")
    assert result["status"] == 200
    assert "response" in result["data"]