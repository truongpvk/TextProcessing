from app.models.models import _en2vi, _vi2en
from flask import Blueprint, request, jsonify

translator_bp = Blueprint('translator', __name__)

@translator_bp.route('/translator_model', methods=['GET', 'POST'])
def correct_text():
  output_text = None
  
  data = request.get_json()
  
  input_text = data.get('text', '')
  src_lang = data.get('src_lang', -1)
  
  if src_lang == -1:
    output_text = "The error when chose the source language!"
    return jsonify({"output_text": output_text})

  if src_lang == 1:
    output_text = _en2vi.active_en2vi(input_text)
    return jsonify({"output_text": output_text})

  if src_lang == 2:
    output_text = _vi2en.active_vi2en(input_text)
    return jsonify({"output_text": output_text})
  
  output_text = "Unknown Error!"
  return jsonify({"output_text": output_text})