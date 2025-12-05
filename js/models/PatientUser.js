import {User} from './UserModel.js';
import {loadDB, saveDB} from '../utils.js';

export class PatientUser extends User {
    constructor(userData) {
        console.log(userData.userName);
        
        super(userData);
        this.appointments = [];
    }

    getUserName(){
        return this.userName;
    }

    loadPatientAppointments() {
        let db = loadDB();
        this.appointments = db.appointments.filter(a => a.patientId === this.userId);
    }

    addAppointment(doctorId, date) {
        let appointment = {
            appointmentId: `APT${Date.now()}`,
            doctorId: doctorId,
            patientId: this.userId,
            dateTime: date,
            status: "scheduled"
        };

        let db = loadDB();
        db.appointments.push(appointment);
        saveDB(db);
        return true;
    }

    deleteAppointment(appointmentId) {
        let db = loadDB();
        let before = db.appointments.length;

        db.appointments = db.appointments.filter(a => a.appointmentId !== appointmentId);
        saveDB(db);

        if (db.appointments.length < before) {
            console.log(`Appointment ${appointmentId} deleted successfully`);
            return true;
        }

        console.log("Appointment not found");
        return false;
    }

    getAppointments() {
        console.log(`Retrieving appointments for Patient ID: ${this.userId}`);
        this.loadPatientAppointments();
        return this.appointments;
    }
}