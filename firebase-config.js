import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

const firebaseConfig = { 
    apiKey: "AIzaSyAeLuGmSKT3uv9YMXv6R4IjDyGtZGWhUeE",
    authDomain: "empowerme-8a5dd.firebaseapp.com",
    projectId: "empowerme-8a5dd",
    storageBucket: "empowerme-8a5dd.appspot.com",
    messagingSenderId: "60636766840",
    appId: "1:60636766840:web:03fe31e8614fe5cd09c38d"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); 

export { auth, db };
