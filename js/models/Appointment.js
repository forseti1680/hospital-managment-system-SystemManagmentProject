import {loadDB, saveDB} from '../utils.js';



export class Appointment {
    constructor(appointmentId, doctorId, patientId, appointmentDate) {
        this.appointmentId = Math.floor(Math.random() * 100000000000) + 1;
        this.doctorId = doctorId;
        this.patientId = patientId;
        this.appointmentDate = appointmentDate;
        this.appointmentStatus = true;

        let db = loadDB();
        db.appointments.push(this);
        saveDB(db);
    }

    getAppointmentDetails() {
        return {
            appointmentId: this.appointmentId,
            doctorId: this.doctorId,
            patientId: this.patientId,
            appointmentDate: this.appointmentDate,
            status: this.appointmentStatus ? "Scheduled" : "Cancelled"
        };
    }

    cancelAppointment() {
        this.appointmentStatus = false;

        let db = loadDB();
        let existing = db.appointments.find(a => a.appointmentId === this.appointmentId);
        if (existing) existing.appointmentStatus = false;

        saveDB(db);

        console.log(`Appointment ${this.appointmentId} cancelled`);
    }
}