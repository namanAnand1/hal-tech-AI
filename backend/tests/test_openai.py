from services.openai.get_top_performers import get_top_performers
from services.openai.get_financial_info import get_financial_info

def test_get_top_performers():
    result = get_top_performers("monthly", limit=3)
    assert result["status"] == 200
    assert len(result["data"]) == 3

def test_get_financial_info():
    result = get_financial_info("What is EPS?")
    assert result["status"] == 200
    assert "response" in result["data"]