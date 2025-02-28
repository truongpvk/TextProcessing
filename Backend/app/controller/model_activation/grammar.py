from app.models.models import _grammar
from flask import Blueprint, render_template, request, jsonify

grammar_bp = Blueprint('grammar', __name__)

@grammar_bp.route('/grammar_model', methods=['GET', 'POST'])
def correct_text():
  output_text = None
  
  return jsonify({"output_text": output_text})