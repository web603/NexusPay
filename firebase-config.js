// firebase-config.js - Centralized Security & Database Initialization
const firebaseConfig = {
    apiKey: "AIzaSyCrbBwe1XadgH-wY1SID1o7i5bRRNhhnTo",
    authDomain: "nexuspay-470bc.firebaseapp.com",
    projectId: "nexuspay-470bc",
    storageBucket: "nexuspay-470bc.firebasestorage.app",
    messagingSenderId: "159652664896",
    appId: "1:159652664896:web:aac19077c917114ffe31a5",
    measurementId: "G-TVPPK8FH6P"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Security Input Sanitization (Strips harmful markup tags)
function sanitizeInput(str) {
    if (typeof str !== 'string') return str;
    return str.replace(/[<>'"&/\\;()]/g, "").trim();
}

// Strict whitelist character validation (letters, numbers, @, dot, dash, underscore only)
function isValidAttributeInput(str) {
    if (typeof str !== 'string') return false;
    const strictRegex = /^[a-zA-Z0-9@._-]+$/;
    return strictRegex.test(str);
}

// Universal Toast Engine
function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    
    const toast = document.createElement('div');
    toast.className = `glass-panel px-5 py-4 rounded-2xl flex items-center space-x-3 pointer-events-auto transform translate-y-2 opacity-0 transition-all duration-300 shadow-2xl border-l-4`;
    
    let colorClass = 'border-l-teal-500';
    let icon = 'info';
    if (type === 'success') {
        colorClass = 'border-l-emerald-500';
        icon = 'check-circle';
    } else if (type === 'error') {
        colorClass = 'border-l-rose-500';
        icon = 'alert-triangle';
    }

    toast.classList.add(colorClass);
    toast.innerHTML = `
        <i data-lucide="${icon}" class="w-5 h-5 text-teal-600 dark:text-teal-400 shrink-0"></i>
        <span class="text-xs font-bold text-[var(--text-main)]">${message}</span>
    `;

    container.appendChild(toast);
    lucide.createIcons();

    setTimeout(() => {
        toast.classList.remove('translate-y-2', 'opacity-0');
    }, 10);

    setTimeout(() => {
        toast.classList.add('translate-y-2', 'opacity-0');
        setTimeout(() => { toast.remove(); }, 300);
    }, 4000);
}