// ========================================
// SUBJECT MANAGEMENT SYSTEM
// ========================================

// Get subjects from localStorage
let subjects =
    JSON.parse(localStorage.getItem("subjects")) || [];


// Edit mode
let editingIndex = -1;


// Get HTML elements
const subjectForm =
    document.getElementById("subjectForm");

const subjectTableBody =
    document.getElementById("subjectTableBody");

const searchSubject =
    document.getElementById("searchSubject");


// Display subjects when page loads
displaySubjects(subjects);


// ========================================
// ADD / UPDATE SUBJECT
// ========================================

subjectForm.addEventListener("submit", function (event) {

    event.preventDefault();


    const subject = {

        subjectId:
            document.getElementById("subjectId")
                .value.trim(),

        subjectName:
            document.getElementById("subjectName")
                .value.trim(),

        department:
            document.getElementById("department")
                .value,

        semester:
            document.getElementById("semester")
                .value,

        subjectType:
            document.getElementById("subjectType")
                .value,

        credits:
            document.getElementById("credits")
                .value,

        faculty:
            document.getElementById("faculty")
                .value,

        description:
            document.getElementById("description")
                .value.trim()

    };


    // ====================================
    // ADD SUBJECT
    // ====================================

    if (editingIndex === -1) {

        // Check duplicate Subject ID
        const duplicate =
            subjects.some(function (item) {

                return item.subjectId.toLowerCase() ===
                    subject.subjectId.toLowerCase();

            });


        if (duplicate) {

            alert("Subject ID already exists.");

            return;
        }


        subjects.push(subject);

        alert("Subject added successfully.");

    }


    // ====================================
    // UPDATE SUBJECT
    // ====================================

    else {

        subjects[editingIndex] = subject;

        alert("Subject updated successfully.");

        editingIndex = -1;

    }


    // Save
    saveSubjects();


    // Refresh table
    displaySubjects(subjects);


    // Reset form
    resetSubjectForm();

});


// ========================================
// DISPLAY SUBJECTS
// ========================================

function displaySubjects(list) {

    subjectTableBody.innerHTML = "";


    // Update count
    document.getElementById("subjectCount")
        .textContent =
        "Total Subjects: " + subjects.length;


    // Empty state
    if (list.length === 0) {

        subjectTableBody.innerHTML = `
            <tr>
                <td colspan="9"
                    style="text-align:center; padding:20px;">
                    No subjects found.
                </td>
            </tr>
        `;

        return;
    }


    // Display each subject
    list.forEach(function (subject) {

        const index =
            subjects.indexOf(subject);


        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                ${escapeHTML(subject.subjectId)}
            </td>

            <td>
                ${escapeHTML(subject.subjectName)}
            </td>

            <td>
                ${escapeHTML(subject.department)}
            </td>

            <td>
                Semester ${escapeHTML(subject.semester)}
            </td>

            <td>
                ${escapeHTML(subject.subjectType)}
            </td>

            <td>
                ${escapeHTML(subject.credits)}
            </td>

            <td>
                ${escapeHTML(subject.faculty)}
            </td>

            <td>
                ${escapeHTML(subject.description)}
            </td>

            <td>

                <button
                    onclick="editSubject(${index})">
                    Edit
                </button>

                <button
                    onclick="deleteSubject(${index})">
                    Delete
                </button>

            </td>

        `;


        subjectTableBody.appendChild(row);

    });

}


// ========================================
// SEARCH SUBJECT
// ========================================

searchSubject.addEventListener(
    "input",
    function () {

        const searchValue =
            searchSubject.value
                .toLowerCase()
                .trim();


        const filteredSubjects =
            subjects.filter(function (subject) {

                return (

                    subject.subjectId
                        .toLowerCase()
                        .includes(searchValue)

                    ||

                    subject.subjectName
                        .toLowerCase()
                        .includes(searchValue)

                    ||

                    subject.department
                        .toLowerCase()
                        .includes(searchValue)

                    ||

                    subject.faculty
                        .toLowerCase()
                        .includes(searchValue)

                );

            });


        displaySubjects(filteredSubjects);

    }
);


// ========================================
// EDIT SUBJECT
// ========================================

function editSubject(index) {

    const subject =
        subjects[index];


    if (!subject) {
        return;
    }


    document.getElementById("subjectId").value =
        subject.subjectId;

    document.getElementById("subjectName").value =
        subject.subjectName;

    document.getElementById("department").value =
        subject.department;

    document.getElementById("semester").value =
        subject.semester;

    document.getElementById("subjectType").value =
        subject.subjectType;

    document.getElementById("credits").value =
        subject.credits;

    document.getElementById("faculty").value =
        subject.faculty;

    document.getElementById("description").value =
        subject.description;


    editingIndex = index;


    document.getElementById("submitBtn")
        .textContent = "Update Subject";


    document.getElementById("formTitle")
        .textContent = "Edit Subject";


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// ========================================
// DELETE SUBJECT
// ========================================

function deleteSubject(index) {

    const subject =
        subjects[index];


    if (!subject) {
        return;
    }


    const confirmation =
        confirm(
            "Are you sure you want to delete " +
            subject.subjectName +
            "?"
        );


    if (!confirmation) {
        return;
    }


    subjects.splice(index, 1);


    saveSubjects();


    displaySubjects(subjects);


    alert("Subject deleted successfully.");

}


// ========================================
// RESET FORM
// ========================================

function resetSubjectForm() {

    subjectForm.reset();


    editingIndex = -1;


    document.getElementById("submitBtn")
        .textContent = "Add Subject";


    document.getElementById("formTitle")
        .textContent = "Add Subject";

}


// ========================================
// SAVE TO LOCALSTORAGE
// ========================================

function saveSubjects() {

    localStorage.setItem(
        "subjects",
        JSON.stringify(subjects)
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