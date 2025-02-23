from flask import Flask
from app.controller.summarizer import summarizer_bp
from app.controller.check_grammar import grammar_bp
from app.controller.translator import translator_bp
import os

def create_app():
  template_dir = os.path.abspath('app/views/templates')
  static_dir = os.path.abspath('app/views/static')
  app = Flask(__name__, template_folder=template_dir, static_folder=static_dir)
  app.config.from_pyfile('config.py')
  
  # Đăng ký blueprint
  app.register_blueprint(summarizer_bp, urlprefix='/')
  app.register_blueprint(grammar_bp)
  app.register_blueprint(translator_bp)
  
  return app