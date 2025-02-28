from flask import Blueprint, render_template, request, jsonify, redirect, url_for

summarizer_rd = Blueprint('render_summarizer', __name__)

@summarizer_rd.route('/')
def home():
  return redirect(url_for('render_summarizer.render_summarizer_page'))

@summarizer_rd.route('/summarizer')
def render_summarizer_page():
  return render_template('summarizer.html')