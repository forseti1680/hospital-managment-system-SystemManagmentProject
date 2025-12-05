import { PatientUser } from "../models/PatientUser.js";
import { loadDB } from "../utils.js";

// ------------------------------
// Load logged-in patient
// ------------------------------
let storedUser = JSON.parse(sessionStorage.getItem("currentUser"));
let currentPatient = new PatientUser(storedUser);

// ------------------------------
// Load doctors from DB
// ------------------------------
function loadDoctorList() {
    let db = loadDB();
    let doctorSelect = document.getElementById("doctorSelect");

    doctorSelect.innerHTML = `<option value="">Select Doctor</option>`;

    db.users
        .filter(u => u.role === "doctor")
        .forEach(d => {
            doctorSelect.innerHTML += `<option value="${d.userId}">${d.userName}</option>`;
        });
}

// ------------------------------
// Create new appointment
// ------------------------------
document.getElementById("createBtn").addEventListener("click", () => {
    let doctorId = document.getElementById("doctorSelect").value;

    if (!doctorId) {
        alert("Please select a doctor");
        return;
    }

    currentPatient.addAppointment(doctorId);
    loadAppointmentTable();
});

// ------------------------------
// Load appointments into table
// ------------------------------
function loadAppointmentTable() {
    let table = document.getElementById("appointmentTable");
    table.innerHTML = "";

    let appointments = currentPatient.getAppointments();
    let db = loadDB();

    appointments.forEach(app => {
        let doctor = db.users.find(u => u.userId === app.doctorId);

        table.innerHTML += `
            <tr>
                <td>${doctor ? doctor.userName : "Unknown Doctor"}</td>
                <td>${new Date(app.dateTime).toLocaleString()}</td>
                <td>${app.status}</td>
                <td>
                    <button class="btn btn-delete" onclick="deleteAppointment('${app.appointmentId}')">Delete</button>
                </td>
            </tr>
        `;
    });
}

// ------------------------------
// Delete appointment
// ------------------------------
window.deleteAppointment = function(appointmentId) {
    if (confirm("Delete this appointment?")) {
        currentPatient.deleteAppointment(appointmentId);
        loadAppointmentTable();
    }
};

// ------------------------------
// Initialize Page
// ------------------------------
loadDoctorList();
loadAppointmentTable();
