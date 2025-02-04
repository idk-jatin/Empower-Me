import { handleLogin } from "./auth.js";
import { validateForm } from "./validation.js";
import { db } from "./firebase-config.js";
import { doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('form');
    const emailInput = document.getElementById('email-input');
    const passwordInput = document.getElementById('password-input');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const inputs = {
            email: emailInput.value.trim(),
            password: passwordInput.value.trim()
        };

        const errors = validateForm(inputs);
        if (errors.length > 0) {
            alert(errors.join("\n"));
            return;
        }

        handleLogin(inputs.email, inputs.password)
            .then(async (userCredential) => {
                const userId = userCredential.user.uid;
                const userEmail = userCredential.user.email;

                const userDocRef = doc(db, "users", userId);
                const userDoc = await getDoc(userDocRef);

                let firstname;

                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    firstname = userData.firstname || "User";  
                } else {
                    firstname = "User";  
                    await setDoc(userDocRef, {
                        email: userEmail,
                        firstname: firstname,  
                        skills: [],
                        jobAim: "",
                        profilePicture: "",
                        cvLink: ""
                    }, { merge: true });
                }

                localStorage.setItem("loggedIn", "true");
                localStorage.setItem("firstname", firstname.split(' ')[0]);

                alert(`Logged in successfully!`);
                window.location.href = 'index.html';  
            })
            .catch(error => {
                alert("Login failed: " + error.message);
            });
    });
});

document.getElementById('nav0').addEventListener("click",()=>{
    window.location.href = "index.html"
})