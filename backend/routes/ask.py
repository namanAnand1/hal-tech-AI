from flask import Blueprint, request, jsonify
from services.openai.openai_service import process_question

ask_route = Blueprint("ask_route", __name__)

@ask_route.route("/api/ask", methods=["POST"])
def ask():
    try:
        data = request.json
        user_input = data.get("question", "")
        result = process_question(user_input)

        if "error" in result:
            return jsonify(result), 500

        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
