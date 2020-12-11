import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCkh1kC3YXQL4C6tIenRWzxQNnaaQOAGNo",
  authDomain: "invoice-38e1a.firebaseapp.com",
  databaseURL: "https://invoice-38e1a.firebaseio.com",
  projectId: "invoice-38e1a",
  storageBucket: "invoice-38e1a.appspot.com",
  messagingSenderId: "607215803369",
  appId: "1:607215803369:web:7ca9b537086aa5a0268978",
  measurementId: "G-NBBPJR8NBM",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
