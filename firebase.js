// ================================
// StudyShare - Firebase Configuration
// ================================

import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  where,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


// ================================
// Firebase Configuration
// ================================

const firebaseConfig = {
  apiKey: "AIzaSyAysQGKQEM0VpwcvBxQAzf6fgVUNsAYR9I",
  authDomain: "studyshare-web.firebaseapp.com",
  projectId: "studyshare-web",
  storageBucket: "studyshare-web.firebasestorage.app",
  messagingSenderId: "633859232747",
  appId: "1:633859232747:web:c5dfb1458d6335c81a7fae",
  measurementId: "G-48LKQMQ9E6"
};


// ================================
// Initialize Firebase
// ================================

const app = initializeApp(firebaseConfig);


// ================================
// Authentication
// ================================

const auth = getAuth(app);


// ================================
// Firestore Database
// ================================

const db = getFirestore(app);


// ================================
// Export
// ================================

export {
  app,
  auth,
  db,

  // Authentication
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,

  // Firestore
  collection,
  addDoc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  where,
  serverTimestamp
};
