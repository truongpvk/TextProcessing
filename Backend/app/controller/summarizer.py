from app.models.models import _summarizer
from flask import Blueprint, render_template, request, jsonify, redirect, url_for

summarizer = _summarizer()
summarizer_bp = Blueprint('summarizer', __name__)

@summarizer_bp.route('/')
def home():
  return redirect(url_for('summarizer.render_summarizer_page'))

@summarizer_bp.route('/summarizer')
def render_summarizer_page():
  return render_template('summarizer.html')

@summarizer_bp.route('/summarizer_model', methods=['POST', 'GET'])
def summarize_text():
  output_text = None
  
  return jsonify({"output_text": output_text})
