# YouTube Mini - Ứng dụng tìm kiếm video YouTube

Ứng dụng React cho phép tìm kiếm, xem video YouTube, đăng ký/đăng nhập tài khoản và lưu danh sách video yêu thích.

**Website demo:**
```
https://youtube.phghuy.dev
```

**Video demo:**
```
https://drive.google.com/file/d/1aEMZcy7x24ZQcZVG2LywRmvJrGZkLEOC/view?usp=sharing
```
## 🚀 Các tính năng

- ✅ **Tìm kiếm video** - Tìm kiếm video trên YouTube
- ✅ **Xem video** - Xem video trực tiếp trong ứng dụng (Modal)
- ✅ **Đăng ký/Đăng nhập** - Tạo tài khoản và quản lý phiên đăng nhập
- ✅ **Lưu yêu thích** - Lưu video yêu thích vào Local Storage
- ✅ **Danh sách yêu thích** - Xem và quản lý video yêu thích
- ✅ **Responsive UI** - Giao diện đẹp với Tailwind CSS

## 📋 Yêu cầu hệ thống

- Node.js 16+
- npm hoặc yarn

## 🔧 Hướng dẫn cài đặt

### 1. Clone repository
```bash
git clone https://github.com/PHGHuy2007/Assignment_youtubesearch.git
cd Assignment_youtubesearch
```

### 2. Cài đặt dependencies
```bash
npm install
```

### 3. Cấu hình YouTube API Key

#### Cách 1: Query String (Đơn giản - Dùng trên web)
Truy cập ứng dụng với API key trong URL:
```
https://youtube.phghuy.dev?apiKey=YOUR_API_KEY_HERE
```
Thay `YOUR_API_KEY_HERE` bằng YouTube API Key của bạn. API key sẽ được lưu vào cookie tự động (có hiệu lực 7 ngày).

#### Cách 2: File `.env` (An toàn - Dùng cho development)

1. Copy file mẫu:
```bash
cp .env.example .env
```

2. Thêm API Key vào file `.env`:
```
VITE_YOUTUBE_API_KEY=your_api_key_here
```

### 4. Chạy ứng dụng
```bash
npm run dev
```
Truy cập http://localhost:5173

## 🧪 Build cho production
```bash
npm run build
```

## 📁 Cấu trúc dự án
```
src/
  ├── api/
  │   └── youtube.js          # YouTube API configuration
  ├── components/
  │   ├── SearchBar.jsx       # Component tìm kiếm
  │   ├── VideoList.jsx       # Danh sách video
  │   ├── VideoCard.jsx       # Card từng video
  │   ├── VideoModal.jsx      # Modal xem video
  │   └── AuthModal.jsx       # Modal đăng nhập/đăng ký
  ├── App.jsx                 # Component chính
  └── main.jsx
```

## 💾 Dữ liệu Local Storage

```json
{
  "youtube_app_users": [
    {
      "email": "user@example.com",
      "password": "hashed_password",
      "favorites": [
        { "videoId": "abc123", "title": "Video Name", "thumbnail": "url" }
      ]
    }
  ],
  "current_user": { "email": "user@example.com" }
}
```

## 🔒 Bảo mật

- ✅ Mật khẩu được **hash bằng bcryptjs** trước khi lưu
- ✅ API Key được lưu trong `.env` (không commit lên Git)
- ✅ Dữ liệu người dùng lưu trong Local Storage (chỉ ở client)

## 🛠 Công nghệ sử dụng

- **React 18** - UI Framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **bcryptjs** - Password hashing
- **lucide-react** - Icons
- **YouTube Data API v3** - Video search

## 📄 License

Dự án này được tạo cho mục đích học tập.

---

**Liên hệ:** [GitHub](https://github.com/PHGHuy2007)