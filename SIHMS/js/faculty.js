// ========================================
// FACULTY MANAGEMENT SYSTEM
// ========================================


// Get faculty data from localStorage
let facultyList =
    JSON.parse(localStorage.getItem("facultyList")) || [];


// Edit mode
let editingIndex = -1;


// Get HTML elements
const facultyForm =
    document.getElementById("facultyForm");

const facultyTableBody =
    document.getElementById("facultyTableBody");

const searchFaculty =
    document.getElementById("searchFaculty");


// Display faculty
displayFaculty(facultyList);


// ========================================
// ADD / UPDATE FACULTY
// ========================================

facultyForm.addEventListener("submit", function (event) {

    event.preventDefault();


    const faculty = {

        facultyId:
            document.getElementById("facultyId")
                .value.trim(),

        facultyName:
            document.getElementById("facultyName")
                .value.trim(),

        email:
            document.getElementById("email")
                .value.trim(),

        phone:
            document.getElementById("phone")
                .value.trim(),

        gender:
            document.getElementById("gender")
                .value,

        dob:
            document.getElementById("dob")
                .value,

        department:
            document.getElementById("department")
                .value,

        designation:
            document.getElementById("designation")
                .value,

        qualification:
            document.getElementById("qualification")
                .value.trim(),

        address:
            document.getElementById("address")
                .value.trim()

    };


    // ====================================
    // ADD
    // ====================================

    if (editingIndex === -1) {

        const duplicate =
            facultyList.some(function (item) {

                return item.facultyId.toLowerCase() ===
                    faculty.facultyId.toLowerCase();

            });


        if (duplicate) {

            alert("Faculty ID already exists.");

            return;
        }


        facultyList.push(faculty);

        alert("Faculty added successfully.");

    }


    // ====================================
    // UPDATE
    // ====================================

    else {

        facultyList[editingIndex] = faculty;

        alert("Faculty updated successfully.");

        editingIndex = -1;

    }


    saveFaculty();

    displayFaculty(facultyList);

    resetFacultyForm();

});


// ========================================
// DISPLAY FACULTY
// ========================================

function displayFaculty(list) {

    facultyTableBody.innerHTML = "";


    document.getElementById("facultyCount")
        .textContent =
        "Total Faculty: " + facultyList.length;


    if (list.length === 0) {

        facultyTableBody.innerHTML = `
            <tr>
                <td colspan="11"
                    style="text-align:center; padding:20px;">
                    No faculty found.
                </td>
            </tr>
        `;

        return;
    }


    list.forEach(function (faculty) {

        const index =
            facultyList.indexOf(faculty);


        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>${escapeHTML(faculty.facultyId)}</td>

            <td>${escapeHTML(faculty.facultyName)}</td>

            <td>${escapeHTML(faculty.email)}</td>

            <td>${escapeHTML(faculty.phone)}</td>

            <td>${escapeHTML(faculty.gender)}</td>

            <td>${escapeHTML(faculty.dob)}</td>

            <td>${escapeHTML(faculty.department)}</td>

            <td>${escapeHTML(faculty.designation)}</td>

            <td>${escapeHTML(faculty.qualification)}</td>

            <td>${escapeHTML(faculty.address)}</td>

            <td>

                <button
                    onclick="editFaculty(${index})">
                    Edit
                </button>

                <button
                    onclick="deleteFaculty(${index})">
                    Delete
                </button>

            </td>

        `;


        facultyTableBody.appendChild(row);

    });

}


// ========================================
// SEARCH
// ========================================

searchFaculty.addEventListener(
    "input",
    function () {

        const value =
            searchFaculty.value
                .toLowerCase()
                .trim();


        const filtered =
            facultyList.filter(function (faculty) {

                return (

                    faculty.facultyId
                        .toLowerCase()
                        .includes(value)

                    ||

                    faculty.facultyName
                        .toLowerCase()
                        .includes(value)

                );

            });


        displayFaculty(filtered);

    }
);


// ========================================
// EDIT
// ========================================

function editFaculty(index) {

    const faculty =
        facultyList[index];


    if (!faculty) {
        return;
    }


    document.getElementById("facultyId").value =
        faculty.facultyId;

    document.getElementById("facultyName").value =
        faculty.facultyName;

    document.getElementById("email").value =
        faculty.email;

    document.getElementById("phone").value =
        faculty.phone;

    document.getElementById("gender").value =
        faculty.gender;

    document.getElementById("dob").value =
        faculty.dob;

    document.getElementById("department").value =
        faculty.department;

    document.getElementById("designation").value =
        faculty.designation;

    document.getElementById("qualification").value =
        faculty.qualification;

    document.getElementById("address").value =
        faculty.address;


    editingIndex = index;


    document.getElementById("submitBtn")
        .textContent = "Update Faculty";

    document.getElementById("formTitle")
        .textContent = "Edit Faculty";


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// ========================================
// DELETE
// ========================================

function deleteFaculty(index) {

    const faculty =
        facultyList[index];


    if (!faculty) {
        return;
    }


    const confirmation =
        confirm(
            "Are you sure you want to delete " +
            faculty.facultyName +
            "?"
        );


    if (!confirmation) {
        return;
    }


    facultyList.splice(index, 1);

    saveFaculty();

    displayFaculty(facultyList);

    alert("Faculty deleted successfully.");

}


// ========================================
// RESET FORM
// ========================================

function resetFacultyForm() {

    facultyForm.reset();

    editingIndex = -1;


    document.getElementById("submitBtn")
        .textContent = "Add Faculty";

    document.getElementById("formTitle")
        .textContent = "Add Faculty";

}


// ========================================
// SAVE
// ========================================

function saveFaculty() {

    localStorage.setItem(
        "facultyList",
        JSON.stringify(facultyList)
    );

}


// ========================================
// ESCAPE HTML
// ========================================

function escapeHTML(value) {

    const div =
        document.createElement("div");

    div.textContent = value || "";

    return div.innerHTML;

}