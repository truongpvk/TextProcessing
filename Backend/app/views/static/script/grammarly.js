import { limitWord } from "./limit.js";

// Lấy các phần tử DOM
const textarea = document.querySelector('textarea');
const pasteBtn = document.querySelector('.paste-btn');
const uploadBtn = document.querySelector('.upload-btn');

// Xử lý sự kiện paste text
pasteBtn.addEventListener('click', async function() {
    try {
        const text = await navigator.clipboard.readText();
        textarea.value = text;
        checkGrammar(text);
    } catch (err) {
        alert('Không thể truy cập clipboard. Vui lòng paste trực tiếp vào ô nhập liệu.');
    }
});

// Xử lý sự kiện upload file
uploadBtn.addEventListener('click', function() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.txt,.doc,.docx';
    
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                textarea.value = e.target.result;
                checkGrammar(e.target.result);
            };
            reader.readAsText(file);
        }
    };
});

function checkGrammar() {
    const textarea = document.querySelector('textarea');
    const resultBox = document.querySelector('.result-box');
    const text = textarea.value.trim();

    if (!text) {
        alert("Vui lòng nhập văn bản để kiểm tra!");
        return;
    }

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

document.addEventListener("DOMContentLoaded", function() {
    document.querySelector(".active-model-button").addEventListener("click", checkGrammar);
    limitWord(500, ".input-section > textarea", ".countWord");
});