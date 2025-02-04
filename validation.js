// validation.js

export function validateEmail(email) {
    let atIndex = email.indexOf('@');
    let dotIndex = email.lastIndexOf('.');
    return atIndex > 0 && dotIndex > atIndex + 1 && dotIndex < email.length - 1;
}

export function validatePassword(password) {
    if (password.length < 8) return false; 
    let hasLetter = false;
    let hasDigit = false;
    for (let i = 0; i < password.length; i++) {
        let char = password[i];
        if (char >= 'a' && char <= 'z' || char >= 'A' && char <= 'Z') {
            hasLetter = true;
        }
        if (char >= '0' && char <= '9') {
            hasDigit = true;
        }
    }
    return hasLetter && hasDigit;
}

export function validateUsername(username) {
    for (let i = 0; i < username.length; i++) {
        let char = username[i];
        if (
            !(char >= 'a' && char <= 'z') &&
            !(char >= 'A' && char <= 'Z') &&
            !(char >= '0' && char <= '9') &&
            char !== '.' &&
            char !== '_'
        ) {
            return false;
        }
    }
    return true;
}

export function validateForm(inputs) {
    let errors = [];

    if (!validateEmail(inputs.email)) errors.push("Invalid email format.");
    if (!validatePassword(inputs.password)) errors.push("Password must be at least 8 characters long, contain letters and numbers.");
    if (inputs.username && !validateUsername(inputs.username)) errors.push("Username must contain only letters, numbers, '.', or '_'.");

    return errors;
}
