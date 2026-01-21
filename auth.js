// Authentication Module
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getAuth, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { getDatabase, ref, set, get, push, update, remove } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js';
import firebaseConfig from './firebase-config.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// Check authentication status
function checkAuth() {
    return new Promise((resolve, reject) => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log('User authenticated:', user.email);
                resolve(user);
            } else {
                console.log('User not authenticated, redirecting to login...');
                window.location.href = 'login.html';
                reject('Not authenticated');
            }
        });
    });
}

// Logout function
async function logout() {
    try {
        await signOut(auth);
        sessionStorage.clear();
        localStorage.clear();
        window.location.href = 'login.html';
    } catch (error) {
        console.error('Logout error:', error);
        alert('Gagal logout: ' + error.message);
    }
}

// Database Functions
const db = {
    // Save data
    async save(path, data) {
        try {
            const dataRef = ref(database, path);
            await set(dataRef, {
                ...data,
                timestamp: Date.now(),
                updatedBy: auth.currentUser?.email || 'system'
            });
            console.log('Data saved successfully to:', path);
            return true;
        } catch (error) {
            console.error('Error saving data:', error);
            throw error;
        }
    },

    // Push data (generate unique ID)
    async push(path, data) {
        try {
            const dataRef = ref(database, path);
            const newRef = push(dataRef);
            await set(newRef, {
                ...data,
                id: newRef.key,
                timestamp: Date.now(),
                createdBy: auth.currentUser?.email || 'system'
            });
            console.log('Data pushed successfully to:', path, 'with ID:', newRef.key);
            return newRef.key;
        } catch (error) {
            console.error('Error pushing data:', error);
            throw error;
        }
    },

    // Get data
    async get(path) {
        try {
            const dataRef = ref(database, path);
            const snapshot = await get(dataRef);
            if (snapshot.exists()) {
                return snapshot.val();
            } else {
                console.log('No data found at:', path);
                return null;
            }
        } catch (error) {
            console.error('Error getting data:', error);
            throw error;
        }
    },

    // Update data
    async update(path, data) {
        try {
            const dataRef = ref(database, path);
            await update(dataRef, {
                ...data,
                lastUpdated: Date.now(),
                updatedBy: auth.currentUser?.email || 'system'
            });
            console.log('Data updated successfully at:', path);
            return true;
        } catch (error) {
            console.error('Error updating data:', error);
            throw error;
        }
    },

    // Delete data
    async delete(path) {
        try {
            const dataRef = ref(database, path);
            await remove(dataRef);
            console.log('Data deleted successfully at:', path);
            return true;
        } catch (error) {
            console.error('Error deleting data:', error);
            throw error;
        }
    }
};

// Sync localStorage with Firebase
async function syncWithFirebase() {
    try {
        const userId = auth.currentUser?.uid;
        if (!userId) return;

        // Get all data from localStorage
        const localData = {
            transactions: JSON.parse(localStorage.getItem('transactions')) || [],
            purchases: JSON.parse(localStorage.getItem('purchases')) || [],
            dataPiutang: JSON.parse(localStorage.getItem('dataPiutang')) || [],
            dataHutang: JSON.parse(localStorage.getItem('dataHutang')) || [],
            dataKas: JSON.parse(localStorage.getItem('dataKas')) || [],
            dataJurnal: JSON.parse(localStorage.getItem('dataJurnal')) || []
        };

        // Save to Firebase
        await db.save(`users/${userId}/data`, localData);
        console.log('Data synced to Firebase successfully');

    } catch (error) {
        console.error('Sync error:', error);
    }
}

// Load data from Firebase to localStorage
async function loadFromFirebase() {
    try {
        const userId = auth.currentUser?.uid;
        if (!userId) return;

        const data = await db.get(`users/${userId}/data`);
        if (data) {
            localStorage.setItem('transactions', JSON.stringify(data.transactions || []));
            localStorage.setItem('purchases', JSON.stringify(data.purchases || []));
            localStorage.setItem('dataPiutang', JSON.stringify(data.dataPiutang || []));
            localStorage.setItem('dataHutang', JSON.stringify(data.dataHutang || []));
            localStorage.setItem('dataKas', JSON.stringify(data.dataKas || []));
            localStorage.setItem('dataJurnal', JSON.stringify(data.dataJurnal || []));
            console.log('Data loaded from Firebase successfully');
        }
    } catch (error) {
        console.error('Load from Firebase error:', error);
    }
}

// Auto-sync every 5 minutes
let syncInterval;
function startAutoSync() {
    syncInterval = setInterval(() => {
        syncWithFirebase();
    }, 5 * 60 * 1000); // 5 minutes
}

function stopAutoSync() {
    if (syncInterval) {
        clearInterval(syncInterval);
    }
}

// Export functions
export {
    auth,
    database,
    db,
    checkAuth,
    logout,
    syncWithFirebase,
    loadFromFirebase,
    startAutoSync,
    stopAutoSync
};
