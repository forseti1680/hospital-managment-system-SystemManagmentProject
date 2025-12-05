import { User } from './models/UserModel.js';

const registerForm = document.getElementById('registerForm');

registerForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent form default submission

    // Get form values
    const fullName = document.getElementById('userName').value.trim();
    const email = document.getElementById('userEmail').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const password = document.getElementById('password').value.trim();
    const role = document.getElementById('role').value;

    // Create a new User instance
    const newUser = new User({fullName, email, phone, password, role});

    // Save user to DB
    newUser.signUp(fullName, email, phone, password, role);

    // Optionally: redirect to login page after registration
    alert(`User ${fullName} registered successfully!`);
    window.location.href = './loginPage.html';
    registerForm.reset();
});
