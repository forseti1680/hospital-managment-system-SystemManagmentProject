import { loadDB, saveDB } from './utils.js';
import { PatientUser } from './models/PatientUser.js';
import { DoctorUser } from './models/DoctorUser.js';

let db = loadDB();
console.log(db);

// -----------------------
// Get user from session
// -----------------------
let storedUser = sessionStorage.getItem('currentUser');

let currentUser = null;

if (!storedUser===null) {
    try {
        const parsedUser = JSON.parse(storedUser);
        console.log(parsedUser);
        

        if (parsedUser.role === "doctor") {
            currentUser = new DoctorUser(parsedUser);
            console.log(currentUser);
            
        } else {
            currentUser = new PatientUser(parsedUser);
            console.log(currentUser);
            
        }
    } catch (e) {
        console.error("Invalid user data in sessionStorage");
        currentUser = null;
    }
}

// -----------------------
// UI Elements
// -----------------------
let notLogged = document.getElementById("notLoggedIn");
let loggedIn = document.getElementById("loggedIn");

// -----------------------
// Update UI
// -----------------------
if (!currentUser) {
    notLogged.classList.add("block");
    notLogged.classList.remove("hidden");

    loggedIn.classList.add("hidden");
    loggedIn.classList.remove("block");
} else {
    notLogged.classList.add("hidden");
    notLogged.classList.remove("block");

    loggedIn.classList.add("block");
    loggedIn.classList.remove("hidden");
}

// -----------------------
// Logout Function
// -----------------------
window.logout = function () {
    if (currentUser) {
        currentUser.logout(currentUser.userId);
    }

    currentUser = null;

    // Remove user from session completely
    sessionStorage.removeItem('currentUser');

    // Update UI
    notLogged.classList.add("block");
    notLogged.classList.remove("hidden");

    loggedIn.classList.add("hidden");
    loggedIn.classList.remove("block");
};
