from flask import Flask

from app.controller.model_activation.grammar import grammar_bp
from app.controller.model_activation.summarizer import summarizer_bp
from app.controller.model_activation.translator import translator_bp

import os

template_dir = os.path.abspath('app/views/templates')
static_dir = os.path.abspath('app/views/static')
config_file = 'config.py'

def create_model_app():
  app = Flask(__name__, template_folder=template_dir, static_folder=static_dir)
  app.config.from_pyfile(config_file)
  
  app.register_blueprint(grammar_bp)
  app.register_blueprint(summarizer_bp)
  app.register_blueprint(translator_bp)
  
  return app