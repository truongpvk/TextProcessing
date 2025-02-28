from flask import Blueprint, render_template, request, jsonify

grammar_rd = Blueprint('render_grammar', __name__)

@grammar_rd.route('/check_grammar')
def render_grammar_page():
  return render_template('grammar.html')