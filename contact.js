

    const form = document.getElementById("contact-form");
    const statusMessage = document.getElementById("status-message");

    form.addEventListener("submit", function(event) {
        event.preventDefault(); 
        // statusMessage.textContent = "Sending...";
        // statusMessage.style.color = "blue";

        let parameters = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            subject: document.getElementById("subject").value,
            message: document.getElementById("message").value
        };

        emailjs.send("service_tfyes61", "template_n940i2s", parameters)
            .then(() => {
                statusMessage.textContent = "Message sent successfully! ✔️";
                statusMessage.style.color = "green";
                form.reset();
            })
            .catch((error) => {
                statusMessage.textContent = "Failed to send message. ❌ Try again.";
                statusMessage.style.color = "red";
                console.error("EmailJS Error:", error);
            });
    });

    document.getElementById("back").addEventListener("click",()=>{
        window.location.href='index.html'
    })