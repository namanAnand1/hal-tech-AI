def test_ask_route_status(client):
    response = client.post("/api/ask", json={"question": "What's the price of AAPL?"})
    assert response.status_code == 200
    assert "data" in response.json or "answer" in response.json


def test_ask_route_invalid(client):
    response = client.post("/api/ask", json={})
    assert response.status_code == 200 or response.status_code == 400
