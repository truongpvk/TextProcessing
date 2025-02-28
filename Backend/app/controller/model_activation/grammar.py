from app.models.models import _grammar
from flask import Blueprint, render_template, request, jsonify

grammar_bp = Blueprint('grammar', __name__)

@grammar_bp.route('/grammar_model', methods=['GET', 'POST'])
def correct_text():
  data = request.get_json()
  input_text = data.get("text", "")
  
  if not input_text:
      return jsonify({"error": "Không có đầu vào"}), 400
  
  corrected_text = _grammar.active(input_text)  
  return jsonify({"output_text": corrected_text})