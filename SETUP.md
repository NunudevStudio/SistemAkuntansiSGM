# 🚀 PANDUAN SETUP LENGKAP
## Sistem Akuntansi SGM dengan Firebase & Vercel

---

## 📦 LANGKAH 1: SETUP FIREBASE

### A. Buat Project Firebase

1. **Buka Firebase Console**
   - URL: https://console.firebase.google.com/
   - Login dengan Google Account

2. **Create New Project**
   - Klik tombol **"Add project"** atau **"Tambah project"**
   - Nama project: `sistem-akuntansi-sgm` (atau nama lain)
   - Google Analytics: **Disable** (tidak perlu)
   - Klik **Create Project**
   - Tunggu sampai project dibuat (sekitar 30 detik)

### B. Setup Authentication

1. **Buka Authentication**
   - Di sidebar kiri, klik: **Build > Authentication**
   - Klik tombol **Get Started**

2. **Aktifkan Email/Password**
   - Tab **Sign-in method**
   - Klik **Email/Password**
   - Toggle **Enable** menjadi aktif
   - Klik **Save**

3. **Buat User Admin Pertama**
   - Tab **Users**
   - Klik **Add user**
   - Email: `admin@sgm.com` (atau email Anda)
   - Password: buat password yang kuat (minimal 6 karakter)
   - Klik **Add user**
   
   ✅ User admin sudah dibuat!

### C. Setup Realtime Database

1. **Buat Database**
   - Di sidebar kiri, klik: **Build > Realtime Database**
   - Klik **Create Database**

2. **Pilih Region**
   - Pilih lokasi: **asia-southeast1** (Singapore - paling dekat dengan Indonesia)
   - Klik **Next**

3. **Security Rules**
   - Pilih: **Start in test mode**
   - Klik **Enable**

4. **Update Security Rules**
   - Tunggu database dibuat
   - Tab **Rules**
   - Ganti rules dengan:
   
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
   
   - Klik **Publish**

### D. Dapatkan Firebase Configuration

1. **Buka Project Settings**
   - Klik icon ⚙️ (gear) di sidebar
   - Pilih **Project settings**

2. **Tambah Web App**
   - Scroll ke bawah ke section **"Your apps"**
   - Klik icon **</>** (Web)
   - App nickname: `SGM Web App`
   - ❌ **Jangan** centang Firebase Hosting
   - Klik **Register app**

3. **Copy Configuration**
   - Akan muncul kode konfigurasi seperti ini:
   
   ```javascript
   const firebaseConfig = {
     apiKey: "AIzaSyAbc123...",
     authDomain: "sistem-akuntansi-sgm.firebaseapp.com",
     projectId: "sistem-akuntansi-sgm",
     storageBucket: "sistem-akuntansi-sgm.appspot.com",
     messagingSenderId: "123456789",
     appId: "1:123:web:abc123",
     databaseURL: "https://sistem-akuntansi-sgm-default-rtdb.asia-southeast1.firebasedatabase.app"
   };
   ```
   
   - **COPY semua bagian ini!**

4. **Paste ke File**
   - Buka file: `firebase-config.js`
   - Ganti bagian ini dengan config Anda:
   
   ```javascript
   const firebaseConfig = {
       apiKey: "PASTE_API_KEY_ANDA",
       authDomain: "PASTE_AUTH_DOMAIN_ANDA",
       projectId: "PASTE_PROJECT_ID_ANDA",
       storageBucket: "PASTE_STORAGE_BUCKET_ANDA",
       messagingSenderId: "PASTE_SENDER_ID_ANDA",
       appId: "PASTE_APP_ID_ANDA",
       databaseURL: "PASTE_DATABASE_URL_ANDA"
   };
   ```
   
   - **Save file**

✅ Firebase sudah siap!

---

## 🌐 LANGKAH 2: DEPLOY KE VERCEL

### OPSI A: Deploy via Vercel Website (PALING MUDAH)

1. **Buka Vercel**
   - URL: https://vercel.com/
   - Klik **Sign Up** (jika belum punya akun)
   - Login dengan GitHub / GitLab / Email

2. **Create New Project**
   - Klik **Add New...** > **Project**

3. **Import Git Repository (Recommended)**
   
   **Jika belum punya Git repo:**
   - Install Git: https://git-scm.com/downloads
   - Buka PowerShell/CMD di folder `c:\Users\nunud\Downloads\pp`
   - Jalankan:
   
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```
   
   **Push ke GitHub:**
   - Buat repo baru di https://github.com/new
   - Nama: `sistem-akuntansi-sgm`
   - Public atau Private (pilih sesuai kebutuhan)
   - Jangan centang apapun, klik **Create repository**
   - Copy command yang muncul (mirip dengan):
   
   ```bash
   git remote add origin https://github.com/username/sistem-akuntansi-sgm.git
   git branch -M main
   git push -u origin main
   ```
   
   - Paste dan jalankan di PowerShell
   
   **Import di Vercel:**
   - Kembali ke Vercel
   - Klik **Import Git Repository**
   - Pilih repository `sistem-akuntansi-sgm`
   - Klik **Import**

4. **Configure Project**
   - Project Name: `sistem-akuntansi-sgm` (atau biarkan default)
   - Framework Preset: **Other**
   - Root Directory: `./` (default)
   - Build Settings: **Biarkan kosong semua**
   - Klik **Deploy**

5. **Tunggu Deployment**
   - Proses deploy sekitar 1-2 menit
   - Loading bar akan berubah menjadi "Building"
   - Lalu "Deployed successfully"

6. **Buka Website**
   - Klik **Visit** atau klik domain yang muncul
   - Domain akan seperti: `https://sistem-akuntansi-sgm.vercel.app`
   - Otomatis redirect ke halaman login!

### OPSI B: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login**
   ```bash
   vercel login
   ```
   - Masukkan email
   - Verifikasi via email

3. **Deploy**
   ```bash
   cd c:\Users\nunud\Downloads\pp
   vercel
   ```
   
   - Set up and deploy? `Y`
   - Which scope? Pilih account Anda
   - Link to existing project? `N`
   - Project name: Enter (default) atau ketik nama
   - In which directory? `./` (default)
   - Override settings? `N`

4. **Production Deploy**
   ```bash
   vercel --prod
   ```

✅ Website sudah online!

---

## 🔐 LANGKAH 3: TEST LOGIN

1. **Buka URL Vercel**
   - Contoh: `https://sistem-akuntansi-sgm.vercel.app`
   - Akan muncul halaman login yang cantik

2. **Login dengan User Admin**
   - Email: `admin@sgm.com` (atau email yang dibuat di Firebase)
   - Password: password yang dibuat sebelumnya
   - Klik **Masuk**

3. **Jika Berhasil**
   - Redirect ke halaman utama aplikasi
   - Email Anda muncul di pojok kanan atas
   - Aplikasi siap digunakan!

4. **Jika Gagal**
   - Cek browser console (F12 > Console)
   - Pastikan `firebase-config.js` sudah benar
   - Cek email & password di Firebase Console > Authentication > Users

---

## 👥 LANGKAH 4: MENAMBAH USER BARU

**PENTING: User HANYA bisa ditambahkan oleh Admin melalui Firebase Console!**

1. **Buka Firebase Console**
   - https://console.firebase.google.com/
   - Pilih project Anda

2. **Buka Authentication**
   - **Build > Authentication**
   - Tab **Users**

3. **Add User**
   - Klik **Add user**
   - Email: masukkan email karyawan (contoh: `staff@sgm.com`)
   - Password: buat password untuk karyawan
   - Klik **Add user**

4. **Berikan Kredensial kepada Karyawan**
   - Beritahu email dan password kepada karyawan
   - Mereka bisa langsung login di URL aplikasi
   - **TIDAK ADA** halaman register publik

---

## 📊 LANGKAH 5: MENGGUNAKAN APLIKASI

### Login:
1. Buka URL Vercel
2. Masukkan email & password
3. Klik Masuk

### Input Data:
1. Pilih tab (Penjualan, Pembelian, dll)
2. Isi form sesuai kebutuhan
3. Klik "Simpan"

### Lihat Laporan:
1. Klik tab laporan yang diinginkan
2. Gunakan filter untuk mencari data
3. Klik tombol "Cetak" atau "Ekspor Excel"

### Logout:
1. Klik tombol "Keluar" di pojok kanan atas
2. Konfirmasi logout
3. Data otomatis di-sync ke Firebase sebelum logout

---

## 🔄 DATA SYNCHRONIZATION

### Auto-Sync:
- Data otomatis tersinkronisasi ke Firebase **setiap 5 menit**
- Sync juga terjadi saat **logout** atau **tutup browser**

### Manual Check:
- Buka Firebase Console
- **Build > Realtime Database**
- Lihat data di path: `/users/{user-id}/data/`
- Data akan muncul dalam format JSON

### Restore Data:
- Saat login, data otomatis di-load dari Firebase
- Jika ganti device/browser, data tetap tersedia
- Multi-user bisa akses bersamaan (data per-user)

---

## ⚙️ KONFIGURASI LANJUTAN

### Custom Domain (Opsional):

1. **Beli Domain** (contoh: sgm-akuntansi.com)

2. **Di Vercel:**
   - Project Settings > Domains
   - Tambahkan domain Anda
   - Ikuti instruksi DNS

3. **Update DNS** di domain provider

### Database Rules (Production):

Untuk keamanan lebih baik, update di Firebase Console > Database > Rules:

```json
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid",
        ".validate": "newData.hasChildren(['transactions', 'purchases'])"
      }
    }
  }
}
```

### Backup Strategy:

1. **Backup Otomatis:**
   - Firebase sudah otomatis backup
   - Retention: 30 hari

2. **Manual Backup:**
   - Firebase Console > Database
   - Klik ⋮ > Export JSON
   - Save file JSON

---

## 🛠️ TROUBLESHOOTING

### Problem: "Firebase config error"
**Solution:**
- Cek `firebase-config.js` sudah benar
- Pastikan semua field terisi
- Perhatikan tanda `,` (koma) di akhir setiap baris kecuali yang terakhir

### Problem: "Permission denied"  
**Solution:**
- Cek Firebase Database Rules
- Pastikan user sudah login
- Lihat browser console untuk error detail

### Problem: Redirect loop
**Solution:**
- Clear browser cache: Ctrl + Shift + Del
- Hard refresh: Ctrl + F5
- Coba browser lain (incognito mode)

### Problem: Data tidak tersimpan
**Solution:**
- Cek koneksi internet
- Lihat Firebase Console > Database apakah data muncul
- Cek browser console untuk error
- Pastikan sync sudah jalan (tunggu 5 menit atau logout)

### Problem: Lupa password user
**Solution:**
- Firebase Console > Authentication > Users
- Klik user yang lupa password
- Klik ⋮ > Reset password
- Atau hapus user dan buat ulang

---

## 📞 SUPPORT

Jika ada pertanyaan atau butuh bantuan:

**PT. Sumber Ganda Mekar**
- CP. Irwan: 082117800626
- CP. Uwem: 082318188863
- Alamat: Jl. Raya Gedebage No. 95 Bandung

---

## ✅ CHECKLIST SETUP

Gunakan checklist ini untuk memastikan semua sudah dikonfigurasi:

- [ ] Firebase project dibuat
- [ ] Authentication Email/Password diaktifkan
- [ ] User admin pertama dibuat
- [ ] Realtime Database dibuat dan rules di-update
- [ ] Firebase config di-copy ke `firebase-config.js`
- [ ] File `firebase-config.js` sudah di-save
- [ ] Project di-deploy ke Vercel
- [ ] URL Vercel bisa dibuka
- [ ] Login berhasil dengan user admin
- [ ] Email muncul di header (pojok kanan atas)
- [ ] Test input data penjualan/pembelian
- [ ] Test logout
- [ ] Test login lagi dan data masih ada

**Jika semua sudah ✅ maka setup BERHASIL!**

---

**Selamat menggunakan Sistem Akuntansi SGM! 🎉**
