// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";       // استيراد auth
import { getAnalytics } from "firebase/analytics";

// إعدادات Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCaTpjBBbdbzfIkKGfWrNEjDD2sxaDGSjU",
  authDomain: "todo-app-9b59b.firebaseapp.com",
  projectId: "todo-app-9b59b",
  storageBucket: "todo-app-9b59b.appspot.com",
  messagingSenderId: "460444278286",
  appId: "1:460444278286:web:1473b71d02c01f3a73a65f",
  measurementId: "G-W5MYXEBMFY",
};

// تهيئة Firebase
const app = initializeApp(firebaseConfig);

// تهيئة Firestore
const db = getFirestore(app);

// تهيئة Authentication
const auth = getAuth(app);

// (اختياري) التحليلات
const analytics = getAnalytics(app);

// تصدير auth و db
export { auth, db };
