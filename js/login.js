import { loadDB } from '../js/utils.js';

const form = document.getElementById("loginForm");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    const db = loadDB();

    // Find user
    const user = db.users.find(
        u => u.userEmail === email && u.password === password
    );

    if (!user) {
        alert("Incorrect email or password");
        return;
    }

    // Save logged user to localStorage
    
    sessionStorage.setItem("currentUser", JSON.stringify(user));
    
    alert("Login successful!");

    // Redirect by role
    if (user.role === "doctor") {
        window.location.href = "./appPage.html";
    } else if (user.role === "patient") {
        window.location.href = "./appPage.html";
    } else {
        window.location.href = "../index.html";
    }
});
