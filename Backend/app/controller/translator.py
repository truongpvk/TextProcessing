from app.models.models import _translator_en2vi, _translator_vi2en
from flask import Blueprint, render_template, request, jsonify

en2vi = _translator_en2vi()
vi2en = _translator_vi2en()
translator_bp = Blueprint('translator', __name__)

@translator_bp.route('/tranlation')
def render_translation_page():
  return render_template('translation.html')

@translator_bp.route('/translator_model', methods=['GET', 'POST'])
def correct_text():
  output_text = None
  
  return jsonify({"output_text": output_text})