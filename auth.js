// Authentication Module - Simplified & Fixed
import { auth, database } from './firebase-config.js';
import { onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { ref, set, get } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js';

// Flags to prevent redirect loops
let authCheckDone = false;
let isRedirecting = false;

// Check Auth & Redirect (Called from index.html)
export async function checkAuth() {
    if (authCheckDone) return; // Prevent multiple checks

    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            unsubscribe(); // Unsubscribe immediately!
            authCheckDone = true;

            if (user) {
                console.log('✅ User authenticated:', user.email);
                resolve(user);
            } else {
                console.log('❌ Not authenticated, redirecting...');
                if (!isRedirecting) {
                    isRedirecting = true;
                    sessionStorage.clear();
                    window.location.replace('login.html');
                }
                reject('Not authenticated');
            }
        });
    });
}

// Logout Function
export async function logout() {
    try {
        console.log('🚪 Logging out...');
        isRedirecting = true;

        // Sync data before logout
        await syncWithFirebase();

        // Sign out from Firebase
        await signOut(auth);

        // Clear all storage
        sessionStorage.clear();
        localStorage.clear();

        // Redirect to login
        window.location.replace('login.html');
    } catch (error) {
        console.error('Logout error:', error);
        isRedirecting = false;
        alert('Gagal logout: ' + error.message);
    }
}

// Sync localStorage to Firebase
export async function syncWithFirebase() {
    try {
        const userId = auth.currentUser?.uid;
        if (!userId) {
            console.log('⚠️  No user, skipping sync');
            return;
        }

        const localData = {
            transactions: JSON.parse(localStorage.getItem('transactions') || '[]'),
            purchases: JSON.parse(localStorage.getItem('purchases') || '[]'),
            dataPiutang: JSON.parse(localStorage.getItem('dataPiutang') || '[]'),
            dataHutang: JSON.parse(localStorage.getItem('dataHutang') || '[]'),
            dataKas: JSON.parse(localStorage.getItem('dataKas') || '[]'),
            dataJurnal: JSON.parse(localStorage.getItem('dataJurnal') || '[]'),
            dataMasterCustomer: JSON.parse(localStorage.getItem('dataMasterCustomer') || '[]'),
            dataMasterSupplier: JSON.parse(localStorage.getItem('dataMasterSupplier') || '[]'),
            dataMasterBarang: JSON.parse(localStorage.getItem('dataMasterBarang') || '[]')
        };

        const dataRef = ref(database, `users/${userId}/data`);
        await set(dataRef, {
            ...localData,
            lastSync: Date.now(),
            syncBy: auth.currentUser?.email
        });

        console.log('✅ Data synced to Firebase');
    } catch (error) {
        console.error('❌ Sync error:', error);
    }
}

// Load data from Firebase to localStorage
export async function loadFromFirebase() {
    try {
        const userId = auth.currentUser?.uid;
        if (!userId) {
            console.log('⚠️  No user, skipping load');
            return;
        }

        const dataRef = ref(database, `users/${userId}/data`);
        const snapshot = await get(dataRef);

        if (snapshot.exists()) {
            const data = snapshot.val();
            localStorage.setItem('transactions', JSON.stringify(data.transactions || []));
            localStorage.setItem('purchases', JSON.stringify(data.purchases || []));
            localStorage.setItem('dataPiutang', JSON.stringify(data.dataPiutang || []));
            localStorage.setItem('dataHutang', JSON.stringify(data.dataHutang || []));
            localStorage.setItem('dataKas', JSON.stringify(data.dataKas || []));
            localStorage.setItem('dataJurnal', JSON.stringify(data.dataJurnal || []));
            localStorage.setItem('dataMasterCustomer', JSON.stringify(data.dataMasterCustomer || []));
            localStorage.setItem('dataMasterSupplier', JSON.stringify(data.dataMasterSupplier || []));
            localStorage.setItem('dataMasterBarang', JSON.stringify(data.dataMasterBarang || []));
            console.log('✅ Data loaded from Firebase');
        } else {
            console.log('ℹ️  No data in Firebase yet');
        }
    } catch (error) {
        console.error('❌ Load error:', error);
    }
}

// Auto-sync every 5 minutes
let syncInterval;
export function startAutoSync() {
    console.log('🔄 Starting auto-sync (every 5 min)');
    syncInterval = setInterval(() => {
        syncWithFirebase();
    }, 5 * 60 * 1000);
}

export function stopAutoSync() {
    if (syncInterval) {
        clearInterval(syncInterval);
        console.log('⏹️  Auto-sync stopped');
    }
}

// Export auth & database for direct use
export { auth, database };
