import { db, auth } from "./firebase-config.js"; 
import { doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js"; 



document.addEventListener("DOMContentLoaded", () => {
    
    auth.onAuthStateChanged(user => {
       
        if (!user) {
            alert("No user logged in!");
            window.location.href = "login.html";  
            return;
        }

   
        getDoc(doc(db, "users", user.uid))  
            .then(docSnapshot => {
                if (docSnapshot.exists()) {
                    const userData = docSnapshot.data();

                 
                    document.getElementById("full-name").textContent = userData.firstname;
                    document.getElementById("email").textContent = userData.email;
                    document.getElementById("username").textContent = userData.username;

                   
                    const skillsList = document.getElementById("skills-list");
                    if (userData.skills) {
                        userData.skills.forEach(skill => {
                            const skillTag = document.createElement("span");
                            skillTag.classList.add("skill-tag");
                            skillTag.textContent = skill;
                            skillsList.appendChild(skillTag);
                        });
                    }

                 
                    if (userData.profilePicture) {
                        document.getElementById("profile-pic").src = userData.profilePicture;
                    }

              
                    if (userData.cvLink) {
                        document.getElementById("cv-link").href = userData.cvLink;
                    }

                 
                    if (userData.jobAim) {
                        document.getElementById("job-aim-display").textContent = `${userData.jobAim}`;
                    }
                } else {
                    alert("User data not found in Firestore.");
                    window.location.href = "login.html"; 
                }
            })
            .catch(error => {
                alert("Error fetching profile data: " + error.message);
            });
    });
});


document.getElementById("edit-profile-btn").addEventListener("click", () => {
    document.getElementById("edit-modal").style.display = "flex"; 
});

// Event listener for closing the modal
document.getElementById("close-modal").addEventListener("click", () => {
    document.getElementById("edit-modal").style.display = "none"; 
});

// Handle Profile Update
document.getElementById("edit-profile-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const user = auth.currentUser; 

    if (!user) {
        alert("No user logged in!");
        window.location.href = "login.html";  
        return;
    }

  
    const newFullName = document.getElementById("new-name").value;
    const newEmail = document.getElementById("new-email").value;
    const newJobAim = document.getElementById("new-job-aim").value;
    const newSkills = []; 
    document.querySelectorAll("#skills-container .skill-tag").forEach(skillTag => {
        newSkills.push(skillTag.getAttribute("data-skill"));
    });

    const profilePicInput = document.getElementById("new-profile-pic").files[0];
    const cvInput = document.getElementById("new-cv").files[0];


    let newProfilePicture = null;
    let newCVLink = null;

    if (profilePicInput) {
        const profilePicURL = URL.createObjectURL(profilePicInput);  
        newProfilePicture = profilePicURL;
    }

    if (cvInput) {
        const cvURL = URL.createObjectURL(cvInput); 
        newCVLink = cvURL;
    }

   
    setDoc(doc(db, "users", user.uid), {  
        firstname: newFullName,
        email: newEmail,
        jobAim: newJobAim,
        skills: newSkills,
        profilePicture: newProfilePicture,
        cvLink: newCVLink
    }, { merge: true })
        .then(() => {
            alert("Profile updated successfully!");
            window.location.href = "profile.html";  
        })
        .catch(error => {
            alert("Error updating profile: " + error.message);
        });
});


document.getElementById("back").addEventListener("click",()=>{
    window.location.href='index.html'
})
document.addEventListener("DOMContentLoaded", function () {
    const skillsList = [
        "JavaScript", "Python", "Java", "C++", "React", "Node.js", "SQL", "MongoDB", "Firebase",
        "Machine Learning", "Data Science", "HTML", "CSS", "Django", "Flask"
    ];

    const jobAimsList = [
        "Software Engineer", "Data Scientist", "AI Engineer", "Web Developer", "Mobile Developer",
        "DevOps Engineer", "UI/UX Designer", "Cybersecurity Analyst", "Cloud Architect",
        "Game Developer", "Product Manager", "Embedded Systems Engineer"
    ];

    const skillInput = document.getElementById("skill-input");
    const skillsContainer = document.getElementById("skills-container");
    const jobAimInput = document.getElementById("new-job-aim");

  
    const suggestionsBox = document.createElement("div");
    suggestionsBox.setAttribute("id", "suggestions-box");
    suggestionsBox.classList.add("suggestions-container");
    skillInput.parentNode.appendChild(suggestionsBox);

    const jobAimSuggestions = document.createElement("div");
    jobAimSuggestions.setAttribute("id", "job-aim-suggestions");
    jobAimSuggestions.classList.add("suggestions-container");
    jobAimInput.parentNode.appendChild(jobAimSuggestions);

   
    skillInput.addEventListener("input", function () {
        showSuggestions(skillInput, skillsList, suggestionsBox, addSkill);
    });

  
    jobAimInput.addEventListener("input", function () {
        showSuggestions(jobAimInput, jobAimsList, jobAimSuggestions, selectJobAim);
    });

   
    function showSuggestions(inputElement, list, suggestionBox, callback) {
        const input = inputElement.value.toLowerCase();
        suggestionBox.innerHTML = "";

        if (input.length > 0) {
            const filteredList = list.filter(item => item.toLowerCase().includes(input));

            filteredList.forEach(item => {
                const suggestion = document.createElement("div");
                suggestion.classList.add("suggestion");
                suggestion.textContent = item;
                suggestion.addEventListener("click", function () {
                    callback(item);
                    inputElement.value = "";
                    suggestionBox.innerHTML = "";
                });
                suggestionBox.appendChild(suggestion);
            });

         
            const rect = inputElement.getBoundingClientRect();
            suggestionBox.style.top = `${rect.bottom +5+ window.scrollY}px`;
            suggestionBox.style.left = `${rect.left + window.scrollX}px`;
            suggestionBox.style.width = `${rect.width}px`;
            suggestionBox.style.display = "block";
        } else {
            suggestionBox.style.display = "none";
        }
    }

  
    function addSkill(skill) {
        if (!document.querySelector(`#skills-container div[data-skill='${skill}']`)) {
            const skillTag = document.createElement("div");
            skillTag.classList.add("skill-tag");
            skillTag.setAttribute("data-skill", skill);
            skillTag.textContent = skill;

            const removeBtn = document.createElement("span");
            removeBtn.textContent = " ×";
            removeBtn.classList.add("remove-skill");
            removeBtn.addEventListener("click", function () {
                skillTag.remove();
            });

            skillTag.appendChild(removeBtn);
            skillsContainer.appendChild(skillTag);
        }
    }

 
    function selectJobAim(jobAim) {
        jobAimInput.value = jobAim;
    }

    document.addEventListener("click", function (event) {
        if (!skillInput.contains(event.target) && !suggestionsBox.contains(event.target)) {
            suggestionsBox.style.display = "none";
        }
        if (!jobAimInput.contains(event.target) && !jobAimSuggestions.contains(event.target)) {
            jobAimSuggestions.style.display = "none";
        }
    });
});

