// ========================================
// STUDENT MANAGEMENT SYSTEM
// ========================================


// Get existing students from localStorage
let students = JSON.parse(
    localStorage.getItem("students")
) || [];


// Edit mode
let editingIndex = -1;


// Get HTML elements
const studentForm = document.getElementById("studentForm");
const studentTableBody = document.getElementById("studentTableBody");
const searchStudent = document.getElementById("searchStudent");


// Display students when page opens
displayStudents(students);


// ========================================
// ADD / UPDATE STUDENT
// ========================================

studentForm.addEventListener("submit", function (event) {

    event.preventDefault();


    // Get form values
    const student = {

        studentId: document.getElementById("studentId").value.trim(),

        studentName: document.getElementById("studentName").value.trim(),

        email: document.getElementById("email").value.trim(),

        phone: document.getElementById("phone").value.trim(),

        gender: document.getElementById("gender").value,

        dob: document.getElementById("dob").value,

        department: document.getElementById("department").value,

        semester: document.getElementById("semester").value,

        address: document.getElementById("address").value.trim()

    };


    // ====================================
    // ADD NEW STUDENT
    // ====================================

    if (editingIndex === -1) {


        // Check duplicate Student ID
        const duplicate = students.some(function (item) {

            return item.studentId.toLowerCase() ===
                   student.studentId.toLowerCase();

        });


        if (duplicate) {

            alert("Student ID already exists.");

            return;
        }


        // Add student
        students.push(student);

        alert("Student added successfully.");

    }


    // ====================================
    // UPDATE STUDENT
    // ====================================

    else {

        students[editingIndex] = student;

        alert("Student updated successfully.");

        editingIndex = -1;

    }


    // Save data
    saveStudents();


    // Refresh table
    displayStudents(students);


    // Clear form
    studentForm.reset();


    // Change button text
    const button =
        studentForm.querySelector(
            "button[type='submit']"
        );

    button.textContent = "Add Student";

});


// ========================================
// DISPLAY STUDENTS
// ========================================

function displayStudents(studentArray) {

    studentTableBody.innerHTML = "";


    // No students
    if (studentArray.length === 0) {

        studentTableBody.innerHTML = `
            <tr>
                <td colspan="10"
                    style="text-align:center; padding:20px;">
                    No students found.
                </td>
            </tr>
        `;

        return;
    }


    // Display each student
    studentArray.forEach(function (student) {

        // Find original index
        const index = students.indexOf(student);


        const row = document.createElement("tr");


        row.innerHTML = `

            <td>${escapeHTML(student.studentId)}</td>

            <td>${escapeHTML(student.studentName)}</td>

            <td>${escapeHTML(student.email)}</td>

            <td>${escapeHTML(student.phone)}</td>

            <td>${escapeHTML(student.gender)}</td>

            <td>${escapeHTML(student.dob)}</td>

            <td>${escapeHTML(student.department)}</td>

            <td>${escapeHTML(student.semester)}</td>

            <td>${escapeHTML(student.address)}</td>

            <td>

                <button
                    onclick="editStudent(${index})">
                    Edit
                </button>

                <button
                    onclick="deleteStudent(${index})">
                    Delete
                </button>

            </td>

        `;


        studentTableBody.appendChild(row);

    });

}


// ========================================
// SEARCH STUDENT
// ========================================

searchStudent.addEventListener("input", function () {

    const searchValue =
        searchStudent.value
        .toLowerCase()
        .trim();


    const filteredStudents =
        students.filter(function (student) {

            return (

                student.studentId
                    .toLowerCase()
                    .includes(searchValue)

                ||

                student.studentName
                    .toLowerCase()
                    .includes(searchValue)

            );

        });


    displayStudents(filteredStudents);

});


// ========================================
// EDIT STUDENT
// ========================================

function editStudent(index) {

    const student = students[index];


    if (!student) {
        return;
    }


    // Fill form
    document.getElementById("studentId").value =
        student.studentId;

    document.getElementById("studentName").value =
        student.studentName;

    document.getElementById("email").value =
        student.email;

    document.getElementById("phone").value =
        student.phone;

    document.getElementById("gender").value =
        student.gender;

    document.getElementById("dob").value =
        student.dob;

    document.getElementById("department").value =
        student.department;

    document.getElementById("semester").value =
        student.semester;

    document.getElementById("address").value =
        student.address;


    // Enable edit mode
    editingIndex = index;


    // Change button
    const button =
        studentForm.querySelector(
            "button[type='submit']"
        );

    button.textContent = "Update Student";


    // Scroll to top
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// ========================================
// DELETE STUDENT
// ========================================

function deleteStudent(index) {

    const student = students[index];


    if (!student) {
        return;
    }


    const confirmation = confirm(
        "Are you sure you want to delete " +
        student.studentName +
        "?"
    );


    if (!confirmation) {
        return;
    }


    // Delete student
    students.splice(index, 1);


    // Save
    saveStudents();


    // Refresh table
    displayStudents(students);


    alert("Student deleted successfully.");

}


// ========================================
// SAVE TO LOCALSTORAGE
// ========================================

function saveStudents() {

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );

}


// ========================================
// ESCAPE HTML
// ========================================

function escapeHTML(value) {

    const div = document.createElement("div");

    div.textContent = value || "";

    return div.innerHTML;

}