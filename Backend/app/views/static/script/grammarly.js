document.addEventListener('DOMContentLoaded', function() {
    // Lấy các phần tử DOM
    const textarea = document.querySelector('textarea');
    const pasteBtn = document.querySelector('.paste-btn');
    const uploadBtn = document.querySelector('.upload-btn');
    const resultBox = document.querySelector('.result-box');
    const iconItems = document.querySelectorAll('.icon-item');
    
    iconItems.forEach(item => {
      item.addEventListener('click', function() {
        // Cập nhật active state (nếu cần)
        iconItems.forEach(i => i.classList.remove('active'));
        this.classList.add('active');
    
        // Lấy đường dẫn từ data-page và chuyển hướng
        const page = this.getAttribute('data-page');
        if (page) {
          window.location.href = page;
        }
      });
    });
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

        input.click();
    });

    // Xử lý sự kiện nhập text
    let grammarTimeout;
    textarea.addEventListener('input', function() {
        clearTimeout(grammarTimeout);
        grammarTimeout = setTimeout(() => {
            checkGrammar(this.value);
        }, 1000);
    });

    // Hàm kiểm tra ngữ pháp
    function checkGrammar(text) {
        if (text.trim() === '') {
            resultBox.innerHTML = 'Please enter some text to check.';
            return;
        }

        // Giả lập kiểm tra ngữ pháp
        // Trong thực tế, đây sẽ là nơi gọi API kiểm tra ngữ pháp
        const results = [];
        
        // Ví dụ về một số lỗi giả định
        if (text.includes('their') && Math.random() > 0.5) {
            results.push('Consider using "there" instead of "their" in this context.');
        }
        if (text.includes('its') && Math.random() > 0.5) {
            results.push('Check if "it\'s" would be more appropriate here.');
        }

        // Hiển thị kết quả
        if (results.length > 0) {
            resultBox.innerHTML = '<h3>Suggestions:</h3>' + 
                results.map(result => `<p>• ${result}</p>`).join('');
        } else {
            resultBox.innerHTML = '<p>No grammar issues found!</p>';
        }
    }

    // Xử lý sự kiện click các icon trong sidebar
    iconItems.forEach(item => {
        item.addEventListener('click', function() {
            iconItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });
});