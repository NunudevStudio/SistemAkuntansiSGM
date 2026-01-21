// Firebase Configuration & Initialization
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { getDatabase } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js';

const firebaseConfig = {
    apiKey: "AIzaSyC5URazlk3LjVqmnIvEL9dzYYII9P2kmbA",
    authDomain: "sistem-akuntansi-sgm.firebaseapp.com",
    databaseURL: "https://sistem-akuntansi-sgm-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "sistem-akuntansi-sgm",
    storageBucket: "sistem-akuntansi-sgm.firebasestorage.app",
    messagingSenderId: "757127370866",
    appId: "1:757127370866:web:96909bb1273db0211e8aeb",
    measurementId: "G-MQ8330PEG1"
};

// Initialize Firebase (ONCE!)
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// Export everything
export { auth, database };
export default firebaseConfig;

