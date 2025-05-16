from flask import Flask
from flask_cors import CORS
from routes.ask import ask_route

app = Flask(__name__)
CORS(app)

# ←— add this:
@app.route("/")
def health_check():
    return "OK", 200

# Register your existing routes
app.register_blueprint(ask_route)

if __name__ == "__main__":
    # also bind to 0.0.0.0:5000 locally if you want to mirror prod
    app.run(host="0.0.0.0", port=5000, debug=True)
