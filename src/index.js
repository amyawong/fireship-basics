import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: "AIzaSyD-698E5DP4bwqLfPrI9QsNao77rUE8W_k",
  authDomain: "fir-basics-94297.firebaseapp.com",
  projectId: "fir-basics-94297",
  storageBucket: "fir-basics-94297.appspot.com",
  messagingSenderId: "485705082808",
  appId: "1:485705082808:web:9f0d9c670958b04af4514d",
  measurementId: "G-K74E73JWPK"
}; // determines which project to connect to

initializeApp(firebaseConfig) // connects to firebase backend