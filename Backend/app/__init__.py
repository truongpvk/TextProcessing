from flask import Flask
from app.controller.summarizer import summarizer_bp
import os

def create_app():
  template_dir = os.path.abspath('app/views/templates')
  static_dir = os.path.abspath('app/views/static')
  app = Flask(__name__, template_folder=template_dir, static_folder=static_dir)
  app.config.from_pyfile('config.py')
  
  # Đăng ký blueprint
  app.register_blueprint(summarizer_bp, urlprefix='/')
  return app