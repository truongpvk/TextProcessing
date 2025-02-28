## CẤU TRÚC THƯ MỤC
- Toàn bộ các tệp chính đều nằm trong thư mục Backend
- Tệp Models chứa các mô hình đã huấn luyện và file chương trình để load các mô hình đó
- Tệp app chứa các tệp chính của toàn bộ hệ thống chia làm ba phần chính: Controller (Bộ điều hướng), Model (Kích hoạt mô hình) và View (Giao diện người dùng)

## Cách tải mô hình
- Tệp load.py là tệp dùng để tải mô hình lưu trên hugging face về máy
- Tên các mô hình được đánh số, thay số tương ứng vào đó.
* Lưu ý: Tải mô hình nào thì khi lưu về máy phải dùng số tương ứng

## Chạy chương trình
- Tại thư mục Backend, mở hai terminal và chạy cùng lúc hai tệp run.py và run_model.py
- Giao diện sẽ do tệp run.py hiển thị