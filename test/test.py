from transformers import T5ForConditionalGeneration, T5Tokenizer, AutoModelForSeq2SeqLM, AutoTokenizer

grammarly = 'deep-learning-analytics/GrammarCorrector'
summarizer = 'NlpHUST/t5-small-vi-summarization'
en2vi = 'NlpHUST/t5-en-vi-small'
vi2en = 'NlpHUST/t5-vi-en-small'

model_name = [grammarly, summarizer, en2vi, vi2en]
path_save = ['grammarly', 'summarization', 'translation-en2vi', 'translation-vi2en']

# model = AutoModelForSeq2SeqLM.from_pretrained(grammarly)
# tokenizer = AutoTokenizer.from_pretrained(grammarly)

gr, sum, ev, ve = 0, 1, 2, 3

model = T5ForConditionalGeneration.from_pretrained(model_name[gr])
tokenizer = T5Tokenizer.from_pretrained(model_name[gr])

for param in model.parameters():
    param.data = param.data.contiguous()

model.to('cpu')

model.save_pretrained(f'./{path_save[gr]}')
tokenizer.save_pretrained(f'./{path_save[gr]}')