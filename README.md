# Sistem Akuntansi SGM

Aplikasi akuntansi berbasis web untuk PT. Sumber Ganda Mekar dengan integrasi Firebase dan deployment ke Vercel.

## 🚀 Fitur

- ✅ **Autentikasi Firebase** - Login aman dengan Firebase Authentication
- 💾 **Database Firebase** - Sinkronisasi otomatis dengan Firebase Realtime Database
- 📊 **Manajemen Penjualan & Pembelian**
- 💰 **Laporan Piutang & Hutang**
- 🧾 **Transaksi Kas**
- 📈 **Laporan Keuangan** (Jurnal, Buku Besar, Laba Rugi)
- 📱 **Responsive Design** - Berfungsi di desktop dan mobile
- 🔄 **Auto-sync** - Data otomatis tersinkronisasi setiap 5 menit
- 🖨️ **Print & Export** - Cetak laporan dan ekspor ke Excel

## 📋 Prerequisites

- Akun [Firebase](https://firebase.google.com/)
- Akun [Vercel](https://vercel.com/)
- Git (opsional untuk deployment)

## 🛠️ Setup Firebase

### 1. Buat Project Firebase

1. Buka [Firebase Console](https://console.firebase.google.com/)
2. Klik "Add project" / "Tambah project"
3. Beri nama project (contoh: "sistem-akuntansi-sgm")
4. Ikuti wizard sampai selesai

### 2. Aktifkan Authentication

1. Di sidebar, pilih **Build > Authentication**
2. Klik **Get Started**
3. Tab **Sign-in method**, aktifkan **Email/Password**
4. Klik **Enable** dan **Save**

### 3. Aktifkan Realtime Database

1. Di sidebar, pilih **Build > Realtime Database**
2. Klik **Create Database**
3. Pilih region (pilih yang terdekat dengan lokasi Anda)
4. Start in **test mode** (untuk development)
5. Klik **Enable**

### 4. Setup Rules Database

Di tab **Rules**, ganti dengan:

```json
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid"
      }
    }
  }
}
```

Klik **Publish**

### 5. Dapatkan Firebase Config

1. Klik ⚙️ (Settings) > **Project settings**
2. Scroll ke bawah ke bagian "Your apps"
3. Klik ikon **</>** (Web)
4. Beri nama app, klik **Register app**
5. Copy konfigurasi Firebase

### 6. Update `firebase-config.js`

Buka file `firebase-config.js` dan ganti dengan config Firebase Anda:

```javascript
const firebaseConfig = {
    apiKey: "AIzaSy...",  // dari Firebase Console
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123:web:abc...",
    databaseURL: "https://your-project-default-rtdb.firebaseio.com"
};
```

### 7. Buat User Admin

1. Di Firebase Console, buka **Authentication**
2. Tab **Users**, klik **Add user**
3. Masukkan email & password admin
4. Klik **Add user**

## 🚢 Deploy ke Vercel

### Opsi 1: Deploy via Git (Recommended)

1. **Inisialisasi Git repository:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Push ke GitHub:**
   - Buat repository baru di GitHub
   - Ikuti instruksi untuk push code

3. **Deploy di Vercel:**
   - Login ke [Vercel](https://vercel.com/)
   - Klik **Add New > Project**
   - Import repository GitHub Anda
   - Klik **Deploy**

### Opsi 2: Deploy via Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   cd c:\Users\nunud\Downloads\pp
   vercel
   ```

4. Ikuti prompt:
   - Set up and deploy? **Y**
   - Scope: pilih account Anda
   - Link to existing project? **N**
   - Project name: (biarkan default atau beri nama)
   - Directory: `./`
   - Override settings? **N**

5. Production deployment:
   ```bash
   vercel --prod
   ```

### Opsi 3: Drag & Drop (Paling Mudah)

1. Zip semua file dalam folder `pp`
2. Buka [Vercel](https://vercel.com/)
3. Drag & drop file zip ke dashboard
4. Tunggu deployment selesai

## 🔐 Cara Menggunakan

### Login

1. Buka URL Vercel Anda (contoh: `https://your-app.vercel.app`)
2. Otomatis redirect ke halaman login
3. Masukkan email & password yang dibuat di Firebase Console
4. Klik **Masuk**

### Menambah User Baru

**User baru HANYA bisa ditambahkan melalui Firebase Console:**

1. Buka Firebase Console
2. **Authentication > Users**
3. Klik **Add user**
4. Masukkan email & password
5. User baru bisa langsung login

### Auto-sync Data

- Data otomatis tersinkronisasi ke Firebase setiap **5 menit**
- Data juga otomatis di-sync saat **logout** atau **close browser**
- Saat login, data terbaru dari Firebase otomatis dimuat

## 📁 Struktur File

```
pp/
├── index.html              # Halaman utama aplikasi
├── login.html              # Halaman login
├── script.js               # Logic aplikasi utama
├── auth.js                 # Firebase authentication & database
├── firebase-config.js      # Konfigurasi Firebase
├── style.css               # Styling
├── vercel.json             # Konfigurasi Vercel
├── logo.png                # Logo perusahaan
└── README.md              # Dokumentasi ini
```

## 🔧 Troubleshooting

### Error: "Firebase configuration not found"
- Pastikan sudah update `firebase-config.js` dengan config Firebase Anda

### Error: "Permission denied"
- Cek Firebase Database Rules sudah benar
- Pastikan user sudah login

### Redirect loop
- Clear browser cache dan cookies
- Pastikan `firebaseConfig` sudah benar

### Data tidak tersimpan
- Cek Firebase Console > Realtime Database apakah data muncul
- Cek browser console untuk error messages

## 📊 Fitur Data

Aplikasi menyimpan data berikut di Firebase:
- `transactions` - Data penjualan
- `purchases` - Data pembelian
- `dataPiutang` - Laporan piutang
- `dataHutang` - Laporan hutang
- `dataKas` - Transaksi kas
- `dataJurnal` - Jurnal umum

Path database: `/users/{userId}/data/`

## 🎨 Customization

### Ganti Logo
Ganti file `logo.png` dengan logo perusahaan Anda

### Ganti Warna
Edit `style.css`, cari `--primary-color` dan sesuaikan

### Tambah Fitur
Modifikasi `script.js` dan `index.html` sesuai kebutuhan

## 📝 License

© 2026 PT. Sumber Ganda Mekar. All rights reserved.

## 🆘 Support

Jika ada pertanyaan atau butuh bantuan, hubungi:
- CP. Irwan: 082117800626
- CP. Uwem: 082318188863

---

**Dibuat dengan ❤️ untuk PT. Sumber Ganda Mekar**
