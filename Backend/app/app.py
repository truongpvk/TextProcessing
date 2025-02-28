from flask import Flask
from app.controller.render import grammar, translator, summarizer

import os

template_dir = os.path.abspath('app/views/templates')
static_dir = os.path.abspath('app/views/static')
config_file = 'config.py'

def create_app():
  app = Flask(__name__, template_folder=template_dir, static_folder=static_dir)
  app.config.from_pyfile(config_file)
  
  # Đăng ký blueprint
  app.register_blueprint(summarizer.summarizer_rd, urlprefix='/')
  app.register_blueprint(grammar.grammar_rd)
  app.register_blueprint(translator.translator_rd)
  
  return app

