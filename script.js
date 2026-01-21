// Data Master Supplier
const dataMasterSupplier = [
    { id: 1, nama: 'PT. Semen Indonesia', alamat: 'Jl. Industri No. 1, Gresik', telepon: '031-9876543', npwp: '11.111.111.1-111.000', email: 'semen@email.com', keterangan: 'Supplier semen utama' },
    { id: 2, nama: 'CV. Baja Kuat', alamat: 'Jl. Baja No. 25, Jakarta', telepon: '021-8765432', npwp: '22.222.222.2-222.000', email: 'bajakuat@email.com', keterangan: 'Supplier besi beton' },
    { id: 3, nama: 'PT. Cat Warna', alamat: 'Jl. Warna No. 50, Tangerang', telepon: '021-7654321', npwp: '33.333.333.3-333.000', email: 'catwarna@email.com', keterangan: 'Supplier cat & plitur' },
    { id: 4, nama: 'UD. Pipa Jaya', alamat: 'Jl. Pipa No. 15, Bekasi', telepon: '021-6543210', npwp: '44.444.444.4-444.000', email: 'pipajaya@email.com', keterangan: 'Supplier pipa PVC' },
    { id: 5, nama: 'PT. Keramik Indah', alamat: 'Jl. Keramik No. 30, Cikampek', telepon: '0264-5432109', npwp: '55.555.555.5-555.000', email: 'keramik@email.com', keterangan: 'Supplier keramik & granit' },
    { id: 6, nama: 'CV. Pakan Sejahtera', alamat: 'Jl. Peternakan No. 88, Blitar', telepon: '0342-4321098', npwp: '66.666.666.6-666.000', email: 'pakan@email.com', keterangan: 'Supplier pakan ternak' },
    { id: 7, nama: 'PT. Kayu Makmur', alamat: 'Jl. Kehutanan No. 77, Kalimantan', telepon: '0511-3210987', npwp: '77.777.777.7-777.000', email: 'kayu@email.com', keterangan: 'Supplier kayu & triplek' },
    { id: 8, nama: 'UD. Pasir Jaya', alamat: 'Jl. Quarry No. 99, Bogor', telepon: '0251-2109876', npwp: '88.888.888.8-888.000', email: 'pasir@email.com', keterangan: 'Supplier pasir & batu' }
];

// Data Pembelian
let purchases = JSON.parse(localStorage.getItem('purchases')) || [];

// Fungsi Tab Switching
function switchTab(tabName) {
    // Hide all modules
    document.querySelectorAll('.module').forEach(m => {
        m.classList.remove('active');
        m.style.display = 'none';
    });

    // Show selected module
    const selected = document.getElementById(tabName + 'Module');
    if (selected) {
        selected.classList.add('active');
        selected.style.display = 'block';
    }

    // Update buttons
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    if (tabName === 'penjualan') document.querySelector('.tab-btn:nth-child(1)').classList.add('active');
    if (tabName === 'pembelian') document.querySelector('.tab-btn:nth-child(2)').classList.add('active');
    if (tabName === 'piutang') document.querySelector('.tab-btn:nth-child(3)').classList.add('active');
    if (tabName === 'hutang') document.querySelector('.tab-btn:nth-child(4)').classList.add('active');

    // Refresh tables
    if (tabName === 'penjualan') displayTransactions();
    if (tabName === 'pembelian') displayPurchases();
    if (tabName === 'piutang') displayPiutang();
    if (tabName === 'hutang') displayHutang();
    if (tabName === 'kas') displayKas();
    if (tabName === 'jurnal') displayJurnal();
    if (tabName === 'bukubesar') { /* Wait */ }
    if (tabName === 'labarugi') displayLabaRugi();
    if (tabName === 'laporandivisi') displayLaporanDivisi();
    if (tabName === 'laporanppn') displayLaporanPPN();
    if (tabName === 'datamaster') {
        // Display first sub-tab (pelanggan) by default
        switchMasterTab('pelanggan');
    }
    if (tabName === 'pencarian') {
        const input = document.getElementById('inputGlobalSearch');
        if (input) input.value = '';
        const results = document.getElementById('globalSearchResults');
        if (results) results.innerHTML = '<div style="text-align: center; color: #777; margin-top: 50px;"><p>Mulai ketik untuk mencari transaksi penjualan, pembelian, atau arus kas.</p></div>';
    }
}

// Fungsi Switch Master Tab (untuk sub-tabs di Data Master)
function switchMasterTab(tabName) {
    // Hide all master sections
    document.querySelectorAll('.master-section').forEach(section => {
        section.classList.remove('active');
    });

    // Show selected section
    const selected = document.getElementById(tabName + 'Section');
    if (selected) {
        selected.classList.add('active');
    }

    // Update sub-tab buttons
    document.querySelectorAll('.sub-tab-btn').forEach(btn => btn.classList.remove('active'));
    const activeBtn = Array.from(document.querySelectorAll('.sub-tab-btn')).find(btn =>
        btn.getAttribute('onclick').includes(tabName)
    );
    if (activeBtn) activeBtn.classList.add('active');

    // Display data for selected tab
    if (tabName === 'pelanggan') displayCustomers();
    if (tabName === 'supplier') displaySuppliers();
    if (tabName === 'barang') displayBarang();
}

// Data Master Customer
let dataMasterCustomer = [
    { id: 1, nama: 'Toko Berkah Jaya', alamat: 'Jl. Sudirman No. 123, Jakarta', telepon: '021-5551234', npwp: '01.234.567.8-123.000', email: 'berkah@email.com', keterangan: 'Customer tetap' },
    { id: 2, nama: 'CV. Maju Bersama', alamat: 'Jl. Ahmad Yani No. 45, Bandung', telepon: '022-4567890', npwp: '02.345.678.9-234.000', email: 'maju@email.com', keterangan: 'Pembayaran COD' },
    { id: 3, nama: 'PT. Sentosa Abadi', alamat: 'Jl. Gatot Subroto No. 78, Surabaya', telepon: '031-7890123', npwp: '03.456.789.0-345.000', email: 'sentosa@email.com', keterangan: 'Customer VIP' },
    { id: 4, nama: 'UD. Sinar Terang', alamat: 'Jl. Diponegoro No. 56, Semarang', telepon: '024-3456789', npwp: '04.567.890.1-456.000', email: 'sinar@email.com', keterangan: 'Kredit maksimal 30 hari' },
    { id: 5, nama: 'Toko Makmur', alamat: 'Jl. Pahlawan No. 90, Yogyakarta', telepon: '0274-8901234', npwp: '05.678.901.2-567.000', email: 'makmur@email.com', keterangan: 'Customer baru' },
    { id: 6, nama: 'CV. Prima Mandiri', alamat: 'Jl. Veteran No. 12, Malang', telepon: '0341-2345678', npwp: '06.789.012.3-678.000', email: 'prima@email.com', keterangan: 'Pembayaran transfer' },
    { id: 7, nama: 'PT. Jaya Abadi', alamat: 'Jl. Merdeka No. 34, Medan', telepon: '061-5678901', npwp: '07.890.123.4-789.000', email: 'jaya@email.com', keterangan: 'Customer prioritas' },
    { id: 8, nama: 'UD. Sejahtera', alamat: 'Jl. Asia Afrika No. 67, Makassar', telepon: '0411-6789012', npwp: '08.901.234.5-890.000', email: 'sejahtera@email.com', keterangan: 'Customer tetap' }
];

// Data Master Barang
let dataMasterBarang = [
    { id: 1, kode: 'SMN-001', nama: 'Semen Gresik 50kg', kategori: 'Bahan Bangunan', satuan: 'Sak', hargaBeli: 52000, hargaJual: 58000, keterangan: 'Semen portland' },
    { id: 2, kode: 'SMN-002', nama: 'Semen Tiga Roda 50kg', kategori: 'Bahan Bangunan', satuan: 'Sak', hargaBeli: 54000, hargaJual: 60000, keterangan: 'Semen portland' },
    { id: 3, kode: 'BSI-001', nama: 'Besi Beton 10mm', kategori: 'Besi', satuan: 'Batang', hargaBeli: 85000, hargaJual: 95000, keterangan: 'Besi beton polos' },
    { id: 4, kode: 'BSI-002', nama: 'Besi Beton 12mm', kategori: 'Besi', satuan: 'Batang', hargaBeli: 120000, hargaJual: 135000, keterangan: 'Besi beton polos' },
    { id: 5, kode: 'BSI-003', nama: 'Besi Beton 8mm', kategori: 'Besi', satuan: 'Batang', hargaBeli: 55000, hargaJual: 65000, keterangan: 'Besi beton polos' },
    { id: 6, kode: 'PSR-001', nama: 'Pasir Cor', kategori: 'Bahan Bangunan', satuan: 'Kubik', hargaBeli: 250000, hargaJual: 300000, keterangan: 'Pasir silika' },
    { id: 7, kode: 'BTU-001', nama: 'Batu Split', kategori: 'Bahan Bangunan', satuan: 'Kubik', hargaBeli: 280000, hargaJual: 350000, keterangan: 'Batu pecah 2-3cm' },
    { id: 8, kode: 'BTA-001', nama: 'Bata Merah', kategori: 'Bahan Bangunan', satuan: 'Buah', hargaBeli: 800, hargaJual: 1000, keterangan: 'Bata press' },
    { id: 9, kode: 'BTK-001', nama: 'Batako', kategori: 'Bahan Bangunan', satuan: 'Buah', hargaBeli: 3500, hargaJual: 4500, keterangan: 'Batako pres' },
    { id: 10, kode: 'KRM-001', nama: 'Keramik 40x40', kategori: 'Bahan Bangunan', satuan: 'Dus', hargaBeli: 55000, hargaJual: 68000, keterangan: 'Keramik lantai' },
    { id: 11, kode: 'KRM-002', nama: 'Keramik 60x60', kategori: 'Bahan Bangunan', satuan: 'Dus', hargaBeli: 85000, hargaJual: 105000, keterangan: 'Keramik granit' },
    { id: 12, kode: 'CAT-001', nama: 'Cat Tembok 5kg', kategori: 'Bahan Bangunan', satuan: 'Kaleng', hargaBeli: 75000, hargaJual: 95000, keterangan: 'Cat interior' },
    { id: 13, kode: 'PPA-001', nama: 'Pipa PVC 4"', kategori: 'Bahan Bangunan', satuan: 'Batang', hargaBeli: 45000, hargaJual: 58000, keterangan: 'Pipa AW' },
    { id: 14, kode: 'TRP-001', nama: 'Triplek 9mm', kategori: 'Bahan Bangunan', satuan: 'Lembar', hargaBeli: 125000, hargaJual: 150000, keterangan: 'Triplek meranti' },
    { id: 15, kode: 'PKN-001', nama: 'Pakan Ayam Layer', kategori: 'Pakan Ternak', satuan: 'Karung', hargaBeli: 320000, hargaJual: 360000, keterangan: 'Pakan petelur 50kg' },
    { id: 16, kode: 'PKN-002', nama: 'Pakan Ayam Broiler', kategori: 'Pakan Ternak', satuan: 'Karung', hargaBeli: 340000, hargaJual: 380000, keterangan: 'Pakan pedaging 50kg' },
    { id: 17, kode: 'PKN-003', nama: 'Dedak Padi', kategori: 'Pakan Ternak', satuan: 'Karung', hargaBeli: 85000, hargaJual: 100000, keterangan: 'Dedak halus 50kg' },
    { id: 18, kode: 'JSA-001', nama: 'Jasa Angkutan Truck', kategori: 'Jasa Angkutan', satuan: 'Trip', hargaBeli: 0, hargaJual: 350000, keterangan: 'Truck engkel' },
    { id: 19, kode: 'JSA-002', nama: 'Jasa Angkutan Pickup', kategori: 'Jasa Angkutan', satuan: 'Trip', hargaBeli: 0, hargaJual: 150000, keterangan: 'Pickup standar' },
    { id: 20, kode: 'SNG-001', nama: 'Seng Gelombang', kategori: 'Bahan Bangunan', satuan: 'Lembar', hargaBeli: 65000, hargaJual: 80000, keterangan: 'Seng BJLS 0.25mm' }
];

// Array untuk menyimpan transaksi
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
let salesCart = []; // Cart untuk Penjualan
let purchaseCart = []; // Cart untuk Pembelian

// Premium Header Scroll Effect
window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    if (header) {
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
});

// --- FUNGSI RENDER DATA MASTER (TAMBAHAN PERBAIKAN) ---

// 1. Menampilkan Data Pelanggan
function displayCustomers() {
    const tbody = document.getElementById('customerTableBody');
    if (!tbody) return;

    tbody.innerHTML = ''; // Kosongkan tabel sebelum diisi

    if (dataMasterCustomer.length === 0) {
        tbody.innerHTML = '<tr class="no-data"><td colspan="8">Belum ada data pelanggan</td></tr>';
        return;
    }

    dataMasterCustomer.forEach((c, index) => {
        const row = tbody.insertRow();
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${c.nama}</td>
            <td>${c.alamat}</td>
            <td>${c.telepon}</td>
            <td>${c.npwp}</td>
            <td>${c.email}</td>
            <td>${c.keterangan}</td>
            <td class="action-buttons">
                <button class="btn-icon btn-edit" onclick="alert('Fitur edit pelanggan belum dibuat')" title="Edit">✏️</button>
                <button class="btn-icon btn-delete" onclick="deleteCustomer(${c.id})" title="Hapus">🗑️</button>
            </td>
        `;
    });
}

// 2. Menampilkan Data Supplier
function displaySuppliers() {
    const tbody = document.getElementById('supplierTableBody');
    if (!tbody) return;

    tbody.innerHTML = '';

    if (dataMasterSupplier.length === 0) {
        tbody.innerHTML = '<tr class="no-data"><td colspan="8">Belum ada data supplier</td></tr>';
        return;
    }

    dataMasterSupplier.forEach((s, index) => {
        const row = tbody.insertRow();
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${s.nama}</td>
            <td>${s.alamat}</td>
            <td>${s.telepon}</td>
            <td>${s.npwp}</td>
            <td>${s.email}</td>
            <td>${s.keterangan}</td>
            <td class="action-buttons">
                <button class="btn-icon btn-edit" onclick="alert('Fitur edit supplier belum dibuat')" title="Edit">✏️</button>
                <button class="btn-icon btn-delete" onclick="deleteSupplier(${s.id})" title="Hapus">🗑️</button>
            </td>
        `;
    });
}

// 3. Menampilkan Data Barang
function displayBarang() {
    const tbody = document.getElementById('barangTableBody');
    if (!tbody) {
        console.error('barangTableBody not found!');
        return;
    }

    console.log('Displaying barang data:', dataMasterBarang.length, 'items');
    tbody.innerHTML = '';

    if (dataMasterBarang.length === 0) {
        tbody.innerHTML = '<tr class="no-data"><td colspan="7">Belum ada data barang</td></tr>';
        return;
    }

    dataMasterBarang.forEach((b, index) => {
        const row = tbody.insertRow();
        row.innerHTML = `
            <td>${index + 1}</td>
            <td><strong>${b.kode}</strong></td>
            <td>${b.nama}</td>
            <td><span class="badge badge-info">${b.kategori}</span></td>
            <td>${b.satuan}</td>
            <td>${b.keterangan || '-'}</td>
            <td class="action-buttons">
                <button class="btn-icon btn-edit" onclick="alert('Fitur edit barang belum dibuat')" title="Edit">✏️</button>
                <button class="btn-icon btn-delete" onclick="deleteBarang(${b.id})" title="Hapus">🗑️</button>
            </td>
        `;
    });

    console.log('Barang table updated successfully');
}

// --- FUNGSI HAPUS DATA MASTER ---

function deleteCustomer(id) {
    if (confirm('Hapus pelanggan ini?')) {
        const index = dataMasterCustomer.findIndex(c => c.id === id);
        if (index !== -1) {
            dataMasterCustomer.splice(index, 1);
            displayCustomers();
        }
    }
}

function deleteSupplier(id) {
    if (confirm('Hapus supplier ini?')) {
        const index = dataMasterSupplier.findIndex(s => s.id === id);
        if (index !== -1) {
            dataMasterSupplier.splice(index, 1);
            displaySuppliers();
        }
    }
}

function deleteBarang(id) {
    if (confirm('Hapus barang ini?')) {
        const index = dataMasterBarang.findIndex(b => b.id === id);
        if (index !== -1) {
            dataMasterBarang.splice(index, 1);
            displayBarang();
        }
    }
}

// --- CART FUNCTIONS UNTUK PENJUALAN ---

function addItemToSalesCart() {
    const nama = document.getElementById('namaBarang').value;
    const kode = document.getElementById('kodeBarang').value || '';
    const satuan = document.getElementById('satuanBarang').value || '';
    const jumlah = parseFloat(document.getElementById('jumlah').value) || 0;
    const harga = parseFloat(document.getElementById('hargaSatuan').value) || 0;

    if (!nama || jumlah <= 0 || harga < 0) {
        alert('Mohon lengkapi data barang valid (Nama kosong, Jumlah > 0, Harga >= 0)');
        return;
    }

    const item = {
        namaBarang: nama,
        kodeBarang: kode,
        satuan: satuan,
        jumlah: jumlah,
        hargaSatuan: harga,
        total: jumlah * harga
    };

    salesCart.push(item);
    renderSalesCart();
    hitungTotal();

    // Clear inputs
    document.getElementById('namaBarang').value = '';
    document.getElementById('kodeBarang').value = '';
    document.getElementById('satuanBarang').value = '';
    document.getElementById('jumlah').value = '1';
    document.getElementById('hargaSatuan').value = '';
    document.getElementById('productSuggestions').style.display = 'none';
}

function renderSalesCart() {
    const tbody = document.getElementById('salesCartBody');
    const container = document.getElementById('salesCartContainer');

    tbody.innerHTML = '';

    if (salesCart.length === 0) {
        container.style.display = 'none';
        return;
    }

    container.style.display = 'block';

    salesCart.forEach((item, index) => {
        const row = tbody.insertRow();
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.namaBarang}</td>
            <td>${item.kodeBarang}</td>
            <td class="text-center">${item.jumlah} ${item.satuan}</td>
            <td class="text-right">${formatRupiah(item.hargaSatuan)}</td>
            <td class="text-right">${formatRupiah(item.total)}</td>
            <td class="text-center">
                <button type="button" class="btn-icon btn-delete" onclick="removeSalesCartItem(${index})">X</button>
            </td>
        `;
    });
}

function removeSalesCartItem(index) {
    salesCart.splice(index, 1);
    renderSalesCart();
    hitungTotal();
}

// --- CART FUNCTIONS UNTUK PEMBELIAN ---

function addItemToPurchaseCart() {
    const nama = document.getElementById('namaBarangBeli').value;
    const kode = document.getElementById('kodeBarangBeli').value || '';
    const satuan = document.getElementById('satuanBarangBeli').value || '';
    const jumlah = parseFloat(document.getElementById('jumlahBeli').value) || 0;
    const harga = parseFloat(document.getElementById('hargaSatuanBeli').value) || 0;

    if (!nama || jumlah <= 0 || harga < 0) {
        alert('Mohon lengkapi data barang valid (Nama kosong, Jumlah > 0, Harga >= 0)');
        return;
    }

    const item = {
        namaBarang: nama,
        kodeBarang: kode,
        satuan: satuan,
        jumlah: jumlah,
        hargaSatuan: harga,
        total: jumlah * harga // Subtotal per item
    };

    purchaseCart.push(item);
    renderPurchaseCart();
    hitungTotalBeli();

    // Clear inputs
    document.getElementById('namaBarangBeli').value = '';
    document.getElementById('kodeBarangBeli').value = '';
    document.getElementById('satuanBarangBeli').value = '';
    document.getElementById('jumlahBeli').value = '1';
    document.getElementById('hargaSatuanBeli').value = '';
    document.getElementById('productSuggestionsBeli').style.display = 'none';
}

function renderPurchaseCart() {
    const tbody = document.getElementById('purchaseCartBody');
    const container = document.getElementById('purchaseCartContainer');

    tbody.innerHTML = '';

    if (purchaseCart.length === 0) {
        container.style.display = 'none';
        return;
    }

    container.style.display = 'block';

    purchaseCart.forEach((item, index) => {
        const row = tbody.insertRow();
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.namaBarang}</td>
            <td>${item.kodeBarang}</td>
            <td class="text-center">${item.jumlah} ${item.satuan}</td>
            <td class="text-right">${formatRupiah(item.hargaSatuan)}</td>
            <td class="text-right">${formatRupiah(item.total)}</td>
             <td class="text-center">
                <button type="button" class="btn-icon btn-delete" onclick="removePurchaseCartItem(${index})">X</button>
            </td>
        `;
    });
}

function removePurchaseCartItem(index) {
    purchaseCart.splice(index, 1);
    renderPurchaseCart();
    hitungTotalBeli();
}


// Format angka ke format Rupiah
function formatRupiah(angka) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(angka);
}

// Generate nomor faktur otomatis
function generateNoFaktur() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    // Ambil transaksi hari ini
    const todayTransactions = transactions.filter(t => {
        const tDate = t.tanggal.split('/').reverse().join('');
        const nowDate = `${year}${month}${day}`;
        return tDate === nowDate;
    });

    const urutan = String(todayTransactions.length + 1).padStart(4, '0');
    return `NPP-${year}${month}${day}-${urutan}`;
}

// Generate nomor surat jalan otomatis
function generateNoSuratJalan() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    // Simple counter - in real app, this could be stored in localStorage
    const randomSuffix = String(Math.floor(Math.random() * 9000) + 1000);
    return `NSJ-${year}${month}${day}-${randomSuffix}`;
}

// Format tanggal input manual
function formatTanggalInput(input) {
    let value = input.value.replace(/\D/g, '');

    if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2);
    }
    if (value.length >= 5) {
        value = value.substring(0, 5) + '/' + value.substring(5, 9);
    }

    input.value = value.substring(0, 10);
}

// Validasi tanggal
function validasiTanggal(tanggal) {
    const parts = tanggal.split('/');
    if (parts.length !== 3) return false;

    const day = parseInt(parts[0]);
    const month = parseInt(parts[1]);
    const year = parseInt(parts[2]);

    if (day < 1 || day > 31 || month < 1 || month > 12 || year < 2000 || year > 2100) {
        return false;
    }

    return true;
}

// Fungsi untuk menghitung subtotal, PPN, dan total
function hitungTotal() {
    let subtotal = 0;

    // Hitung Subtotal dari Cart jika ada, jika tidak dari input manual (legacy/single item)
    if (salesCart && salesCart.length > 0) {
        subtotal = salesCart.reduce((sum, item) => sum + item.total, 0);
    } else {
        const jumlah = parseFloat(document.getElementById('jumlah').value) || 0;
        const hargaSatuan = parseFloat(document.getElementById('hargaSatuan').value) || 0;
        subtotal = jumlah * hargaSatuan;
    }

    const diskon = parseFloat(document.getElementById('diskon').value) || 0;
    const jenisPpnValue = document.getElementById('jenisPpn').value;
    const metodePembayaran = document.getElementById('metodePembayaran').value;
    const jumlahDibayar = parseFloat(document.getElementById('jumlahDibayar').value) || 0;

    // Hitung subtotal setelah diskon
    const subtotalSetelahDiskon = subtotal - diskon;

    // Hitung nilai PPN
    let nilaiPpn = 0;
    if (jenisPpnValue !== 'dibebaskan') {
        const jenisPpn = parseFloat(jenisPpnValue) || 0;
        nilaiPpn = (subtotalSetelahDiskon * jenisPpn) / 100;
    }

    // Hitung total
    const total = subtotalSetelahDiskon + nilaiPpn;

    // Hitung sisa pembayaran untuk kredit
    let sisaPembayaran = 0;
    if (metodePembayaran === 'Kredit') {
        sisaPembayaran = total - jumlahDibayar;
    }

    // Update field
    document.getElementById('subtotal').value = formatRupiah(subtotal);
    document.getElementById('nilaiPpn').value = formatRupiah(nilaiPpn);
    document.getElementById('total').value = formatRupiah(total);

    // Sisa
    const sisaGroup = document.getElementById('sisaGroup');
    const labelSisa = document.getElementById('sisaPembayaran');
    if (metodePembayaran === 'Kredit') {
        if (sisaGroup) sisaGroup.style.display = 'block';
        if (labelSisa) {
            labelSisa.value = formatRupiah(sisaPembayaran);
            labelSisa.dataset.value = sisaPembayaran;
        }
    }

    // Simpan nilai asli
    document.getElementById('subtotal').dataset.value = subtotal;
    document.getElementById('nilaiPpn').dataset.value = nilaiPpn;
    document.getElementById('total').dataset.value = total;
}

// Fungsi untuk menghitung total pembelian
function hitungTotalBeli() {
    let subtotalBeli = 0;

    // Hitung Subtotal dari Cart
    if (purchaseCart && purchaseCart.length > 0) {
        subtotalBeli = purchaseCart.reduce((sum, item) => sum + item.total, 0);
    } else {
        const jumlahBeli = parseFloat(document.getElementById('jumlahBeli').value) || 0;
        const hargaSatuanBeli = parseFloat(document.getElementById('hargaSatuanBeli').value) || 0;
        subtotalBeli = jumlahBeli * hargaSatuanBeli;
    }

    const diskonBeli = parseFloat(document.getElementById('diskonBeli').value) || 0;
    const jenisPpnBeliValue = document.getElementById('jenisPpnBeli').value;
    const metodePembayaranBeli = document.getElementById('metodePembayaranBeli').value;
    const uangMukaBeli = parseFloat(document.getElementById('uangMukaBeli').value) || 0;

    // Hitung subtotal setelah diskon
    const subtotalSetelahDiskon = subtotalBeli - diskonBeli;

    // Hitung nilai PPN
    let nilaiPpnBeli = 0;
    if (jenisPpnBeliValue !== 'dibebaskan') {
        const jenisPpnBeli = parseFloat(jenisPpnBeliValue) || 0;
        nilaiPpnBeli = (subtotalSetelahDiskon * jenisPpnBeli) / 100;
    }

    // Hitung total
    const totalBeli = subtotalSetelahDiskon + nilaiPpnBeli;

    // Hitung sisa pembayaran untuk kredit
    let sisaPembayaranBeli = 0;
    if (metodePembayaranBeli === 'Kredit') {
        sisaPembayaranBeli = totalBeli - uangMukaBeli;
    }

    // Update field
    document.getElementById('subtotalBeli').value = formatRupiah(subtotalBeli);
    document.getElementById('nilaiPpnBeli').value = formatRupiah(nilaiPpnBeli);
    document.getElementById('totalBeli').value = formatRupiah(totalBeli);

    // Sisa
    if (metodePembayaranBeli === 'Kredit') {
        const sisaBeli = document.getElementById('sisaPembayaranBeli');
        if (sisaBeli) {
            sisaBeli.value = formatRupiah(sisaPembayaranBeli);
            sisaBeli.dataset.value = sisaPembayaranBeli;
        }
    }

    // Simpan nilai asli
    document.getElementById('subtotalBeli').dataset.value = subtotalBeli;
    document.getElementById('nilaiPpnBeli').dataset.value = nilaiPpnBeli;
    document.getElementById('totalBeli').dataset.value = totalBeli;
}

// Data storage arrays
let dataPiutang = JSON.parse(localStorage.getItem('dataPiutang')) || [];
let dataHutang = JSON.parse(localStorage.getItem('dataHutang')) || [];
let dataKas = JSON.parse(localStorage.getItem('dataKas')) || [];
let dataJurnal = JSON.parse(localStorage.getItem('dataJurnal')) || [];

// Save functions
function savePiutang(data) {
    dataPiutang.push(data);
    localStorage.setItem('dataPiutang', JSON.stringify(dataPiutang));
    if (typeof displayPiutang === 'function') {
        displayPiutang();
    }
}

function saveHutang(data) {
    dataHutang.push(data);
    localStorage.setItem('dataHutang', JSON.stringify(dataHutang));
    if (typeof displayHutang === 'function') {
        displayHutang();
    }
}

function saveKas(data) {
    dataKas.push(data);
    localStorage.setItem('dataKas', JSON.stringify(dataKas));
    if (typeof displayKas === 'function') {
        displayKas();
    }
}

// Display functions
function displayPurchases(dataToDisplay = null) {
    const data = dataToDisplay || purchases;
    const tbody = document.getElementById('purchaseBody');
    const grandTotalSection = document.getElementById('grandTotalPurchaseSection');
    const grandTotalValue = document.getElementById('grandTotalPurchaseValue');

    if (!tbody) return;

    tbody.innerHTML = '';

    if (data.length === 0) {
        tbody.innerHTML = '<tr class="no-data"><td colspan="14">Belum ada pembelian</td></tr>';
        if (grandTotalSection) grandTotalSection.style.display = 'none';
        return;
    }

    let totalPurchases = 0;

    data.forEach((purchase, displayIndex) => {
        const originalIndex = purchases.indexOf(purchase);
        totalPurchases += Number(purchase.total);

        const row = tbody.insertRow();
        row.innerHTML = `
            <td>${displayIndex + 1}</td>
            <td>${purchase.tanggal}</td>
            <td>${purchase.divisi}</td>
            <td>${purchase.noFaktur}</td>
            <td>${purchase.namaSupplier}</td>
            <td>${purchase.namaBarang}</td>
            <td>${purchase.jumlah} ${purchase.satuan || ''}</td>
            <td class="rupiah">${formatRupiah(purchase.hargaSatuan)}</td>
            <td class="rupiah">${formatRupiah(purchase.diskon)}</td>
            <td class="rupiah">${formatRupiah(purchase.nilaiPpn)}</td>
            <td class="rupiah">${formatRupiah(purchase.uangMuka || 0)}</td>
            <td class="rupiah">${formatRupiah(purchase.total)}</td>
            <td class="rupiah">${formatRupiah(purchase.sisaPembayaran || 0)}</td>
            <td class="action-buttons">
                <button class="btn-icon btn-print" onclick="printPurchase(${originalIndex})" title="Cetak Invoice">📄 Invoice</button>
                <button class="btn-icon btn-print" onclick="printSuratJalanPembelian(${originalIndex})" title="Cetak Surat Jalan">📋 Surat Jalan</button>
                <button class="btn-icon btn-print" onclick="printKwitansiPembelian(${originalIndex})" title="Cetak Kwitansi">🧾 Kwitansi</button>
                <button class="btn-icon btn-edit" onclick="editPurchase(${originalIndex})" title="Edit">✏️ Edit</button>
                <button class="btn-icon btn-delete" onclick="deletePurchase(${originalIndex})" title="Hapus">🗑️ Hapus</button>
            </td>
        `;
    });

    if (grandTotalSection && grandTotalValue) {
        grandTotalSection.style.display = 'block';
        grandTotalValue.textContent = formatRupiah(totalPurchases);
    }
}

function displayPiutang() {
    // Display Rekap per Customer
    const rekapBody = document.getElementById('rekapPiutangBody');
    if (rekapBody) {
        rekapBody.innerHTML = '';

        // Group by customer
        const grouped = {};
        dataPiutang.forEach(p => {
            if (!grouped[p.namaPelanggan]) {
                grouped[p.namaPelanggan] = {
                    count: 0,
                    total: 0,
                    dibayar: 0,
                    sisa: 0
                };
            }
            grouped[p.namaPelanggan].count++;
            grouped[p.namaPelanggan].total += p.jumlah;
            grouped[p.namaPelanggan].dibayar += p.dibayar;
            grouped[p.namaPelanggan].sisa += p.sisa;
        });

        let index = 0;
        let grandTotalPiutang = 0;
        let grandTotalDibayar = 0;
        let grandTotalSisa = 0;

        for (const pelanggan in grouped) {
            const g = grouped[pelanggan];
            grandTotalPiutang += g.total;
            grandTotalDibayar += g.dibayar;
            grandTotalSisa += g.sisa;

            const row = rekapBody.insertRow();
            const status = g.sisa > 0 ? 'Belum Lunas' : 'Lunas';
            row.innerHTML = `
                <td>${++index}</td>
                <td>${pelanggan}</td>
                <td>${g.count}</td>
                <td class="rupiah">${formatRupiah(g.total)}</td>
                <td class="rupiah">${formatRupiah(g.dibayar)}</td>
                <td class="rupiah">${formatRupiah(g.sisa)}</td>
                <td><span class="badge badge-${status === 'Lunas' ? 'success' : 'warning'}">${status}</span></td>
            `;
        }

        // Update grand totals
        const grandTotalRekapSection = document.getElementById('grandTotalRekapSection');
        if (grandTotalRekapSection) {
            grandTotalRekapSection.style.display = 'block';
            document.getElementById('grandTotalRekapPiutang').textContent = formatRupiah(grandTotalPiutang);
            document.getElementById('grandTotalRekapDibayar').textContent = formatRupiah(grandTotalDibayar);
            document.getElementById('grandTotalRekapSisa').textContent = formatRupiah(grandTotalSisa);
        }
    }

    // Display Detail List
    const daftarBody = document.getElementById('daftarPiutangBody');
    if (daftarBody) {
        daftarBody.innerHTML = '';

        if (dataPiutang.length === 0) {
            daftarBody.innerHTML = '<tr class="no-data"><td colspan="11">Belum ada data piutang</td></tr>';
            return;
        }

        let totalAll = 0;
        let dibayarAll = 0;
        let sisaAll = 0;

        dataPiutang.forEach((p, i) => {
            totalAll += p.jumlah;
            dibayarAll += p.dibayar;
            sisaAll += p.sisa;

            const row = daftarBody.insertRow();
            row.innerHTML = `
                <td>${i + 1}</td>
                <td>${p.tanggal}</td>
                <td>${p.sumber}</td>
                <td>${p.noFaktur}</td>
                <td>${p.namaPelanggan}</td>
                <td>${p.keterangan}</td>
                <td class="rupiah">${formatRupiah(p.jumlah)}</td>
                <td class="rupiah">${formatRupiah(p.dibayar)}</td>
                <td class="rupiah">${formatRupiah(p.sisa)}</td>
                <td><span class="badge badge-${p.status === 'Lunas' ? 'success' : 'warning'}">${p.status}</span></td>
                <td class="action-buttons">
                    <button class="btn-icon btn-edit" onclick="bayarPiutang(${i})" title="Bayar">💰 Bayar</button>
                    <button class="btn-icon btn-delete" onclick="deletePiutang(${i})" title="Hapus">🗑️</button>
                </td>
            `;
        });

        // Update footer totals
        document.getElementById('totalPiutangAll').textContent = formatRupiah(totalAll);
        document.getElementById('totalDibayarAll').textContent = formatRupiah(dibayarAll);
        document.getElementById('totalSisaAll').textContent = formatRupiah(sisaAll);

        const grandTotalDaftarSection = document.getElementById('grandTotalDaftarSection');
        if (grandTotalDaftarSection) {
            grandTotalDaftarSection.style.display = 'block';
            document.getElementById('grandTotalDaftarPiutang').textContent = formatRupiah(totalAll);
            document.getElementById('grandTotalDaftarDibayar').textContent = formatRupiah(dibayarAll);
            document.getElementById('grandTotalDaftarSisa').textContent = formatRupiah(sisaAll);
        }
    }
}

function displayHutang() {
    // Similar to displayPiutang but for suppliers
    const rekapBody = document.getElementById('rekapHutangBody');
    if (rekapBody) {
        rekapBody.innerHTML = '';

        const grouped = {};
        dataHutang.forEach(h => {
            if (!grouped[h.namaSupplier]) {
                grouped[h.namaSupplier] = {
                    count: 0,
                    total: 0,
                    dibayar: 0,
                    sisa: 0
                };
            }
            grouped[h.namaSupplier].count++;
            grouped[h.namaSupplier].total += h.jumlah;
            grouped[h.namaSupplier].dibayar += h.dibayar;
            grouped[h.namaSupplier].sisa += h.sisa;
        });

        let index = 0;
        let grandTotalHutang = 0;
        let grandTotalDibayarHutang = 0;
        let grandTotalSisaHutang = 0;

        for (const supplier in grouped) {
            const g = grouped[supplier];
            grandTotalHutang += g.total;
            grandTotalDibayarHutang += g.dibayar;
            grandTotalSisaHutang += g.sisa;

            const row = rekapBody.insertRow();
            const status = g.sisa > 0 ? 'Belum Lunas' : 'Lunas';
            row.innerHTML = `
                <td>${++index}</td>
                <td>${supplier}</td>
                <td>${g.count}</td>
                <td class="rupiah">${formatRupiah(g.total)}</td>
                <td class="rupiah">${formatRupiah(g.dibayar)}</td>
                <td class="rupiah">${formatRupiah(g.sisa)}</td>
                <td><span class="badge badge-${status === 'Lunas' ? 'success' : 'warning'}">${status}</span></td>
            `;
        }

        const grandTotalRekapHutangSection = document.getElementById('grandTotalRekapHutangSection');
        if (grandTotalRekapHutangSection) {
            grandTotalRekapHutangSection.style.display = 'block';
            document.getElementById('grandTotalRekapHutang').textContent = formatRupiah(grandTotalHutang);
            document.getElementById('grandTotalRekapDibayarHutang').textContent = formatRupiah(grandTotalDibayarHutang);
            document.getElementById('grandTotalRekapSisaHutang').textContent = formatRupiah(grandTotalSisaHutang);
        }
    }

    // Display Detail List
    const daftarBody = document.getElementById('daftarHutangBody');
    if (daftarBody) {
        daftarBody.innerHTML = '';

        if (dataHutang.length === 0) {
            daftarBody.innerHTML = '<tr class="no-data"><td colspan="11">Belum ada data hutang</td></tr>';
            return;
        }

        let totalAll = 0;
        let dibayarAll = 0;
        let sisaAll = 0;

        dataHutang.forEach((h, i) => {
            totalAll += h.jumlah;
            dibayarAll += h.dibayar;
            sisaAll += h.sisa;

            const row = daftarBody.insertRow();
            row.innerHTML = `
                <td>${i + 1}</td>
                <td>${h.tanggal}</td>
                <td>${h.sumber}</td>
                <td>${h.noFaktur}</td>
                <td>${h.namaSupplier}</td>
                <td>${h.keterangan}</td>
                <td class="rupiah">${formatRupiah(h.jumlah)}</td>
                <td class="rupiah">${formatRupiah(h.dibayar)}</td>
                <td class="rupiah">${formatRupiah(h.sisa)}</td>
                <td><span class="badge badge-${h.status === 'Lunas' ? 'success' : 'warning'}">${h.status}</span></td>
                <td class="action-buttons">
                    <button class="btn-icon btn-edit" onclick="bayarHutang(${i})" title="Bayar">💰 Bayar</button>
                    <button class="btn-icon btn-delete" onclick="deleteHutang(${i})" title="Hapus">🗑️</button>
                </td>
            `;
        });

        document.getElementById('totalHutangAll').textContent = formatRupiah(totalAll);
        document.getElementById('totalDibayarHutangAll').textContent = formatRupiah(dibayarAll);
        document.getElementById('totalSisaHutangAll').textContent = formatRupiah(sisaAll);
    }
}

function displayKas() {
    const tbody = document.getElementById('kasBody');
    if (!tbody) return;

    tbody.innerHTML = '';

    if (dataKas.length === 0) {
        tbody.innerHTML = '<tr class="no-data"><td colspan="6">Belum ada transaksi kas</td></tr>';
        return;
    }

    let saldo = 0;
    dataKas.forEach((k, i) => {
        if (k.jenis === 'Masuk') {
            saldo += k.jumlah;
        } else {
            saldo -= k.jumlah;
        }

        const row = tbody.insertRow();
        row.innerHTML = `
            <td>${i + 1}</td>
            <td>${k.tanggal}</td>
            <td>${k.kategori}</td>
            <td>${k.keterangan}</td>
            <td class="rupiah"><span class="badge badge-${k.jenis === 'Masuk' ? 'success' : 'danger'}">${k.jenis}</span> ${formatRupiah(k.jumlah)}</td>
            <td class="rupiah">${formatRupiah(saldo)}</td>
             <td class="action-buttons">
                <button class="btn-icon btn-delete" onclick="deleteKas(${i})" title="Hapus">🗑️</button>
            </td>
        `;
    });
}

function displayJurnal() {
    // Placeholder - to be implemented
    console.log('displayJurnal called');
}

function displayLabaRugi() {
    // Placeholder - to be implemented
    console.log('displayLabaRugi called');
}

function displayLaporanDivisi() {
    // Placeholder - to be implemented
    console.log('displayLaporanDivisi called');
}

function displayLaporanPPN() {
    // Placeholder - to be implemented
    console.log('displayLaporanPPN called');
}

function displayBukuBesar() {
    // Placeholder - to be implemented
    console.log('displayBukuBesar called');
}

// Filter functions
function filterPurchases() {
    const searchValue = document.getElementById('searchPurchaseInput').value.toLowerCase();
    const startDate = document.getElementById('startPurchaseDate').value;
    const endDate = document.getElementById('endPurchaseDate').value;

    const filtered = purchases.filter(p => {
        const matchSearch = (
            p.noFaktur.toLowerCase().includes(searchValue) ||
            p.namaSupplier.toLowerCase().includes(searchValue) ||
            p.namaBarang.toLowerCase().includes(searchValue)
        );

        let matchDate = true;
        if (startDate || endDate) {
            const parts = p.tanggal.split('/');
            const pDate = new Date(parts[2], parts[1] - 1, parts[0]);
            pDate.setHours(0, 0, 0, 0);

            if (startDate) {
                const start = new Date(startDate);
                start.setHours(0, 0, 0, 0);
                if (pDate < start) matchDate = false;
            }
            if (endDate) {
                const end = new Date(endDate);
                end.setHours(0, 0, 0, 0);
                if (pDate > end) matchDate = false;
            }
        }

        return matchSearch && matchDate;
    });

    displayPurchases(filtered);
}

function filterPiutang() {
    const searchValue = document.getElementById('searchPiutangInput').value.toLowerCase();
    const statusFilter = document.getElementById('statusPiutangFilter').value;

    const filtered = dataPiutang.filter(p => {
        const matchSearch = p.namaPelanggan.toLowerCase().includes(searchValue);
        const matchStatus = !statusFilter || p.status === statusFilter;
        return matchSearch && matchStatus;
    });

    // Re-display with filtered data
    const daftarBody = document.getElementById('daftarPiutangBody');
    if (daftarBody) {
        daftarBody.innerHTML = '';

        if (filtered.length === 0) {
            daftarBody.innerHTML = '<tr class="no-data"><td colspan="11">Tidak ada data yang sesuai</td></tr>';
            return;
        }

        filtered.forEach((p, i) => {
            const row = daftarBody.insertRow();
            row.innerHTML = `
                <td>${i + 1}</td>
                <td>${p.tanggal}</td>
                <td>${p.sumber}</td>
                <td>${p.noFaktur}</td>
                <td>${p.namaPelanggan}</td>
                <td>${p.keterangan}</td>
                <td class="rupiah">${formatRupiah(p.jumlah)}</td>
                <td class="rupiah">${formatRupiah(p.dibayar)}</td>
                <td class="rupiah">${formatRupiah(p.sisa)}</td>
                <td><span class="badge badge-${p.status === 'Lunas' ? 'success' : 'warning'}">${p.status}</span></td>
                <td class="action-buttons">
                    <button class="btn-icon btn-edit" onclick="bayarPiutang(${dataPiutang.indexOf(p)})" title="Bayar">💰 Bayar</button>
                    <button class="btn-icon btn-delete" onclick="deletePiutang(${dataPiutang.indexOf(p)})" title="Hapus">🗑️</button>
                </td>
            `;
        });
    }
}

function filterHutang() {
    const searchValue = document.getElementById('searchHutangInput').value.toLowerCase();
    const statusFilter = document.getElementById('statusHutangFilter').value;

    const filtered = dataHutang.filter(h => {
        const matchSearch = h.namaSupplier.toLowerCase().includes(searchValue);
        const matchStatus = !statusFilter || h.status === statusFilter;
        return matchSearch && matchStatus;
    });

    const daftarBody = document.getElementById('daftarHutangBody');
    if (daftarBody) {
        daftarBody.innerHTML = '';

        if (filtered.length === 0) {
            daftarBody.innerHTML = '<tr class="no-data"><td colspan="11">Tidak ada data yang sesuai</td></tr>';
            return;
        }

        filtered.forEach((h, i) => {
            const row = daftarBody.insertRow();
            row.innerHTML = `
                <td>${i + 1}</td>
                <td>${h.tanggal}</td>
                <td>${h.sumber}</td>
                <td>${h.noFaktur}</td>
                <td>${h.namaSupplier}</td>
                <td>${h.keterangan}</td>
                <td class="rupiah">${formatRupiah(h.jumlah)}</td>
                <td class="rupiah">${formatRupiah(h.dibayar)}</td>
                <td class="rupiah">${formatRupiah(h.sisa)}</td>
                <td><span class="badge badge-${h.status === 'Lunas' ? 'success' : 'warning'}">${h.status}</span></td>
                <td class="action-buttons">
                    <button class="btn-icon btn-edit" onclick="bayarHutang(${dataHutang.indexOf(h)})" title="Bayar">💰 Bayar</button>
                    <button class="btn-icon btn-delete" onclick="deleteHutang(${dataHutang.indexOf(h)})" title="Hapus">🗑️</button>
                </td>
            `;
        });
    }
}

function filterBukuBesar(akun, startDate, endDate) {
    console.log('filterBukuBesar', akun, startDate, endDate);
    // To be implemented
}

function performGlobalSearch() {
    const query = document.getElementById('inputGlobalSearch').value.toLowerCase();
    const resultsDiv = document.getElementById('globalSearchResults');

    if (!query || query.length < 2) {
        resultsDiv.innerHTML = '<div style="text-align: center; color: #777; margin-top: 50px;"><p>Mulai ketik untuk mencari transaksi penjualan, pembelian, atau arus kas.</p></div>';
        return;
    }

    // Search in all modules
    const salesResults = transactions.filter(t =>
        t.noFaktur.toLowerCase().includes(query) ||
        t.namaPelanggan.toLowerCase().includes(query) ||
        t.namaBarang.toLowerCase().includes(query)
    );

    const purchaseResults = purchases.filter(p =>
        p.noFaktur.toLowerCase().includes(query) ||
        p.namaSupplier.toLowerCase().includes(query) ||
        p.namaBarang.toLowerCase().includes(query)
    );

    const kasResults = dataKas.filter(k =>
        k.kategori.toLowerCase().includes(query) ||
        k.keterangan.toLowerCase().includes(query)
    );

    let html = '<div class="search-results">';

    if (salesResults.length > 0) {
        html += '<h3>Penjualan</h3><ul>';
        salesResults.forEach(t => {
            html += `<li>${t.noFaktur} - ${t.namaPelanggan} - ${t.namaBarang} - ${formatRupiah(t.total)}</li>`;
        });
        html += '</ul>';
    }

    if (purchaseResults.length > 0) {
        html += '<h3>Pembelian</h3><ul>';
        purchaseResults.forEach(p => {
            html += `<li>${p.noFaktur} - ${p.namaSupplier} - ${p.namaBarang} - ${formatRupiah(p.total)}</li>`;
        });
        html += '</ul>';
    }

    if (kasResults.length > 0) {
        html += '<h3>Kas</h3><ul>';
        kasResults.forEach(k => {
            html += `<li>${k.tanggal} - ${k.kategori} - ${k.keterangan} - ${formatRupiah(k.jumlah)}</li>`;
        });
        html += '</ul>';
    }

    if (salesResults.length === 0 && purchaseResults.length === 0 && kasResults.length === 0) {
        html += '<p style="text-align: center; color: #999; margin-top: 50px;">Tidak ada hasil yang ditemukan.</p>';
    }

    html += '</div>';
    resultsDiv.innerHTML = html;
}

function hitungSaldoKas() {
    let saldo = 0;
    dataKas.forEach(k => {
        if (k.jenis === 'Masuk') {
            saldo += k.jumlah;
        } else {
            saldo -= k.jumlah;
        }
    });
    return saldo;
}

// Autocomplete setup
function setupAutocomplete() {
    // Customer autocomplete for sales
    const namaPelangganInput = document.getElementById('namaPelanggan');
    const customerSuggestions = document.getElementById('customerSuggestions');

    if (namaPelangganInput && customerSuggestions) {
        namaPelangganInput.addEventListener('input', function () {
            const query = this.value.toLowerCase();

            if (query.length < 2) {
                customerSuggestions.style.display = 'none';
                return;
            }

            const matches = dataMasterCustomer.filter(c =>
                c.nama.toLowerCase().includes(query)
            );

            if (matches.length === 0) {
                customerSuggestions.style.display = 'none';
                return;
            }

            customerSuggestions.innerHTML = '';
            matches.forEach(c => {
                const div = document.createElement('div');
                div.className = 'suggestion-item';
                div.textContent = c.nama;
                div.addEventListener('click', function () {
                    namaPelangganInput.value = c.nama;
                    document.getElementById('noTelepon').value = c.telepon;
                    document.getElementById('alamatPelanggan').value = c.alamat;
                    document.getElementById('npwpNik').value = c.npwp;
                    customerSuggestions.style.display = 'none';
                });
                customerSuggestions.appendChild(div);
            });

            customerSuggestions.style.display = 'block';
        });
    }

    // Product autocomplete for sales
    const namaBarangInput = document.getElementById('namaBarang');
    const productSuggestions = document.getElementById('productSuggestions');

    if (namaBarangInput && productSuggestions) {
        namaBarangInput.addEventListener('input', function () {
            const query = this.value.toLowerCase();

            if (query.length < 2) {
                productSuggestions.style.display = 'none';
                return;
            }

            const matches = dataMasterBarang.filter(b =>
                b.nama.toLowerCase().includes(query) || b.kode.toLowerCase().includes(query)
            );

            if (matches.length === 0) {
                productSuggestions.style.display = 'none';
                return;
            }

            productSuggestions.innerHTML = '';
            matches.forEach(b => {
                const div = document.createElement('div');
                div.className = 'suggestion-item';
                div.textContent = `${b.kode} - ${b.nama} - ${formatRupiah(b.hargaJual)}`;
                div.addEventListener('click', function () {
                    document.getElementById('namaBarang').value = b.nama;
                    document.getElementById('kodeBarang').value = b.kode;
                    document.getElementById('satuanBarang').value = b.satuan;
                    document.getElementById('hargaSatuan').value = b.hargaJual;
                    productSuggestions.style.display = 'none';
                });
                productSuggestions.appendChild(div);
            });

            productSuggestions.style.display = 'block';
        });
    }

    // Supplier autocomplete for purchases
    const namaSupplierInput = document.getElementById('namaSupplier');
    const supplierSuggestions = document.getElementById('supplierSuggestions');

    if (namaSupplierInput && supplierSuggestions) {
        namaSupplierInput.addEventListener('input', function () {
            const query = this.value.toLowerCase();

            if (query.length < 2) {
                supplierSuggestions.style.display = 'none';
                return;
            }

            const matches = dataMasterSupplier.filter(s =>
                s.nama.toLowerCase().includes(query)
            );

            if (matches.length === 0) {
                supplierSuggestions.style.display = 'none';
                return;
            }

            supplierSuggestions.innerHTML = '';
            matches.forEach(s => {
                const div = document.createElement('div');
                div.className = 'suggestion-item';
                div.textContent = s.nama;
                div.addEventListener('click', function () {
                    namaSupplierInput.value = s.nama;
                    document.getElementById('alamatSupplier').value = s.alamat;
                    document.getElementById('noTeleponSupplier').value = s.telepon;
                    document.getElementById('npwpNikSupplier').value = s.npwp;
                    supplierSuggestions.style.display = 'none';
                });
                supplierSuggestions.appendChild(div);
            });

            supplierSuggestions.style.display = 'block';
        });
    }

    // Product autocomplete for purchases
    const namaBarangBeliInput = document.getElementById('namaBarangBeli');
    const productSuggestionsBeli = document.getElementById('productSuggestionsBeli');

    if (namaBarangBeliInput && productSuggestionsBeli) {
        namaBarangBeliInput.addEventListener('input', function () {
            const query = this.value.toLowerCase();

            if (query.length < 2) {
                productSuggestionsBeli.style.display = 'none';
                return;
            }

            const matches = dataMasterBarang.filter(b =>
                b.nama.toLowerCase().includes(query) || b.kode.toLowerCase().includes(query)
            );

            if (matches.length === 0) {
                productSuggestionsBeli.style.display = 'none';
                return;
            }

            productSuggestionsBeli.innerHTML = '';
            matches.forEach(b => {
                const div = document.createElement('div');
                div.className = 'suggestion-item';
                div.textContent = `${b.kode} - ${b.nama} - ${formatRupiah(b.hargaBeli)}`;
                div.addEventListener('click', function () {
                    document.getElementById('namaBarangBeli').value = b.nama;
                    document.getElementById('kodeBarangBeli').value = b.kode;
                    document.getElementById('satuanBarangBeli').value = b.satuan;
                    document.getElementById('hargaSatuanBeli').value = b.hargaBeli;
                    productSuggestionsBeli.style.display = 'none';
                });
                productSuggestionsBeli.appendChild(div);
            });

            productSuggestionsBeli.style.display = 'block';
        });
    }
}

// Delete functions
function deleteTransaction(index) {
    if (confirm('Hapus transaksi ini?')) {
        transactions.splice(index, 1);
        localStorage.setItem('transactions', JSON.stringify(transactions));
        displayTransactions();
        alert('Transaksi berhasil dihapus!');
    }
}

function deletePurchase(index) {
    if (confirm('Hapus pembelian ini?')) {
        purchases.splice(index, 1);
        localStorage.setItem('purchases', JSON.stringify(purchases));
        displayPurchases();
        alert('Pembelian berhasil dihapus!');
    }
}

function deletePiutang(index) {
    if (confirm('Hapus data piutang ini?')) {
        dataPiutang.splice(index, 1);
        localStorage.setItem('dataPiutang', JSON.stringify(dataPiutang));
        displayPiutang();
        alert('Data piutang berhasil dihapus!');
    }
}

function deleteHutang(index) {
    if (confirm('Hapus data hutang ini?')) {
        dataHutang.splice(index, 1);
        localStorage.setItem('dataHutang', JSON.stringify(dataHutang));
        displayHutang();
        alert('Data hutang berhasil dihapus!');
    }
}

function deleteKas(index) {
    if (confirm('Hapus transaksi kas ini?')) {
        dataKas.splice(index, 1);
        localStorage.setItem('dataKas', JSON.stringify(dataKas));
        displayKas();
        alert('Transaksi kas berhasil dihapus!');
    }
}

// Edit functions placeholders
function editTransaction(index) {
    alert('Fitur edit transaksi belum diimplementasikan');
}

function editPurchase(index) {
    alert('Fitur edit pembelian belum diimplementasikan');
}

function bayarPiutang(index) {
    const p = dataPiutang[index];
    if (!p) return;

    const jumlahBayar = parseFloat(prompt(`Masukkan jumlah pembayaran untuk ${p.namaPelanggan}:\nSisa: ${formatRupiah(p.sisa)}`));

    if (jumlahBayar && jumlahBayar > 0) {
        if (jumlahBayar > p.sisa) {
            alert('Jumlah pembayaran melebihi sisa piutang!');
            return;
        }

        p.dibayar += jumlahBayar;
        p.sisa -= jumlahBayar;
        p.status = p.sisa > 0 ? 'Belum Lunas' : 'Lunas';

        localStorage.setItem('dataPiutang', JSON.stringify(dataPiutang));
        displayPiutang();
        alert('Pembayaran piutang berhasil dicatat!');
    }
}

function bayarHutang(index) {
    const h = dataHutang[index];
    if (!h) return;

    const jumlahBayar = parseFloat(prompt(`Masukkan jumlah pembayaran untuk ${h.namaSupplier}:\nSisa: ${formatRupiah(h.sisa)}`));

    if (jumlahBayar && jumlahBayar > 0) {
        if (jumlahBayar > h.sisa) {
            alert('Jumlah pembayaran melebihi sisa hutang!');
            return;
        }

        h.dibayar += jumlahBayar;
        h.sisa -= jumlahBayar;
        h.status = h.sisa > 0 ? 'Belum Lunas' : 'Lunas';

        localStorage.setItem('dataHutang', JSON.stringify(dataHutang));
        displayHutang();
        alert('Pembayaran hutang berhasil dicatat!');
    }
}

// Fungsi untuk menyimpan transaksi
function saveTransaction(data) {
    transactions.push(data);
    localStorage.setItem('transactions', JSON.stringify(transactions));
    displayTransactions();
}

// Fungsi untuk menampilkan transaksi
function displayTransactions(dataToDisplay = null) {
    const data = dataToDisplay || transactions;
    const tbody = document.getElementById('transactionBody');
    const grandTotalSection = document.getElementById('grandTotalSection');
    const grandTotalValue = document.getElementById('grandTotalValue');

    // Clear existing content
    tbody.innerHTML = '';

    if (data.length === 0) {
        tbody.innerHTML = '<tr class="no-data"><td colspan="14">Data tidak ditemukan</td></tr>';
        if (grandTotalSection) grandTotalSection.style.display = 'none';
        return;
    }

    let totalSales = 0;

    data.forEach((transaction, displayIndex) => {
        // Find original index in master array to ensure actions work on correct item
        const originalIndex = transactions.indexOf(transaction);

        totalSales += Number(transaction.total);

        const row = tbody.insertRow();
        row.innerHTML = `
            <td>${displayIndex + 1}</td>
            <td>${transaction.tanggal}</td>
            <td>${transaction.divisi}</td>
            <td>${transaction.noFaktur}</td>
            <td>${transaction.namaPelanggan}</td>
            <td>${transaction.namaBarang}</td>
            <td>${transaction.jumlah} ${transaction.satuan || ''}</td>
            <td class="rupiah">${formatRupiah(transaction.hargaSatuan)}</td>
            <td class="rupiah">${formatRupiah(transaction.diskon)}</td>
            <td class="rupiah">${formatRupiah(transaction.nilaiPpn)}</td>
            <td class="rupiah">${formatRupiah(transaction.jumlahDibayar)}</td>
            <td class="rupiah">${formatRupiah(transaction.total)}</td>
            <td class="rupiah">${formatRupiah(transaction.sisaPembayaran)}</td>
            <td class="action-buttons">
                <button class="btn-icon btn-print" onclick="printTransaction(${originalIndex})" title="Cetak Invoice">📄 Invoice</button>
                <button class="btn-icon btn-print" onclick="printSuratJalanPenjualan(${originalIndex})" title="Cetak Surat Jalan">📋 Surat Jalan</button>
                <button class="btn-icon btn-print" onclick="printKwitansiPenjualan(${originalIndex})" title="Cetak Kwitansi">🧾 Kwitansi</button>
                <button class="btn-icon btn-edit" onclick="editTransaction(${originalIndex})" title="Edit">✏️ Edit</button>
                <button class="btn-icon btn-delete" onclick="deleteTransaction(${originalIndex})" title="Hapus">🗑️ Hapus</button>
            </td>
        `;
    });

    // Update Grand Total Display
    if (grandTotalSection && grandTotalValue) {
        grandTotalSection.style.display = 'block';
        grandTotalValue.textContent = formatRupiah(totalSales);
    }
}

// Fungsi Filter Transaksi
function filterTransactions() {
    const searchValue = document.getElementById('searchInput').value.toLowerCase();
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;

    const filtered = transactions.filter(t => {
        // Search Logic (Faktur, Pelanggan, Barang)
        const matchSearch = (
            t.noFaktur.toLowerCase().includes(searchValue) ||
            t.namaPelanggan.toLowerCase().includes(searchValue) ||
            t.namaBarang.toLowerCase().includes(searchValue)
        );

        // Date Logic (DD/MM/YYYY to YYYY-MM-DD for comparison)
        let matchDate = true;
        if (startDate || endDate) {
            // Convert transaction date 'DD/MM/YYYY' to comparable Date
            // Note: t.tanggal is DD/MM/YYYY
            const parts = t.tanggal.split('/');
            // Create date object: Year, Month (0-11), Day
            // But for simple string comparison or timestamp, let's use YYYY-MM-DD string or Timestamp
            const tDate = new Date(parts[2], parts[1] - 1, parts[0]);
            tDate.setHours(0, 0, 0, 0);

            if (startDate) {
                const start = new Date(startDate);
                start.setHours(0, 0, 0, 0);
                if (tDate < start) matchDate = false;
            }
            if (endDate) {
                const end = new Date(endDate);
                end.setHours(0, 0, 0, 0);
                if (tDate > end) matchDate = false;
            }
        }

        return matchSearch && matchDate;
    });

    displayTransactions(filtered);
}

// Setup Event Listener Modal
document.addEventListener('DOMContentLoaded', () => {
    // Setup Filter Listeners
    const searchInput = document.getElementById('searchInput');
    const startDate = document.getElementById('startDate');
    const endDate = document.getElementById('endDate');
    const resetBtn = document.getElementById('resetFilterBtn');

    if (searchInput) searchInput.addEventListener('input', filterTransactions);
    if (startDate) startDate.addEventListener('change', filterTransactions);
    if (endDate) endDate.addEventListener('change', filterTransactions);
    if (resetBtn) resetBtn.addEventListener('click', () => {
        if (searchInput) searchInput.value = '';
        if (startDate) startDate.value = '';
        if (endDate) endDate.value = '';
    });
});

// Fungsi Print Langsung untuk Penjualan
function printTransaction(index) {
    printStandard(index);
}

// Fungsi Print Langsung untuk Pembelian
function printPurchase(index) {
    printStandardPurchase(index);
}

// Helper Terbilang
function terbilangRupiah(n) {
    if (n < 0) return "";
    let words = ["", "Satu", "Dua", "Tiga", "Empat", "Lima", "Enam", "Tujuh", "Delapan", "Sembilan", "Sepuluh", "Sebelas"];

    // Helper untuk 3 digit
    function sebut(nilai) {
        nilai = Math.abs(nilai);
        let simpan = "";
        if (nilai < 12) {
            simpan = " " + words[nilai];
        } else if (nilai < 20) {
            simpan = sebut(nilai - 10) + " Belas";
        } else if (nilai < 100) {
            simpan = sebut(Math.floor(nilai / 10)) + " Puluh" + sebut(nilai % 10);
        } else if (nilai < 200) {
            simpan = " Seratus" + sebut(nilai - 100);
        } else if (nilai < 1000) {
            simpan = sebut(Math.floor(nilai / 100)) + " Ratus" + sebut(nilai % 100);
        } else if (nilai < 2000) {
            simpan = " Seribu" + sebut(nilai - 1000);
        } else if (nilai < 1000000) {
            simpan = sebut(Math.floor(nilai / 1000)) + " Ribu" + sebut(nilai % 1000);
        } else if (nilai < 1000000000) {
            simpan = sebut(Math.floor(nilai / 1000000)) + " Juta" + sebut(nilai % 1000000);
        }
        return simpan;
    }

    if (n === 0) return "Nol Rupiah";
    return sebut(n) + " Rupiah";
}

// Helper untuk Print tanpa Tab Baru
function printToIframe(htmlContent) {
    let iframe = document.getElementById('printFrame');
    if (!iframe) {
        iframe = document.createElement('iframe');
        iframe.id = 'printFrame';
        iframe.style.position = 'fixed';
        iframe.style.right = '0';
        iframe.style.bottom = '0';
        iframe.style.width = '0';
        iframe.style.height = '0';
        iframe.style.border = '0';
        document.body.appendChild(iframe);
    }

    // Use srcdoc if supported for cleaner isolation, or fallback to write
    // writing directly to doc is more compatible
    const doc = iframe.contentWindow.document;
    doc.open();
    doc.write(htmlContent);
    doc.close();

    // Wait for content to load then print
    // use a slightly longer timeout to ensure styles and sub-resources (like fonts) are ready
    setTimeout(() => {
        iframe.contentWindow.focus();
        iframe.contentWindow.print();
    }, 1000);
}
// Print Modal Functions
function openPrintModal(index, type) {
    currentPrintIndex = index;
    currentPrintType = type;
    const modal = document.getElementById('printModal');
    if (modal) {
        modal.style.display = 'block';
    }
}

// Fungsi Print Standard (Format Invoice Gambar)
function printStandard(index) {
    if (index === -1) return;
    const t = transactions[index];
    const terbilangText = terbilangRupiah(t.total);
    const currentDate = new Date();
    const printTime = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}, ${currentDate.getHours()}:${String(currentDate.getMinutes()).padStart(2, '0')}`;

    const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Invoice Penjualan - ${t.noFaktur}</title>
            <style>
                @page { size: A4; margin: 2cm; }
                body { font-family: 'Times New Roman', Times, serif; font-size: 10pt; color: #000; -webkit-print-color-adjust: exact; }
                .header { position: relative; margin-bottom: 20px; }
                .company-name { font-weight: bold; font-size: 14pt; margin-bottom: 5px; }
                .company-desc { font-weight: bold; font-size: 9pt; width: 70%; line-height: 1.2; }
                .company-address { margin-top: 5px; font-size: 10pt; }
                .logo { position: absolute; top: 0; right: 0; width: 100px; height: auto; max-height: 100px; }
                .print-meta { position: absolute; top: 110px; right: 0; font-size: 8pt; text-align: right; }
                .line { border-bottom: 3px solid #000; margin: 15px 0 20px 0; }
                .invoice-title-box { border: 2px solid #000; width: 300px; margin: 0 auto 30px auto; padding: 5px; text-align: center; }
                .invoice-title { font-weight: bold; font-size: 14pt; }
                .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
                .info-col table { width: 100%; }
                .info-col td { padding: 2px 0; vertical-align: top; }
                .info-label { width: 100px; }
                
                .items-table { width: 100%; border-collapse: collapse; margin-bottom: 10px; border: 2px solid #000; }
                .items-table th { border: 1px solid #000; padding: 5px; text-align: center; font-weight: bold; }
                .items-table td { border: 1px solid #000; padding: 5px; }
                .text-center { text-align: center; }
                .text-right { text-align: right; }
                
                .totals-section { display: flex; justify-content: flex-end; margin-bottom: 20px; }
                .totals-table { width: 40%; }
                .totals-table td { padding: 3px; }
                .total-label { text-align: right; font-weight: bold; }
                .total-value { text-align: right; font-weight: bold; }
                
                .terbilang { font-style: italic; margin-bottom: 20px; font-size: 9pt; }
                .footer-note { font-weight: bold; font-size: 9pt; margin-bottom: 40px; }
                
                .signatures { display: flex; justify-content: space-between; margin-top: 30px; padding: 0 50px; }
                .sign-box { text-align: center; width: 200px; }
                .sign-space { height: 80px; border-bottom: 1px solid #000; margin-top: 10px; }
            </style>
        </head>
        <body>
            <div class="header">
                <div class="company-name">PT. SUMBER GANDA MEKAR</div>
                <div class="company-desc">JUAL BELI BESI TUA/BARU - RANGKA BETON/LOGAM - TIANG LISTRIK/TELP - KONSTRUKSI BAJA DAN PAKAN TERNAK</div>
                <div class="company-address">Jl. Raya Gedebage No. 95 Bandung<br>CP. Irwan : 082117800626, CP. Uwem : 082318188863</div>
                <img src="logo.png" alt="SGM Logo" class="logo">
                <div class="print-meta">
                    ${printTime}<br>Sistem Akuntansi SGM
                </div>
            </div>
            
            <div class="line"></div>
            
            <div class="invoice-title-box">
                <div class="invoice-title">INVOICE PENJUALAN</div>
            </div>
            
            <div class="info-grid">
                <div class="info-col">
                    <table>
                        <tr><td class="info-label">Kepada Yth.</td><td>: <strong>${t.namaPelanggan}</strong></td></tr>
                        <tr><td>Alamat</td><td>: ${t.alamatPelanggan || '-'}</td></tr>
                        <tr><td>Telepon</td><td>: ${t.noTelepon || '-'}</td></tr>
                        <tr><td>NPWP/NIK</td><td>: ${t.npwpNik || '-'}</td></tr>
                    </table>
                </div>
                <div class="info-col">
                    <table>
                        <tr><td class="info-label">No. Invoice</td><td>: <strong>${t.noFaktur}</strong></td></tr>
                        <tr><td>Tanggal</td><td>: ${t.tanggal}</td></tr>
                        <tr><td>Metode</td><td>: ${t.metodePembayaran}</td></tr>
                        <tr><td>Pembayaran</td><td></td></tr>
                    </table>
                </div>
            </div>
            
            <table class="items-table">
                <thead>
                    <tr>
                        <th style="width: 5%">No</th>
                        <th>Nama Barang</th>
                        <th style="width: 10%">Qty</th>
                        <th style="width: 10%">Satuan</th>
                        <th style="width: 20%">Harga Satuan</th>
                        <th style="width: 20%">Jumlah</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="text-center">1</td>
                        <td>${t.namaBarang} <br><small>${t.kodeBarang ? '(' + t.kodeBarang + ')' : ''}</small></td>
                        <td class="text-center">${t.jumlah}</td>
                        <td class="text-center">${t.satuan || '-'}</td>
                        <td class="text-right">${formatRupiah(t.hargaSatuan)}</td>
                        <td class="text-right">${formatRupiah(t.jumlah * t.hargaSatuan - t.diskon)}</td>
                    </tr>
                </tbody>
            </table>
            
            <div class="totals-section">
                <table class="totals-table">
                    <tr>
                        <td class="total-label">Subtotal</td>
                        <td class="total-value">${formatRupiah(t.jumlah * t.hargaSatuan - t.diskon)}</td>
                    </tr>
                    <tr>
                        <td class="total-label">PPN ${t.jenisPpn > 0 ? (t.jenisPpn == 11 ? '11%' : t.jenisPpn + '%') : '0%'}</td>
                        <td class="total-value">${formatRupiah(t.nilaiPpn)}</td>
                    </tr>
                    <tr>
                        <td class="total-label" style="font-size: 12pt;">Total Tagihan</td>
                        <td class="total-value" style="font-size: 12pt;">${formatRupiah(t.total)}</td>
                    </tr>
                     ${t.metodePembayaran === 'Kredit' ? `
                    <tr>
                        <td class="total-label">DP / Dibayar</td>
                        <td class="total-value">${formatRupiah(t.jumlahDibayar)}</td>
                    </tr>
                    <tr>
                        <td class="total-label">Sisa Tagihan</td>
                        <td class="total-value">${formatRupiah(t.sisaPembayaran)}</td>
                    </tr>` : ''}
                </table>
            </div>
            
            <div class="terbilang">
                Terbilang: ${terbilangText}
            </div>
            
            <div class="footer-note">
                Pembayaran mohon di transfer ke rekening BANK BCA No. Rek: 2803024545 a.n PT. SUMBER GANDA MEKAR
            </div>
            
            <div class="signatures">
                <div class="sign-box">
                    Penerima,
                    <div class="sign-space"></div>
                </div>
                <div class="sign-box">
                    Hormat Kami,
                    <div class="sign-space"></div>
                </div>
            </div>
        </body>
        </html>
    `;
    printToIframe(htmlContent);
}

// Fungsi Print Dot Matrix (Format Text Only / Draft)
function printDotMatrix(index) {
    if (index === -1) return;
    const t = transactions[index];
    const currentDate = new Date();

    // Helper to pad string
    const pad = (str, len, char = ' ') => str.toString().padEnd(len, char).substring(0, len);
    const padLeft = (str, len, char = ' ') => str.toString().padStart(len, char).substring(0, len);
    const line = (len, char = '-') => ''.padEnd(len, char);

    // Width for dot matrix (usually 80 cols or 40 cols, assume standard wide or condensed)
    // We will use standard monospace CSS

    const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Invoice - ${t.noFaktur}</title>
            <style>
                @page { margin: 0; size: auto; }
                body { 
                    font-family: 'Courier New', Courier, monospace; 
                    font-size: 12px; 
                    white-space: pre; 
                    margin: 10px;
                }
            </style>
        </head>
        <body>
PT. SUMBER GANDA MEKAR
JL. RAYA GEDEBAGE NO. 95 BANDUNG
TELP: 082117800626 / 082318188863
${line(80, '=')}
INVOICE PENJUALAN
NO. FAKTUR : ${t.noFaktur}
TANGGAL    : ${t.tanggal}
KEPADA YTH : ${t.namaPelanggan}
${line(80, '-')}
NO  NAMA BARANG                     QTY  SATUAN     HARGA          JUMLAH
${line(80, '-')}
${pad('1', 3)} ${pad(t.namaBarang, 30)} ${padLeft(t.jumlah, 4)}  ${pad(t.satuan || '', 8)} ${padLeft(formatRupiah(t.hargaSatuan), 12)} ${padLeft(formatRupiah(t.jumlah * t.hargaSatuan - t.diskon), 15)}
${line(80, '-')}
                                                  SUBTOTAL     : ${padLeft(formatRupiah(t.jumlah * t.hargaSatuan - t.diskon), 15)}
                                                  PPN          : ${padLeft(formatRupiah(t.nilaiPpn), 15)}
                                                  TOTAL        : ${padLeft(formatRupiah(t.total), 15)}
${t.metodePembayaran === 'Kredit' ? `                                                  DP/BAYAR     : ${padLeft(formatRupiah(t.jumlahDibayar), 15)}
                                                  SISA         : ${padLeft(formatRupiah(t.sisaPembayaran), 15)}` : ''}
${line(80, '=')}
TERBILANG: ${terbilangRupiah(t.total)}

Harap transfer ke BCA: 2803024545 a.n PT. SUMBER GANDA MEKAR

        Penerima                                     Hormat Kami
        
        
        (.................)                          (.................)
        </body>
        </html>
    `;
    printToIframe(htmlContent);
}

// Fungsi Print Surat Jalan untuk Penjualan
function printSuratJalanPenjualan(index) {
    if (index === -1) return;
    const t = transactions[index];
    const noSuratJalan = generateNoSuratJalan();
    const currentDate = new Date();
    const printTime = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}, ${currentDate.getHours()}:${String(currentDate.getMinutes()).padStart(2, '0')}`;

    const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Surat Jalan - ${noSuratJalan}</title>
            <style>
                @page { size: A4; margin: 2cm; }
                body { font-family: 'Times New Roman', Times, serif; font-size: 11pt; color: #000; -webkit-print-color-adjust: exact; }
                .header { position: relative; margin-bottom: 20px; }
                .company-name { font-weight: bold; font-size: 14pt; margin-bottom: 5px; }
                .company-desc { font-weight: bold; font-size: 9pt; width: 70%; line-height: 1.2; }
                .company-address { margin-top: 5px; font-size: 10pt; }
                .logo { position: absolute; top: 0; right: 0; width: 100px; height: auto; max-height: 100px; }
                .print-meta { position: absolute; top: 110px; right: 0; font-size: 8pt; text-align: right; }
                .line { border-bottom: 3px solid #000; margin: 15px 0 20px 0; }
                .doc-title-box { border: 2px solid #000; width: 300px; margin: 0 auto 30px auto; padding: 5px; text-align: center; }
                .doc-title { font-weight: bold; font-size: 14pt; }
                .info-section { margin-bottom: 20px; }
                .info-table { width: 60%; }
                .info-table td { padding: 3px 0; vertical-align: top; }
                .info-label { width: 120px; }
                
                .items-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; border: 2px solid #000; }
                .items-table th { border: 1px solid #000; padding: 8px; text-align: center; font-weight: bold; background-color: #f0f0f0; }
                .items-table td { border: 1px solid #000; padding: 8px; }
                .text-center { text-align: center; }
                
                .note-section { margin: 20px 0; font-size: 10pt; }
                .signatures { display: flex; justify-content: space-between; margin-top: 50px; padding: 0 50px; }
                .sign-box { text-align: center; width: 200px; }
                .sign-label { margin-bottom: 5px; }
                .sign-space { height: 80px; margin-top: 5px; }
                .sign-name { border-top: 1px solid #000; margin-top: 5px; padding-top: 5px; }
            </style>
        </head>
        <body>
            <div class="header">
                <div class="company-name">PT. SUMBER GANDA MEKAR</div>
                <div class="company-desc">JUAL BELI BESI TUA/BARU - RANGKA BETON/LOGAM - TIANG LISTRIK/TELP - KONSTRUKSI BAJA DAN PAKAN TERNAK</div>
                <div class="company-address">Jl. Raya Gedebage No. 95 Bandung<br>CP. Irwan : 082117800626, CP. Uwem : 082318188863</div>
                <img src="logo.png" alt="SGM Logo" class="logo">
                <div class="print-meta">
                    ${printTime}<br>Sistem Akuntansi SGM
                </div>
            </div>
            
            <div class="line"></div>
            
            <div class="doc-title-box">
                <div class="doc-title">SURAT JALAN</div>
            </div>
            
            <div class="info-section">
                <table class="info-table">
                    <tr><td class="info-label">No. Surat Jalan</td><td>: <strong>${noSuratJalan}</strong></td></tr>
                    <tr><td class="info-label">Tanggal</td><td>: ${t.tanggal}</td></tr>
                    <tr><td class="info-label">No. Faktur Ref.</td><td>: ${t.noFaktur}</td></tr>
                </table>
            </div>
            
            <div class="info-section">
                <table class="info-table">
                    <tr><td class="info-label">Kepada Yth.</td><td>: <strong>${t.namaPelanggan}</strong></td></tr>
                    <tr><td class="info-label">Alamat</td><td>: ${t.alamatPelanggan || '-'}</td></tr>
                    <tr><td class="info-label">Telepon</td><td>: ${t.noTelepon || '-'}</td></tr>
                </table>
            </div>
            
            <table class="items-table">
                <thead>
                    <tr>
                        <th style="width: 5%">No</th>
                        <th>Nama Barang</th>
                        <th style="width: 15%">Kode</th>
                        <th style="width: 15%">Jumlah</th>
                        <th style="width: 15%">Satuan</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="text-center">1</td>
                        <td>${t.namaBarang}</td>
                        <td class="text-center">${t.kodeBarang || '-'}</td>
                        <td class="text-center">${t.jumlah}</td>
                        <td class="text-center">${t.satuan || '-'}</td>
                    </tr>
                </tbody>
            </table>
            
            <div class="note-section">
                <strong>Catatan:</strong><br>
                Barang-barang tersebut di atas telah dikirim dalam keadaan baik.<br>
                Mohon untuk diperiksa dan ditandatangani sebagai tanda penerimaan.
            </div>
            
            <div class="signatures">
                <div class="sign-box">
                    <div class="sign-label">Yang Menyerahkan,</div>
                    <div class="sign-space"></div>
                    <div class="sign-name">(...........................)</div>
                </div>
                <div class="sign-box">
                    <div class="sign-label">Yang Menerima,</div>
                    <div class="sign-space"></div>
                    <div class="sign-name">(...........................)</div>
                </div>
            </div>
        </body>
        </html>
    `;
    printToIframe(htmlContent);
}

// Fungsi Print Kwitansi untuk Penjualan
function printKwitansiPenjualan(index) {
    if (index === -1) return;
    const t = transactions[index];
    const terbilangText = terbilangRupiah(t.total);
    const currentDate = new Date();
    const printTime = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}, ${currentDate.getHours()}:${String(currentDate.getMinutes()).padStart(2, '0')}`;

    const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Kwitansi - ${t.noFaktur}</title>
            <style>
                @page { size: A5 landscape; margin: 1.5cm; }
                body { font-family: 'Times New Roman', Times, serif; font-size: 11pt; color: #000; -webkit-print-color-adjust: exact; }
                .kwitansi-border { border: 3px solid #000; padding: 20px; }
                .header { text-align: center; margin-bottom: 20px; border-bottom: 2px solid #000; padding-bottom: 10px; }
                .company-name { font-weight: bold; font-size: 14pt; }
                .company-desc { font-size: 9pt; margin-top: 5px; }
                .title { text-align: center; font-size: 16pt; font-weight: bold; margin: 20px 0; text-decoration: underline; }
                .no-kwitansi { text-align: right; margin-bottom: 15px; font-size: 10pt; }
                .content { margin: 20px 0; }
                .content table { width: 100%; }
                .content td { padding: 5px 0; vertical-align: top; }
                .label { width: 150px; }
                .amount-box { border: 2px solid #000; padding: 10px; text-align: center; margin: 15px 0; font-weight: bold; font-size: 14pt; }
                .terbilang { font-style: italic; text-align: center; margin: 10px 0; border: 1px solid #000; padding: 8px; }
                .signature { margin-top: 40px; text-align: right; padding-right: 80px; }
                .sign-space { height: 60px; }
                .sign-name { border-top: 1px solid #000; display: inline-block; min-width: 200px; text-align: center; padding-top: 5px; }
            </style>
        </head>
        <body>
            <div class="kwitansi-border">
                <div class="header">
                    <div class="company-name">PT. SUMBER GANDA MEKAR</div>
                    <div class="company-desc">Jl. Raya Gedebage No. 95 Bandung | Telp: 082117800626 / 082318188863</div>
                </div>
                
                <div class="title">KWITANSI</div>
                
                <div class="no-kwitansi">No: ${t.noFaktur}</div>
                
                <div class="content">
                    <table>
                        <tr>
                            <td class="label">Sudah terima dari</td>
                            <td>: <strong>${t.namaPelanggan}</strong></td>
                        </tr>
                        <tr>
                            <td class="label">Uang sejumlah</td>
                            <td>: </td>
                        </tr>
                    </table>
                </div>
                
                <div class="amount-box">
                    ${formatRupiah(t.total)}
                </div>
                
                <div class="terbilang">
                    <em>${terbilangText}</em>
                </div>
                
                <div class="content">
                    <table>
                        <tr>
                            <td class="label">Untuk pembayaran</td>
                            <td>: ${t.namaBarang} (${t.jumlah} ${t.satuan || 'unit'})</td>
                        </tr>
                        <tr>
                            <td class="label">Metode Pembayaran</td>
                            <td>: ${t.metodePembayaran}</td>
                        </tr>
                        ${t.metodePembayaran === 'Kredit' ? `
                        <tr>
                            <td class="label">DP / Dibayar</td>
                            <td>: ${formatRupiah(t.jumlahDibayar)}</td>
                        </tr>
                        <tr>
                            <td class="label">Sisa Pembayaran</td>
                            <td>: ${formatRupiah(t.sisaPembayaran)}</td>
                        </tr>
                        ` : ''}
                    </table>
                </div>
                
                <div class="signature">
                    Bandung, ${t.tanggal}
                    <div class="sign-space"></div>
                    <div class="sign-name">PT. Sumber Ganda Mekar</div>
                </div>
            </div>
        </body>
        </html>
    `;
    printToIframe(htmlContent);
}

// Fungsi Edit Transaksi
function editTransaction(index) {
    const transaction = transactions[index];

    // Konfirmasi sebelum edit karena akan mengisi form
    if (!confirm('Edit transaksi ini? Data akan dimuat kembali ke form.')) return;

    // Isi form dengan data transaksi
    document.getElementById('tanggal').value = transaction.tanggal;
    document.getElementById('noFaktur').value = transaction.noFaktur;
    document.getElementById('divisi').value = transaction.divisi;
    document.getElementById('namaPelanggan').value = transaction.namaPelanggan;
    document.getElementById('alamatPelanggan').value = transaction.alamatPelanggan;
    document.getElementById('noTelepon').value = transaction.noTelepon;
    document.getElementById('npwpNik').value = transaction.npwpNik;
    document.getElementById('namaBarang').value = transaction.namaBarang;
    document.getElementById('kodeBarang').value = transaction.kodeBarang;
    document.getElementById('satuanBarang').value = transaction.satuan;
    document.getElementById('jumlah').value = transaction.jumlah;
    document.getElementById('hargaSatuan').value = transaction.hargaSatuan;
    document.getElementById('diskon').value = transaction.diskon;
    document.getElementById('jenisPpn').value = transaction.jenisPpn;
    document.getElementById('metodePembayaran').value = transaction.metodePembayaran;

    // Trigger event untuk update UI (misal: pembayaran kredit)
    const event = new Event('change');
    document.getElementById('metodePembayaran').dispatchEvent(event);

    document.getElementById('jumlahDibayar').value = transaction.jumlahDibayar;

    // Hitung ulang total
    hitungTotal();

    // Scroll ke atas
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Opsional: Hapus data lama agar tidak duplikat saat disimpan ulang?
    // Untuk saat ini kita biarkan user menghapus manual atau kita bisa hapus otomatis
    // transactions.splice(index, 1);
    // localStorage.setItem('transactions', JSON.stringify(transactions));
    // displayTransactions();
    // alert('Data dimuat. Silakan edit dan simpan ulang. Data lama telah dihapus sementara.');
}

// Fungsi untuk menghapus transaksi
function deleteTransaction(index) {
    if (confirm('Apakah Anda yakin ingin menghapus transaksi ini?')) {
        transactions.splice(index, 1);
        localStorage.setItem('transactions', JSON.stringify(transactions));
        displayTransactions();
    }
}

// Event listeners untuk perhitungan otomatis
document.getElementById('jumlah').addEventListener('input', hitungTotal);
document.getElementById('hargaSatuan').addEventListener('input', hitungTotal);
document.getElementById('diskon').addEventListener('input', hitungTotal);
document.getElementById('jenisPpn').addEventListener('change', hitungTotal);
document.getElementById('jumlahDibayar').addEventListener('input', hitungTotal);

// Event listener untuk tanggal
document.getElementById('tanggal').addEventListener('input', function (e) {
    formatTanggalInput(e.target);
});

// Event listener untuk metode pembayaran
document.getElementById('metodePembayaran').addEventListener('change', function (e) {
    const pembayaranKreditRow = document.getElementById('pembayaranKreditRow');
    if (e.target.value === 'Kredit') {
        pembayaranKreditRow.style.display = 'grid';
    } else {
        pembayaranKreditRow.style.display = 'none';
        document.getElementById('jumlahDibayar').value = 0;
        document.getElementById('sisaPembayaran').value = '';
    }
    hitungTotal();
});

// Fungsi untuk menampilkan suggestions customer
function showCustomerSuggestions(query = '') {
    const suggestions = document.getElementById('customerSuggestions');
    const filtered = query.length > 0
        ? dataMasterCustomer.filter(c => c.nama.toLowerCase().includes(query.toLowerCase()))
        : dataMasterCustomer;

    if (filtered.length === 0) {
        suggestions.innerHTML = '<div class="suggestion-item no-result">Tidak ada hasil ditemukan</div>';
        suggestions.style.display = 'block';
        return;
    }

    suggestions.innerHTML = filtered.map(c =>
        `<div class="suggestion-item" data-id="${c.id}">
            <strong>${c.nama}</strong><br>
            <small style="color: #666;">${c.telepon} - ${c.alamat.substring(0, 40)}...</small>
        </div>`
    ).join('');
    suggestions.style.display = 'block';

    // Event listener untuk item suggestion
    suggestions.querySelectorAll('.suggestion-item:not(.no-result)').forEach(item => {
        item.addEventListener('click', function () {
            const customerId = parseInt(this.dataset.id);
            const customer = dataMasterCustomer.find(c => c.id === customerId);

            document.getElementById('namaPelanggan').value = customer.nama;
            document.getElementById('alamatPelanggan').value = customer.alamat;
            document.getElementById('noTelepon').value = customer.telepon;
            document.getElementById('npwpNik').value = customer.npwp;

            suggestions.style.display = 'none';
        });
    });
}

// Autocomplete untuk customer - ketik untuk filter
document.getElementById('namaPelanggan').addEventListener('input', function (e) {
    showCustomerSuggestions(e.target.value);
});

// Tampilkan semua customer saat focus/klik
document.getElementById('namaPelanggan').addEventListener('focus', function (e) {
    showCustomerSuggestions(e.target.value);
});

// Fungsi untuk menampilkan suggestions barang
function showProductSuggestions(query = '') {
    const suggestions = document.getElementById('productSuggestions');
    const filtered = query.length > 0
        ? dataMasterBarang.filter(b =>
            b.nama.toLowerCase().includes(query.toLowerCase()) ||
            b.kode.toLowerCase().includes(query.toLowerCase())
        )
        : dataMasterBarang;

    if (filtered.length === 0) {
        suggestions.innerHTML = '<div class="suggestion-item no-result">Tidak ada hasil ditemukan</div>';
        suggestions.style.display = 'block';
        return;
    }

    suggestions.innerHTML = filtered.map(b =>
        `<div class="suggestion-item" data-id="${b.id}">
            <strong>${b.nama}</strong> <span style="color: #667eea;">(${b.kode})</span><br>
            <small style="color: #666;">${b.satuan} - ${formatRupiah(b.hargaJual)}</small>
        </div>`
    ).join('');
    suggestions.style.display = 'block';

    // Event listener untuk item suggestion
    suggestions.querySelectorAll('.suggestion-item:not(.no-result)').forEach(item => {
        item.addEventListener('click', function () {
            const barangId = parseInt(this.dataset.id);
            const barang = dataMasterBarang.find(b => b.id === barangId);

            document.getElementById('namaBarang').value = barang.nama;
            document.getElementById('kodeBarang').value = barang.kode;
            document.getElementById('satuanBarang').value = barang.satuan;
            document.getElementById('hargaSatuan').value = barang.hargaJual;

            suggestions.style.display = 'none';

            hitungTotal();
        });
    });
}

// Autocomplete untuk barang - ketik untuk filter
document.getElementById('namaBarang').addEventListener('input', function (e) {
    showProductSuggestions(e.target.value);
});

// Tampilkan semua barang saat focus/klik
document.getElementById('namaBarang').addEventListener('focus', function (e) {
    showProductSuggestions(e.target.value);
});

// Close suggestions ketika klik di luar
document.addEventListener('click', function (e) {
    if (!e.target.closest('#namaPelanggan') && !e.target.closest('#customerSuggestions')) {
        document.getElementById('customerSuggestions').style.display = 'none';
    }
    if (!e.target.closest('#namaBarang') && !e.target.closest('#productSuggestions')) {
        document.getElementById('productSuggestions').style.display = 'none';
    }
});

// Handle form submit
document.getElementById('salesForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Validasi tanggal
    const tanggal = document.getElementById('tanggal').value;
    if (!validasiTanggal(tanggal)) {
        alert('Format tanggal tidak valid! Gunakan format DD/MM/YYYY');
        return;
    }

    // Ambil input form manual (jika ada)
    const manualNama = document.getElementById('namaBarang').value;
    const manualJml = document.getElementById('jumlah').value;
    const manualHarga = document.getElementById('hargaSatuan').value;

    // Logic: Gunakan salesCart. WAJIB menggunakan tombol Tambah Barang.
    let transactionItems = [];
    let transactionNamaBarang = '';

    if (salesCart.length === 0) {
        alert('Mohon masukkan barang ke keranjang terlebih dahulu (klik tombol + Tambah Barang).');
        return;
    }

    transactionItems = [...salesCart];
    if (salesCart.length === 1) {
        transactionNamaBarang = salesCart[0].namaBarang;
    } else {
        transactionNamaBarang = `${salesCart[0].namaBarang} (+${salesCart.length - 1} lainnya)`;
    }

    // Ambil semua data dari form
    const formData = {
        tanggal: document.getElementById('tanggal').value,
        noFaktur: document.getElementById('noFaktur').value,
        divisi: document.getElementById('divisi').value,
        namaPelanggan: document.getElementById('namaPelanggan').value,
        alamatPelanggan: document.getElementById('alamatPelanggan').value,
        noTelepon: document.getElementById('noTelepon').value,
        npwpNik: document.getElementById('npwpNik').value,

        // Use summary name for table display, store real items in 'items'
        namaBarang: transactionNamaBarang,
        items: transactionItems,

        // Legacy fields (optional, can keep for safety or use first item)
        kodeBarang: transactionItems[0].kodeBarang,
        satuan: transactionItems[0].satuan,
        jumlah: transactionItems.reduce((acc, i) => acc + i.jumlah, 0), // Total Qty
        hargaSatuan: 0, // Mixed

        jenisPpn: document.getElementById('jenisPpn').value,
        subtotal: parseFloat(document.getElementById('subtotal').dataset.value),
        diskon: parseFloat(document.getElementById('diskon').value) || 0,
        nilaiPpn: parseFloat(document.getElementById('nilaiPpn').dataset.value),
        total: parseFloat(document.getElementById('total').dataset.value),
        metodePembayaran: document.getElementById('metodePembayaran').value,
        jumlahDibayar: parseFloat(document.getElementById('jumlahDibayar').value) || 0,
        sisaPembayaran: parseFloat(document.getElementById('sisaPembayaran').dataset.value) || 0
    };

    // Simpan transaksi
    saveTransaction(formData);

    // Tampilkan pesan sukses
    alert('Transaksi berhasil disimpan!');

    // Reset form
    this.reset();
    salesCart = [];
    renderSalesCart();

    // Set ulang tanggal ke hari ini
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    document.getElementById('tanggal').value = `${dd}/${mm}/${yyyy}`;

    // Generate nomor faktur baru
    document.getElementById('noFaktur').value = generateNoFaktur();

    // Reset perhitungan
    hitungTotal();
});

// Handle form reset
document.getElementById('salesForm').addEventListener('reset', function () {
    setTimeout(() => {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
        document.getElementById('tanggal').value = `${dd}/${mm}/${yyyy}`;
        document.getElementById('noFaktur').value = generateNoFaktur();
        document.getElementById('pembayaranKreditRow').style.display = 'none';
        hitungTotal();
    }, 0);
});

// Set tanggal default ke hari ini dan nomor faktur otomatis saat halaman dimuat
window.addEventListener('load', function () {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    document.getElementById('tanggal').value = `${dd}/${mm}/${yyyy}`;
    document.getElementById('noFaktur').value = generateNoFaktur();

    displayTransactions();
    hitungTotal();
});


// === MODULE PEMBELIAN LOGIC ===

// Generate No Faktur Beli
function generateNoFakturBeli() {
    const today = new Date();
    const yy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const prefix = `NPB-${yy}${mm}${dd}-`;

    // Find last number for this date
    // Safety check if purchases is defined
    if (typeof purchases === 'undefined') purchases = [];

    const lastPurchase = purchases
        .filter(p => p.noFaktur && p.noFaktur.startsWith(prefix))
        .sort((a, b) => b.noFaktur.localeCompare(a.noFaktur))[0];

    if (lastPurchase) {
        const lastNum = parseInt(lastPurchase.noFaktur.split('-')[2]);
        return prefix + String(lastNum + 1).padStart(4, '0');
    } else {
        return prefix + '0001';
    }
}


// Autocomplete Logic for Purchase Module
function initPurchaseAutocomplete() {
    // 1. Supplier Autocomplete
    const namaSupplierInput = document.getElementById('namaSupplier');
    const supplierSuggestions = document.getElementById('supplierSuggestions');

    if (namaSupplierInput && supplierSuggestions) {
        namaSupplierInput.addEventListener('input', function () {
            const value = this.value.toLowerCase();
            supplierSuggestions.innerHTML = '';

            const filteredSuppliers = value.length > 0
                ? dataMasterSupplier.filter(s => s.nama.toLowerCase().includes(value))
                : dataMasterSupplier;

            if (filteredSuppliers.length > 0) {
                filteredSuppliers.forEach(s => {
                    const div = document.createElement('div');
                    div.className = 'suggestion-item';
                    div.innerHTML = `<strong>${s.nama}</strong><br><small>${s.alamat}</small>`;
                    div.onclick = function () {
                        namaSupplierInput.value = s.nama;
                        document.getElementById('alamatSupplier').value = s.alamat || '';
                        document.getElementById('noTeleponSupplier').value = s.telepon || '';
                        document.getElementById('npwpNikSupplier').value = s.npwp || '';
                        supplierSuggestions.innerHTML = '';
                        supplierSuggestions.style.display = 'none';
                    };
                    supplierSuggestions.appendChild(div);
                });
                supplierSuggestions.style.display = 'block';
            } else {
                supplierSuggestions.style.display = 'none';
            }
        });

        // Hide when clicking outside
        document.addEventListener('click', function (e) {
            if (e.target !== namaSupplierInput) {
                supplierSuggestions.style.display = 'none';
            }
        });

        // Show all on focus
        namaSupplierInput.addEventListener('focus', function () {
            if (this.value.trim() === "") {
                const event = new Event('input');
                this.dispatchEvent(event);
            }
        });
    }

    // 2. Product (Barang) Autocomplete for Purchase
    const namaBarangInput = document.getElementById('namaBarangBeli');
    const productSuggestions = document.getElementById('productSuggestionsBeli');

    if (namaBarangInput && productSuggestions) {
        namaBarangInput.addEventListener('input', function () {
            const value = this.value.toLowerCase();
            productSuggestions.innerHTML = '';

            const filteredProducts = value.length > 0
                ? dataMasterBarang.filter(b =>
                    b.nama.toLowerCase().includes(value) ||
                    b.kode.toLowerCase().includes(value)
                )
                : dataMasterBarang;

            if (filteredProducts.length > 0) {
                filteredProducts.forEach(b => {
                    const div = document.createElement('div');
                    div.className = 'suggestion-item';
                    div.innerHTML = `<strong>${b.nama}</strong> (${b.kode})<br><small>Beli: ${formatRupiah(b.hargaBeli)}</small>`;
                    div.onclick = function () {
                        namaBarangInput.value = b.nama;
                        document.getElementById('kodeBarangBeli').value = b.kode;
                        document.getElementById('satuanBarangBeli').value = b.satuan;
                        document.getElementById('hargaSatuanBeli').value = b.hargaBeli;

                        // Recalculate totals
                        hitungTotalBeli();

                        productSuggestions.innerHTML = '';
                        productSuggestions.style.display = 'none';
                    };
                    productSuggestions.appendChild(div);
                });
                productSuggestions.style.display = 'block';
            } else {
                productSuggestions.style.display = 'none';
            }
        });

        // Hide when clicking outside
        document.addEventListener('click', function (e) {
            if (e.target !== namaBarangInput) {
                productSuggestions.style.display = 'none';
            }
        });

        // Show all on focus/click
        namaBarangInput.addEventListener('focus', function () {
            const event = new Event('input');
            this.dispatchEvent(event);
        });
    }
}

// Call init function when DOM is ready
document.addEventListener('DOMContentLoaded', initPurchaseAutocomplete);


// Rumus Pembelian
function hitungTotalBeli() {
    let subtotal = 0;

    if (purchaseCart && purchaseCart.length > 0) {
        subtotal = purchaseCart.reduce((sum, item) => sum + item.total, 0);
    } else {
        const jumlah = parseFloat(document.getElementById('jumlahBeli').value) || 0;
        const harga = parseFloat(document.getElementById('hargaSatuanBeli').value) || 0;
        subtotal = jumlah * harga;
    }

    // Global PPN & Discount Logic
    const diskon = parseFloat(document.getElementById('diskonBeli').value) || 0;
    const subtotalSetelahDiskon = subtotal - diskon;

    const jenisPpnValue = document.getElementById('jenisPpnBeli').value;
    let nilaiPpn = 0;
    if (jenisPpnValue != 0) {
        const jenisPpn = parseFloat(jenisPpnValue) || 0;
        nilaiPpn = (subtotalSetelahDiskon * jenisPpn) / 100;
    }

    const total = subtotalSetelahDiskon + nilaiPpn;

    const uangMuka = parseFloat(document.getElementById('uangMukaBeli').value) || 0;
    const sisaPembayaran = total - uangMuka;

    document.getElementById('subtotalBeli').value = formatRupiah(subtotal);
    document.getElementById('nilaiPpnBeli').value = formatRupiah(nilaiPpn);
    document.getElementById('totalBeli').value = formatRupiah(total);

    if (document.getElementById('pembayaranKreditBeliRow').style.display !== 'none') {
        document.getElementById('sisaPembayaranBeli').value = formatRupiah(sisaPembayaran);
        document.getElementById('sisaPembayaranBeli').dataset.value = sisaPembayaran;
    }

    // Store raw values
    document.getElementById('subtotalBeli').dataset.value = subtotal;
    document.getElementById('nilaiPpnBeli').dataset.value = nilaiPpn;
    document.getElementById('totalBeli').dataset.value = total;
}

// Event Listeners Pembelian
['jumlahBeli', 'hargaSatuanBeli', 'diskonBeli', 'jenisPpnBeli', 'uangMukaBeli'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', hitungTotalBeli);
});

const metodeBayarBeli = document.getElementById('metodePembayaranBeli');
if (metodeBayarBeli) {
    metodeBayarBeli.addEventListener('change', function () {
        const method = this.value;
        const kreditRow = document.getElementById('pembayaranKreditBeliRow');

        if (method === 'Kredit') {
            kreditRow.style.display = 'flex'; // Use flex for form-row
        } else {
            kreditRow.style.display = 'none';
            document.getElementById('uangMukaBeli').value = 0;
        }
        hitungTotalBeli();
    });
}

// Handle Submit Pembelian
const purchaseForm = document.getElementById('purchaseForm');
if (purchaseForm) {
    purchaseForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Items Logic
        let purchaseItems = [];
        let purchaseNamaBarang = '';

        const manualNama = document.getElementById('namaBarangBeli').value;
        const manualJml = parseFloat(document.getElementById('jumlahBeli').value) || 0;
        const manualHarga = parseFloat(document.getElementById('hargaSatuanBeli').value) || 0;

        if (purchaseCart.length === 0) {
            alert('Mohon masukkan barang ke keranjang terlebih dahulu (klik tombol + Tambah Barang).'); // Enforce cart
            return;
        }

        purchaseItems = [...purchaseCart];
        if (purchaseCart.length === 1) {
            purchaseNamaBarang = purchaseCart[0].namaBarang;
        } else {
            purchaseNamaBarang = `${purchaseCart[0].namaBarang} (+${purchaseCart.length - 1} lainnya)`;
        }


        const rawTotal = document.getElementById('totalBeli').dataset.value || 0;
        const rawSubtotal = document.getElementById('subtotalBeli').dataset.value || 0;
        const rawPpn = document.getElementById('nilaiPpnBeli').dataset.value || 0;
        const rawSisa = document.getElementById('sisaPembayaranBeli').dataset.value || 0;

        const purchaseData = {
            tanggal: document.getElementById('tanggalBeli').value,
            noFaktur: document.getElementById('noFakturBeli').value,
            divisi: document.getElementById('divisiBeli').value,
            namaSupplier: document.getElementById('namaSupplier').value,
            npwpNik: document.getElementById('npwpNikSupplier').value,
            alamat: document.getElementById('alamatSupplier').value,
            telepon: document.getElementById('noTeleponSupplier').value,

            // Item Data
            namaBarang: purchaseNamaBarang,
            items: purchaseItems,

            jumlah: purchaseItems.reduce((acc, i) => acc + i.jumlah, 0),
            hargaSatuan: 0,

            jenisPpn: document.getElementById('jenisPpnBeli').value,
            diskon: document.getElementById('diskonBeli').value,
            subtotal: rawSubtotal,
            nilaiPpn: rawPpn,
            total: rawTotal,
            metodePembayaran: document.getElementById('metodePembayaranBeli').value,
            uangMuka: document.getElementById('uangMukaBeli').value,
            sisaPembayaran: rawSisa
        };

        purchases.push(purchaseData);
        localStorage.setItem('purchases', JSON.stringify(purchases));

        alert('Pembelian berhasil disimpan');
        this.reset();

        purchaseCart = [];
        renderPurchaseCart();

        // Reset logic
        setTimeout(() => {
            const today = new Date();
            const dd = String(today.getDate()).padStart(2, '0');
            const mm = String(today.getMonth() + 1).padStart(2, '0');
            const yyyy = today.getFullYear();
            document.getElementById('tanggalBeli').value = `${dd}/${mm}/${yyyy}`;
            document.getElementById('noFakturBeli').value = generateNoFakturBeli();
            document.getElementById('pembayaranKreditBeliRow').style.display = 'none';
            hitungTotalBeli();
        }, 100);

        displayPurchases();
    });
}

// Display Purchases
function displayPurchases(dataToDisplay = null) {
    const data = dataToDisplay || purchases;
    const tbody = document.getElementById('purchaseBody');
    const grandTotalSection = document.getElementById('grandTotalPurchaseSection');
    const grandTotalValue = document.getElementById('grandTotalPurchaseValue');

    if (!tbody) return;

    tbody.innerHTML = '';
    if (data.length === 0) {
        tbody.innerHTML = '<tr class="no-data"><td colspan="14">Data pembelian tidak ditemukan</td></tr>';
        if (grandTotalSection) grandTotalSection.style.display = 'none';
        return;
    }

    let totalPurchases = 0;

    data.forEach((p, displayIndex) => {
        // Find original index
        const originalIndex = purchases.indexOf(p);

        totalPurchases += Number(p.total);

        const row = tbody.insertRow();
        row.innerHTML = `
            <td>${displayIndex + 1}</td>
            <td>${p.tanggal}</td>
            <td>${p.divisi || '-'}</td>
            <td>${p.noFaktur}</td>
            <td>${p.namaSupplier}</td>
            <td>${p.namaBarang}</td>
            <td>${p.jumlah} ${p.satuan || ''}</td>
            <td class="rupiah">${formatRupiah(p.hargaSatuan)}</td>
            <td class="rupiah">${formatRupiah(p.diskon || 0)}</td>
            <td class="rupiah">${formatRupiah(p.nilaiPpn || 0)}</td>
            <td class="rupiah">${formatRupiah(p.uangMuka || 0)}</td>
            <td class="rupiah">${formatRupiah(p.total)}</td>
            <td class="rupiah">${formatRupiah(p.sisaPembayaran || 0)}</td>
            <td class="action-buttons">
                <button class="btn-icon btn-print" onclick="printPurchase(${originalIndex})" title="Cetak Invoice">📄 Invoice</button>
                <button class="btn-icon btn-print" onclick="printSuratJalanPembelian(${originalIndex})" title="Cetak Surat Jalan">📋 Surat Jalan</button>
                <button class="btn-icon btn-print" onclick="printKwitansiPembelian(${originalIndex})" title="Cetak Kwitansi">🧾 Kwitansi</button>
                <button class="btn-icon btn-edit" onclick="editPurchase(${originalIndex})" title="Edit">✏️ Edit</button>
                <button class="btn-icon btn-delete" onclick="deletePurchase(${originalIndex})" title="Hapus">🗑️ Hapus</button>
            </td>
        `;
    });

    // Update Grand Total Display
    if (grandTotalSection && grandTotalValue) {
        grandTotalSection.style.display = 'block';
        grandTotalValue.textContent = formatRupiah(totalPurchases);
    }
}

// Fungsi Edit Pembelian
function editPurchase(index) {
    const p = purchases[index];

    // Confirm
    if (!confirm('Edit pembelian ini? Data akan dimuat kembali ke form.')) return;

    // Fill Form
    document.getElementById('tanggalBeli').value = p.tanggal;
    document.getElementById('noFakturBeli').value = p.noFaktur;
    document.getElementById('divisiBeli').value = p.divisi;

    document.getElementById('namaSupplier').value = p.namaSupplier;
    document.getElementById('npwpNikSupplier').value = p.npwpNik || '';
    document.getElementById('alamatSupplier').value = p.alamat || '';
    document.getElementById('noTeleponSupplier').value = p.telepon || '';

    document.getElementById('namaBarangBeli').value = p.namaBarang;
    document.getElementById('jumlahBeli').value = p.jumlah;
    document.getElementById('hargaSatuanBeli').value = p.hargaSatuan;
    document.getElementById('diskonBeli').value = p.diskon || 0;
    document.getElementById('jenisPpnBeli').value = p.jenisPpn;

    document.getElementById('metodePembayaranBeli').value = p.metodePembayaran;

    // Trigger change for payment method visibility
    const event = new Event('change');
    document.getElementById('metodePembayaranBeli').dispatchEvent(event);

    document.getElementById('uangMukaBeli').value = p.uangMuka || 0;

    // Recalculate values
    hitungTotalBeli();

    // Scroll to top
    document.getElementById('pembelianModule').scrollIntoView({ behavior: 'smooth' });
}

// Fungsi Print Pembelian (Entry Point Modal)
function printPurchase(index) {
    currentPrintIndex = index;
    currentPrintType = 'purchase';
    const modal = document.getElementById('printModal');
    if (modal) modal.style.display = 'block';
}

// Fungsi Print Pembelian (Format Standard)
function printStandardPurchase(index) {
    if (index === -1 || !purchases[index]) return;
    const p = purchases[index];
    const terbilangText = terbilangRupiah(p.total);
    const currentDate = new Date();
    const printTime = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}, ${currentDate.getHours()}:${String(currentDate.getMinutes()).padStart(2, '0')}`;

    const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Bukti Pembelian - ${p.noFaktur}</title>
            <style>
                @page { size: A4; margin: 2cm; }
                body { font-family: 'Times New Roman', Times, serif; font-size: 10pt; color: #000; -webkit-print-color-adjust: exact; }
                .header { position: relative; margin-bottom: 20px; }
                .company-name { font-weight: bold; font-size: 14pt; margin-bottom: 5px; }
                .company-desc { font-weight: bold; font-size: 9pt; width: 70%; line-height: 1.2; }
                .company-address { margin-top: 5px; font-size: 10pt; }
                .logo { position: absolute; top: 0; right: 0; width: 100px; height: auto; max-height: 100px; }
                .print-meta { position: absolute; top: 110px; right: 0; font-size: 8pt; text-align: right; }
                .line { border-bottom: 3px solid #000; margin: 15px 0 20px 0; }
                .invoice-title-box { border: 2px solid #000; width: 300px; margin: 0 auto 30px auto; padding: 5px; text-align: center; }
                .invoice-title { font-weight: bold; font-size: 14pt; }
                .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
                .info-col table { width: 100%; }
                .info-col td { padding: 2px 0; vertical-align: top; }
                .info-label { width: 100px; }
                
                .items-table { width: 100%; border-collapse: collapse; margin-bottom: 10px; border: 2px solid #000; }
                .items-table th { border: 1px solid #000; padding: 5px; text-align: center; font-weight: bold; }
                .items-table td { border: 1px solid #000; padding: 5px; }
                .text-center { text-align: center; }
                .text-right { text-align: right; }
                
                .totals-section { display: flex; justify-content: flex-end; margin-bottom: 20px; }
                .totals-table { width: 40%; }
                .totals-table td { padding: 3px; }
                .total-label { text-align: right; font-weight: bold; }
                .total-value { text-align: right; font-weight: bold; }
                
                .terbilang { font-style: italic; margin-bottom: 20px; font-size: 9pt; }
                .footer-note { font-weight: bold; font-size: 9pt; margin-bottom: 40px; }
                
                .signatures { display: flex; justify-content: space-between; margin-top: 30px; padding: 0 50px; }
                .sign-box { text-align: center; width: 200px; }
                .sign-space { height: 80px; border-bottom: 1px solid #000; margin-top: 10px; }
            </style>
        </head>
        <body>
            <div class="header">
                <div class="company-name">PT. SUMBER GANDA MEKAR</div>
                <div class="company-desc">JUAL BELI BESI TUA/BARU - RANGKA BETON/LOGAM - TIANG LISTRIK/TELP - KONSTRUKSI BAJA DAN PAKAN TERNAK</div>
                <div class="company-address">Jl. Raya Gedebage No. 95 Bandung<br>CP. Irwan : 082117800626, CP. Uwem : 082318188863</div>
                <img src="logo.png" alt="SGM Logo" class="logo">
                <div class="print-meta">
                    ${printTime}<br>Sistem Akuntansi SGM
                </div>
            </div>
            
            <div class="line"></div>
            
            <div class="invoice-title-box">
                <div class="invoice-title">BUKTI PEMBELIAN</div>
            </div>
            
            <div class="info-grid">
                <div class="info-col">
                    <table>
                        <tr><td class="info-label">No. Faktur</td><td>: ${p.noFaktur}</td></tr>
                        <tr><td class="info-label">Tanggal</td><td>: ${p.tanggal}</td></tr>
                        <tr><td class="info-label">Divisi</td><td>: ${p.divisi}</td></tr>
                    </table>
                </div>
                <div class="info-col">
                    <table>
                        <tr><td class="info-label">Supplier</td><td>: ${p.namaSupplier}</td></tr>
                        <tr><td class="info-label">Alamat</td><td>: ${p.alamat || '-'}</td></tr>
                        <tr><td class="info-label">Telp</td><td>: ${p.telepon || '-'}</td></tr>
                    </table>
                </div>
            </div>
            
            <table class="items-table">
                <thead>
                    <tr>
                        <th style="width: 5%">No</th>
                        <th>Nama Barang</th>
                        <th style="width: 10%">Jumlah</th>
                        <th style="width: 15%">Harga Satuan</th>
                        <th style="width: 15%">Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="text-center">1</td>
                        <td>${p.namaBarang}</td>
                        <td class="text-center">${p.jumlah}</td>
                        <td class="text-right">${formatRupiah(p.hargaSatuan)}</td>
                        <td class="text-right">${formatRupiah(p.jumlah * p.hargaSatuan - (p.diskon || 0))}</td>
                    </tr>
                </tbody>
            </table>
            
            <div class="totals-section">
                <table class="totals-table">
                    <tr>
                        <td class="total-label">Subtotal</td>
                        <td class="total-value">${formatRupiah(p.subtotal)}</td>
                    </tr>
                     <tr>
                        <td class="total-label">Diskon</td>
                        <td class="total-value">${formatRupiah(p.diskon || 0)}</td>
                    </tr>
                    <tr>
                        <td class="total-label">PPN ${p.jenisPpn > 0 ? (p.jenisPpn == 11 ? '11%' : p.jenisPpn + '%') : '0%'}</td>
                        <td class="total-value">${formatRupiah(p.nilaiPpn)}</td>
                    </tr>
                    <tr>
                        <td class="total-label" style="font-size: 12pt;">Total</td>
                        <td class="total-value" style="font-size: 12pt;">${formatRupiah(p.total)}</td>
                    </tr>
                     ${p.metodePembayaran === 'Kredit' ? `
                    <tr>
                        <td class="total-label">Uang Muka (DP)</td>
                        <td class="total-value">${formatRupiah(p.uangMuka)}</td>
                    </tr>
                    <tr>
                        <td class="total-label">Sisa Pembayaran</td>
                        <td class="total-value">${formatRupiah(p.sisaPembayaran)}</td>
                    </tr>` : ''}
                </table>
            </div>
            
            <div class="terbilang">
                Terbilang: ${terbilangText}
            </div>
            
            <div class="signatures">
                <div class="sign-box">
                    Hormat Kami,<br>(Pembeli)
                    <div class="sign-space"></div>
                </div>
                <div class="sign-box">
                    Supplier,
                    <div class="sign-space"></div>
                    ${p.namaSupplier}
                </div>
            </div>
        </body>
        </html>
    `;
    printToIframe(htmlContent);
}

// Fungsi Filter Pembelian
function filterPurchases() {
    const searchValue = document.getElementById('searchPurchaseInput').value.toLowerCase();
    const startDate = document.getElementById('startPurchaseDate').value;
    const endDate = document.getElementById('endPurchaseDate').value;

    const filtered = purchases.filter(p => {
        // Search Logic
        const matchSearch = (
            p.noFaktur.toLowerCase().includes(searchValue) ||
            p.namaSupplier.toLowerCase().includes(searchValue) ||
            p.namaBarang.toLowerCase().includes(searchValue)
        );

        // Date Logic
        let matchDate = true;
        if (startDate || endDate) {
            const parts = p.tanggal.split('/'); // DD/MM/YYYY
            const pDate = new Date(parts[2], parts[1] - 1, parts[0]);
            pDate.setHours(0, 0, 0, 0);

            if (startDate) {
                const start = new Date(startDate);
                start.setHours(0, 0, 0, 0);
                if (pDate < start) matchDate = false;
            }
            if (endDate && matchDate) {
                const end = new Date(endDate);
                end.setHours(0, 0, 0, 0);
                if (pDate > end) matchDate = false;
            }
        }

        return matchSearch && matchDate;
    });

    displayPurchases(filtered);
}

// Event Listeners for Purchase Filter
document.addEventListener('DOMContentLoaded', function () {
    const searchPurchaseInput = document.getElementById('searchPurchaseInput');
    const startPurchaseDate = document.getElementById('startPurchaseDate');
    const endPurchaseDate = document.getElementById('endPurchaseDate');
    const resetPurchaseFilterBtn = document.getElementById('resetPurchaseFilterBtn');

    if (searchPurchaseInput) searchPurchaseInput.addEventListener('input', filterPurchases);
    if (startPurchaseDate) startPurchaseDate.addEventListener('change', filterPurchases);
    if (endPurchaseDate) endPurchaseDate.addEventListener('change', filterPurchases);

    if (resetPurchaseFilterBtn) {
        resetPurchaseFilterBtn.addEventListener('click', function () {
            if (searchPurchaseInput) searchPurchaseInput.value = '';
            if (startPurchaseDate) startPurchaseDate.value = '';
            if (endPurchaseDate) endPurchaseDate.value = '';
            displayPurchases(); // Reset to show all
        });
    }
});

function deletePurchase(index) {
    if (confirm('Yakin ingin menghapus data pembelian ini?')) {
        purchases.splice(index, 1);
        localStorage.setItem('purchases', JSON.stringify(purchases));
        displayPurchases();
    }
}

// Init Pembelian Loaded
// Note: DOMContentLoaded is also handled in main script, but we can have multiple
document.addEventListener('DOMContentLoaded', () => {
    // Set tanggal default pembelian
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    const tglBeli = document.getElementById('tanggalBeli');
    if (tglBeli) tglBeli.value = `${dd}/${mm}/${yyyy}`;

    const noFakturBeli = document.getElementById('noFakturBeli');
    if (noFakturBeli) noFakturBeli.value = generateNoFakturBeli();
});

// Event Listeners for Add Item Buttons (Fix: Tambah Barang buttons were not working)
document.addEventListener('DOMContentLoaded', function () {
    // Listener for Penjualan (Sales) Add Item
    const addItemBtn = document.getElementById('addItemBtn');
    if (addItemBtn) {
        addItemBtn.addEventListener('click', addItemToSalesCart);
    }

    // Listener for Pembelian (Purchase) Add Item
    const addItemBeliBtn = document.getElementById('addItemBeliBtn');
    if (addItemBeliBtn) {
        addItemBeliBtn.addEventListener('click', addItemToPurchaseCart);
    }
});


// === MODULE LAPORAN PIUTANG ===

let openingReceivables = JSON.parse(localStorage.getItem('openingReceivables')) || [];

function displayPiutang(dataToDisplay = null) {
    console.log("=== displayPiutang: Function started ===");
    try {
        const tbodyDetail = document.getElementById('daftarPiutangBody');
        const tbodyRekap = document.getElementById('rekapPiutangTable') ? document.getElementById('rekapPiutangBody') : null;

        console.log("tbodyDetail found:", !!tbodyDetail);
        console.log("tbodyRekap found:", !!tbodyRekap);

        // Ensure data arrays exist
        if (!Array.isArray(openingReceivables)) {
            console.warn("displayPiutang: openingReceivables is not an array, resetting.");
            openingReceivables = [];
        }
        if (typeof transactions === 'undefined' || !Array.isArray(transactions)) {
            console.warn("displayPiutang: transactions is not defined or not an array.");
            // We don't reset transactions here as it is global, but we handle access carefully below
        }


        // 1. Combine Data: Opening Balances + Credit Transactions
        // Opening Balances
        const openings = openingReceivables.map(item => ({
            id: item.id,
            source: 'Saldo Awal',
            ref: generateRef(item.id),
            date: item.tanggal,
            customer: item.namaPelanggan,
            desc: item.keterangan || '-',
            total: parseFloat(item.jumlahPiutang) || 0,
            paid: parseFloat(item.dibayarPiutang) || 0,
            remaining: (parseFloat(item.jumlahPiutang) || 0) - (parseFloat(item.dibayarPiutang) || 0),
            status: ((parseFloat(item.jumlahPiutang) || 0) - (parseFloat(item.dibayarPiutang) || 0)) <= 0 ? 'Lunas' : 'Belum Lunas',
            raw: item,
            type: 'opening'
        }));

        // Credit Transactions
        const safeTransactions = Array.isArray(transactions) ? transactions : [];
        const creditSales = safeTransactions
            .filter(t => t.metodePembayaran === 'Kredit')
            .map(t => ({
                id: t.noFaktur,
                source: 'Penjualan',
                ref: t.noFaktur,
                date: t.tanggal,
                customer: t.namaPelanggan,
                desc: 'Penjualan Kredit',
                total: parseFloat(t.total) || 0,
                paid: parseFloat(t.jumlahDibayar) || 0,
                remaining: parseFloat(t.sisaPembayaran) || 0,
                status: parseFloat(t.sisaPembayaran) <= 0 ? 'Lunas' : 'Belum Lunas',
                raw: t,
                type: 'transaction'
            }));

        let allReceivables = [...openings, ...creditSales];
        console.log(`displayPiutang: Found ${allReceivables.length} total receivable items.`);

        // Apply Filters
        const searchInput = document.getElementById('searchPiutangInput');
        const statusFilter = document.getElementById('statusPiutangFilter');
        const searchVal = searchInput ? searchInput.value.toLowerCase() : '';
        const statusVal = statusFilter ? statusFilter.value : '';

        if (searchVal || statusVal) {
            allReceivables = allReceivables.filter(r => {
                const matchSearch = (r.customer && r.customer.toLowerCase().includes(searchVal)) || (r.ref && r.ref.toLowerCase().includes(searchVal));
                const matchStatus = statusVal === '' || r.status === statusVal;
                return matchSearch && matchStatus;
            });
        }

        // 2. Render Daftar Detail Piutang
        if (tbodyDetail) {
            tbodyDetail.innerHTML = '';

            let totalPiutang = 0;
            let totalDibayar = 0;
            let totalSisa = 0;

            if (allReceivables.length === 0) {
                tbodyDetail.innerHTML = '<tr class="no-data"><td colspan="11">Belum ada data piutang</td></tr>';
            } else {
                allReceivables.forEach((r, index) => {
                    totalPiutang += r.total;
                    totalDibayar += r.paid;
                    totalSisa += r.remaining;

                    const row = tbodyDetail.insertRow();
                    let actionBtn = '';

                    if (r.type === 'opening') {
                        actionBtn = `<button class="btn-icon btn-delete" onclick="deleteOpeningReceivable(${r.raw.id})" title="Hapus">Buang</button>`;
                    } else {
                        actionBtn = `<span style="color:#888; font-size: 0.8em;">Via Penjualan</span>`;
                    }

                    row.innerHTML = `
                        <td>${index + 1}</td>
                        <td>${r.date}</td>
                        <td>${r.source}</td>
                        <td>${r.ref}</td>
                        <td>${r.customer}</td>
                        <td>${r.desc}</td>
                        <td class="rupiah">${formatRupiah(r.total)}</td>
                        <td class="rupiah">${formatRupiah(r.paid)}</td>
                        <td class="rupiah">${formatRupiah(r.remaining)}</td>
                        <td><span class="badge ${r.remaining <= 0 ? 'badge-success' : 'badge-warning'}">${r.status}</span></td>
                        <td class="text-center">${actionBtn}</td>
                    `;
                });
            }

            // Update Footer Totals
            const elTotalPiutang = document.getElementById('totalPiutangAll');
            const elTotalDibayar = document.getElementById('totalDibayarAll');
            const elTotalSisa = document.getElementById('totalSisaAll');

            if (elTotalPiutang) elTotalPiutang.textContent = formatRupiah(totalPiutang);
            if (elTotalDibayar) elTotalDibayar.textContent = formatRupiah(totalDibayar);
            if (elTotalSisa) elTotalSisa.textContent = formatRupiah(totalSisa);

            // Update Grand Total Daftar Section
            const grandDaftarSec = document.getElementById('grandTotalDaftarSection');
            if (grandDaftarSec) {
                document.getElementById('grandTotalDaftarPiutang').textContent = formatRupiah(totalPiutang);
                document.getElementById('grandTotalDaftarDibayar').textContent = formatRupiah(totalDibayar);
                document.getElementById('grandTotalDaftarSisa').textContent = formatRupiah(totalSisa);
                grandDaftarSec.style.display = 'block';
            }
        } else {
            console.error("displayPiutang: tbodyDetail (daftarPiutangBody) not found!");
        }

        // 3. Render Rekap Piutang per Pelanggan
        const customerSummary = {};
        allReceivables.forEach(r => {
            if (!r.customer) return;
            if (!customerSummary[r.customer]) {
                customerSummary[r.customer] = {
                    name: r.customer,
                    count: 0,
                    total: 0,
                    paid: 0,
                    remaining: 0
                };
            }
            customerSummary[r.customer].count++;
            customerSummary[r.customer].total += r.total;
            customerSummary[r.customer].paid += r.paid;
            customerSummary[r.customer].remaining += r.remaining;
        });

        const grandRekapSec = document.getElementById('grandTotalRekapSection');

        if (tbodyRekap) {
            tbodyRekap.innerHTML = '';
            const summaries = Object.values(customerSummary);

            if (summaries.length === 0) {
                tbodyRekap.innerHTML = '<tr class="no-data"><td colspan="7">Belum ada data</td></tr>';
                if (grandRekapSec) grandRekapSec.style.display = 'none';
            } else {
                let totalRekapPiutang = 0;
                let totalRekapDibayar = 0;
                let totalRekapSisa = 0;

                summaries.forEach((s, index) => {
                    totalRekapPiutang += s.total;
                    totalRekapDibayar += s.paid;
                    totalRekapSisa += s.remaining;

                    const status = s.remaining <= 0 ? 'Lunas' : 'Belum Lunas';
                    const row = tbodyRekap.insertRow();
                    row.innerHTML = `
                        <td>${index + 1}</td>
                        <td>${s.name}</td>
                        <td class="text-center">${s.count}</td>
                        <td class="rupiah">${formatRupiah(s.total)}</td>
                        <td class="rupiah">${formatRupiah(s.paid)}</td>
                        <td class="rupiah">${formatRupiah(s.remaining)}</td>
                        <td><span class="badge ${s.remaining <= 0 ? 'badge-success' : 'badge-warning'}">${status}</span></td>
                    `;
                });

                // Update Grand Total Rekap Section
                if (grandRekapSec) {
                    document.getElementById('grandTotalRekapPiutang').textContent = formatRupiah(totalRekapPiutang);
                    document.getElementById('grandTotalRekapDibayar').textContent = formatRupiah(totalRekapDibayar);
                    document.getElementById('grandTotalRekapSisa').textContent = formatRupiah(totalRekapSisa);
                    grandRekapSec.style.display = 'block';
                }
            }
        } else {
            // It's possible the table doesn't exist if user is on minimal view, but warn just in case
            console.warn("displayPiutang: tbodyRekap (rekapPiutangBody) not found, skipping rekap.");
        }

        // Force visibility of the module container just in case switchTab failed to show it properly
        // This is a failsafe to fix 'white plain' issues if the active class wasn't applied correctly
        const moduleContainer = document.getElementById('piutangModule');
        if (moduleContainer && moduleContainer.classList.contains('active')) {
            if (moduleContainer.style.display === 'none') {
                console.warn("displayPiutang: forcing display block on piutangModule");
                moduleContainer.style.display = 'block';
            }
        }

    } catch (e) {
        console.error('Error in displayPiutang:', e);
        const tbodyDetail = document.getElementById('daftarPiutangBody');
        if (tbodyDetail) {
            tbodyDetail.innerHTML = `<tr class="error-row"><td colspan="11" style="color:red; text-align:center; padding: 20px;">
                <strong>Terjadi kesalahan saat memuat data piutang.</strong><br>
                Detail: ${e.message}
             </td></tr>`;
        }
        alert('Terjadi kesalahan saat menampilkan data piutang: ' + e.message);
    }
}

// Helper to generate Ref for Opening Balance
function generateRef(id) {
    return `SA-${String(id).padStart(3, '0')}`; // SA-001
}


// Handle Submit Opening Balance
const piutangForm = document.getElementById('piutangForm');
if (piutangForm) {
    piutangForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const newId = openingReceivables.length > 0 ? Math.max(...openingReceivables.map(i => i.id)) + 1 : 1;

        const data = {
            id: newId,
            tanggal: document.getElementById('tanggalPiutang').value,
            namaPelanggan: document.getElementById('namaPelangganPiutang').value,
            keterangan: document.getElementById('keteranganPiutang').value,
            jumlahPiutang: parseFloat(document.getElementById('jumlahPiutang').value) || 0,
            dibayarPiutang: parseFloat(document.getElementById('dibayarPiutang').value) || 0
        };

        openingReceivables.push(data);
        localStorage.setItem('openingReceivables', JSON.stringify(openingReceivables));

        alert('Saldo awal piutang berhasil disimpan.');
        this.reset();

        // Reset Date
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
        document.getElementById('tanggalPiutang').value = `${dd}/${mm}/${yyyy}`;

        displayPiutang();
    });
}

// Delete Opening Receivable
function deleteOpeningReceivable(id) {
    if (confirm('Hapus saldo awal piutang ini?')) {
        const idx = openingReceivables.findIndex(i => i.id === id);
        if (idx !== -1) {
            openingReceivables.splice(idx, 1);
            localStorage.setItem('openingReceivables', JSON.stringify(openingReceivables));
            displayPiutang();
        }
    }
}


// Autocomplete for Piutang Form
const namaPelPiutang = document.getElementById('namaPelangganPiutang');
const suggPiutang = document.getElementById('customerSuggestionsPiutang');

if (namaPelPiutang && suggPiutang) {
    namaPelPiutang.addEventListener('input', function () {
        const val = this.value.toLowerCase();
        suggPiutang.innerHTML = '';

        const filtered = val.length > 0
            ? dataMasterCustomer.filter(c => c.nama.toLowerCase().includes(val))
            : dataMasterCustomer;

        if (filtered.length > 0) {
            filtered.forEach(c => {
                const item = document.createElement('div');
                item.className = 'suggestion-item';
                item.innerHTML = `<strong>${c.nama}</strong><br><small>${c.alamat}</small>`;
                item.onclick = function () {
                    namaPelPiutang.value = c.nama;
                    suggPiutang.style.display = 'none';
                };
                suggPiutang.appendChild(item);
            });
            suggPiutang.style.display = 'block';
        } else {
            suggPiutang.style.display = 'none';
        }
    });

    // Hide when clicking outside
    document.addEventListener('click', function (e) {
        if (e.target !== namaPelPiutang) {
            suggPiutang.style.display = 'none';
        }
    });

    // Focus show all
    namaPelPiutang.addEventListener('focus', function () {
        const event = new Event('input');
        this.dispatchEvent(event);
    });
}

// Filter Event Listeners
document.addEventListener('DOMContentLoaded', function () {
    const sInput = document.getElementById('searchPiutangInput');
    const sStatus = document.getElementById('statusPiutangFilter');
    const rBtn = document.getElementById('resetPiutangFilterBtn');

    if (sInput) sInput.addEventListener('input', displayPiutang);
    if (sStatus) sStatus.addEventListener('change', displayPiutang);
    if (rBtn) rBtn.addEventListener('click', function () {
        if (sInput) sInput.value = '';
        if (sStatus) sStatus.value = '';
        displayPiutang();
    });

    // Init Date for Piutang Form
    const tglP = document.getElementById('tanggalPiutang');
    if (tglP) {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
        tglP.value = `${dd}/${mm}/${yyyy}`;
    }
});

// === MODULE LAPORAN HUTANG ===

let openingPayables = JSON.parse(localStorage.getItem('openingPayables')) || [];

function displayHutang(dataToDisplay = null) {
    console.log("=== displayHutang: Function started ===");
    try {
        const tbodyDetail = document.getElementById('daftarHutangBody');
        const tbodyRekap = document.getElementById('rekapHutangTable') ? document.getElementById('rekapHutangBody') : null;

        // Ensure data arrays exist
        if (!Array.isArray(openingPayables)) {
            openingPayables = [];
        }
        if (typeof purchases === 'undefined' || !Array.isArray(purchases)) {
            // purchases handled globally
        }

        // 1. Combine Data: Opening Payables + Credit Purchases
        // Opening Payables
        const openings = openingPayables.map(item => ({
            id: item.id,
            source: 'Saldo Awal',
            ref: generateRefHutang(item.id),
            date: item.tanggal,
            supplier: item.namaSupplier,
            desc: item.keterangan || '-',
            total: parseFloat(item.jumlahHutang) || 0,
            paid: parseFloat(item.dibayarHutang) || 0,
            remaining: (parseFloat(item.jumlahHutang) || 0) - (parseFloat(item.dibayarHutang) || 0),
            status: ((parseFloat(item.jumlahHutang) || 0) - (parseFloat(item.dibayarHutang) || 0)) <= 0 ? 'Lunas' : 'Belum Lunas',
            raw: item,
            type: 'opening'
        }));

        // Credit Purchases
        const safePurchases = Array.isArray(purchases) ? purchases : [];
        const creditPurchases = safePurchases
            .filter(p => p.metodePembayaran === 'Kredit')
            .map(p => ({
                id: p.noFaktur,
                source: 'Pembelian',
                ref: p.noFaktur,
                date: p.tanggal,
                supplier: p.namaSupplier,
                desc: 'Pembelian Kredit',
                total: parseFloat(p.total) || 0,
                paid: parseFloat(p.uangMuka) || 0, // Using uangMuka as paid amount for purchases
                remaining: parseFloat(p.sisaPembayaran) || 0,
                status: parseFloat(p.sisaPembayaran) <= 0 ? 'Lunas' : 'Belum Lunas',
                raw: p,
                type: 'transaction'
            }));

        let allPayables = [...openings, ...creditPurchases];

        // Apply Filters
        const searchInput = document.getElementById('searchHutangInput');
        const statusFilter = document.getElementById('statusHutangFilter');
        const searchVal = searchInput ? searchInput.value.toLowerCase() : '';
        const statusVal = statusFilter ? statusFilter.value : '';

        if (searchVal || statusVal) {
            allPayables = allPayables.filter(p => {
                const matchSearch = (p.supplier && p.supplier.toLowerCase().includes(searchVal)) || (p.ref && p.ref.toLowerCase().includes(searchVal));
                const matchStatus = statusVal === '' || p.status === statusVal;
                return matchSearch && matchStatus;
            });
        }

        // 2. Render Daftar Detail Hutang
        if (tbodyDetail) {
            tbodyDetail.innerHTML = '';

            let totalHutang = 0;
            let totalDibayar = 0;
            let totalSisa = 0;

            if (allPayables.length === 0) {
                tbodyDetail.innerHTML = '<tr class="no-data"><td colspan="11">Belum ada data hutang</td></tr>';
            } else {
                allPayables.forEach((p, index) => {
                    totalHutang += p.total;
                    totalDibayar += p.paid;
                    totalSisa += p.remaining;

                    const row = tbodyDetail.insertRow();
                    let actionBtn = '';

                    if (p.type === 'opening') {
                        actionBtn = `<button class="btn-icon btn-delete" onclick="deleteOpeningPayable(${p.raw.id})" title="Hapus">Buang</button>`;
                    } else {
                        actionBtn = `<span style="color:#888; font-size: 0.8em;">Via Pembelian</span>`;
                    }

                    row.innerHTML = `
                        <td>${index + 1}</td>
                        <td>${p.date}</td>
                        <td>${p.source}</td>
                        <td>${p.ref}</td>
                        <td>${p.supplier}</td>
                        <td>${p.desc}</td>
                        <td class="rupiah">${formatRupiah(p.total)}</td>
                        <td class="rupiah">${formatRupiah(p.paid)}</td>
                        <td class="rupiah">${formatRupiah(p.remaining)}</td>
                        <td><span class="badge ${p.remaining <= 0 ? 'badge-success' : 'badge-warning'}">${p.status}</span></td>
                        <td class="text-center">${actionBtn}</td>
                    `;
                });
            }

            // Update Footer Totals
            const elTotalHutang = document.getElementById('totalHutangAll');
            const elTotalDibayar = document.getElementById('totalDibayarHutangAll');
            const elTotalSisa = document.getElementById('totalSisaHutangAll');

            if (elTotalHutang) elTotalHutang.textContent = formatRupiah(totalHutang);
            if (elTotalDibayar) elTotalDibayar.textContent = formatRupiah(totalDibayar);
            if (elTotalSisa) elTotalSisa.textContent = formatRupiah(totalSisa);

            // Update Grand Total Daftar Section
            const grandDaftarSec = document.getElementById('grandTotalDaftarHutangSection');
            if (grandDaftarSec) {
                document.getElementById('grandTotalDaftarHutang').textContent = formatRupiah(totalHutang);
                document.getElementById('grandTotalDaftarDibayarHutang').textContent = formatRupiah(totalDibayar);
                document.getElementById('grandTotalDaftarSisaHutang').textContent = formatRupiah(totalSisa);
                grandDaftarSec.style.display = 'block';
            }

        }

        // 3. Render Rekap Hutang per Supplier
        const supplierSummary = {};
        allPayables.forEach(p => {
            if (!p.supplier) return;
            if (!supplierSummary[p.supplier]) {
                supplierSummary[p.supplier] = {
                    name: p.supplier,
                    count: 0,
                    total: 0,
                    paid: 0,
                    remaining: 0
                };
            }
            supplierSummary[p.supplier].count++;
            supplierSummary[p.supplier].total += p.total;
            supplierSummary[p.supplier].paid += p.paid;
            supplierSummary[p.supplier].remaining += p.remaining;
        });

        const grandRekapSec = document.getElementById('grandTotalRekapHutangSection');
        if (tbodyRekap) {
            tbodyRekap.innerHTML = '';
            const summaries = Object.values(supplierSummary);

            if (summaries.length === 0) {
                tbodyRekap.innerHTML = '<tr class="no-data"><td colspan="7">Belum ada data</td></tr>';
                if (grandRekapSec) grandRekapSec.style.display = 'none';
            } else {
                let totalRekapHutang = 0;
                let totalRekapDibayar = 0;
                let totalRekapSisa = 0;

                summaries.forEach((s, index) => {
                    totalRekapHutang += s.total;
                    totalRekapDibayar += s.paid;
                    totalRekapSisa += s.remaining;

                    const status = s.remaining <= 0 ? 'Lunas' : 'Belum Lunas';
                    const row = tbodyRekap.insertRow();
                    row.innerHTML = `
                        <td>${index + 1}</td>
                        <td>${s.name}</td>
                        <td class="text-center">${s.count}</td>
                        <td class="rupiah">${formatRupiah(s.total)}</td>
                        <td class="rupiah">${formatRupiah(s.paid)}</td>
                        <td class="rupiah">${formatRupiah(s.remaining)}</td>
                        <td><span class="badge ${s.remaining <= 0 ? 'badge-success' : 'badge-warning'}">${status}</span></td>
                    `;
                });

                // Update Grand Total Rekap Section
                if (grandRekapSec) {
                    document.getElementById('grandTotalRekapHutang').textContent = formatRupiah(totalRekapHutang);
                    document.getElementById('grandTotalRekapDibayarHutang').textContent = formatRupiah(totalRekapDibayar);
                    document.getElementById('grandTotalRekapSisaHutang').textContent = formatRupiah(totalRekapSisa);
                    grandRekapSec.style.display = 'block';
                }
            }
        }

        // Force visibility check (similar to piutang fix)
        const moduleContainer = document.getElementById('hutangModule');
        if (moduleContainer && moduleContainer.classList.contains('active')) {
            if (moduleContainer.style.display === 'none') {
                moduleContainer.style.display = 'block';
            }
        }

    } catch (e) {
        console.error('Error in displayHutang:', e);
        alert('Terjadi kesalahan saat menampilkan data hutang: ' + e.message);
    }
}

function generateRefHutang(id) {
    return `SA-HUT-${String(id).padStart(3, '0')}`;
}

// Handle Submit Opening Payable
const hutangForm = document.getElementById('hutangForm');
if (hutangForm) {
    hutangForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const newId = openingPayables.length > 0 ? Math.max(...openingPayables.map(i => i.id)) + 1 : 1;

        const data = {
            id: newId,
            tanggal: document.getElementById('tanggalHutang').value,
            namaSupplier: document.getElementById('namaSupplierHutang').value,
            keterangan: document.getElementById('keteranganHutang').value,
            jumlahHutang: parseFloat(document.getElementById('jumlahHutang').value) || 0,
            dibayarHutang: parseFloat(document.getElementById('dibayarHutang').value) || 0
        };

        openingPayables.push(data);
        localStorage.setItem('openingPayables', JSON.stringify(openingPayables));

        alert('Saldo awal hutang berhasil disimpan.');
        this.reset();

        // Reset Date
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
        document.getElementById('tanggalHutang').value = `${dd}/${mm}/${yyyy}`;

        displayHutang();
    });
}

// Delete Opening Payable
function deleteOpeningPayable(id) {
    if (confirm('Hapus saldo awal hutang ini?')) {
        const idx = openingPayables.findIndex(i => i.id === id);
        if (idx !== -1) {
            openingPayables.splice(idx, 1);
            localStorage.setItem('openingPayables', JSON.stringify(openingPayables));
            displayHutang();
        }
    }
}

// Autocomplete for Hutang Supplier
const namaSupHutang = document.getElementById('namaSupplierHutang');
const suggHutang = document.getElementById('supplierSuggestionsHutang');

if (namaSupHutang && suggHutang) {
    namaSupHutang.addEventListener('input', function () {
        const val = this.value.toLowerCase();
        suggHutang.innerHTML = '';

        const filtered = val.length > 0
            ? dataMasterSupplier.filter(s => s.nama.toLowerCase().includes(val))
            : dataMasterSupplier;

        if (filtered.length > 0) {
            filtered.forEach(s => {
                const item = document.createElement('div');
                item.className = 'suggestion-item';
                item.innerHTML = `<strong>${s.nama}</strong><br><small>${s.alamat}</small>`;
                item.onclick = function () {
                    namaSupHutang.value = s.nama;
                    suggHutang.style.display = 'none';
                };
                suggHutang.appendChild(item);
            });
            suggHutang.style.display = 'block';
        } else {
            suggHutang.style.display = 'none';
        }
    });

    document.addEventListener('click', function (e) {
        if (e.target !== namaSupHutang) {
            suggHutang.style.display = 'none';
        }
    });

    namaSupHutang.addEventListener('focus', function () {
        const event = new Event('input');
        this.dispatchEvent(event);
    });
}

// Filter Event Listeners for Hutang
document.addEventListener('DOMContentLoaded', function () {
    const sInput = document.getElementById('searchHutangInput');
    const sStatus = document.getElementById('statusHutangFilter');
    const rBtn = document.getElementById('resetHutangFilterBtn');

    if (sInput) sInput.addEventListener('input', displayHutang);
    if (sStatus) sStatus.addEventListener('change', displayHutang);
    if (rBtn) rBtn.addEventListener('click', function () {
        if (sInput) sInput.value = '';
        if (sStatus) sStatus.value = '';
        displayHutang();
    });

    // Init Date for Hutang Form
    const tglH = document.getElementById('tanggalHutang');
    if (tglH) {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
        tglH.value = `${dd}/${mm}/${yyyy}`;
    }
});

// === INITIALIZATION ON PAGE LOAD ===
// Ensure all tabs are properly initialized when the page loads
window.addEventListener('load', function () {
    console.log('Page loaded, initializing application...');

    // Initialize default view (Penjualan tab)
    const penjualanModule = document.getElementById('penjualanModule');
    if (penjualanModule) {
        penjualanModule.classList.add('active');
        penjualanModule.style.display = 'block';
    }

    // Load initial data for penjualan
    if (typeof displayTransactions === 'function') {
        displayTransactions();
    }

    // Make sure piutang module is ready (but hidden initially)
    const piutangModule = document.getElementById('piutangModule');
    if (piutangModule) {
        console.log('Piutang module found in DOM');
        piutangModule.classList.remove('active');
        piutangModule.style.display = 'none';
    } else {
        console.error('Piutang module NOT found in DOM!');
    }

    // Make sure pembelian module is ready (but hidden initially)
    const pembelianModule = document.getElementById('pembelianModule');
    if (pembelianModule) {
        pembelianModule.classList.remove('active');
        pembelianModule.style.display = 'none';
    }

    // Make sure hutang module is ready (but hidden initially)
    const hutangModule = document.getElementById('hutangModule');
    if (hutangModule) {
        hutangModule.classList.remove('active');
        hutangModule.style.display = 'none';
    }

    // Make sure kas module is ready (but hidden initially)
    const kasModule = document.getElementById('kasModule');
    if (kasModule) {
        kasModule.classList.remove('active');
        kasModule.style.display = 'none';

        // Also init data view if user switches to it later, but here we just ensure state
    }

    // Make sure jurnal module is ready (but hidden initially)
    const jurnalModule = document.getElementById('jurnalModule');
    if (jurnalModule) {
        jurnalModule.classList.remove('active');
        jurnalModule.style.display = 'none';
    }



    // Make sure bukubesar module is ready (but hidden initially)
    const bukuBesarModule = document.getElementById('bukubesarModule');
    if (bukuBesarModule) {
        bukuBesarModule.classList.remove('active');
        bukuBesarModule.style.display = 'none';
    }

    // Make sure labarugi module is ready (but hidden initially)
    const labaRugiModule = document.getElementById('labarugiModule');
    if (labaRugiModule) {
        labaRugiModule.classList.remove('active');
        labaRugiModule.style.display = 'none';
    }

    // Make sure laporandivisi module is ready (but hidden initially)
    const laporandivisiModule = document.getElementById('laporandivisiModule');
    if (laporandivisiModule) {
        laporandivisiModule.classList.remove('active');
        laporandivisiModule.style.display = 'none';
    }

    // Make sure laporanppn module is ready (but hidden initially)
    const laporanppnModule = document.getElementById('laporanppnModule');
    if (laporanppnModule) {
        laporanppnModule.classList.remove('active');
        laporanppnModule.style.display = 'none';
    }

    // Initialize Global Search Input Listener
    const inputGlobalSearch = document.getElementById('inputGlobalSearch');
    if (inputGlobalSearch) {
        inputGlobalSearch.addEventListener('input', (e) => {
            performGlobalSearch(e.target.value);
        });
    }

    // Print Modal Controls
    const printModal = document.getElementById('printModal');
    const closeModal = document.querySelector('.close-modal');

    if (closeModal) {
        closeModal.onclick = function () {
            printModal.style.display = 'none';
        };
    }

    window.onclick = function (event) {
        if (event.target == printModal) {
            printModal.style.display = 'none';
        }
    };

    // Modal Button Handlers
    const btnPrintStandard = document.getElementById('btnPrintStandard');
    const btnPrintDotMatrix = document.getElementById('btnPrintDotMatrix');

    if (btnPrintStandard) {
        btnPrintStandard.onclick = function () {
            if (currentPrintType === 'sales') {
                printStandard(currentPrintIndex);
            } else if (currentPrintType === 'purchase') {
                printStandardPurchase(currentPrintIndex);
            }
            printModal.style.display = 'none';
        };
    }

    if (btnPrintDotMatrix) {
        btnPrintDotMatrix.onclick = function () {
            if (currentPrintType === 'sales') {
                printDotMatrix(currentPrintIndex);
            } else if (currentPrintType === 'purchase') {
                printDotMatrixPurchase(currentPrintIndex);
            }
            printModal.style.display = 'none';
        };
    }

    console.log('Application initialized successfully');
});


// === LAPORAN PRINT & EXPORT UTILITIES ===

// Generic Print Table Function
function printTable(title, tableId) {
    const table = document.getElementById(tableId);
    if (!table) {
        alert('Tabel tidak ditemukan!');
        return;
    }

    // Clone table to modify or just use outerHTML
    const tableHtml = table.outerHTML;

    // Current Date
    const currentDate = new Date();
    const dateStr = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()} ${currentDate.getHours()}:${String(currentDate.getMinutes()).padStart(2, '0')}`;

    const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>${title}</title>
            <style>
                @page { size: A4 landscape; margin: 1cm; }
                body { font-family: Arial, sans-serif; font-size: 10pt; color: #333; }
                .header { text-align: center; margin-bottom: 20px; padding-bottom: 15px; border-bottom: 2px solid #333; }
                .logo { height: 60px; margin-bottom: 10px; }
                .company-name { font-weight: bold; font-size: 16pt; margin-bottom: 5px; }
                h2 { text-align: center; margin: 15px 0 5px 0; }
                .meta { text-align: center; font-size: 9pt; color: #666; margin-bottom: 20px; }
                table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
                table, th, td { border: 1px solid #999; }
                th { background-color: #f2f2f2; padding: 8px; font-weight: bold; text-align: center; }
                td { padding: 6px; vertical-align: middle; }
                .text-center { text-align: center; }
                .text-right { text-align: right; }
                .badge { border: 1px solid #ccc; padding: 2px 5px; border-radius: 4px; font-size: 8pt; }
                th:last-child, td:last-child { display: none; }
            </style>
        </head>
        <body>
            <div class="header">
                <img src="logo.png" alt="SGM Logo" class="logo">
                <div class="company-name">PT. SUMBER GANDA MEKAR</div>
            </div>
            <h2>${title}</h2>
            <div class="meta">Dicetak pada: ${dateStr}</div>
            ${tableHtml}
        </body>
        </html>
    `;

    printToIframe(htmlContent);
}

// Generic Export to Excel (CSV)
function exportTableToExcel(filename, tableId) {
    const table = document.getElementById(tableId);
    if (!table) {
        alert('Tabel tidak ditemukan!');
        return;
    }

    let csv = [];
    const rows = table.querySelectorAll('tr');

    for (let i = 0; i < rows.length; i++) {
        let row = [], cols = rows[i].querySelectorAll('td, th');

        // Skip last column (Aksi)
        for (let j = 0; j < cols.length - 1; j++) {
            // Get text and clean it
            let data = cols[j].innerText.replace(/(\r\n|\n|\r)/gm, '').replace(/(\s\s)/gm, ' ');
            data = data.replace(/"/g, '""'); // Escape double quotes
            row.push('"' + data + '"');
        }
        csv.push(row.join(','));
    }

    const csvFile = new Blob([csv.join('\n')], { type: 'text/csv' });
    const downloadLink = document.createElement('a');
    downloadLink.download = filename + '.csv';
    downloadLink.href = window.URL.createObjectURL(csvFile);
    downloadLink.style.display = 'none';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}

// === Specific Report Handlers ===

// 1. Piutang Functions
function printRekapPiutang() {
    printTable('Rekap Piutang per Pelanggan', 'rekapPiutangTable');
}

function printDetailPiutang() {
    printTable('Laporan Detail Piutang', 'daftarPiutangTable');
}

function exportDetailPiutang() {
    // Generate filename with date
    const today = new Date();
    const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    exportTableToExcel(`Laporan_Piutang_${dateStr}`, 'daftarPiutangTable');
}

// 2. Hutang Functions
function printRekapHutang() {
    printTable('Rekap Hutang per Supplier', 'rekapHutangTable');
}

function printDetailHutang() {
    printTable('Laporan Detail Hutang', 'daftarHutangTable');
}

function exportDetailHutang() {
    const today = new Date();
    const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    exportTableToExcel(`Laporan_Hutang_${dateStr}`, 'daftarHutangTable');
}
// 3. Kas Functions
function printLaporanKas() {
    printTable('Laporan Transaksi Kas', 'kasTable');
}

function exportExcelKas() {
    const today = new Date();
    const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    exportTableToExcel(`Laporan_Kas_Harian_${dateStr}`, 'kasTable');
}

// === MODULE TRANSAKSI KAS ===

// Data Transaksi Kas
let cashTransactions = JSON.parse(localStorage.getItem('cashTransactions')) || [];

// Kategori Options
const kategoriKasMasuk = [
    "Penjualan Tunai",
    "Pelunasan Piutang",
    "Pinjaman",
    "Pendapatan Lain",
    "Bunga Bank",
    "Lainnya"
];

const kategoriKasKeluar = [
    "Biaya Operasional",
    "Gaji Karyawan",
    "Pembelian Tunai",
    "Pembayaran Hutang",
    "Prive",
    "Lainnya"
];

// Update Kategori Dropdown based on Type
// NOW SEPARATE
function updateKategoriKasForms() {
    const selectMasuk = document.getElementById('kategoriKasMasuk');
    const selectKeluar = document.getElementById('kategoriKasKeluar');

    if (selectMasuk) {
        selectMasuk.innerHTML = '';
        kategoriKasMasuk.forEach(opt => {
            const el = document.createElement('option');
            el.value = opt;
            el.textContent = opt;
            selectMasuk.appendChild(el);
        });
    }

    if (selectKeluar) {
        selectKeluar.innerHTML = '';
        kategoriKasKeluar.forEach(opt => {
            const el = document.createElement('option');
            el.value = opt;
            el.textContent = opt;
            selectKeluar.appendChild(el);
        });
    }
}

// Initialize Kas Form
document.addEventListener('DOMContentLoaded', function () {
    // Initial category population
    updateKategoriKasForms();

    // Set Date to Today for both inputs
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    const dateStr = `${dd}/${mm}/${yyyy}`;

    const dateIn = document.getElementById('tanggalKasMasuk');
    if (dateIn) dateIn.value = dateStr;

    const dateOut = document.getElementById('tanggalKasKeluar');
    if (dateOut) dateOut.value = dateStr;
});

// Generic Submission Handler for Kas
function handleKasSubmission(e, formId) {
    e.preventDefault();

    const form = document.getElementById(formId);
    if (!form) return;

    // Get suffix based on form ID
    const suffix = formId === 'formKasMasuk' ? 'Masuk' : 'Keluar';

    const jenis = document.querySelector(`#${formId} input[name="jenis"]`).value;
    const tanggal = document.getElementById(`tanggalKas${suffix}`).value;
    const divisi = document.getElementById(`divisiKas${suffix}`).value;
    const kategori = document.getElementById(`kategoriKas${suffix}`).value;
    const keterangan = document.getElementById(`keteranganKas${suffix}`).value;
    const jumlah = parseFloat(document.getElementById(`jumlahKas${suffix}`).value) || 0;

    if (jumlah <= 0) {
        alert('Jumlah harus lebih dari 0');
        return;
    }

    // Generate ID / Ref automatically
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const prefix = jenis === 'Masuk' ? 'BKM' : 'BKK';

    // Count for today to make unique ref
    const dailyCount = cashTransactions.filter(t => t.createdDate === `${yyyy}-${mm}-${dd}`).length + 1;
    const ref = `${prefix}-${yyyy}${mm}${dd}-${String(dailyCount).padStart(3, '0')}`;

    const newTx = {
        id: Date.now(),
        createdDate: `${yyyy}-${mm}-${dd}`,
        jenis,
        tanggal,
        ref,
        divisi,
        kategori,
        keterangan,
        jumlah
    };

    cashTransactions.push(newTx);
    localStorage.setItem('cashTransactions', JSON.stringify(cashTransactions));

    // Confirm Print
    if (confirm('Transaksi berhasil disimpan! Apakah anda ingin mencetak bukti transaksi?')) {
        printBuktiKas(newTx);
    }

    form.reset();

    // Reset defaults
    const dateInput = document.getElementById(`tanggalKas${suffix}`);
    if (dateInput) dateInput.value = `${dd}/${mm}/${yyyy}`;

    displayKas();
}

// Attach Listeners
const formMasuk = document.getElementById('formKasMasuk');
if (formMasuk) {
    formMasuk.addEventListener('submit', function (e) {
        handleKasSubmission(e, 'formKasMasuk');
    });
}

const formKeluar = document.getElementById('formKasKeluar');
if (formKeluar) {
    formKeluar.addEventListener('submit', function (e) {
        handleKasSubmission(e, 'formKasKeluar');
    });
}

// Function to Print Bukti Kas (Individual)
function printBuktiKas(txOrId) {
    let transaction;
    if (typeof txOrId === 'object') {
        transaction = txOrId;
    } else {
        transaction = cashTransactions.find(t => t.id === txOrId);
    }

    if (!transaction) {
        alert('Data transaksi tidak ditemukan');
        return;
    }

    const t = transaction;
    const title = t.jenis === 'Masuk' ? 'BUKTI KAS MASUK' : 'BUKTI KAS KELUAR';
    const color = t.jenis === 'Masuk' ? '#2e7d32' : '#c62828';

    // Simple Receipt Format
    const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>${title} - ${t.ref}</title>
            <style>
                @page { size: A5 landscape; margin: 1cm; }
                body { font-family: 'Courier New', Courier, monospace; font-size: 10pt; color: #000; }
                .border-box { border: 2px solid ${color}; padding: 20px; border-radius: 10px; position: relative; }
                .header { text-align: center; font-weight: bold; margin-bottom: 20px; border-bottom: 1px dashed #999; padding-bottom: 10px; }
                .company { font-size: 12pt; margin-bottom: 5px; }
                .ref { position: absolute; top: 20px; right: 20px; font-weight: bold; font-family: Arial, sans-serif; }
                .row { display: flex; margin-bottom: 8px; }
                .label { width: 120px; font-weight: bold; }
                .val { flex: 1; }
                .amount-box { margin-top: 20px; padding: 10px; border: 2px dashed ${color}; text-align: center; font-size: 14pt; font-weight: bold; }
                .footer { margin-top: 40px; display: flex; justify-content: space-between; padding: 0 50px; }
                .sign { text-align: center; width: 150px; }
                .sign-line { margin-top: 60px; border-bottom: 1px solid #000; }
            </style>
        </head>
        <body>
            <div class="border-box">
                <div class="header">
                    <div class="company">PT. SUMBER GANDA MEKAR</div>
                    <div style="font-size: 14pt; color: ${color};">${title}</div>
                </div>
                <div class="ref">${t.ref}</div>
                
                <div class="row">
                    <div class="label">Tanggal</div>
                    <div class="val">: ${t.tanggal}</div>
                </div>
                <div class="row">
                    <div class="label">Divisi</div>
                    <div class="val">: ${t.divisi}</div>
                </div>
                 <div class="row">
                    <div class="label">Kategori</div>
                    <div class="val">: ${t.kategori}</div>
                </div>
                <div class="row">
                    <div class="label">Keterangan</div>
                    <div class="val">: ${t.keterangan}</div>
                </div>
                
                <div class="amount-box">
                    ${formatRupiah(t.jumlah)}
                    <div style="font-size: 9pt; font-weight: normal; margin-top: 5px; font-style: italic;">
                        (${terbilangRupiah(t.jumlah)})
                    </div>
                </div>

                <div class="footer">
                    <div class="sign">
                        Disetujui Oleh,
                        <div class="sign-line"></div>
                    </div>
                     <div class="sign">
                        ${t.jenis === 'Masuk' ? 'Diterima Oleh' : 'Dibayar Oleh'},
                        <div class="sign-line"></div>
                    </div>
                </div>
            </div>
        </body>
        </html>
    `;

    printToIframe(htmlContent);
}

// Display Kas Table
function displayKas(data = null) {
    const list = data || cashTransactions;
    const tbody = document.getElementById('kasBody');
    const totalMasukEl = document.getElementById('totalKasMasuk');
    const totalKeluarEl = document.getElementById('totalKasKeluar');
    const saldoAkhirEl = document.getElementById('saldoAkhirKas');

    if (!tbody) return;

    tbody.innerHTML = '';

    let totalMasuk = 0;
    let totalKeluar = 0;

    // Filter by Search/Date if not passed directly? 
    // Actually the logic commonly passes filtered data or defaults to all.
    // We should respect the filter inputs if data is null, or just re-run filter?
    // Let's assume data passed is what we want to render.

    if (list.length === 0) {
        tbody.innerHTML = '<tr class="no-data"><td colspan="10">Belum ada transaksi kas</td></tr>';
    } else {
        // Sort by newest first ? Or by ID? Usually by Date.
        // Let's sort simply by reverse index (newest added first) or by date.
        // We will display as is (order of entry) or reversed. Let's do newest top.
        // Make a copy to sort
        const sortedList = [...list].sort((a, b) => b.id - a.id);

        sortedList.forEach((t, index) => {
            const isMasuk = t.jenis === 'Masuk';
            const masuk = isMasuk ? t.jumlah : 0;
            const keluar = !isMasuk ? t.jumlah : 0;

            totalMasuk += masuk;
            totalKeluar += keluar;

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${t.tanggal}</td>
                <td>${t.ref}</td>
                <td><span class="badge ${isMasuk ? 'badge-success' : 'badge-danger'}">${t.jenis}</span></td>
                <td>${t.divisi}</td>
                <td>${t.kategori}</td>
                <td>${t.keterangan}</td>
                <td class="text-right">${masuk > 0 ? formatRupiah(masuk) : '-'}</td>
                <td class="text-right">${keluar > 0 ? formatRupiah(keluar) : '-'}</td>
                <td class="text-center">
                    <button class="btn-icon btn-print" onclick="printBuktiKas(${t.id})" title="Cetak Bukti">🖨️</button>
                    <button class="btn-icon btn-delete" onclick="deleteKas(${t.id})" title="Hapus">X</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    // Totals need to be calculated based on the VIEWED list or ALL list?
    // Usually totals at footer depend on specific use case. If filtering, total of filtered items.
    // If we want SALDO AKHIR, that usually implies ALL HISTORY up to this point, but in simple view, 
    // user might expect total of what is shown.
    // Let's show total of displayed items.

    if (totalMasukEl) totalMasukEl.textContent = formatRupiah(totalMasuk);
    if (totalKeluarEl) totalKeluarEl.textContent = formatRupiah(totalKeluar);
    if (saldoAkhirEl) {
        const saldo = totalMasuk - totalKeluar;
        saldoAkhirEl.textContent = formatRupiah(saldo);
        saldoAkhirEl.style.color = saldo >= 0 ? 'green' : 'red';
    }
}

// Delete Kas
function deleteKas(id) {
    if (confirm('Apakah Anda yakin ingin menghapus transaksi ini?')) {
        const idx = cashTransactions.findIndex(t => t.id === id);
        if (idx !== -1) {
            cashTransactions.splice(idx, 1);
            localStorage.setItem('cashTransactions', JSON.stringify(cashTransactions));
            displayKas(); // Refresh
        }
    }
}

// Filter Logic for Kas
document.addEventListener('DOMContentLoaded', function () {
    const sInput = document.getElementById('searchKasInput');
    const sStart = document.getElementById('startKasDate');
    const sEnd = document.getElementById('endKasDate');
    const sType = document.getElementById('filterJenisKas');
    const rBtn = document.getElementById('resetKasFilterBtn');

    if (sInput && sStart && sEnd && sType && rBtn) {
        function filterKas() {
            const term = sInput.value.toLowerCase();
            const start = sStart.value; // yyyy-mm-dd
            const end = sEnd.value;     // yyyy-mm-dd
            const type = sType.value;

            const filtered = cashTransactions.filter(t => {
                // Check Type
                if (type && t.jenis !== type) return false;

                // Check Search (Ref or Keterangan or Divisi or Kategori)
                const searchMatch = (
                    t.ref.toLowerCase().includes(term) ||
                    t.keterangan.toLowerCase().includes(term) ||
                    t.divisi.toLowerCase().includes(term) ||
                    t.kategori.toLowerCase().includes(term)
                );
                if (!searchMatch) return false;

                // Check Date
                // t.tanggal is DD/MM/YYYY
                // start/end is YYYY-MM-DD
                if (start || end) {
                    const parts = t.tanggal.split('/');
                    // Date(yyyy, mm-1, dd)
                    const tDate = new Date(parts[2], parts[1] - 1, parts[0]);
                    tDate.setHours(0, 0, 0, 0);

                    if (start) {
                        const sDate = new Date(start);
                        sDate.setHours(0, 0, 0, 0);
                        if (tDate < sDate) return false;
                    }
                    if (end) {
                        const eDate = new Date(end);
                        eDate.setHours(0, 0, 0, 0);
                        if (tDate > eDate) return false;
                    }
                }

                return true;
            });

            displayKas(filtered);
        }

        sInput.addEventListener('input', filterKas);
        sStart.addEventListener('change', filterKas);
        sEnd.addEventListener('change', filterKas);
        sType.addEventListener('change', filterKas);

        rBtn.addEventListener('click', () => {
            sInput.value = '';
            sStart.value = '';
            sEnd.value = '';
            sType.value = '';
            displayKas(); // Show all
        });
    }
});

// Init Kas Module visibility helper (called in window load above but good to ensure)
// Added in switchTab
// 4. Jurnal Functions
function printJurnal() {
    printTable('Laporan Jurnal Umum', 'jurnalTable');
}

function exportExcelJurnal() {
    const today = new Date();
    const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    exportTableToExcel(`Laporan_Jurnal_Umum_${dateStr}`, 'jurnalTable');
}

// === MODULE JURNAL UMUM ===

// Data Aggregation for Jurnal
function getUnifiedJournalData() {
    let journalEntries = [];
    let counter = 1;

    // 1. Process Sales (Penjualan)
    // Assumption: 
    // - Cash Sale: Dr Kas, Cr Penjualan
    // - Credit Sale: Dr Piutang Dagang, Cr Penjualan
    if (typeof transactions !== 'undefined') {
        transactions.forEach(t => {
            const isCash = (!t.jatuhTempo); // Simple logic: if no due date or payment type check
            // Actually transactions usually have 'caraBayar' or similar, let's assume standard logic based entirely on existing struct
            // If t.kurangBayar > 0 -> Credit portion. But usually t is a simplified invoice.
            // Let's assume all are valid.

            // Note: We need to parse date DD/MM/YYYY to sorts

            // Debit Side
            journalEntries.push({
                type: 'SALE',
                date: t.tanggal,
                ref: t.noFaktur,
                desc: 'Penjualan ke ' + t.namaPelanggan,
                account: t.sisaTagihan > 0 ? 'Piutang Usaha' : 'Kas',
                debit: parseFloat(t.grandTotal) || 0,
                credit: 0,
                division: 'Umum'
            });

            // Credit Side
            journalEntries.push({
                type: 'SALE',
                date: t.tanggal,
                ref: t.noFaktur,
                desc: 'Penjualan Barang',
                account: 'Penjualan',
                debit: 0,
                credit: parseFloat(t.grandTotal) || 0,
                division: 'Umum'
            });
        });
    }

    // 2. Process Purchases (Pembelian)
    if (typeof purchases !== 'undefined') {
        purchases.forEach(p => {
            // Debit Side
            journalEntries.push({
                type: 'PURCHASE',
                date: p.tanggal,
                ref: p.noFaktur,
                desc: 'Pembelian dari ' + p.supplier,
                account: 'Pembelian',
                debit: parseFloat(p.grandTotal) || 0,
                credit: 0,
                division: 'Umum'
            });

            // Credit Side
            journalEntries.push({
                type: 'PURCHASE',
                date: p.tanggal,
                ref: p.noFaktur,
                desc: 'Pembelian Barang',
                account: p.sisaTagihan > 0 ? 'Hutang Usaha' : 'Kas',
                debit: 0,
                credit: parseFloat(p.grandTotal) || 0,
                division: 'Umum'
            });
        });
    }

    // 3. Process Cash Transactions (Masuk/Keluar)
    if (typeof cashTransactions !== 'undefined') {
        cashTransactions.forEach(c => {
            const amount = parseFloat(c.jumlah) || 0;
            if (c.jenis === 'Masuk') {
                // Dr Kas, Cr [Category]
                // Debit
                journalEntries.push({
                    type: 'CASH_IN',
                    date: c.tanggal,
                    ref: c.ref,
                    desc: c.keterangan,
                    account: 'Kas',
                    debit: amount,
                    credit: 0,
                    division: c.divisi || 'Umum'
                });
                // Credit
                journalEntries.push({
                    type: 'CASH_IN',
                    date: c.tanggal,
                    ref: c.ref,
                    desc: c.divisi + ' - ' + c.keterangan,
                    account: c.kategori,
                    debit: 0,
                    credit: amount,
                    division: c.divisi || 'Umum'
                });
            } else {
                // Dr [Category], Cr Kas
                // Debit
                journalEntries.push({
                    type: 'CASH_OUT',
                    date: c.tanggal,
                    ref: c.ref,
                    desc: c.divisi + ' - ' + c.keterangan,
                    account: c.kategori,
                    debit: amount,
                    credit: 0,
                    division: c.divisi || 'Umum'
                });
                // Credit
                journalEntries.push({
                    type: 'CASH_OUT',
                    date: c.tanggal,
                    ref: c.ref,
                    desc: c.keterangan,
                    account: 'Kas',
                    debit: 0,
                    credit: amount,
                    division: c.divisi || 'Umum'
                });
            }
        });
    }

    // Sort by Date
    // Helper to parse DD/MM/YYYY
    function parseDate(dStr) {
        if (!dStr) return new Date(0);
        const parts = dStr.split('/');
        return new Date(parts[2], parts[1] - 1, parts[0]);
    }

    journalEntries.sort((a, b) => parseDate(a.date) - parseDate(b.date));

    // Assign IDs for list
    return journalEntries.map((e, idx) => ({ ...e, id: idx + 1 }));
}

function displayJurnal(forcedData = null) {
    const list = forcedData || getUnifiedJournalData();
    const tbody = document.getElementById('jurnalBody');
    const tDebit = document.getElementById('totalDebitJurnal');
    const tKredit = document.getElementById('totalKreditJurnal');
    const tBalance = document.getElementById('jurnalBalanceCheck');

    if (!tbody) return;

    tbody.innerHTML = '';

    let totalDebit = 0;
    let totalKredit = 0;

    if (list.length === 0) {
        tbody.innerHTML = '<tr class="no-data"><td colspan="7">Belum ada data jurnal</td></tr>';
    } else {
        list.forEach((item, index) => {
            totalDebit += item.debit;
            totalKredit += item.credit;

            const isRefRow = (index > 0 && item.ref !== list[index - 1].ref); // Maybe add separator?

            const row = document.createElement('tr');
            // Visual helper: Debit usually left aligned, Credit indented
            // But here we have specific columns.

            row.innerHTML = `
                <td>${item.id}</td>
                <td>${item.date}</td>
                <td>${item.ref}</td>
                <td>${item.desc}</td>
                <td>${item.account}</td>
                <td class="text-right">${item.debit > 0 ? formatRupiah(item.debit) : '-'}</td>
                <td class="text-right">${item.credit > 0 ? formatRupiah(item.credit) : '-'}</td>
            `;
            tbody.appendChild(row);
        });
    }

    if (tDebit) tDebit.textContent = formatRupiah(totalDebit);
    if (tKredit) tKredit.textContent = formatRupiah(totalKredit);

    if (tBalance) {
        const diff = totalDebit - totalKredit;
        if (Math.abs(diff) < 100) { // Tolerance for float
            tBalance.textContent = "SEIMBANG (Balance)";
            tBalance.style.color = "green";
        } else {
            tBalance.textContent = "TIDAK SEIMBANG! Selisih: " + formatRupiah(diff);
            tBalance.style.color = "red";
        }
    }
}

// Filter Logic for Jurnal
document.addEventListener('DOMContentLoaded', function () {
    const sInput = document.getElementById('searchJurnalInput');
    const sStart = document.getElementById('startJurnalDate');
    const sEnd = document.getElementById('endJurnalDate');
    const rBtn = document.getElementById('resetJurnalFilterBtn');

    if (sInput && sStart && sEnd && rBtn) {
        function filterJurnal() {
            const rawData = getUnifiedJournalData();
            const term = sInput.value.toLowerCase();
            const start = sStart.value;
            const end = sEnd.value;

            const filtered = rawData.filter(t => {
                const searchMatch = (
                    t.ref.toLowerCase().includes(term) ||
                    t.desc.toLowerCase().includes(term) ||
                    t.account.toLowerCase().includes(term)
                );
                if (!searchMatch) return false;

                if (start || end) {
                    const parts = t.date.split('/');
                    const tDate = new Date(parts[2], parts[1] - 1, parts[0]);
                    tDate.setHours(0, 0, 0, 0);

                    if (start) {
                        const sDate = new Date(start);
                        sDate.setHours(0, 0, 0, 0);
                        if (tDate < sDate) return false;
                    }
                    if (end) {
                        const eDate = new Date(end);
                        eDate.setHours(0, 0, 0, 0);
                        if (tDate > eDate) return false;
                    }
                }
                return true;
            });

            displayJurnal(filtered);
        }

        sInput.addEventListener('input', filterJurnal);
        sStart.addEventListener('change', filterJurnal);
        sEnd.addEventListener('change', filterJurnal);

        rBtn.addEventListener('click', () => {
            sInput.value = '';
            sStart.value = '';
            sEnd.value = '';
            displayJurnal();
        });
    }
});

// 5. Buku Besar Functions
function printBukuBesar() {
    printTable('Laporan Buku Besar', 'bukuBesarTable');
}

function exportExcelBukuBesar() {
    const acc = document.getElementById('filterAkunBB').value || 'Semua_Akun';
    const today = new Date();
    const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    exportTableToExcel(`Buku_Besar_${acc}_${dateStr}`, 'bukuBesarTable');
}

// === MODULE BUKU BESAR ===

function displayBukuBesar() {
    const selectedAccount = document.getElementById('filterAkunBB').value;
    const startDate = document.getElementById('startBBDate').value; // yyyy-mm-dd
    const endDate = document.getElementById('endBBDate').value;     // yyyy-mm-dd
    const tbody = document.getElementById('bukuBesarBody');
    const tDebit = document.getElementById('totalDebitBB');
    const tKredit = document.getElementById('totalKreditBB');

    if (!tbody) return;

    tbody.innerHTML = '';

    // If no account selected, prompt user (unless they want 'Semua Accounts' mixed? Usually Ledger is per account.
    // The requirement says "pilih akun (Semua akun, ...), ... lalu tabel jika sudah memilih akun". 
    // If "Semua Akun" selected, maybe group by account? Or just list all?
    // Let's list all sorted by date if "Semua Akun".

    // Normal Balance Map (Key: Account Name substring or exact)
    // Debit Normal: Kas, Piutang, Persediaan, Pembelian, HPP, PPN Masukan, Biaya, Beban
    // Credit Normal: Hutang, Penjualan, PPN Keluaran, Pendapatan

    // Helper to detect type
    function isCreditNormal(accName) {
        const lower = accName.toLowerCase();
        return (
            lower.includes('hutang') ||
            lower.includes('penjualan') ||
            lower.includes('ppn keluaran') ||
            lower.includes('pendapatan')
        );
    }

    let rawData = getUnifiedJournalData();

    // Filter by Date
    if (startDate || endDate) {
        rawData = rawData.filter(t => {
            const parts = t.date.split('/');
            const tDate = new Date(parts[2], parts[1] - 1, parts[0]);
            tDate.setHours(0, 0, 0, 0);

            if (startDate) {
                const sDate = new Date(startDate);
                sDate.setHours(0, 0, 0, 0);
                if (tDate < sDate) return false;
            }
            if (endDate) {
                const eDate = new Date(endDate);
                eDate.setHours(0, 0, 0, 0);
                if (tDate > eDate) return false;
            }
            return true;
        });
    }

    // Filter by Account
    // If selectedAccount is empty (Semua Akun), we just show all.
    // But Saldo calculation across different account types makes no sense mixed.
    // So if "Semua Akun", maybe just show lines without running balance? Or reset balance per account?
    // Let's assume Filter by String match.

    let filteredData = [];
    if (selectedAccount && selectedAccount !== "") {
        filteredData = rawData.filter(t => {
            // "Biaya Operasional" might match "Beban Operasional" in dropdown?
            // "Lainnya" matches "Beban Lain-lain"?
            // We need flexible matching or strict.
            // My journal generation produces: "Kas", "Piutang Usaha", "Penjualan", "Pembelian", "Hutang Usaha".
            // And also dynamic categories from Cash.

            // Checking inclusion
            return t.account.toLowerCase().includes(selectedAccount.toLowerCase());
        });
    } else {
        filteredData = rawData; // All
    }

    if (filteredData.length === 0) {
        tbody.innerHTML = '<tr class="no-data"><td colspan="7">Tidak ada data untuk periode/akun ini</td></tr>';
        if (tDebit) tDebit.textContent = 'Rp 0';
        if (tKredit) tKredit.textContent = 'Rp 0';
        return;
    }

    let runningBalance = 0;
    let totalDebit = 0;
    let totalKredit = 0;

    // Pre-calculate normal balance direction based on SELECTED account.
    // If "Semua Akun", running balance is meaningless, so maybe disable it.
    const showBalance = (selectedAccount && selectedAccount !== "");
    const creditNormal = showBalance ? isCreditNormal(selectedAccount) : false;

    filteredData.forEach((item, index) => {
        const d = parseFloat(item.debit) || 0;
        const c = parseFloat(item.credit) || 0;

        totalDebit += d;
        totalKredit += c;

        if (showBalance) {
            if (creditNormal) {
                runningBalance += (c - d);
            } else {
                runningBalance += (d - c);
            }
        }

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.date}</td>
            <td>${item.ref}</td>
            <td>${item.desc}</td>
            <td class="text-right">${d !== 0 ? formatRupiah(d) : '-'}</td>
            <td class="text-right">${c !== 0 ? formatRupiah(c) : '-'}</td>
            <td class="text-right" style="font-weight:bold;">
                ${showBalance ? formatRupiah(runningBalance) : '-'}
            </td>
        `;
        tbody.appendChild(row);
    });

    if (tDebit) tDebit.textContent = formatRupiah(totalDebit);
    if (tKredit) tKredit.textContent = formatRupiah(totalKredit);
}

// 6. Laba Rugi Functions (New)
function printLabaRugi() {
    printTable('Laporan Laba Rugi', 'labaRugiContent');
}

function exportExcelLabaRugi() {
    const div = document.getElementById('filterDivisiLR').value || 'Semua_Divisi';
    const today = new Date();
    const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    alert("Fitur Ekspor Excel Laba Rugi akan mengekspor tabel Pendapatan dan Beban secara terpisah. Saat ini mengekspor Pendapatan.");
    exportTableToExcel(`Laba_Rugi_Pendapatan_${div}_${dateStr}`, 'tablePendapatan');
}

function displayLabaRugi() {
    const selectedDivisi = document.getElementById('filterDivisiLR').value;
    const startDate = document.getElementById('startLRDate').value;
    const endDate = document.getElementById('endLRDate').value;

    const tbodyPendapatan = document.getElementById('bodyPendapatan');
    const tbodyBeban = document.getElementById('bodyBeban');
    const elTotalPendapatan = document.getElementById('totalPendapatanLR');
    const elTotalBeban = document.getElementById('totalBebanLR');
    const elLabaBersih = document.getElementById('labaBersihLR');

    if (!tbodyPendapatan || !tbodyBeban) return;

    tbodyPendapatan.innerHTML = '';
    tbodyBeban.innerHTML = '';

    let rawData = getUnifiedJournalData();

    // 1. Filter by Date
    if (startDate || endDate) {
        rawData = rawData.filter(t => {
            const parts = t.date.split('/');
            const tDate = new Date(parts[2], parts[1] - 1, parts[0]);
            tDate.setHours(0, 0, 0, 0);

            if (startDate) {
                const sDate = new Date(startDate);
                sDate.setHours(0, 0, 0, 0);
                if (tDate < sDate) return false;
            }
            if (endDate) {
                const eDate = new Date(endDate);
                eDate.setHours(0, 0, 0, 0);
                if (tDate > eDate) return false;
            }
            return true;
        });
    }

    // 2. Filter by Division
    if (selectedDivisi && selectedDivisi !== 'Umum') {
        // Strict filter for division
        rawData = rawData.filter(t => t.division === selectedDivisi);
    } else if (selectedDivisi === 'Umum') {
        if (selectedDivisi === 'Umum') {
            rawData = rawData.filter(t => t.division === 'Umum');
        }
    }

    // 3. Aggregate Data
    // Helper to categorize
    function getCategory(accName) {
        const lower = accName.toLowerCase();
        if (lower.includes('penjualan') || lower.includes('pendapatan')) return 'Pendapatan';
        if (lower.includes('pembelian') || lower.includes('hpp') || lower.includes('biaya') || lower.includes('beban')) return 'Beban';
        return 'Other';
    }

    const incomeMap = {};
    const expenseMap = {};

    rawData.forEach(item => {
        const cat = getCategory(item.account);

        if (cat === 'Pendapatan') {
            const net = item.credit - item.debit;
            if (net !== 0) {
                incomeMap[item.account] = (incomeMap[item.account] || 0) + net;
            }
        } else if (cat === 'Beban') {
            const net = item.debit - item.credit;
            if (net !== 0) {
                expenseMap[item.account] = (expenseMap[item.account] || 0) + net;
            }
        }
    });

    // 4. Render Pendapatan
    let totalPendapatan = 0;
    let idx = 1;
    for (const [acc, val] of Object.entries(incomeMap)) {
        if (val === 0) continue;
        const row = `<tr><td>${idx++}</td><td>${acc}</td><td class="text-right">${formatRupiah(val)}</td></tr>`;
        tbodyPendapatan.innerHTML += row;
        totalPendapatan += val;
    }

    // 5. Render Beban
    let totalBeban = 0;
    idx = 1;
    for (const [acc, val] of Object.entries(expenseMap)) {
        if (val === 0) continue;
        const row = `<tr><td>${idx++}</td><td>${acc}</td><td class="text-right">${formatRupiah(val)}</td></tr>`;
        tbodyBeban.innerHTML += row;
        totalBeban += val;
    }

    // 6. Totals
    elTotalPendapatan.textContent = formatRupiah(totalPendapatan);
    elTotalBeban.textContent = formatRupiah(totalBeban);

    const labaBersih = totalPendapatan - totalBeban;
    elLabaBersih.textContent = formatRupiah(labaBersih);

    if (labaBersih >= 0) {
        elLabaBersih.style.color = 'green';
    } else {
        elLabaBersih.style.color = 'red';
    }
}

// 7. Laporan Divisi Functions (New)
function printLaporanDivisi() {
    // Print whole module content
    printTable('Laporan Per Divisi', 'laporanDivisiContent');
}

function exportExcelLaporanDivisi() {
    const today = new Date();
    const div = document.getElementById('filterDivisiSelect').value || 'Semua_Divisi';
    const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    // Export Detail Table primarily
    alert("Mengekspor Detail Transaksi Divisi ke Excel...");
    exportTableToExcel(`Laporan_Divisi_Detail_${div}_${dateStr}`, 'tableDetailDivisi');
}

function displayLaporanDivisi() {
    const startDate = document.getElementById('startDivisiDate').value;
    const endDate = document.getElementById('endDivisiDate').value;
    const selectedDivisi = document.getElementById('filterDivisiSelect').value;

    const tbodyRingkasan = document.getElementById('bodyRingkasanDivisi');
    const tbodyDetail = document.getElementById('bodyDetailDivisi');
    const tPendapatan = document.getElementById('grandTotalPendapatanDivisi');
    const tBeban = document.getElementById('grandTotalBebanDivisi');

    if (!tbodyRingkasan || !tbodyDetail) return;

    tbodyRingkasan.innerHTML = '';
    tbodyDetail.innerHTML = '';

    let rawData = getUnifiedJournalData();

    // 1. Filter by Date
    if (startDate || endDate) {
        rawData = rawData.filter(t => {
            const parts = t.date.split('/');
            const tDate = new Date(parts[2], parts[1] - 1, parts[0]);
            tDate.setHours(0, 0, 0, 0);

            if (startDate) {
                const sDate = new Date(startDate);
                sDate.setHours(0, 0, 0, 0);
                if (tDate < sDate) return false;
            }
            if (endDate) {
                const eDate = new Date(endDate);
                eDate.setHours(0, 0, 0, 0);
                if (tDate > eDate) return false;
            }
            return true;
        });
    }

    // 2. Prepare Data Structures
    // Definitions
    const divisions = ['Angkutan', 'Besi', 'Pakan'];
    const summary = {};
    divisions.forEach(d => {
        summary[d] = { revenue: 0, expense: 0 };
    });

    let detailRows = [];
    let grandPendapatan = 0;
    let grandBeban = 0;

    // Helper to categorize Income/Expense
    function getCategory(accName) {
        const lower = accName.toLowerCase();
        if (lower.includes('penjualan') || lower.includes('pendapatan')) return 'Pendapatan';
        if (lower.includes('pembelian') || lower.includes('hpp') || lower.includes('biaya') || lower.includes('beban')) return 'Beban';
        return 'Other';
    }

    // 3. Process Data
    rawData.forEach(item => {
        const cat = getCategory(item.account);
        const div = item.division || 'Umum';

        // We only care about Income/Expense items for the report
        if (cat === 'Other') return;

        let revenue = 0;
        let expense = 0;

        if (cat === 'Pendapatan') {
            // Credit - Debit > 0
            revenue = item.credit - item.debit;
        } else if (cat === 'Beban') {
            // Debit - Credit > 0
            expense = item.debit - item.credit;
        }

        // Add to Summary if valid division
        if (summary[div]) {
            summary[div].revenue += revenue;
            summary[div].expense += expense;
        } else {
            // Fallback for unknown division
            if (!summary['Umum']) summary['Umum'] = { revenue: 0, expense: 0 };
            summary['Umum'].revenue += revenue;
            summary['Umum'].expense += expense;
        }

        // Add to Detail List
        // Only if there is actual value
        if (Math.abs(revenue) > 0.01 || Math.abs(expense) > 0.01) {
            // Check Filter for details
            if (!selectedDivisi || selectedDivisi === "" || div === selectedDivisi) {
                detailRows.push({
                    div: div,
                    date: item.date,
                    ref: item.ref,
                    type: item.type, // SALE, PURCHASE, etc.
                    desc: item.desc,
                    rev: revenue,
                    exp: expense
                });
                grandPendapatan += revenue;
                grandBeban += expense;
            }
        }
    });

    // 4. Render Summary Table
    divisions.forEach(div => {
        const s = summary[div];
        const profit = s.revenue - s.expense;
        const row = `
            <tr>
                <td>${div}</td>
                <td class="text-right">${formatRupiah(s.revenue)}</td>
                <td class="text-right">${formatRupiah(s.expense)}</td>
                <td class="text-right" style="color: ${profit >= 0 ? 'green' : 'red'}; font-weight: bold;">
                    ${formatRupiah(profit)}
                </td>
            </tr>
        `;
        tbodyRingkasan.innerHTML += row;
    });

    // 5. Render Detail Table
    if (detailRows.length === 0) {
        tbodyDetail.innerHTML = '<tr class="no-data"><td colspan="8">Tidak ada data transaksi divisi</td></tr>';
    } else {
        // Sort by Division then Date? or just Date. Let's sort by Division then Date for clarity.
        detailRows.sort((a, b) => {
            if (a.div < b.div) return -1;
            if (a.div > b.div) return 1;
            // Date parse
            return 0; // Keeping original filtered date sort roughly
        });

        detailRows.forEach((item, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td><span class="badge badge-info">${item.div}</span></td>
                <td>${item.date}</td>
                <td>${item.ref}</td>
                <td>${item.type}</td>
                <td>${item.desc}</td>
                <td class="text-right">${item.rev > 0 ? formatRupiah(item.rev) : '-'}</td>
                <td class="text-right">${item.exp > 0 ? formatRupiah(item.exp) : '-'}</td>
            `;
            tbodyDetail.appendChild(row);
        });
    }

    // 6. Grand Totals
    tPendapatan.textContent = formatRupiah(grandPendapatan);
    tBeban.textContent = formatRupiah(grandBeban);
}

// 8. Laporan PPN Functions (New)
function printLaporanPPN() {
    printTable('Laporan PPN', 'laporanPPNContent');
}

function exportExcelLaporanPPN() {
    const today = new Date();
    const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    const cat = document.getElementById('filterKategoriPPN').value || 'Semua';
    exportTableToExcel(`Laporan_PPN_${cat}_${dateStr}`, 'tableLaporanPPN');
}

function displayLaporanPPN() {
    const startDate = document.getElementById('startPPNDate').value;
    const endDate = document.getElementById('endPPNDate').value;
    const filterKategori = document.getElementById('filterKategoriPPN').value; // 'Non PPN', '11', '1.1', 'Dibebaskan'
    const filterJenis = document.getElementById('filterJenisPPN').value; // 'Penjualan', 'Pembelian', ''

    const tbody = document.getElementById('bodyLaporanPPN');
    const elTotalDPP = document.getElementById('totalDPPPPN');
    const elTotalPPN = document.getElementById('totalPPNPPN');
    const elTotalTotal = document.getElementById('totalTotalPPN');

    if (!tbody) return;

    tbody.innerHTML = '';

    // 1. Gather Data (Sales + Purchases)
    let pznList = [];

    // Sales
    if (typeof transactions !== 'undefined') {
        transactions.forEach(t => {
            // DPP is roughly Total - PPN. Or (Qty * Price - Disc).
            const ppnVal = parseFloat(t.nilaiPpn) || 0;
            const subtotal = (t.jumlah * t.hargaSatuan) - (t.diskon || 0); // This is usually DPP

            pznList.push({
                date: t.tanggal,
                ref: t.noFaktur,
                type: 'Penjualan',
                dpp: subtotal,
                ppn: ppnVal,
                total: parseFloat(t.total) || 0,
                desc: 'Penjualan ke ' + t.namaPelanggan,
                jenisPpn: parseFloat(t.jenisPpn) || 0,
                rawDate: t.tanggal
            });
        });
    }

    // Purchases
    if (typeof purchases !== 'undefined') {
        purchases.forEach(p => {
            const ppnVal = parseFloat(p.nilaiPpn) || 0;
            const subtotal = parseFloat(p.subtotal) || 0;

            pznList.push({
                date: p.tanggal,
                ref: p.noFaktur,
                type: 'Pembelian',
                dpp: subtotal,
                ppn: ppnVal,
                total: parseFloat(p.total) || 0,
                desc: 'Pembelian dari ' + p.namaSupplier,
                jenisPpn: parseFloat(p.jenisPpn) || 0,
                rawDate: p.tanggal
            });
        });
    }

    // 2. Filter Logic
    pznList = pznList.filter(item => {
        // Date Filter
        if (startDate || endDate) {
            const parts = item.date.split('/');
            const tDate = new Date(parts[2], parts[1] - 1, parts[0]);
            tDate.setHours(0, 0, 0, 0);

            if (startDate) {
                const sDate = new Date(startDate);
                sDate.setHours(0, 0, 0, 0);
                if (tDate < sDate) return false;
            }
            if (endDate) {
                const eDate = new Date(endDate);
                eDate.setHours(0, 0, 0, 0);
                if (tDate > eDate) return false;
            }
        }

        // Type Filter
        if (filterJenis && filterJenis !== "") {
            if (item.type !== filterJenis) return false;
        }

        // Category Filter
        if (filterKategori && filterKategori !== "") {
            if (filterKategori === 'Non PPN') {
                if (item.jenisPpn !== 0) return false;
            } else if (filterKategori === 'Dibebaskan') {
                // Assuming Dibebaskan is also 0 for now unless we have specific flag.
                // Or maybe distinct from Non(0)?
                // Let's assume user considers 0 as both. Or maybe 'Dibebaskan' implies specific tax code?
                // For safety, I'll match 0 for now.
                if (item.jenisPpn !== 0) return false;
            } else {
                // Match 11 or 1.1
                // Float comparison
                const target = parseFloat(filterKategori);
                if (Math.abs(item.jenisPpn - target) > 0.01) return false;
            }
        }

        return true;
    });

    // 3. Sort Date
    pznList.sort((a, b) => {
        const pA = a.date.split('/');
        const pB = b.date.split('/');
        const dA = new Date(pA[2], pA[1] - 1, pA[0]);
        const dB = new Date(pB[2], pB[1] - 1, pB[0]);
        return dA - dB;
    });

    // 4. Render
    let grandDPP = 0;
    let grandPPN = 0;
    let grandTotal = 0;

    if (pznList.length === 0) {
        tbody.innerHTML = '<tr class="no-data"><td colspan="8">Tidak ada data PPN sesuai filter</td></tr>';
    } else {
        pznList.forEach((item, index) => {
            const row = document.createElement('tr');
            grandDPP += item.dpp;
            grandPPN += item.ppn;
            grandTotal += item.total;

            // Format PPN Label
            let ppnLbl = item.jenisPpn + '%';
            if (item.jenisPpn === 0) ppnLbl = '0% / Non';

            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${item.date}</td>
                <td>${item.ref}</td>
                <td><span class="badge ${item.type === 'Penjualan' ? 'badge-success' : 'badge-primary'}">${item.type}</span></td>
                <td class="text-right">${formatRupiah(item.dpp)}</td>
                <td class="text-right">${formatRupiah(item.ppn)}</td>
                <td class="text-right">${formatRupiah(item.total)}</td>
                <td><small>${item.desc} (${ppnLbl})</small></td>
            `;
            tbody.appendChild(row);
        });
    }

    // 5. Totals
    elTotalDPP.textContent = formatRupiah(grandDPP);
    elTotalPPN.textContent = formatRupiah(grandPPN);
    elTotalTotal.textContent = formatRupiah(grandTotal);
}

// 9. Global Search Functions (New)
function performGlobalSearch(query) {
    const resultsContainer = document.getElementById('globalSearchResults');
    if (!resultsContainer) return;

    if (!query || query.trim().length < 2) {
        resultsContainer.innerHTML = `
            <div style="text-align: center; color: #777; margin-top: 50px;">
                <p style="font-size: 1.5em;">🔍</p>
                <p>Mulai ketik (min 2 karakter) untuk mencari...</p>
            </div>
        `;
        return;
    }

    const lowerQ = query.toLowerCase();
    let hits = [];

    // 1. Search Sales (transactions)
    if (typeof transactions !== 'undefined') {
        transactions.forEach((t, idx) => {
            const searchStr = `${t.noFaktur} ${t.namaPelanggan} ${t.namaBarang} ${t.keterangan || ''} ${t.catatan || ''}`.toLowerCase();
            if (searchStr.includes(lowerQ)) {
                hits.push({
                    source: 'Penjualan',
                    date: t.tanggal,
                    title: `Faktur: ${t.noFaktur} - ${t.namaPelanggan}`,
                    desc: `${t.namaBarang} (${t.jumlah} x ${formatRupiah(t.hargaSatuan)})`,
                    amount: t.total,
                    amountClass: 'text-success', // Income usually success
                    detail: `Status: ${t.metodePembayaran}`
                });
            }
        });
    }

    // 2. Search Purchases (purchases)
    if (typeof purchases !== 'undefined') {
        purchases.forEach((p, idx) => {
            const searchStr = `${p.noFaktur} ${p.namaSupplier} ${p.namaBarang} ${p.keterangan || ''}`.toLowerCase();
            if (searchStr.includes(lowerQ)) {
                hits.push({
                    source: 'Pembelian',
                    date: p.tanggal,
                    title: `Faktur: ${p.noFaktur} - ${p.namaSupplier}`,
                    desc: `${p.namaBarang} (${p.jumlah} x ${formatRupiah(p.hargaSatuan)})`,
                    amount: p.total,
                    amountClass: 'text-danger', // Expense usually danger
                    detail: `Status: ${p.metodePembayaran}`
                });
            }
        });
    }

    // 3. Search Cash (cashTransactions)
    if (typeof cashTransactions !== 'undefined') {
        cashTransactions.forEach((c, idx) => {
            const searchStr = `${c.noRef} ${c.keterangan} ${c.kategori}`.toLowerCase();
            if (searchStr.includes(lowerQ)) {
                hits.push({
                    source: 'Arus Kas',
                    date: c.tanggal,
                    title: `Ref: ${c.noRef} - ${c.kategori}`,
                    desc: c.keterangan,
                    amount: c.jumlah,
                    amountClass: c.jenis === 'Masuk' ? 'text-success' : 'text-danger',
                    detail: `Jenis: ${c.jenis}`
                });
            }
        });
    }

    // 4. Search Master Customers
    if (typeof dataMasterCustomer !== 'undefined') {
        dataMasterCustomer.forEach((cust) => {
            const searchStr = `${cust.nama} ${cust.alamat || ''} ${cust.telepon || ''} ${cust.npwp || ''} ${cust.email || ''}`.toLowerCase();
            if (searchStr.includes(lowerQ)) {
                hits.push({
                    source: 'Master Data - Pelanggan',
                    date: '-',
                    title: `${cust.nama}`,
                    desc: `${cust.alamat || '-'} | ${cust.telepon || '-'}`,
                    amount: 0,
                    amountClass: 'text-info',
                    detail: `NPWP: ${cust.npwp || '-'}`
                });
            }
        });
    }

    // 5. Search Master Items/Products
    if (typeof dataMasterBarang !== 'undefined') {
        dataMasterBarang.forEach((item) => {
            const searchStr = `${item.kode} ${item.nama} ${item.kategori || ''} ${item.keterangan || ''}`.toLowerCase();
            if (searchStr.includes(lowerQ)) {
                hits.push({
                    source: 'Master Data - Barang',
                    date: '-',
                    title: `[${item.kode}] ${item.nama}`,
                    desc: `Kategori: ${item.kategori} | Satuan: ${item.satuan}`,
                    amount: item.hargaJual || 0,
                    amountClass: 'text-info',
                    detail: `Harga Jual: ${formatRupiah(item.hargaJual)}`
                });
            }
        });
    }

    // 6. Search Suppliers (from purchases if available)
    const suppliers = new Map();
    if (typeof purchases !== 'undefined') {
        purchases.forEach(p => {
            if (!suppliers.has(p.namaSupplier)) {
                const searchStr = `${p.namaSupplier} ${p.alamat || ''} ${p.telepon || ''}`.toLowerCase();
                if (searchStr.includes(lowerQ)) {
                    suppliers.set(p.namaSupplier, {
                        source: 'Master Data - Supplier',
                        date: '-',
                        title: `${p.namaSupplier}`,
                        desc: `${p.alamat || '-'} | ${p.telepon || '-'}`,
                        amount: 0,
                        amountClass: 'text-info',
                        detail: 'Data Supplier'
                    });
                }
            }
        });
        suppliers.forEach(sup => hits.push(sup));
    }

    // Render Results
    if (hits.length === 0) {
        resultsContainer.innerHTML = `
                <p>Tidak ditemukan hasil untuk "${query}"</p>
            </div>
        `;
    } else {
        // Group results by source type
        const grouped = {};
        hits.forEach(item => {
            if (!grouped[item.source]) {
                grouped[item.source] = [];
            }
            grouped[item.source].push(item);
        });

        let html = `<div style="margin-top: 20px;">
            <p style="margin-bottom: 20px; color: #555; font-size: 1.1em;">
                <strong>${hits.length}</strong> hasil ditemukan untuk "${query}"
            </p>`;

        // Render each group with appropriate columns
        Object.keys(grouped).forEach(sourceType => {
            const items = grouped[sourceType];

            html += `<h4 style="margin-top: 25px; margin-bottom: 10px; color: #333;">
                ${sourceType} (${items.length})
            </h4>`;

            // Different table structure based on source type
            if (sourceType === 'Penjualan') {
                html += `<table class="table table-bordered table-sm">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>No Faktur</th>
                            <th>Tanggal</th>
                            <th>Nama Pelanggan</th>
                            <th>Nama Barang</th>
                            <th>Jumlah</th>
                            <th class="text-right">Total (Rp)</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>`;

                items.forEach((item, idx) => {
                    // Parse data from original transaction
                    const match = item.title.match(/Faktur: ([^\s]+) - (.+)/);
                    const noFaktur = match ? match[1] : '-';
                    const pelanggan = match ? match[2] : '-';
                    const barangMatch = item.desc.match(/(.+) \(([0-9.]+) x/);
                    const namaBarang = barangMatch ? barangMatch[1] : '-';
                    const jumlah = barangMatch ? barangMatch[2] : '-';

                    html += `<tr>
                        <td>${idx + 1}</td>
                        <td><strong>${noFaktur}</strong></td>
                        <td>${item.date}</td>
                        <td>${pelanggan}</td>
                        <td>${namaBarang}</td>
                        <td>${jumlah}</td>
                        <td class="text-right text-success"><strong>${formatRupiah(item.amount)}</strong></td>
                        <td><small>${item.detail}</small></td>
                    </tr>`;
                });
                html += `</tbody></table>`;

            } else if (sourceType === 'Pembelian') {
                html += `<table class="table table-bordered table-sm">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>No Faktur</th>
                            <th>Tanggal</th>
                            <th>Nama Supplier</th>
                            <th>Nama Barang</th>
                            <th>Jumlah</th>
                            <th class="text-right">Total (Rp)</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>`;

                items.forEach((item, idx) => {
                    const match = item.title.match(/Faktur: ([^\s]+) - (.+)/);
                    const noFaktur = match ? match[1] : '-';
                    const supplier = match ? match[2] : '-';
                    const barangMatch = item.desc.match(/(.+) \(([0-9.]+) x/);
                    const namaBarang = barangMatch ? barangMatch[1] : '-';
                    const jumlah = barangMatch ? barangMatch[2] : '-';

                    html += `<tr>
                        <td>${idx + 1}</td>
                        <td><strong>${noFaktur}</strong></td>
                        <td>${item.date}</td>
                        <td>${supplier}</td>
                        <td>${namaBarang}</td>
                        <td>${jumlah}</td>
                        <td class="text-right text-danger"><strong>${formatRupiah(item.amount)}</strong></td>
                        <td><small>${item.detail}</small></td>
                    </tr>`;
                });
                html += `</tbody></table>`;

            } else if (sourceType === 'Arus Kas') {
                html += `<table class="table table-bordered table-sm">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>No Ref</th>
                            <th>Tanggal</th>
                            <th>Kategori</th>
                            <th>Keterangan</th>
                            <th>Jenis</th>
                            <th class="text-right">Jumlah (Rp)</th>
                        </tr>
                    </thead>
                    <tbody>`;

                items.forEach((item, idx) => {
                    const match = item.title.match(/Ref: ([^\s]+) - (.+)/);
                    const noRef = match ? match[1] : '-';
                    const kategori = match ? match[2] : '-';

                    html += `<tr>
                        <td>${idx + 1}</td>
                        <td><strong>${noRef}</strong></td>
                        <td>${item.date}</td>
                        <td>${kategori}</td>
                        <td>${item.desc}</td>
                        <td><small>${item.detail}</small></td>
                        <td class="text-right ${item.amountClass}"><strong>${formatRupiah(item.amount)}</strong></td>
                    </tr>`;
                });
                html += `</tbody></table>`;

            } else if (sourceType === 'Master Data - Pelanggan') {
                html += `<table class="table table-bordered table-sm">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama</th>
                            <th>Alamat</th>
                            <th>Telepon</th>
                            <th>NPWP</th>
                        </tr>
                    </thead>
                    <tbody>`;

                items.forEach((item, idx) => {
                    const alamatTelp = item.desc.split(' | ');
                    const alamat = alamatTelp[0] || '-';
                    const telepon = alamatTelp[1] || '-';
                    const npwp = item.detail.replace('NPWP: ', '');

                    html += `<tr>
                        <td>${idx + 1}</td>
                        <td><strong>${item.title}</strong></td>
                        <td>${alamat}</td>
                        <td>${telepon}</td>
                        <td><small>${npwp}</small></td>
                    </tr>`;
                });
                html += `</tbody></table>`;

            } else if (sourceType === 'Master Data - Barang') {
                html += `<table class="table table-bordered table-sm">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Kode</th>
                            <th>Nama Barang</th>
                            <th>Kategori</th>
                            <th>Satuan</th>
                            <th class="text-right">Harga Jual (Rp)</th>
                        </tr>
                    </thead>
                    <tbody>`;

                items.forEach((item, idx) => {
                    const match = item.title.match(/\[([^\]]+)\] (.+)/);
                    const kode = match ? match[1] : '-';
                    const nama = match ? match[2] : item.title;
                    const matches = item.desc.match(/Kategori: ([^|]+) \| Satuan: (.+)/);
                    const kategori = matches ? matches[1].trim() : '-';
                    const satuan = matches ? matches[2].trim() : '-';

                    html += `<tr>
                        <td>${idx + 1}</td>
                        <td><strong>${kode}</strong></td>
                        <td>${nama}</td>
                        <td>${kategori}</td>
                        <td>${satuan}</td>
                        <td class="text-right"><strong>${formatRupiah(item.amount)}</strong></td>
                    </tr>`;
                });
                html += `</tbody></table>`;

            } else if (sourceType === 'Master Data - Supplier') {
                html += `<table class="table table-bordered table-sm">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama Supplier</th>
                            <th>Alamat</th>
                            <th>Telepon</th>
                        </tr>
                    </thead>
                    <tbody>`;

                items.forEach((item, idx) => {
                    const alamatTelp = item.desc.split(' | ');
                    const alamat = alamatTelp[0] || '-';
                    const telepon = alamatTelp[1] || '-';

                    html += `<tr>
                        <td>${idx + 1}</td>
                        <td><strong>${item.title}</strong></td>
                        <td>${alamat}</td>
                        <td>${telepon}</td>
                    </tr>`;
                });
                html += `</tbody></table>`;
            }
        });

        html += `</div>`;
        resultsContainer.innerHTML = html;
    }
}

// ==================== PRINT SURAT JALAN & KWITANSI ====================

// Fungsi Print Surat Jalan untuk Penjualan
function printSuratJalanPenjualan(index) {
    if (index === -1) return;
    const t = transactions[index];
    const noSuratJalan = generateNoSuratJalan();
    const currentDate = new Date();
    const printTime = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}, ${currentDate.getHours()}:${String(currentDate.getMinutes()).padStart(2, '0')}`;

    const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Surat Jalan - ${noSuratJalan}</title>
            <style>
                @page { size: A4; margin: 2cm; }
                body { font-family: 'Times New Roman', Times, serif; font-size: 11pt; color: #000; -webkit-print-color-adjust: exact; }
                .header { position: relative; margin-bottom: 20px; }
                .company-name { font-weight: bold; font-size: 14pt; margin-bottom: 5px; }
                .company-desc { font-weight: bold; font-size: 9pt; width: 70%; line-height: 1.2; }
                .company-address { margin-top: 5px; font-size: 10pt; }
                .logo { position: absolute; top: 0; right: 0; width: 100px; height: auto; max-height: 100px; }
                .print-meta { position: absolute; top: 110px; right: 0; font-size: 8pt; text-align: right; }
                .line { border-bottom: 3px solid #000; margin: 15px 0 20px 0; }
                .doc-title-box { border: 2px solid #000; width: 300px; margin: 0 auto 30px auto; padding: 5px; text-align: center; }
                .doc-title { font-weight: bold; font-size: 14pt; }
                .info-section { margin-bottom: 20px; }
                .info-table { width: 60%; }
                .info-table td { padding: 3px 0; vertical-align: top; }
                .info-label { width: 120px; }
                
                .items-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; border: 2px solid #000; }
                .items-table th { border: 1px solid #000; padding: 8px; text-align: center; font-weight: bold; background-color: #f0f0f0; }
                .items-table td { border: 1px solid #000; padding: 8px; }
                .text-center { text-align: center; }
                
                .note-section { margin: 20px 0; font-size: 10pt; }
                .signatures { display: flex; justify-content: space-between; margin-top: 50px; padding: 0 50px; }
                .sign-box { text-align: center; width: 200px; }
                .sign-label { margin-bottom: 5px; }
                .sign-space { height: 80px; margin-top: 5px; }
                .sign-name { border-top: 1px solid #000; margin-top: 5px; padding-top: 5px; }
            </style>
        </head>
        <body>
            <div class="header">
                <div class="company-name">PT. SUMBER GANDA MEKAR</div>
                <div class="company-desc">JUAL BELI BESI TUA/BARU - RANGKA BETON/LOGAM - TIANG LISTRIK/TELP - KONSTRUKSI BAJA DAN PAKAN TERNAK</div>
                <div class="company-address">Jl. Raya Gedebage No. 95 Bandung<br>CP. Irwan : 082117800626, CP. Uwem : 082318188863</div>
                <img src="logo.png" alt="SGM Logo" class="logo">
                <div class="print-meta">
                    ${printTime}<br>Sistem Akuntansi SGM
                </div>
            </div>
            
            <div class="line"></div>
            
            <div class="doc-title-box">
                <div class="doc-title">SURAT JALAN</div>
            </div>
            
            <div class="info-section">
                <table class="info-table">
                    <tr><td class="info-label">No. Surat Jalan</td><td>: <strong>${noSuratJalan}</strong></td></tr>
                    <tr><td class="info-label">Tanggal</td><td>: ${t.tanggal}</td></tr>
                    <tr><td class="info-label">No. Faktur Ref.</td><td>: ${t.noFaktur}</td></tr>
                </table>
            </div>
            
            <div class="info-section">
                <table class="info-table">
                    <tr><td class="info-label">Kepada Yth.</td><td>: <strong>${t.namaPelanggan}</strong></td></tr>
                    <tr><td class="info-label">Alamat</td><td>: ${t.alamatPelanggan || '-'}</td></tr>
                    <tr><td class="info-label">Telepon</td><td>: ${t.noTelepon || '-'}</td></tr>
                </table>
            </div>
            
            <table class="items-table">
                <thead>
                    <tr>
                        <th style="width: 5%">No</th>
                        <th>Nama Barang</th>
                        <th style="width: 15%">Kode</th>
                        <th style="width: 15%">Jumlah</th>
                        <th style="width: 15%">Satuan</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="text-center">1</td>
                        <td>${t.namaBarang}</td>
                        <td class="text-center">${t.kodeBarang || '-'}</td>
                        <td class="text-center">${t.jumlah}</td>
                        <td class="text-center">${t.satuan || '-'}</td>
                    </tr>
                </tbody>
            </table>
            
            <div class="note-section">
                <strong>Catatan:</strong><br>
                Barang-barang tersebut di atas telah dikirim dalam keadaan baik.<br>
                Mohon untuk diperiksa dan ditandatangani sebagai tanda penerimaan.
            </div>
            
            <div class="signatures">
                <div class="sign-box">
                    <div class="sign-label">Yang Menyerahkan,</div>
                    <div class="sign-space"></div>
                    <div class="sign-name">(...........................)</div>
                </div>
                <div class="sign-box">
                    <div class="sign-label">Yang Menerima,</div>
                    <div class="sign-space"></div>
                    <div class="sign-name">(...........................)</div>
                </div>
            </div>
        </body>
        </html>
    `;
    printToIframe(htmlContent);
}

// Fungsi Print Kwitansi untuk Penjualan
function printKwitansiPenjualan(index) {
    if (index === -1) return;
    const t = transactions[index];
    const terbilangText = terbilangRupiah(t.total);
    const currentDate = new Date();
    const printTime = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}, ${currentDate.getHours()}:${String(currentDate.getMinutes()).padStart(2, '0')}`;

    const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Kwitansi - ${t.noFaktur}</title>
            <style>
                @page { size: A5 landscape; margin: 1.5cm; }
                body { font-family: 'Times New Roman', Times, serif; font-size: 11pt; color: #000; -webkit-print-color-adjust: exact; }
                .kwitansi-border { border: 3px solid #000; padding: 20px; }
                .header { text-align: center; margin-bottom: 20px; border-bottom: 2px solid #000; padding-bottom: 10px; }
                .company-name { font-weight: bold; font-size: 14pt; }
                .company-desc { font-size: 9pt; margin-top: 5px; }
                .title { text-align: center; font-size: 16pt; font-weight: bold; margin: 20px 0; text-decoration: underline; }
                .no-kwitansi { text-align: right; margin-bottom: 15px; font-size: 10pt; }
                .content { margin: 20px 0; }
                .content table { width: 100%; }
                .content td { padding: 5px 0; vertical-align: top; }
                .label { width: 150px; }
                .amount-box { border: 2px solid #000; padding: 10px; text-align: center; margin: 15px 0; font-weight: bold; font-size: 14pt; }
                .terbilang { font-style: italic; text-align: center; margin: 10px 0; border: 1px solid #000; padding: 8px; }
                .signature { margin-top: 40px; text-align: right; padding-right: 80px; }
                .sign-space { height: 60px; }
                .sign-name { border-top: 1px solid #000; display: inline-block; min-width: 200px; text-align: center; padding-top: 5px; }
            </style>
        </head>
        <body>
            <div class="kwitansi-border">
                <div class="header">
                    <div class="company-name">PT. SUMBER GANDA MEKAR</div>
                    <div class="company-desc">Jl. Raya Gedebage No. 95 Bandung | Telp: 082117800626 / 082318188863</div>
                </div>
                
                <div class="title">KWITANSI</div>
                
                <div class="no-kwitansi">No: ${t.noFaktur}</div>
                
                <div class="content">
                    <table>
                        <tr>
                            <td class="label">Sudah terima dari</td>
                            <td>: <strong>${t.namaPelanggan}</strong></td>
                        </tr>
                        <tr>
                            <td class="label">Uang sejumlah</td>
                            <td>: </td>
                        </tr>
                    </table>
                </div>
                
                <div class="amount-box">
                    ${formatRupiah(t.total)}
                </div>
                
                <div class="terbilang">
                    <em>${terbilangText}</em>
                </div>
                
                <div class="content">
                    <table>
                        <tr>
                            <td class="label">Untuk pembayaran</td>
                            <td>: ${t.namaBarang} (${t.jumlah} ${t.satuan || 'unit'})</td>
                        </tr>
                        <tr>
                            <td class="label">Metode Pembayaran</td>
                            <td>: ${t.metodePembayaran}</td>
                        </tr>
                        ${t.metodePembayaran === 'Kredit' ? `
                        <tr>
                            <td class="label">DP / Dibayar</td>
                            <td>: ${formatRupiah(t.jumlahDibayar)}</td>
                        </tr>
                        <tr>
                            <td class="label">Sisa Pembayaran</td>
                            <td>: ${formatRupiah(t.sisaPembayaran)}</td>
                        </tr>
                        ` : ''}
                    </table>
                </div>
                
                <div class="signature">
                    Bandung, ${t.tanggal}
                    <div class="sign-space"></div>
                    <div class="sign-name">PT. Sumber Ganda Mekar</div>
                </div>
            </div>
        </body>
        </html>
    `;
    printToIframe(htmlContent);
}

// Fungsi Print Surat Jalan untuk Pembelian
function printSuratJalanPembelian(index) {
    if (index === -1 || !purchases[index]) return;
    const p = purchases[index];
    const noSuratJalan = generateNoSuratJalan();
    const currentDate = new Date();
    const printTime = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}, ${currentDate.getHours()}:${String(currentDate.getMinutes()).padStart(2, '0')}`;

    const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Surat Jalan Pembelian - ${noSuratJalan}</title>
            <style>
                @page { size: A4; margin: 2cm; }
                body { font-family: 'Times New Roman', Times, serif; font-size: 11pt; color: #000; -webkit-print-color-adjust: exact; }
                .header { position: relative; margin-bottom: 20px; }
                .company-name { font-weight: bold; font-size: 14pt; margin-bottom: 5px; }
                .company-desc { font-weight: bold; font-size: 9pt; width: 70%; line-height: 1.2; }
                .company-address { margin-top: 5px; font-size: 10pt; }
                .logo { position: absolute; top: 0; right: 0; width: 100px; height: auto; max-height: 100px; }
                .print-meta { position: absolute; top: 110px; right: 0; font-size: 8pt; text-align: right; }
                .line { border-bottom: 3px solid #000; margin: 15px 0 20px 0; }
                .doc-title-box { border: 2px solid #000; width: 300px; margin: 0 auto 30px auto; padding: 5px; text-align: center; }
                .doc-title { font-weight: bold; font-size: 14pt; }
                .info-section { margin-bottom: 20px; }
                .info-table { width: 60%; }
                .info-table td { padding: 3px 0; vertical-align: top; }
                .info-label { width: 120px; }
                
                .items-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; border: 2px solid #000; }
                .items-table th { border: 1px solid #000; padding: 8px; text-align: center; font-weight: bold; background-color: #f0f0f0; }
                .items-table td { border: 1px solid #000; padding: 8px; }
                .text-center { text-align: center; }
                
                .note-section { margin: 20px 0; font-size: 10pt; }
                .signatures { display: flex; justify-content: space-between; margin-top: 50px; padding: 0 50px; }
                .sign-box { text-align: center; width: 200px; }
                .sign-label { margin-bottom: 5px; }
                .sign-space { height: 80px; margin-top: 5px; }
                .sign-name { border-top: 1px solid #000; margin-top: 5px; padding-top: 5px; }
            </style>
        </head>
        <body>
            <div class="header">
                <div class="company-name">PT. SUMBER GANDA MEKAR</div>
                <div class="company-desc">JUAL BELI BESI TUA/BARU - RANGKA BETON/LOGAM - TIANG LISTRIK/TELP - KONSTRUKSI BAJA DAN PAKAN TERNAK</div>
                <div class="company-address">Jl. Raya Gedebage No. 95 Bandung<br>CP. Irwan : 082117800626, CP. Uwem : 082318188863</div>
                <img src="logo.png" alt="SGM Logo" class="logo">
                <div class="print-meta">
                    ${printTime}<br>Sistem Akuntansi SGM
                </div>
            </div>
            
            <div class="line"></div>
            
            <div class="doc-title-box">
                <div class="doc-title">SURAT JALAN PEMBELIAN</div>
            </div>
            
            <div class="info-section">
                <table class="info-table">
                    <tr><td class="info-label">No. Surat Jalan</td><td>: <strong>${noSuratJalan}</strong></td></tr>
                    <tr><td class="info-label">Tanggal</td><td>: ${p.tanggal}</td></tr>
                    <tr><td class="info-label">No. Faktur Ref.</td><td>: ${p.noFaktur}</td></tr>
                </table>
            </div>
            
            <div class="info-section">
                <table class="info-table">
                    <tr><td class="info-label">Dari Supplier</td><td>: <strong>${p.namaSupplier}</strong></td></tr>
                    <tr><td class="info-label">Alamat</td><td>: ${p.alamat || '-'}</td></tr>
                    <tr><td class="info-label">Telepon</td><td>: ${p.telepon || '-'}</td></tr>
                </table>
            </div>
            
            <table class="items-table">
                <thead>
                    <tr>
                        <th style="width: 5%">No</th>
                        <th>Nama Barang</th>
                        <th style="width: 15%">Kode</th>
                        <th style="width: 15%">Jumlah</th>
                        <th style="width: 15%">Satuan</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="text-center">1</td>
                        <td>${p.namaBarang}</td>
                        <td class="text-center">${p.kodeBarang || '-'}</td>
                        <td class="text-center">${p.jumlah}</td>
                        <td class="text-center">${p.satuan || '-'}</td>
                    </tr>
                </tbody>
            </table>
            
            <div class="note-section">
                <strong>Catatan:</strong><br>
                Barang-barang tersebut di atas telah diterima dalam keadaan baik.<br>
                Dokumen ini sebagai bukti penerimaan barang dari supplier.
            </div>
            
            <div class="signatures">
                <div class="sign-box">
                    <div class="sign-label">Supplier,</div>
                    <div class="sign-space"></div>
                    <div class="sign-name">(...........................)</div>
                </div>
                <div class="sign-box">
                    <div class="sign-label">Penerima,</div>
                    <div class="sign-space"></div>
                    <div class="sign-name">(...........................)</div>
                </div>
            </div>
        </body>
        </html>
    `;
    printToIframe(htmlContent);
}

// Fungsi Print Kwitansi untuk Pembelian
function printKwitansiPembelian(index) {
    if (index === -1 || !purchases[index]) return;
    const p = purchases[index];
    const terbilangText = terbilangRupiah(p.total);
    const currentDate = new Date();
    const printTime = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}, ${currentDate.getHours()}:${String(currentDate.getMinutes()).padStart(2, '0')}`;

    const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Kwitansi Pembelian - ${p.noFaktur}</title>
            <style>
                @page { size: A5 landscape; margin: 1.5cm; }
                body { font-family: 'Times New Roman', Times, serif; font-size: 11pt; color: #000; -webkit-print-color-adjust: exact; }
                .kwitansi-border { border: 3px solid #000; padding: 20px; }
                .header { text-align: center; margin-bottom: 20px; border-bottom: 2px solid #000; padding-bottom: 10px; }
                .company-name { font-weight: bold; font-size: 14pt; }
                .company-desc { font-size: 9pt; margin-top: 5px; }
                .title { text-align: center; font-size: 16pt; font-weight: bold; margin: 20px 0; text-decoration: underline; }
                .no-kwitansi { text-align: right; margin-bottom: 15px; font-size: 10pt; }
                .content { margin: 20px 0; }
                .content table { width: 100%; }
                .content td { padding: 5px 0; vertical-align: top; }
                .label { width: 150px; }
                .amount-box { border: 2px solid #000; padding: 10px; text-align: center; margin: 15px 0; font-weight: bold; font-size: 14pt; }
                .terbilang { font-style: italic; text-align: center; margin: 10px 0; border: 1px solid #000; padding: 8px; }
                .signature { margin-top: 40px; text-align: right; padding-right: 80px; }
                .sign-space { height: 60px; }
                .sign-name { border-top: 1px solid #000; display: inline-block; min-width: 200px; text-align: center; padding-top: 5px; }
            </style>
        </head>
        <body>
            <div class="kwitansi-border">
                <div class="header">
                    <div class="company-name">${p.namaSupplier}</div>
                    <div class="company-desc">${p.alamat || 'Supplier'}</div>
                </div>
                
                <div class="title">KWITANSI</div>
                
                <div class="no-kwitansi">No: ${p.noFaktur}</div>
                
                <div class="content">
                    <table>
                        <tr>
                            <td class="label">Sudah terima dari</td>
                            <td>: <strong>PT. SUMBER GANDA MEKAR</strong></td>
                        </tr>
                        <tr>
                            <td class="label">Uang sejumlah</td>
                            <td>: </td>
                        </tr>
                    </table>
                </div>
                
                <div class="amount-box">
                    ${formatRupiah(p.total)}
                </div>
                
                <div class="terbilang">
                    <em>${terbilangText}</em>
                </div>
                
                <div class="content">
                    <table>
                        <tr>
                            <td class="label">Untuk pembayaran</td>
                            <td>: ${p.namaBarang} (${p.jumlah} ${p.satuan || 'unit'})</td>
                        </tr>
                        <tr>
                            <td class="label">Metode Pembayaran</td>
                            <td>: ${p.metodePembayaran}</td>
                        </tr>
                        ${p.metodePembayaran === 'Kredit' ? `
                        <tr>
                            <td class="label">DP / Dibayar</td>
                            <td>: ${formatRupiah(p.uangMuka || 0)}</td>
                        </tr>
                        <tr>
                            <td class="label">Sisa Pembayaran</td>
                            <td>: ${formatRupiah(p.sisaPembayaran || 0)}</td>
                        </tr>
                        ` : ''}
                    </table>
                </div>
                
                <div class="signature">
                    Bandung, ${p.tanggal}
                    <div class="sign-space"></div>
                    <div class="sign-name">${p.namaSupplier}</div>
                </div>
            </div>
        </body>
        </html>
    `;
    printToIframe(htmlContent);
}

// ==========================================
// INITIALIZATION CODE - SEMUA EVENT LISTENERS
// ==========================================

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    console.log('Initializing Application...');

    // ===== PENJUALAN MODULE =====
    const salesForm = document.getElementById('salesForm');
    if (salesForm) {
        salesForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Validasi cart tidak kosong
            if (salesCart.length === 0) {
                alert('Keranjang belanja masih kosong! Tambahkan barang terlebih dahulu.');
                return;
            }

            // Get form data
            const tanggal = document.getElementById('tanggal').value;
            const divisi = document.getElementById('divisi').value;
            const namaPelanggan = document.getElementById('namaPelanggan').value;
            const noTelepon = document.getElementById('noTelepon').value;
            const alamatPelanggan = document.getElementById('alamatPelanggan').value;
            const npwpNik = document.getElementById('npwpNik').value;
            const metodePembayaran = document.getElementById('metodePembayaran').value;

            // Validasi
            if (!tanggal || !validasiTanggal(tanggal)) {
                alert('Tanggal tidak valid! Format: DD/MM/YYYY');
                return;
            }

            if (!divisi || !namaPelanggan || !noTelepon || !alamatPelanggan || !npwpNik || !metodePembayaran) {
                alert('Mohon lengkapi semua data yang wajib diisi!');
                return;
            }

            // Get calculation values
            const subtotal = parseFloat(document.getElementById('subtotal').dataset.value) || 0;
            const diskon = parseFloat(document.getElementById('diskon').value) || 0;
            const nilaiPpn = parseFloat(document.getElementById('nilaiPpn').dataset.value) || 0;
            const total = parseFloat(document.getElementById('total').dataset.value) || 0;
            const jenisPpn = document.getElementById('jenisPpn').value;
            const jumlahDibayar = metodePembayaran === 'Kredit' ? (parseFloat(document.getElementById('jumlahDibayar').value) || 0) : total;
            const sisaPembayaran = metodePembayaran === 'Kredit' ? (parseFloat(document.getElementById('sisaPembayaran').dataset.value) || 0) : 0;

            // Save each item in cart as separate transaction
            salesCart.forEach(item => {
                const transaction = {
                    id: Date.now() + Math.random(),
                    tanggal: tanggal,
                    noFaktur: generateNoFaktur(),
                    divisi: divisi,
                    namaPelanggan: namaPelanggan,
                    noTelepon: noTelepon,
                    alamatPelanggan: alamatPelanggan,
                    npwpNik: npwpNik,
                    namaBarang: item.namaBarang,
                    kodeBarang: item.kodeBarang,
                    satuan: item.satuan,
                    jumlah: item.jumlah,
                    hargaSatuan: item.hargaSatuan,
                    subtotal: item.total,
                    diskon: diskon,
                    jenisPpn: jenisPpn,
                    nilaiPpn: nilaiPpn,
                    total: total,
                    metodePembayaran: metodePembayaran,
                    jumlahDibayar: jumlahDibayar,
                    sisaPembayaran: sisaPembayaran
                };

                saveTransaction(transaction);

                // Save to piutang if kredit
                if (metodePembayaran === 'Kredit' && sisaPembayaran > 0) {
                    savePiutang({
                        tanggal: tanggal,
                        sumber: 'Penjualan',
                        noFaktur: transaction.noFaktur,
                        namaPelanggan: namaPelanggan,
                        keterangan: `Penjualan ${item.namaBarang}`,
                        jumlah: total,
                        dibayar: jumlahDibayar,
                        sisa: sisaPembayaran,
                        status: sisaPembayaran > 0 ? 'Belum Lunas' : 'Lunas'
                    });
                }
            });

            alert('Transaksi penjualan berhasil disimpan!');

            // Reset form and cart
            salesForm.reset();
            salesCart = [];
            renderSalesCart();
            document.getElementById('noFaktur').value = generateNoFaktur();
            document.getElementById('pembayaranKreditRow').style.display = 'none';
            displayTransactions();
        });
    }

    // ===== PEMBELIAN MODULE =====
    const purchaseForm = document.getElementById('purchaseForm');
    if (purchaseForm) {
        purchaseForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Validasi cart tidak kosong
            if (purchaseCart.length === 0) {
                alert('Keranjang pembelian masih kosong! Tambahkan barang terlebih dahulu.');
                return;
            }

            // Get form data
            const tanggalBeli = document.getElementById('tanggalBeli').value;
            const divisiBeli = document.getElementById('divisiBeli').value;
            const namaSupplier = document.getElementById('namaSupplier').value;
            const alamatSupplier = document.getElementById('alamatSupplier').value;
            const noTeleponSupplier = document.getElementById('noTeleponSupplier').value;
            const npwpNikSupplier = document.getElementById('npwpNikSupplier').value;
            const metodePembayaranBeli = document.getElementById('metodePembayaranBeli').value;

            // Validasi
            if (!tanggalBeli || !validasiTanggal(tanggalBeli)) {
                alert('Tanggal tidak valid! Format: DD/MM/YYYY');
                return;
            }

            if (!divisiBeli || !namaSupplier || !metodePembayaranBeli) {
                alert('Mohon lengkapi semua data yang wajib diisi!');
                return;
            }

            // Get calculation values
            const subtotalBeli = parseFloat(document.getElementById('subtotalBeli').dataset.value) || 0;
            const diskonBeli = parseFloat(document.getElementById('diskonBeli').value) || 0;
            const nilaiPpnBeli = parseFloat(document.getElementById('nilaiPpnBeli').dataset.value) || 0;
            const totalBeli = parseFloat(document.getElementById('totalBeli').dataset.value) || 0;
            const jenisPpnBeli = document.getElementById('jenisPpnBeli').value;
            const uangMukaBeli = metodePembayaranBeli === 'Kredit' ? (parseFloat(document.getElementById('uangMukaBeli').value) || 0) : totalBeli;
            const sisaPembayaranBeli = metodePembayaranBeli === 'Kredit' ? (parseFloat(document.getElementById('sisaPembayaranBeli').dataset.value) || 0) : 0;

            // Save each item in cart as separate purchase
            purchaseCart.forEach(item => {
                const purchase = {
                    id: Date.now() + Math.random(),
                    tanggal: tanggalBeli,
                    noFaktur: generateNoFakturBeli(),
                    divisi: divisiBeli,
                    namaSupplier: namaSupplier,
                    alamat: alamatSupplier,
                    noTelepon: noTeleponSupplier,
                    npwpNik: npwpNikSupplier,
                    namaBarang: item.namaBarang,
                    kodeBarang: item.kodeBarang,
                    satuan: item.satuan,
                    jumlah: item.jumlah,
                    hargaSatuan: item.hargaSatuan,
                    subtotal: item.total,
                    diskon: diskonBeli,
                    jenisPpn: jenisPpnBeli,
                    nilaiPpn: nilaiPpnBeli,
                    total: totalBeli,
                    metodePembayaran: metodePembayaranBeli,
                    uangMuka: uangMukaBeli,
                    sisaPembayaran: sisaPembayaranBeli
                };

                purchases.push(purchase);

                // Save to hutang if kredit
                if (metodePembayaranBeli === 'Kredit' && sisaPembayaranBeli > 0) {
                    saveHutang({
                        tanggal: tanggalBeli,
                        sumber: 'Pembelian',
                        noFaktur: purchase.noFaktur,
                        namaSupplier: namaSupplier,
                        keterangan: `Pembelian ${item.namaBarang}`,
                        jumlah: totalBeli,
                        dibayar: uangMukaBeli,
                        sisa: sisaPembayaranBeli,
                        status: sisaPembayaranBeli > 0 ? 'Belum Lunas' : 'Lunas'
                    });
                }
            });

            // Save to localStorage
            localStorage.setItem('purchases', JSON.stringify(purchases));

            alert('Transaksi pembelian berhasil disimpan!');

            // Reset form and cart
            purchaseForm.reset();
            purchaseCart = [];
            renderPurchaseCart();
            document.getElementById('noFakturBeli').value = generateNoFakturBeli();
            document.getElementById('pembayaranKreditBeliRow').style.display = 'none';
            displayPurchases();
        });
    }

    // ===== CART BUTTONS =====
    const addItemBtn = document.getElementById('addItemBtn');
    if (addItemBtn) {
        addItemBtn.addEventListener('click', addItemToSalesCart);
    }

    const addItemBeliBtn = document.getElementById('addItemBeliBtn');
    if (addItemBeliBtn) {
        addItemBeliBtn.addEventListener('click', addItemToPurchaseCart);
    }

    // ===== AUTO CALCULATION =====
    // Penjualan
    const diskonInput = document.getElementById('diskon');
    const jenisPpnSelect = document.getElementById('jenisPpn');
    const metodePembayaranSelect = document.getElementById('metodePembayaran');
    const jumlahDibayarInput = document.getElementById('jumlahDibayar');

    if (diskonInput) diskonInput.addEventListener('input', hitungTotal);
    if (jenisPpnSelect) jenisPpnSelect.addEventListener('change', hitungTotal);
    if (jumlahDibayarInput) jumlahDibayarInput.addEventListener('input', hitungTotal);

    if (metodePembayaranSelect) {
        metodePembayaranSelect.addEventListener('change', function () {
            const kreditRow = document.getElementById('pembayaranKreditRow');
            if (this.value === 'Kredit') {
                kreditRow.style.display = 'flex';
            } else {
                kreditRow.style.display = 'none';
            }
            hitungTotal();
        });
    }

    // Pembelian
    const diskonBeliInput = document.getElementById('diskonBeli');
    const jenisPpnBeliSelect = document.getElementById('jenisPpnBeli');
    const metodePembayaranBeliSelect = document.getElementById('metodePembayaranBeli');
    const uangMukaBeliInput = document.getElementById('uangMukaBeli');

    if (diskonBeliInput) diskonBeliInput.addEventListener('input', hitungTotalBeli);
    if (jenisPpnBeliSelect) jenisPpnBeliSelect.addEventListener('change', hitungTotalBeli);
    if (uangMukaBeliInput) uangMukaBeliInput.addEventListener('input', hitungTotalBeli);

    if (metodePembayaranBeliSelect) {
        metodePembayaranBeliSelect.addEventListener('change', function () {
            const kreditRowBeli = document.getElementById('pembayaranKreditBeliRow');
            if (this.value === 'Kredit') {
                kreditRowBeli.style.display = 'flex';
            } else {
                kreditRowBeli.style.display = 'none';
            }
            hitungTotalBeli();
        });
    }

    // ===== TANGGAL FORMATTING =====
    const tanggalInput = document.getElementById('tanggal');
    const tanggalBeliInput = document.getElementById('tanggalBeli');

    if (tanggalInput) {
        tanggalInput.addEventListener('input', function () {
            formatTanggalInput(this);
        });
    }

    if (tanggalBeliInput) {
        tanggalBeliInput.addEventListener('input', function () {
            formatTanggalInput(this);
        });
    }

    // ===== AUTOCOMPLETE SETUP =====
    setupAutocomplete();

    // ===== PIUTANG MODULE =====
    const piutangForm = document.getElementById('piutangForm');
    if (piutangForm) {
        piutangForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const tanggal = document.getElementById('tanggalPiutang').value;
            const namaPelanggan = document.getElementById('namaPelangganPiutang').value;
            const keterangan = document.getElementById('keteranganPiutang').value;
            const jumlah = parseFloat(document.getElementById('jumlahPiutang').value) || 0;
            const dibayar = parseFloat(document.getElementById('dibayarPiutang').value) || 0;

            if (!tanggal || !validasiTanggal(tanggal) || !namaPelanggan || jumlah <= 0) {
                alert('Mohon lengkapi semua data dengan benar!');
                return;
            }

            savePiutang({
                tanggal: tanggal,
                sumber: 'Saldo Awal',
                noFaktur: 'SA-' + Date.now(),
                namaPelanggan: namaPelanggan,
                keterangan: keterangan,
                jumlah: jumlah,
                dibayar: dibayar,
                sisa: jumlah - dibayar,
                status: (jumlah - dibayar) > 0 ? 'Belum Lunas' : 'Lunas'
            });

            alert('Saldo awal piutang berhasil disimpan!');
            piutangForm.reset();
            displayPiutang();
        });
    }

    // ===== HUTANG MODULE =====
    const hutangForm = document.getElementById('hutangForm');
    if (hutangForm) {
        hutangForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const tanggal = document.getElementById('tanggalHutang').value;
            const namaSupplier = document.getElementById('namaSupplierHutang').value;
            const keterangan = document.getElementById('keteranganHutang').value;
            const jumlah = parseFloat(document.getElementById('jumlahHutang').value) || 0;
            const dibayar = parseFloat(document.getElementById('dibayarHutang').value) || 0;

            if (!tanggal || !validasiTanggal(tanggal) || !namaSupplier || jumlah <= 0) {
                alert('Mohon lengkapi semua data dengan benar!');
                return;
            }

            saveHutang({
                tanggal: tanggal,
                sumber: 'Saldo Awal',
                noFaktur: 'SA-' + Date.now(),
                namaSupplier: namaSupplier,
                keterangan: keterangan,
                jumlah: jumlah,
                dibayar: dibayar,
                sisa: jumlah - dibayar,
                status: (jumlah - dibayar) > 0 ? 'Belum Lunas' : 'Lunas'
            });

            alert('Saldo awal hutang berhasil disimpan!');
            hutangForm.reset();
            displayHutang();
        });
    }

    // ===== KAS MODULE =====
    const kasForm = document.getElementById('kasForm');
    if (kasForm) {
        kasForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const tanggal = document.getElementById('tanggalKas').value;
            const kategori = document.getElementById('kategoriKas').value;
            const keterangan = document.getElementById('keteranganKas').value;
            const jenis = document.getElementById('jenisKas').value;
            const jumlah = parseFloat(document.getElementById('jumlahKas').value) || 0;

            if (!tanggal || !validasiTanggal(tanggal) || !kategori || !jenis || jumlah <= 0) {
                alert('Mohon lengkapi semua data dengan benar!');
                return;
            }

            saveKas({
                tanggal: tanggal,
                kategori: kategori,
                keterangan: keterangan,
                jenis: jenis,
                jumlah: jumlah,
                saldo: hitungSaldoKas()
            });

            alert('Transaksi kas berhasil disimpan!');
            kasForm.reset();
            displayKas();
        });
    }

    // ===== FILTER BUTTONS =====
    // Sales filters
    const resetFilterBtn = document.getElementById('resetFilterBtn');
    if (resetFilterBtn) {
        resetFilterBtn.addEventListener('click', function () {
            document.getElementById('searchInput').value = '';
            document.getElementById('startDate').value = '';
            document.getElementById('endDate').value = '';
            displayTransactions();
        });
    }

    // Purchase filters
    const resetPurchaseFilterBtn = document.getElementById('resetPurchaseFilterBtn');
    if (resetPurchaseFilterBtn) {
        resetPurchaseFilterBtn.addEventListener('click', function () {
            document.getElementById('searchPurchaseInput').value = '';
            document.getElementById('startPurchaseDate').value = '';
            document.getElementById('endPurchaseDate').value = '';
            displayPurchases();
        });
    }

    // Piutang filters
    const resetPiutangFilterBtn = document.getElementById('resetPiutangFilterBtn');
    if (resetPiutangFilterBtn) {
        resetPiutangFilterBtn.addEventListener('click', function () {
            document.getElementById('searchPiutangInput').value = '';
            document.getElementById('statusPiutangFilter').value = '';
            displayPiutang();
        });
    }

    // Hutang filters
    const resetHutangFilterBtn = document.getElementById('resetHutangFilterBtn');
    if (resetHutangFilterBtn) {
        resetHutangFilterBtn.addEventListener('click', function () {
            document.getElementById('searchHutangInput').value = '';
            document.getElementById('statusHutangFilter').value = '';
            displayHutang();
        });
    }

    // Purchase filter inputs
    const searchPurchaseInput = document.getElementById('searchPurchaseInput');
    const startPurchaseDate = document.getElementById('startPurchaseDate');
    const endPurchaseDate = document.getElementById('endPurchaseDate');

    if (searchPurchaseInput) searchPurchaseInput.addEventListener('input', filterPurchases);
    if (startPurchaseDate) startPurchaseDate.addEventListener('change', filterPurchases);
    if (endPurchaseDate) endPurchaseDate.addEventListener('change', filterPurchases);

    // Piutang filter inputs
    const searchPiutangInput = document.getElementById('searchPiutangInput');
    const statusPiutangFilter = document.getElementById('statusPiutangFilter');

    if (searchPiutangInput) searchPiutangInput.addEventListener('input', filterPiutang);
    if (statusPiutangFilter) statusPiutangFilter.addEventListener('change', filterPiutang);

    // Hutang filter inputs
    const searchHutangInput = document.getElementById('searchHutangInput');
    const statusHutangFilter = document.getElementById('statusHutangFilter');

    if (searchHutangInput) searchHutangInput.addEventListener('input', filterHutang);
    if (statusHutangFilter) statusHutangFilter.addEventListener('change', filterHutang);

    // ===== GLOBAL SEARCH =====
    const inputGlobalSearch = document.getElementById('inputGlobalSearch');
    if (inputGlobalSearch) {
        inputGlobalSearch.addEventListener('input', performGlobalSearch);
    }

    // ===== BUKU BESAR TAB =====
    const akunSelect = document.getElementById('akunSelect');
    const filterBukuBesarBtn = document.getElementById('filterBukuBesarBtn');
    const resetBukuBesarBtn = document.getElementById('resetBukuBesarBtn');

    if (filterBukuBesarBtn) {
        filterBukuBesarBtn.addEventListener('click', function () {
            const akun = akunSelect ? akunSelect.value : '';
            const startDate = document.getElementById('startDateBukuBesar') ? document.getElementById('startDateBukuBesar').value : '';
            const endDate = document.getElementById('endDateBukuBesar') ? document.getElementById('endDateBukuBesar').value : '';
            filterBukuBesar(akun, startDate, endDate);
        });
    }

    if (resetBukuBesarBtn) {
        resetBukuBesarBtn.addEventListener('click', function () {
            if (akunSelect) akunSelect.value = '';
            const startDateBB = document.getElementById('startDateBukuBesar');
            const endDateBB = document.getElementById('endDateBukuBesar');
            if (startDateBB) startDateBB.value = '';
            if (endDateBB) endDateBB.value = '';
            displayBukuBesar();
        });
    }

    // ===== INITIALIZE DISPLAYS =====
    // Set initial invoice numbers
    const noFaktur = document.getElementById('noFaktur');
    if (noFaktur) noFaktur.value = generateNoFaktur();

    const noFakturBeli = document.getElementById('noFakturBeli');
    if (noFakturBeli) noFakturBeli.value = generateNoFakturBeli();

    // Set current date
    const today = new Date();
    const formattedDate = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;

    if (tanggalInput) tanggalInput.value = formattedDate;
    if (tanggalBeliInput) tanggalBeliInput.value = formattedDate;

    const tanggalPiutangInput = document.getElementById('tanggalPiutang');
    if (tanggalPiutangInput) tanggalPiutangInput.value = formattedDate;

    const tanggalHutangInput = document.getElementById('tanggalHutang');
    if (tanggalHutangInput) tanggalHutangInput.value = formattedDate;

    const tanggalKasInput = document.getElementById('tanggalKas');
    if (tanggalKasInput) tanggalKasInput.value = formattedDate;

    // Display initial data
    displayTransactions();
    displayCustomers();
    displaySuppliers();
    displayBarang();

    console.log('Application initialized successfully!');
});

// Function to generate purchase invoice number
function generateNoFakturBeli() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    // Count today's purchases
    const todayPurchases = purchases.filter(p => {
        const pDate = p.tanggal.split('/').reverse().join('');
        const nowDate = `${year}${month}${day}`;
        return pDate === nowDate;
    });

    const urutan = String(todayPurchases.length + 1).padStart(4, '0');
    return `NPB-${year}${month}${day}-${urutan}`;
}
