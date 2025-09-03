# TL-Aboutme - Personal Profile Website

Trang cá nhân chuyên nghiệp của **Nguyễn Tấn Lợi** (IshiiAinari / gn027c) - Developer, Coder và Content Creator.

## ✨ Tính Năng Nổi Bật

- 🎨 **Giao diện hiện đại** với thiết kế glassmorphism và gradient đẹp mắt
- 🎵 **Nhạc nền** với điều khiển âm lượng tương tác
- 📄 **CV Preview** - Xem trước CV trực tiếp trên trang web với iframe
- 💳 **Thông tin thanh toán** với QR code và copy-on-click
- 🔗 **Social Links** bao gồm Discord, Facebook, YouTube, GitHub, Valorant, Roblox
- ✨ **Dynamic Title** với hiệu ứng typing mượt mà
- 📱 **Responsive Design** tối ưu cho mọi thiết bị
- 🚀 **PWA Support** - Có thể cài đặt như ứng dụng

## 🏗️ Cấu Trúc Dự Án

```
TL-Aboutme/
│── .gitignore
│── README.md
│── index.html              # Trang chính
│── manifest.json           # PWA manifest
│── /assets/                # Chứa tài nguyên
│   ├── /images/            # Hình ảnh (avatar, banner, favicon, QR codes)
│   ├── /audio/             # File nhạc
│   └── cv.pdf              # File CV
│── /styles/                # CSS
│   └── style.css
│── /scripts/               # JavaScript
│   ├── config.js           # Cấu hình profile (description, links, data)
│   └── main.js             # Logic hiển thị và tương tác
```

## 🎯 Tính Năng Chi Tiết

### CV Preview System
- **Xem trước PDF**: Hiển thị CV trực tiếp trên trang web qua iframe
- **Tải xuống**: Nút download riêng biệt với visual feedback
- **Responsive**: Tối ưu hiển thị trên mọi kích thước màn hình

### Dynamic Title
- **Typing Effect**: Hiệu ứng đánh máy mượt mà như Gunlol/Zio profile
- **Multiple Names**: Luân phiên hiển thị các tên khác nhau
- **Smooth Transitions**: Chuyển đổi mượt mà giữa các tên

### Social Links
- **Valorant**: Icon crosshairs chuẩn với màu sắc game
- **Roblox**: Icon cube với màu xanh đặc trưng
- **Hover Effects**: Hiệu ứng hover đẹp mắt và chuyên nghiệp

### Payment System
- **QR Codes**: Hiển thị mã QR cho MOMO và SACOMBANK
- **Copy-on-Click**: Click để copy thông tin tài khoản
- **Visual Feedback**: Thông báo khi copy thành công

## 🛠️ Công Nghệ Sử Dụng

- **HTML5** - Cấu trúc semantic và accessible
- **CSS3** - Glassmorphism, gradients, animations
- **JavaScript ES6+** - Dynamic content và interactions
- **Font Awesome** - Icons cho social links
- **PWA** - Progressive Web App support

## 📱 Responsive Design

Website được tối ưu cho:
- 📱 **Mobile** (320px - 768px)
- 📱 **Tablet** (768px - 1024px)
- 💻 **Desktop** (1024px+)

## 🚀 Cách Sử Dụng

1. **Clone repository**:
   ```bash
   git clone https://github.com/IshiiAinari/profile.git
   cd profile
   ```

2. **Chỉnh sửa cấu hình** trong `scripts/config.js`:
   - Thông tin cá nhân
   - Social links
   - Payment details
   - Media paths

3. **Deploy** lên GitHub Pages hoặc hosting khác

## ⚙️ Cấu Hình

Tất cả nội dung động được quản lý trong `scripts/config.js`:

```javascript
window.__SITE_CONFIG__ = {
    profile: {
        title: "About Me",
        names: ["gn027c", "AinariIshii", "Nguyễn Tấn Lợi"],
        displayName: "Nguyễn Tấn Lợi",
        // ... more config
    },
    social: {
        discordUser: "https://discord.com/users/...",
        valorant: "https://tracker.gg/valorant/profile/...",
        roblox: "https://www.roblox.com/users/...",
        // ... more social links
    },
    // ... more sections
};
```

## 🎨 Customization

### Màu sắc và Theme
Sử dụng CSS Custom Properties trong `styles/style.css`:
```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --accent-color: #f093fb;
    /* ... more variables */
}
```

### Animations
- **Loading Screen**: ASCII art với API integration
- **Hover Effects**: Smooth transitions cho tất cả elements
- **Typing Effects**: Dynamic title và subtitle

## 📄 License

MIT License - Xem file [LICENSE](LICENSE) để biết thêm chi tiết.

## 👨‍💻 Tác Giả

**IshiiAinari / Nguyễn Tấn Lợi / gn027c**

---

⭐ **Star** repository này nếu bạn thấy hữu ích!