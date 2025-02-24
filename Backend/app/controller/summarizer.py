from app.models.models import _summarizer, _translator_en2vi, _translator_vi2en
from flask import Blueprint, render_template, request, jsonify, redirect, url_for

summarizer = _summarizer()
en2vi = _translator_en2vi()
vi2en = _translator_vi2en()
summarizer_bp = Blueprint('summarizer', __name__)

@summarizer_bp.route('/')
def home():
  return redirect(url_for('summarizer.render_summarizer_page'))

@summarizer_bp.route('/summarizer')
def render_summarizer_page():
  return render_template('summarizer.html')

@summarizer_bp.route('/summarizer_model', methods=['POST', 'GET'])
def summarize_text():
  data = request.get_json()
  print('Server got the data! Processing...')
  
  input_text = data.get('text', '')
  print(input_text)
  if input_text == '':
    return jsonify({'output_text': input_text})
  
  eng_text = vi2en.active_vi2en(input_text)
  output_text = summarizer.active(eng_text)
  vi_text = en2vi.active_en2vi(output_text)
  print('Response...')
  return jsonify({"output_text": vi_text})
