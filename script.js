const registrationForm = document.getElementById("registration");
const loginForm = document.getElementById("login");
const errorDisplay = document.getElementById("errorDisplay");

// -------------- Registration Form --------------
const username = registrationForm.elements.username;
const regexUsername = /[^\w]/;

username.addEventListener("input", function (e) {
    const value = e.target.value.trim();

    if (value === "") {
        errorDisplay.textContent = "Username cannot be blank.";
    } else if (value.length < 4) {
        errorDisplay.textContent = "The username must be at least four characters long.";
    } else if (new Set(value).size < 2) { 
       errorDisplay.textContent = "Username must contain at least two unique characters.";
    } else if (regexUsername.test(value)) { 
        errorDisplay.textContent = "Username cannot contain special characters or spaces.";
    } else {
        errorDisplay.textContent = ""; 
    }
});

// Email validation
const email = registrationForm.elements.email;
const regexEmail = /^[^@]+@[^@]+\.[^@]+$/;

email.addEventListener("input", function(e) {
   const value = e.target.value.trim();
   if (!regexEmail.test(value)) {
       errorDisplay.textContent = "Please enter a valid email address.";
   } else if (value.toLowerCase().endsWith("@example.com")) {
       errorDisplay.textContent = "Email cannot be from the domain 'example.com'";
   } else {
       errorDisplay.textContent = ""; 
   }
});

// Password validation
const password = registrationForm.elements.password;
const regexUppercase = /[A-Z]/;
const regexLowercase = /[a-z]/;
const regexNumber = /[0-9]/;
const regexSpecialChar = /[!@#$%^&*]/;

password.addEventListener("input", function (e) {
    const value = e.target.value.trim();
    if (value.length < 12) {
        errorDisplay.textContent = "Password must be at least 12 characters.";
    } else if (!regexUppercase.test(value) || !regexLowercase.test(value) || !regexNumber.test(value) || !regexSpecialChar.test(value)) {
        errorDisplay.textContent = "Password must include an uppercase letter, lowercase letter, number, and special character.";
    } else if (/password/i.test(value)) {
        errorDisplay.textContent = "Password cannot contain the word 'password'.";
    } else {
        errorDisplay.textContent = "";
    }
});

// Confirm Password validation
const passwordCheck = registrationForm.elements.passwordCheck;
passwordCheck.addEventListener("input", function(e) {
    if (password.value.trim() !== e.target.value.trim()) {
        errorDisplay.textContent = "Passwords do not match.";
    } else {
        errorDisplay.textContent = "";
    }
});

// Terms validation
const terms = registrationForm.elements.terms;
terms.addEventListener("change", function (e) {
    if (!e.target.checked) {
        errorDisplay.textContent = "You must agree to the terms and conditions to continue.";
    } else {
        errorDisplay.textContent = ""; 
    }
});

// -------------- Login Form --------------
const loginErrorDisplay = document.getElementById("errorDisplay");
const loginUsername = loginForm.elements.username;
const loginPassword = loginForm.elements.password;

loginUsername.addEventListener("input", function (e) {
    const value = e.target.value.trim().toLowerCase();

    if (value === "") {
        loginErrorDisplay.textContent = "Username cannot be blank.";
    } else {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find(user => user.username === value);

        if (!user) {
            loginErrorDisplay.textContent = "Username not found.";
        } else {
            loginErrorDisplay.textContent = "";
        }
    }
});

loginPassword.addEventListener("input", function (e) {
    const value = e.target.value.trim();

    if (value === "") {
        loginErrorDisplay.textContent = "Password cannot be blank.";
    } else {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const username = loginUsername.value.trim().toLowerCase();
        const user = users.find(user => user.username === username);

        if (user && user.password !== value) {
            loginErrorDisplay.textContent = "Incorrect password.";
        } else {
            loginErrorDisplay.textContent = "";
        }
    }
});

loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = loginUsername.value.trim().toLowerCase();
    const password = loginPassword.value.trim();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(user => user.username === username);

    if (username === "") {
        loginErrorDisplay.textContent = "Username cannot be blank.";
        loginUsername.focus();
        return;
    }

    if (!user) {
        loginErrorDisplay.textContent = "Username not found.";
        loginUsername.focus();
        return;
    }

    if (password === "") {
        loginErrorDisplay.textContent = "Password cannot be blank.";
        loginPassword.focus();
        return;
    }

    if (user.password !== password) {
        loginErrorDisplay.textContent = "Incorrect password.";
        loginPassword.focus();
        return;
    }

    loginErrorDisplay.textContent = "Login successful!";
    loginForm.reset();
});
