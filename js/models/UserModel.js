import { loadDB, saveDB } from '../utils.js';

export class User {
    constructor({userId=null,userName, userEmail, phoneNumber, password, role}) {
        this.userId = userId || Math.floor(Math.random() * 100000000000) + 1;
        this.userName = userName;
        this.userEmail = userEmail;
        this.phoneNumber = phoneNumber;
        this.password = password;
        this.role = role;
        this.isLoggedIn = false;
    }
    getUserName(id){
        console.log("call");
        
        let db = loadDB();
        let user = db.users.find(u => Number(u.userId) === Number(id));
        console.log(user);
        
        return user.userName;
    }

    saveUserToDB() {
        let db = loadDB();
        let existing = db.users.find(u => u.userId === this.userId);

        if (existing) {
            Object.assign(existing, this);
        } else {
            db.users.push(this);
        }

        saveDB(db);
    }

    login(userEmail, password) {
        if (this.userEmail === userEmail && this.password === password) {
            this.isLoggedIn = true;
            this.saveUserToDB();
            console.log(`${this.userName} logged in successfully`);
            return true;
        }
        console.log("Invalid credentials");
        return false;
    }

    signUp(userName, userEmail, phoneNumber, password, role) {
        this.userName = userName;
        this.userEmail = userEmail;
        this.phoneNumber = phoneNumber;
        this.password = password;
        this.role = role

        this.saveUserToDB();
        console.log(`User ${userName} signed up successfully`);
        return true;
    }

    logout(userId) {
        this.isLoggedIn = false;
        this.saveUserToDB();
        console.log(`User ID ${userId} logged out`);
        return true;
    }
    setIsloggedIn(value) {

    }
}