import os
os.environ["TF_ENABLE_ONEDNN_OPTS"] = "0"
os.environ['NLTK_DATA'] = './app/models/nltk_data'

from transformers import T5ForConditionalGeneration, T5Tokenizer, GenerationConfig, pipeline

import random
import torch

import nltk
nltk.download('punkt', download_dir='./app/models/nltk_data')


from nltk.tokenize import sent_tokenize

def split_paragraph(paragraph, language='vietnamese'):
  sentences = sent_tokenize(paragraph, language=language)
  return sentences

if torch.cuda.is_available():       
    device = torch.device("cuda")

    print('There are %d GPU(s) available.' % torch.cuda.device_count())

    print('We will use the GPU:', torch.cuda.get_device_name(0))
else:
    print('No GPU available, using the CPU instead.')
    device = torch.device("cpu")

summarize_model = './Models/summarization'
grammmar_model = './Models/grammarly'
translate_model_en2vi = './Models/translation-en2vi'
translate_model_vi2en = './Models/translation-vi2en'

class PretrainModel:
  def __init__(self, path):
    self.model = T5ForConditionalGeneration.from_pretrained(path)
    self.tokenizer = T5Tokenizer.from_pretrained(path)

class Summarizer(PretrainModel):
  def __init__(self, path, max_length=256):
    super().__init__(path)
    
    self.generator = GenerationConfig(
        max_length=max_length, 
        num_beams=5,
        repetition_penalty=2.5, 
        length_penalty=1.0, 
        early_stopping=True
    )
  
  def active(self, text):
    tokenized_text = self.tokenizer.encode(text, return_tensors="pt").to(device)
    self.model.eval()
    summary_ids = self.model.generate(tokenized_text, generation_config=self.generator)
    return self.tokenizer.decode(summary_ids[0], skip_special_tokens=True)


class CheckGrammar(PretrainModel):
  def __init__(self, path):
    super().__init__(path)
    
  
  def active(self, origin_text, num_return_sequences=2):
    self.generator = GenerationConfig(
      max_new_tokens=1024,
      num_beams=5, 
      num_return_sequences=num_return_sequences, 
      # temperature=1.5
    )
    
    sentences = split_paragraph(origin_text, language='english')
    output = ""
    
    print(sentences)
    
    if len(sentences) < 2:
      print(origin_text)
      batch = self.tokenizer([origin_text],truncation=True,padding='max_length',max_length=1024, return_tensors="pt").to('cpu')
      translated = self.model.generate(**batch, generation_config=self.generator)
      tgt_text = self.tokenizer.batch_decode(translated, skip_special_tokens=True)
      print(tgt_text)
      return tgt_text[random.randint(0, len(tgt_text) - 1)]
    
    # Phân tách câu nếu đoạn văn bản quá dài
    for sentence in sentences:
      print(sentence)
      batch = self.tokenizer([sentence],truncation=True,padding='max_length',max_length=1024, return_tensors="pt").to('cpu')
      translated = self.model.generate(**batch, generation_config=self.generator)
      tgt_text = self.tokenizer.batch_decode(translated, skip_special_tokens=True)
      output += " " + tgt_text[random.randint(0, len(tgt_text) - 1)]
    
    return output

class Translator(PretrainModel):
  def __init__(self, path, max_length=256):
    super().__init__(path)
    if 'en2vi' in path:
      self.option = 1
    elif 'vi2en' in path:
      self.option = 2
    self.model.to(device)
    
    self.generator = GenerationConfig(
        max_length=max_length, 
        num_beams=5,
        repetition_penalty=2.5, 
        length_penalty=1.0, 
        early_stopping=True
    )
    
  def active_en2vi(self, english_text):
    sentences = split_paragraph(english_text, language='english')
    output = " "
    
    print(sentences)
    
    if len(sentences) < 2:
      tokenized_text = self.tokenizer.encode(english_text, return_tensors='pt').to(device)
      self.model.eval()
      vi_text = self.model.generate(tokenized_text, generation_config=self.generator)
      return self.tokenizer.decode(vi_text[0], skip_special_tokens=True)
    
    for sentence in sentences:
      tokenized_text = self.tokenizer.encode(sentence, return_tensors='pt').to(device)
      self.model.eval()
      vi_text = self.model.generate(tokenized_text, generation_config=self.generator)
      output += " " + self.tokenizer.decode(vi_text[0], skip_special_tokens=True)
    
    return output
      
  
  def active_vi2en(self, vi_text):
    tokenized_text = self.tokenizer.encode(vi_text, return_tensors='pt').to(device)
    self.model.eval()
    en_text = self.model.generate(tokenized_text, generation_config=self.generator)
    
    return self.tokenizer.decode(en_text[0], skip_special_tokens=True)

_summarizer = Summarizer(summarize_model)
_grammar = CheckGrammar(grammmar_model)
_en2vi = Translator(translate_model_en2vi)
_vi2en = Translator(translate_model_vi2en)