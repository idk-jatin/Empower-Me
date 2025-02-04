// auth.js
import { auth } from "./firebase-config.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

export function handleSignup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
}

export function handleLogin(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
}

// auth.js

export function handleLogout() {
    signOut(auth)
        .then(() => {
            localStorage.removeItem("loggedIn");
            localStorage.removeItem("firstname"); 
            alert("Logged out successfully!");
            window.location.href = "index.html";  
        })
        .catch(error => {
            alert("Failed to logout. Try again.");
        });
}


document.addEventListener("DOMContentLoaded", () => {
    const logoutButton = document.getElementById("logoutButton");
    if (logoutButton) {
        logoutButton.addEventListener("click", () => {
            handleLogout();
        });
    }
});
