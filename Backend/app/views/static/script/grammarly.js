import { limitWord } from "./limit.js";
import { pasteText, uploadDoc } from "./upload_and_paste.js"

function checkGrammar() {
    const textarea = document.querySelector('textarea');
    const resultBox = document.querySelector('.result-box');
    const text = textarea.value.trim();

    if (!text) {
        alert("Vui lòng nhập văn bản để kiểm tra!");
        return;
    }
    
    resultBox.innerHTML = "Checking...";

    fetch('http://127.0.0.1:5001/grammar_model', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: text })
    })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                resultBox.innerHTML = `<p class="error">${data.error}</p>`;
            } else {
                resultBox.innerHTML = `<p class="corrected-text">${data.output_text}</p>`;
            }
        })
        .catch(error => {
            console.error('Lỗi:', error);
            resultBox.innerHTML = `<p class="error">Có lỗi xảy ra, vui lòng thử lại.</p>`;
        });
}

document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".active-model-button").addEventListener("click", () => {
        checkGrammar();
    });
    limitWord(1000, ".input-section > textarea", ".countWord");

    document.querySelector('.paste-btn').addEventListener('click', () => {
        pasteText(".input-section > textarea");
    });

    document.querySelector('.upload-btn').addEventListener('click', () => {
        document.getElementById('upload-input').click();
    })

    document.getElementById('upload-input').addEventListener('change', function (e) {
        uploadDoc(e, ".input-section > textarea")
    });

});