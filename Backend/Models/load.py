from transformers import T5ForConditionalGeneration, T5Tokenizer, AutoModelForSeq2SeqLM, AutoTokenizer

grammarly = 'truongpvk41081/grammarly_correction_model'
summarizer = 'NlpHUST/t5-small-vi-summarization'
en2vi = 'truongpvk41081/translate-en-2-vi'
vi2en = 'truongpvk41081/translate-vi-2-en'

model_name = [grammarly, summarizer, en2vi, vi2en]
path_save = ['grammarly', 'summarization', 'translation-en2vi', 'translation-vi2en']

# model = AutoModelForSeq2SeqLM.from_pretrained(grammarly)
# tokenizer = AutoTokenizer.from_pretrained(grammarly)

gr, sum, ev, ve = 0, 1, 2, 3

model = T5ForConditionalGeneration.from_pretrained(model_name[sum])
tokenizer = T5Tokenizer.from_pretrained(model_name[sum])

for param in model.parameters():
    param.data = param.data.contiguous()

model.to('cpu')

model.save_pretrained(f'./{path_save[sum]}')
tokenizer.save_pretrained(f'./{path_save[sum]}')