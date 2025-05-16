from flask import Flask
from flask_cors import CORS
from routes.ask import ask_route

app = Flask(__name__)
CORS(app)

# Register routes
app.register_blueprint(ask_route)

if __name__ == "__main__":
    app.run(debug=True)
