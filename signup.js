import { handleSignup } from "./auth.js";
import { validateForm } from "./validation.js";
import { db } from "./firebase-config.js"; 
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('form');
    const usernameInput = document.getElementById('username-input');
    const firstnameInput = document.getElementById('firstname-input');  
    const emailInput = document.getElementById('email-input');
    const passwordInput = document.getElementById('password-input');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const inputs = {
            username: usernameInput.value.trim(),
            firstname: firstnameInput.value.trim(),  
            email: emailInput.value.trim(),
            password: passwordInput.value.trim()
        };

        const errors = validateForm(inputs);
        if (errors.length > 0) {
            alert(errors.join("\n"));
            return;
        }

        handleSignup(inputs.email, inputs.password)
            .then((userCredential) => {
                const user = userCredential.user;
                localStorage.setItem("firstname", inputs.firstname); 
                localStorage.setItem("loggedIn", "true");

              
                return setDoc(doc(db, "users", user.uid), {
                    username: inputs.username,
                    firstname: inputs.firstname,
                    email: inputs.email
                });
            })
            .then(() => {
                alert("Account created successfully!");
                window.location.href = 'index.html';
            })
            .catch(error => {
                alert("Signup error: " + error.message);
            });
    });
});

document.getElementById('nav0').addEventListener("click", () => {
    window.location.href = "index.html";
});
