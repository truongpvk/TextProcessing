from nltk.tokenize import sent_tokenize
import os
os.environ['NLTK_DATA'] = './nltk_data'

import nltk
nltk.download('punkt', download_dir='./app/models/nltk_data')

def split_paragraph(paragraph, language='vietnamese'):
  sentences = sent_tokenize(paragraph, language=language)
  return sentences

print(split_paragraph("hello", language='english'))