
document.addEventListener("DOMContentLoaded", () => {
    const loginButton = document.getElementById("loginbutton");
    const profileButton = document.getElementById("indnavprofile");
    const profileText = document.getElementById("profile-text"); 
    const logoutButton = document.getElementById("logoutButton");

    function updateNavbar() {
        const isLoggedIn = localStorage.getItem("loggedIn") === "true";
        const firstname = localStorage.getItem("firstname") || "User"; 

        if (isLoggedIn) {
            loginButton.style.display = "none";  
            profileButton.style.display = "flex"; 
            profileText.textContent = `Hello, ${firstname.toUpperCase()}`; 
            logoutButton.style.display = "block"; 
        } else {
            loginButton.style.display = "block";  
            profileButton.style.display = "none"; 
            logoutButton.style.display = "none";  
        }
    }

    updateNavbar();
});
