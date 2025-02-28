from app.model_app import create_model_app
from flask_cors import CORS

app = create_model_app()
CORS(app=app)

if __name__ == "__main__":
  app.run(debug=True, port=5001)