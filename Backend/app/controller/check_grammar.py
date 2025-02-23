from app.models.models import _check_grammar
from flask import Blueprint, render_template, request, jsonify

corrector = _check_grammar()
grammar_bp = Blueprint('grammar', __name__)

@grammar_bp.route('/check_grammar')
def render_grammar_page():
  return render_template('grammar.html')

@grammar_bp.route('/grammar_model', methods=['GET', 'POST'])
def correct_text():
  output_text = None
  
  return jsonify({"output_text": output_text})