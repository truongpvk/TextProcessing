document.addEventListener('DOMContentLoaded', function() {
    // Lấy các phần tử DOM
    const inputTextarea = document.querySelector('.input-box textarea');
    const outputTextarea = document.querySelector('.output-box textarea');
    const summarizeBtn = document.querySelector('.btn.summarize');
    const uploadBtn = document.querySelector('.btn.upload');
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
    

    // Xử lý sự kiện upload file
    uploadBtn.addEventListener('click', function() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.txt,.doc,.docx,.pdf';
        
        input.onchange = function(e) {
            const file = e.target.files[0];
            // Ở đây sẽ thêm logic xử lý file
            alert(`Đã chọn file: ${file.name}`);
        };

        input.click();
    });

    // Xử lý sự kiện click các icon trong sidebar
    iconItems.forEach(item => {
        item.addEventListener('click', function() {
            // Xóa active class từ tất cả các icon
            iconItems.forEach(i => i.classList.remove('active'));
            // Thêm active class cho icon được click
            this.classList.add('active');
        });
    });
});