import { PatientUser } from "./models/PatientUser.js";
import { DoctorUser } from "./models/DoctorUser.js";

let storedUser = sessionStorage.getItem('currentUser');
let currentUser = null;

let userBadge = "";

if (storedUser) {
    try {
        const parsedUser = JSON.parse(storedUser);
        console.log(parsedUser);
        

        if (parsedUser.role === "doctor") {
            currentUser = new DoctorUser(parsedUser);
            userBadge = currentUser.userName;
            console.log(userBadge);
        } else {
            currentUser = new PatientUser(parsedUser);
            userBadge = currentUser.userName;
            console.log(userBadge);
            
        }
    } catch (e) {
        console.error("Invalid user data in sessionStorage");
        currentUser = null;
        window.location.href = '../index.html'
    }
}

let badge = document.getElementById("userBadge").innerText = userBadge;
let welcome = document.getElementById("welcomeName").innerText = userBadge



function logout() {
    sessionStorage.setItem('currentUser', null);
    alert("You have been logged out successfully.");
    window.location.href = "../index.html"
}

function onAppointmentClick(){
    if(currentUser.role==="doctor"){
        window.location.href = "./doctorAppointmentPage.html";
    }else{
        window.location.href = "./paitentAppointmentPage.html";
    }
}

let logoutButton = document.getElementById("logout");
let goToAppointments = document.getElementById("appointmentRouter");
goToAppointments.addEventListener('click',onAppointmentClick);
logoutButton.addEventListener('click',logout);