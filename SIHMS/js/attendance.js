// ========================================
// ATTENDANCE MANAGEMENT SYSTEM
// ========================================


// Get attendance records
let attendanceRecords =
    JSON.parse(
        localStorage.getItem("attendanceRecords")
    ) || [];


// Edit mode
let editingIndex = -1;


// Get HTML elements
const attendanceForm =
    document.getElementById("attendanceForm");

const attendanceTableBody =
    document.getElementById("attendanceTableBody");

const searchAttendance =
    document.getElementById("searchAttendance");


// Display records when page loads
displayAttendance(attendanceRecords);


// ========================================
// ADD / UPDATE ATTENDANCE
// ========================================

attendanceForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const studentSelect =
            document.getElementById("student");


        const studentText =
            studentSelect.options[
                studentSelect.selectedIndex
            ].text;


        const studentParts =
            studentText.split(" - ");


        const attendance = {

            date:
                document.getElementById(
                    "attendanceDate"
                ).value,

            studentId:
                studentSelect.value,

            studentName:
                studentParts[1] || "",

            department:
                document.getElementById(
                    "department"
                ).value,

            semester:
                document.getElementById(
                    "semester"
                ).value,

            subject:
                document.getElementById(
                    "subject"
                ).value,

            status:
                document.getElementById(
                    "status"
                ).value,

            remarks:
                document.getElementById(
                    "remarks"
                ).value.trim()

        };


        // ====================================
        // ADD
        // ====================================

        if (editingIndex === -1) {

            attendanceRecords.push(
                attendance
            );

            alert(
                "Attendance marked successfully."
            );

        }


        // ====================================
        // UPDATE
        // ====================================

        else {

            attendanceRecords[
                editingIndex
            ] = attendance;


            alert(
                "Attendance updated successfully."
            );


            editingIndex = -1;

        }


        // Save
        saveAttendance();


        // Refresh table
        displayAttendance(
            attendanceRecords
        );


        // Reset
        resetAttendanceForm();

    }
);


// ========================================
// DISPLAY ATTENDANCE
// ========================================

function displayAttendance(list) {

    attendanceTableBody.innerHTML = "";


    document.getElementById(
        "attendanceCount"
    ).textContent =
        "Total Records: " +
        attendanceRecords.length;


    // Empty state
    if (list.length === 0) {

        attendanceTableBody.innerHTML = `
            <tr>
                <td colspan="9"
                    style="text-align:center; padding:20px;">
                    No attendance records found.
                </td>
            </tr>
        `;

        return;
    }


    // Display records
    list.forEach(function (record) {

        const index =
            attendanceRecords.indexOf(
                record
            );


        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                ${escapeHTML(record.date)}
            </td>

            <td>
                ${escapeHTML(record.studentId)}
            </td>

            <td>
                ${escapeHTML(record.studentName)}
            </td>

            <td>
                ${escapeHTML(record.department)}
            </td>

            <td>
                Semester
                ${escapeHTML(record.semester)}
            </td>

            <td>
                ${escapeHTML(record.subject)}
            </td>

            <td>
                <strong>
                    ${escapeHTML(record.status)}
                </strong>
            </td>

            <td>
                ${escapeHTML(record.remarks)}
            </td>

            <td>

                <button
                    onclick="editAttendance(${index})">
                    Edit
                </button>

                <button
                    onclick="deleteAttendance(${index})">
                    Delete
                </button>

            </td>

        `;


        attendanceTableBody.appendChild(
            row
        );

    });

}


// ========================================
// SEARCH ATTENDANCE
// ========================================

searchAttendance.addEventListener(
    "input",
    function () {

        const searchValue =
            searchAttendance.value
                .toLowerCase()
                .trim();


        const filteredRecords =
            attendanceRecords.filter(
                function (record) {

                    return (

                        record.studentId
                            .toLowerCase()
                            .includes(
                                searchValue
                            )

                        ||

                        record.studentName
                            .toLowerCase()
                            .includes(
                                searchValue
                            )

                        ||

                        record.subject
                            .toLowerCase()
                            .includes(
                                searchValue
                            )

                        ||

                        record.department
                            .toLowerCase()
                            .includes(
                                searchValue
                            )

                    );

                }
            );


        displayAttendance(
            filteredRecords
        );

    }
);


// ========================================
// EDIT ATTENDANCE
// ========================================

function editAttendance(index) {

    const record =
        attendanceRecords[index];


    if (!record) {
        return;
    }


    document.getElementById(
        "attendanceDate"
    ).value = record.date;


    document.getElementById(
        "department"
    ).value = record.department;


    document.getElementById(
        "semester"
    ).value = record.semester;


    document.getElementById(
        "subject"
    ).value = record.subject;


    document.getElementById(
        "student"
    ).value = record.studentId;


    document.getElementById(
        "status"
    ).value = record.status;


    document.getElementById(
        "remarks"
    ).value = record.remarks;


    editingIndex = index;


    const submitButton =
        attendanceForm.querySelector(
            "button[type='submit']"
        );


    submitButton.textContent =
        "Update Attendance";


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// ========================================
// DELETE ATTENDANCE
// ========================================

function deleteAttendance(index) {

    const record =
        attendanceRecords[index];


    if (!record) {
        return;
    }


    const confirmation =
        confirm(
            "Are you sure you want to delete this attendance record?"
        );


    if (!confirmation) {
        return;
    }


    attendanceRecords.splice(
        index,
        1
    );


    saveAttendance();


    displayAttendance(
        attendanceRecords
    );


    alert(
        "Attendance deleted successfully."
    );

}


// ========================================
// RESET FORM
// ========================================

function resetAttendanceForm() {

    attendanceForm.reset();


    editingIndex = -1;


    const submitButton =
        attendanceForm.querySelector(
            "button[type='submit']"
        );


    submitButton.textContent =
        "Mark Attendance";

}


// ========================================
// SAVE TO LOCALSTORAGE
// ========================================

function saveAttendance() {

    localStorage.setItem(
        "attendanceRecords",
        JSON.stringify(
            attendanceRecords
        )
    );

}


// ========================================
// ESCAPE HTML
// ========================================

function escapeHTML(value) {

    const div =
        document.createElement("div");

    div.textContent =
        value || "";

    return div.innerHTML;

}