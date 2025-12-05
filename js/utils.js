export function loadDB() {
    let db = JSON.parse(localStorage.getItem("hospitalDB")) || {
        users: [],
        appointments: []
    };
    return db;
}

export function saveDB(db) {
    localStorage.setItem("hospitalDB", JSON.stringify(db));
}

export function getUserName(id){
    console.log("call");

    let db = loadDB();
    let user = db.users.find(u => Number(u.userId) === Number(id));
    console.log(user);

    return user.userName;
}