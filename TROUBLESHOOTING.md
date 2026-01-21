# 🔧 TROUBLESHOOTING GUIDE - Error Umum

## ❌ Error di Console Browser

### 1. **Error: "Firebase: Error (auth/invalid-api-key)"**

**Penyebab:**
- Firebase config tidak valid atau masih placeholder

**Solusi:**
```javascript
// Buka firebase-config.js dan pastikan sudah terisi dengan benar
const firebaseConfig = {
    apiKey: "AIzaSy...",  // HARUS dari Firebase Console
    authDomain: "your-project.firebaseapp.com",
    // dst...
};
```

**Cara mendapatkan config:**
1. Firebase Console → ⚙️ Settings → Project settings
2. Scroll ke "Your apps" → Web app
3. Copy semua nilai firebaseConfig

---

### 2. **Error: "Failed to load module script" atau CORS**

**Penyebab:**
- File dibuka langsung dengan `file://` protocol
- Module import tidak support di local file

**Solusi A - Live Server (Recommended):**
```bash
# Install live-server global
npm install -g live-server

# Jalankan di folder project
cd c:\Users\nunud\Downloads\pp
live-server
```

**Solusi B - Python Simple Server:**
```bash
# Python 3
cd c:\Users\nunud\Downloads\pp
python -m http.server 8000

# Buka browser: http://localhost:8000
```

**Solusi C - VS Code Live Server:**
1. Install extension "Live Server" di VS Code
2. Klik kanan pada `login.html`
3. Pilih "Open with Live Server"

---

### 3. **Error: "(anonymous) @ login:396"**

**Penyebab:**
- Firebase initialization gagal
- Config tidak valid

**Solusi:**
✅ Sudah diperbaiki! `login.html` sekarang import dari `firebase-config.js`

**Test:**
1. Buka browser console (F12)
2. Reload page
3. Cek apakah ada error Firebase
4. Jika masih error, cek `firebase-config.js` sudah benar

---

### 4. **Error: "auth/invalid-credential"**

**Penyebab:**
- Email atau password salah
- User belum dibuat di Firebase

**Solusi:**
1. Buka Firebase Console → Authentication → Users
2. Pastikan user sudah ada
3. Coba reset password atau buat user baru
4. Test login lagi

---

### 5. **Error: "Permission denied"**

**Penyebab:**
- Firebase Database Rules terlalu ketat
- User tidak authenticated

**Solusi:**
Firebase Console → Realtime Database → Rules:
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

---

### 6. **Error: "Cannot read property 'uid' of null"**

**Penyebab:**
- User logout tetapi masih coba akses database
- Auth state belum ready

**Solusi:**
Sudah ditangani di `auth.js` dengan check:
```javascript
const userId = auth.currentUser?.uid;
if (!userId) return;
```

---

### 7. **Redirect Loop (login → index → login → ...)**

**Penyebab:**
- Auth check gagal di index.html
- Firebase config tidak sama

**Solusi:**
1. Clear browser cache: `Ctrl + Shift + Delete`
2. Hard reload: `Ctrl + F5`
3. Coba incognito mode
4. Pastikan `firebase-config.js` terisi dengan benar

---

## 🌐 Error Deploy Vercel

### 1. **"routes cannot be used with headers"**

**Penyebab:**
- vercel.json menggunakan legacy API

**Solusi:**
✅ Sudah diperbaiki! `vercel.json` sekarang menggunakan modern API

---

### 2. **"Build failed" di Vercel**

**Penyebab:**
- File corrupt atau missing

**Solusi:**
```bash
# Re-deploy dengan force
vercel --prod --force
```

---

### 3. **"404 Not Found" untuk semua pages**

**Penyebab:**
- Routing issue di Vercel

**Solusi:**
Pastikan `vercel.json` ada dan benar:
```json
{
  "redirects": [
    {
      "source": "/",
      "destination": "/login.html"
    }
  ],
  "cleanUrls": true
}
```

---

## 💾 Error Database

### 1. **Data tidak tersimpan**

**Checklist:**
- [ ] Koneksi internet OK?
- [ ] Firebase Database aktif?
- [ ] User sudah login?
- [ ] Console ada error?

**Test:**
```javascript
// Paste di browser console
console.log('User:', auth.currentUser);
console.log('Database:', database);
```

---

### 2. **Data hilang setelah logout**

**Normal!** Data di localStorage akan di-sync ke Firebase.

**Cara restore:**
1. Login lagi
2. Data otomatis di-load dari Firebase
3. Jika masih kosong, cek Firebase Console → Database

---

### 3. **Sync tidak jalan**

**Checklist:**
- [ ] Auto-sync aktif? (cek console: "Auto-sync started")
- [ ] Koneksi internet stabil?
- [ ] Firebase Database rules OK?

**Manual Sync:**
```javascript
// Paste di browser console
import { syncWithFirebase } from './auth.js';
await syncWithFirebase();
```

---

## 🔐 Error Authentication

### 1. **"User not found"**

**Solusi:**
Firebase Console → Authentication → Users → Add user

---

### 2. **"Too many requests"**

**Penyebab:**
- Terlalu banyak login failed

**Solusi:**
- Tunggu 15-30 menit
- Atau reset password user di Firebase Console

---

### 3. **"Network request failed"**

**Penyebab:**
- Tidak ada internet
- Firewall block Firebase

**Solusi:**
- Cek koneksi internet
- Cek firewall/antivirus
- Test: `ping firebaseapp.com`

---

## 🖥️ Error Local Development

### 1. **"Cannot use import statement"**

**Penyebab:**
- Browser tidak support ES6 modules di `file://`

**Solusi:**
Gunakan local server (see #2 di atas)

---

### 2. **Logo tidak muncul**

**Penyebab:**
- File `logo.png` tidak ada

**Solusi:**
1. Tambahkan file `logo.png` di root folder
2. Atau ganti di `login.html` dan `index.html`:
```html
<!-- Hapus atau ganti dengan icon -->
<img src="logo.png" alt="SGM" onerror="this.style.display='none'">
```

---

### 3. **Style tidak muncul**

**Checklist:**
- [ ] File `style.css` ada?
- [ ] Path benar? (harus: `<link rel="stylesheet" href="style.css">`)
- [ ] Browser cache? (Hard reload: Ctrl + F5)

---

## 📱 Error Mobile

### 1. **Layout rusak di mobile**

**Penyebab:**
- Viewport tidak set
- Responsive CSS tidak load

**Solusi:**
Pastikan ada di `<head>`:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

---

### 2. **Touch tidak responsive**

**Penyebab:**
- Button terlalu kecil
- Hover effect mengganggu

**Solusi:**
Sudah ada CSS untuk mobile di `style.css`:
```css
@media (max-width: 480px) {
  /* Mobile styles */
}
```

---

## 🆘 Cara Debug

### Step-by-step debugging:

1. **Buka Browser Console** (F12)

2. **Cek Errors:**
   - Tab Console → lihat error merah
   - Tab Network → cek failed requests

3. **Test Firebase Connection:**
```javascript
// Paste di console
console.log('Firebase Config:', firebaseConfig);
console.log('Current User:', auth.currentUser);
```

4. **Test Database:**
```javascript
// Paste di console
import { db } from './auth.js';
const testData = await db.get('users');
console.log('Database test:', testData);
```

5. **Check Auth State:**
```javascript
// Paste di console
auth.onAuthStateChanged(user => {
  console.log('Auth state changed:', user);
});
```

---

## 📞 Masih Error?

### Informasi yang perlu disediakan:

1. **Screenshot error** di console
2. **Browser** yang digunakan (Chrome/Firefox/dll)
3. **URL** yang diakses (local atau Vercel)
4. **Steps** yang menyebabkan error
5. **Firebase Project ID**

### Contact:
- CP. Irwan: 082117800626
- CP. Uwem: 082318188863

---

## ✅ Quick Checklist

Sebelum report error, cek dulu:

- [ ] `firebase-config.js` sudah terisi dengan benar
- [ ] User sudah dibuat di Firebase Console
- [ ] Firebase Database aktif dan rules sudah di-set
- [ ] File dibuka via local server (bukan `file://`)
- [ ] Browser console tidak ada error merah
- [ ] Internet connection OK
- [ ] Cache sudah di-clear (Ctrl + Shift + Delete)

**Jika semua ✅ tapi masih error, hubungi support!**
