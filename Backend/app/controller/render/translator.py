from flask import Blueprint, render_template, request, jsonify

translator_rd = Blueprint('render_translator', __name__)

@translator_rd.route('/tranlation')
def render_translation_page():
  return render_template('translation.html')