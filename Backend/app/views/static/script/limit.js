// Limit word
export function limitWord(maxWord, textBox_selector, label_selector) {
  const textBox = document.querySelector(`${textBox_selector}`);
  const label = document.querySelector(`${label_selector}`);

  label.textContent = `0 / ${maxWord}`;

  textBox.addEventListener("input", function () {
      let text = textBox.tagName === "DIV" ? textBox.innerText : textBox.value;
      let words = text.trim().split(/\s+/).filter(word => word.length > 0);
      let wordCount = words.length;
      
      if (wordCount > maxWord) {
        let truncatedText = words.slice(0, maxWord).join(" ");
        if (textBox.tagName === "DIV") {
            textBox.innerText = truncatedText;
            placeCaretAtEnd(textBox);
        } else {
            textBox.value = truncatedText;
        }
        wordCount = maxWord;
      }
      
      label.textContent = `${wordCount} / ${maxWord}`;
  });
}

function placeCaretAtEnd(el) {
  const range = document.createRange();
  const sel = window.getSelection();
  range.selectNodeContents(el);
  range.collapse(false);
  sel.removeAllRanges();
  sel.addRange(range);
}