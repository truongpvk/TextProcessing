document.addEventListener('DOMContentLoaded', function() {
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
});

function checkGrammar() {
    
}