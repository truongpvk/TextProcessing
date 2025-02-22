import os
os.environ["TF_ENABLE_ONEDNN_OPTS"] = "0"

from transformers import AutoTokenizer, AutoModelForSeq2SeqLM, GenerationConfig,pipeline

summarize_model = './Models/summarization'
grammmar_model = './Models/grammarly'
translate_model_en2vi = './Models/translation-en2vi'
translate_model_vi2en = './Models/translation-vi2en'

class PretrainModel:
  def __init__(self, path):
    self.path = path

class Summarizer(PretrainModel):
  def __init__(self, path):
    super().__init__(path)
    self.summarizer = pipeline('summarization', model=self.path)
  
  def active(self, text, max_length=1000, min_length=30, do_sample=False):
    return self.summarizer(text, max_length=max_length, min_length=min_length, do_sample=do_sample)[0]['summary_text']

class CheckGrammar(PretrainModel):
  def __init__(self, path):
    super().__init__(path)
    self.corrector = pipeline('text2text-generation', self.path)
  
  def active(self, origin_text):
    return self.corrector(origin_text)[0]['generated_text']

class Translator(PretrainModel):
  def __init__(self, path):
    super().__init__(path)
    if 'en2vi' in path:
      self.option = 1
    elif 'vi2en' in path:
      self.option = 2
    
    self.translator = AutoModelForSeq2SeqLM.from_pretrained(path)
    self.tokenizer = AutoTokenizer.from_pretrained(path)
    self.generator = GenerationConfig(
        decoder_start_token_id=self.tokenizer.lang_code_to_id["vi_VN" if self.option == 1 else "en_XX"],
        max_length=500,
        num_return_sequences=1,
        num_beams=5,
        early_stopping=True
    )
    
  def active_en2vi(self, english_text):
    if self.option != 1:
      return 'Vui lòng nhập tiếng Việt hoặc đổi sang bộ dịch Việt - Anh, vì bạn đang sử dụng bộ dịch Anh - Việt'
    else:
      input_ids = self.tokenizer(english_text, return_tensors="pt").input_ids
      output_ids = self.translator.generate(input_ids, generation_config=self.generator)
      vi_text = self.tokenizer.batch_decode(output_ids, skip_special_tokens=True)
      vi_text = " ".join(vi_text)
      
      return vi_text
  
  def active_vi2en(self, vi_text):
    if self.option != 2:
      return 'Please enter English text or switch to Vietnamese - English translator because you are using English - Vietnamese translator'
    else:
      input_ids = self.tokenizer(vi_text, return_tensors="pt").input_ids
      output_ids = self.translator.generate(input_ids, generation_config=self.generator)
      en_text = self.tokenizer.batch_decode(output_ids, skip_special_tokens=True)
      en_text = " ".join(en_text)
      return en_text

def _summarizer():
  return Summarizer(summarize_model)

def _check_grammar():
  return CheckGrammar(grammmar_model)

def _translator_en2vi():
  return Translator(translate_model_en2vi)

def _translator_vi2en():
  return Translator(translate_model_vi2en)