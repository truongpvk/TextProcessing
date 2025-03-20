from app.models.models import _summarizer
from flask import Blueprint, request, jsonify

summarizer_bp = Blueprint('summarizer', __name__)

@summarizer_bp.route('/summarizer_model', methods=['POST', 'GET'])
def summarize_text():
  data = request.get_json()
  print('Server got the data! Processing...')
  
  input_text = data.get('text', '')
  print(input_text)
  if input_text == '':
    return jsonify({'output_text': input_text})
  
  output_text = _summarizer.active(input_text)
  print('Response...')
  return jsonify({"output_text": output_text})
