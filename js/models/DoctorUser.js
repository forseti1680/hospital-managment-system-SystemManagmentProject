import { User } from './UserModel.js';
import { loadDB, saveDB } from '../utils.js';

export class DoctorUser extends User {
    constructor(userData) {
        super(userData);
        this.appointments = [];
    }
    getUserName() {
        return this.userName;
    }

    loadDoctorAppointments() {
        let db = loadDB();
        this.appointments = db.appointments.filter(a => Number(a.doctorId) === Number(this.userId));
    }

    getAppointments() {
        this.loadDoctorAppointments();
        return this.appointments;
    }

    updateAppointmentStatus(appointmentId) {
        let db = loadDB();
        let appointment = db.appointments.find(a => a.appointmentId === appointmentId);

        if (!appointment) {
            console.log("Appointment not found");
            return false;
        }

        if (appointment.status === "scheduled") {
            appointment.status = "completed";
        } else if (appointment.status === "completed") {
            appointment.status = "cancelled";
        } else {
            appointment.status = "scheduled";
        }

        saveDB(db);
        return true;
    }
}