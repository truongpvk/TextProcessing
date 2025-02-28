// Limit word
export function limitWord(maxWord, textBox_selector, label_selector) {
  const textBox = document.querySelector(`${textBox_selector}`);
  const label = document.querySelector(`${label_selector}`);

  label.textContent = `0 / ${maxWord}`;

  textBox.addEventListener("input", function () {
      let text = textBox.tagName === "DIV" ? textBox.innerText : textBox.value;
      let wordCount = countWord(text.trim());

      if (wordCount > maxWord) {
        let truncatedText = text.slice(0, maxWord);
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

export function countWord(vanBan) {
  const vanBanChiChuaChuCai = vanBan.replace(/[^a-zA-ZÀ-ỹ]/g, '');
  return vanBanChiChuaChuCai.length;
}