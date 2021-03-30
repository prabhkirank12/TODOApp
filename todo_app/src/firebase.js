import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyB6Q8j99_NL4lvYCzs0fLaV4kvuDd4y_6Q",
    authDomain: "todo-app-397e2.firebaseapp.com",
    projectId: "todo-app-397e2",
    storageBucket: "todo-app-397e2.appspot.com",
    messagingSenderId: "498172301284",
    appId: "1:498172301284:web:aae5c3434a2083d848c1f1",
    measurementId: "G-V8R3089VV2"
});

const db = firebaseApp.firestore();

export { db };