alert("NEW SCRIPT LOADED");// ========================================
// LOGIN SYSTEM
// ========================================

// Default selected role
let selectedRole = "student";


// ========================================
// SELECT ROLE
// ========================================

function selectRole(role, button) {

    selectedRole = role.toLowerCase();

    // Remove active class from all buttons
    const buttons = document.querySelectorAll(".role-btn");

    buttons.forEach(function (btn) {
        btn.classList.remove("active");
    });

    // Add active class to selected button
    button.classList.add("active");
}


// ========================================
// LOGIN
// ========================================

function login(event) {

    event.preventDefault();

    const userIdInput = document.getElementById("userId");
    const passwordInput = document.getElementById("password");

    const userId = userIdInput.value.trim();
    const password = passwordInput.value.trim();

    // Convert User ID to uppercase
    const enteredUserId = userId.toUpperCase();


    // ====================================
    // STUDENT LOGIN
    // ====================================

    if (
        selectedRole === "student" &&
        enteredUserId === "STU001" &&
        password === "1234"
    ) {

        window.location.href = "student/dashboard.html";
        return;
    }


    // ====================================
    // FACULTY LOGIN
    // ====================================

    if (
        selectedRole === "faculty" &&
        enteredUserId === "FAC001" &&
        password === "1234"
    ) {

        window.location.href = "faculty/dashboard.html";
        return;
    }


    // ====================================
    // ADMIN LOGIN
    // ====================================

    if (
        selectedRole === "admin" &&
        enteredUserId === "ADMIN" &&
        password === "admin123"
    ) {

        window.location.href = "admin/dashboard.html";
        return;
    }


    // ====================================
    // INVALID LOGIN
    // ====================================

    alert("Invalid User ID or Password.");
}