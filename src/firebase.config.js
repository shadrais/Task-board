import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firestore/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCki22FXWFVoB3VNLr1qardmfT0FuBcwCc',
  authDomain: 'task-board-e0de9.firebaseapp.com',
  projectId: 'task-board-e0de9',
  storageBucket: 'task-board-e0de9.appspot.com',
  messagingSenderId: '960685562800',
  appId: '1:960685562800:web:411f9700891aa35262d475',
}

// Initialize Firebase
initializeApp(firebaseConfig)

export const db = { getFirestore }
