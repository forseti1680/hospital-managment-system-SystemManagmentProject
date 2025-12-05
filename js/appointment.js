import { PatientUser } from "./models/PatientUser.js";
import { DoctorUser } from "./models/DoctorUser.js";
import { loadDB, getUserName } from "./utils.js";

let storedUser = sessionStorage.getItem('currentUser');

let currentUser = null;

let userBadge = "";

if (storedUser) {
    try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser.role === "doctor") {
            currentUser = new DoctorUser(parsedUser);
            userBadge = currentUser.userName;
        } else {
            currentUser = new PatientUser(parsedUser);
            userBadge = currentUser.userName;

        }
    } catch (e) {
        console.error("Invalid user data in sessionStorage");
        currentUser = null;
        window.location.href = '../index.html'
    }
}
function formatDate(isoDate) {
    const date = new Date(isoDate);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // months 0-11
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day}-${month}-${year} ${hours}:${minutes}`;
}

if (currentUser.role === "doctor") {
    document.getElementById("userBadge").innerText = userBadge;
    function renderAppointments() {
        const tbody = document.getElementById("appointmentsBody");
        const appointments = currentUser.getAppointments();
        console.log(appointments);
        let html = '';

        appointments.forEach(app => {
            let patientname = getUserName(app.patientId);
            console.log(patientname);
            
            html += `
            <tr>
                <td>${app.appointmentId}</td>
                <td>${app.patientId}</td>
                <td>${patientname}</td>
                <td>${formatDate(app.dateTime)}</td>
                <td><span class="status-circle ${app.status}"></span> <span class="bold">${app.status}</span></td>
                <td>
                    <button class="btn btn-update" onclick="updateAppointment('${app.appointmentId}')">Update</button>
                </td>
            </tr>
        `;
        });

        tbody.innerHTML = html;
    }
    window.updateAppointment = function (id) {
        currentUser.updateAppointmentStatus(id);
        renderAppointments();
    }
    renderAppointments();
} else {
    document.getElementById("userBadge").innerText = userBadge;
    function renderAppointments() {
        getAllDoctors();
        const tbody = document.getElementById("appointmentTable");
        const appointments = currentUser.getAppointments();
        let html = '';
        

        appointments.forEach(app => {
            html += `
            <tr>
                <td>${app.appointmentId}</td>
                <td>${app.patientId}</td>
                <td>${currentUser.getUserName(app.patientId)}</td>
                <td>${formatDate(app.dateTime)}</td>
                <td><span class="status-circle ${app.status}"></span> <span class="bold">${app.status}</span></td>
            </tr>
        `;
        });

        tbody.innerHTML = html;
    }

    window.updateAppointment = function (id) {
        currentUser.updateAppointmentStatus(id);
        renderAppointments();
    }
    renderAppointments();

    function getAllDoctors() {
        let userDb = loadDB().users;
        let doctors = userDb.filter(a => a.role === "doctor");
        doctors.forEach(doctor => {
            let option = document.createElement('option');
            option.value = doctor.userId; // use doctorId as value
            option.text = doctor.userName; // display doctor name
            doctorSelect.appendChild(option);
        });
    }
    function createAppointment() {
        const doctorSelect = document.getElementById("doctorSelect");
        const appointmentDate = document.getElementById("appointmentDate");

        const selectedDoctorId = doctorSelect.value;
        const selectedDateTime = appointmentDate.value;

        // Validate inputs
        if (!selectedDoctorId || !selectedDateTime) {
            alert("Please select a doctor and appointment date/time!");
            return;
        }

        // Add appointment using the PatientUser method
        const success = currentUser.addAppointment(selectedDoctorId, selectedDateTime);

        if (success) {
            alert("Appointment created successfully!");
            // Reset form
            doctorSelect.value = "";
            appointmentDate.value = "";
            renderAppointments(); // Optional: refresh appointment table if you have one
        } else {
            alert("Failed to create appointment. Try again.");
        }
    }
    let submitButton = document.getElementById("createBtn");
    submitButton.addEventListener('click',createAppointment);
}