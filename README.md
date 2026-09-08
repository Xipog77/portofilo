# 🌐 Trang Thông Tin Cá Nhân & Portfolio — ĐỖ NGỌC KHÁNH

Trang web giới thiệu thông tin cá nhân và portfolio chuyên nghiệp của **ĐỖ NGỌC KHÁNH** (Sinh viên Khoa Mạng máy tính & Truyền thông dữ liệu - Trường Đại học Công nghệ, ĐHQGHN; Nghiên cứu viên sinh viên tại SATLab).

Website được thiết kế kế thừa phong cách **Wave Dynamic Design** (từ mẫu Adrian), kết hợp giao diện công nghệ hiện đại, hiệu ứng gõ chữ (Typed Effect), bộ lọc dự án trực quan và được tối ưu hóa **100% để host trực tiếp trên GitHub Pages**.

---

## 🌟 Cấu Trúc Thư Mục Chuẩn GitHub Pages

```text
Portofilo/
├── index.html                   # Trang chủ (Root entry point cho GitHub Pages)
├── .nojekyll                    # Cấu hình tắt Jekyll parser của GitHub Pages
├── README.md                    # Hướng dẫn chi tiết triển khai
├── assets/
│   ├── css/
│   │   └── style.css            # Hệ thống màu sắc, Wave SVG, Responsive & Animations
│   ├── js/
│   │   └── main.js              # Typed effect, cuộn trang, lọc dự án, popup & form liên hệ
│   ├── images/
│   │   ├── profile.jpeg         # Ảnh chân dung thực tế của Đỗ Ngọc Khánh
│   │   ├── caroud.svg           # Preview kiến trúc đám mây dự án Caroud (AWS Microservices)
│   │   ├── hcorap.svg           # Preview đề tài nghiên cứu HCORAP (SATLab)
│   │   ├── ralb.svg             # Preview đề tài nghiên cứu RALB (SATLab)
│   │   ├── defend-kingdom.svg   # Preview game 2D Defend the Kingdom (C++/SDL2)
│   │   ├── library.svg          # Preview ứng dụng quản lý thư viện (JavaFX & MySQL)
│   │   └── favicon.svg          # Favicon cá nhân hình lục giác gradient
│   └── docs/
│       └── cv-llt.pdf           # File CV PDF tải trực tiếp cho nhà tuyển dụng
├── Mẫu/                         # Mẫu gốc tham khảo
└── Thông tin/                   # Thông tin gốc & CV
```

---

## 🚀 Hướng Dẫn Host Lên GitHub Pages (Miễn Phí Trong 1 Phút)

### Cách 1: Sử dụng Git qua Terminal / PowerShell

1. Mở PowerShell hoặc Git Bash tại thư mục này (`d:\Lab\Portofilo`).
2. Khởi tạo Git và commit:
   ```bash
   git init
   git add .
   git commit -m "feat: Khoi tao website portfolio Do Ngoc Khanh"
   ```
3. Tạo một repository mới trên GitHub (ví dụ đặt tên là `portfolio` hoặc `<username>.github.io`).
4. Kết nối và đẩy code lên GitHub:
   ```bash
   git branch -M main
   git remote add origin https://github.com/Xipog77/<ten-repo-cua-ban>.git
   git push -u origin main
   ```
5. **Bật GitHub Pages**:
   - Truy cập vào Repository trên GitHub: **Settings** &rarr; Chọn thẻ **Pages** ở thanh bên trái.
   - Tại mục **Build and deployment** &rarr; **Source**: Chọn **Deploy from a branch**.
   - Tại mục **Branch**: Chọn nhánh **`main`** và thư mục **`/(root)`** &rarr; Nhấn **Save**.
   - Chờ khoảng 1-2 phút, GitHub sẽ cung cấp link website trực tiếp của bạn:
     👉 `https://Xipog77.github.io/<ten-repo-cua-ban>/`

---

## 💻 Cách Xem Thử Trực Tiếp Trên Máy (Local)

- **Cách 1**: Nhấp đúp chuột trực tiếp vào file [index.html](file:///d:/Lab/Portofilo/index.html) để mở bằng bất kỳ trình duyệt nào (Chrome, Edge, Firefox).
- **Cách 2**: Chạy server tĩnh siêu nhẹ bằng Python:
  ```powershell
  python -m http.server 8080
  ```
  Sau đó mở trình duyệt tại: `http://localhost:8080`

---

## 🛠️ Các Điểm Nhấn Công Nghệ

- **100% Static & Standalone**: Không dùng PHP, không phụ thuộc backend server, tải trang nhanh chóng.
- **Tương thích mọi thiết bị**: Co giãn hoàn hảo từ màn hình smartphone, iPad/tablet đến màn hình máy tính Ultra-wide.
- **Tích hợp sâu sắc thông tin cá nhân**:
  - Tích hợp xuất thân, quê hương Nam Định & Hạ Long - Quảng Ninh.
  - Điểm GPA xuất sắc **3.51 / 4.0** tại VNU-UET.
  - Kinh nghiệm nghiên cứu thực tế tại **SATLab** với các liên kết GitHub repo trực tiếp.
  - Các giải thưởng danh giá: *Viettel Digital Talent 2026*, *Học bổng UET*, *AWS Cloud Foundations*, *Samsung Innovation Campus*.
