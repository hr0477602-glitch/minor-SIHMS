// ========================================
// RESULTS MANAGEMENT SYSTEM
// ========================================

let results =
    JSON.parse(localStorage.getItem("results")) || [];

let editingIndex = -1;


// ========================================
// HTML ELEMENTS
// ========================================

const resultForm =
    document.getElementById("resultForm");

const resultTableBody =
    document.getElementById("resultTableBody");

const searchResult =
    document.getElementById("searchResult");

const obtainedMarks =
    document.getElementById("obtainedMarks");

const totalMarks =
    document.getElementById("totalMarks");

const grade =
    document.getElementById("grade");

const status =
    document.getElementById("status");


// Display existing results
displayResults(results);


// ========================================
// AUTO CALCULATE GRADE
// ========================================

obtainedMarks.addEventListener("input", calculateResult);

totalMarks.addEventListener("input", calculateResult);


function calculateResult() {

    const total =
        Number(totalMarks.value);

    const obtained =
        Number(obtainedMarks.value);


    if (
        !total ||
        obtained < 0 ||
        obtained > total
    ) {

        grade.value = "";
        status.value = "";

        return;
    }


    const percentage =
        (obtained / total) * 100;


    // Grade
    if (percentage >= 90) {

        grade.value = "A+";

    } else if (percentage >= 80) {

        grade.value = "A";

    } else if (percentage >= 70) {

        grade.value = "B+";

    } else if (percentage >= 60) {

        grade.value = "B";

    } else if (percentage >= 50) {

        grade.value = "C";

    } else if (percentage >= 40) {

        grade.value = "D";

    } else {

        grade.value = "F";

    }


    // Pass / Fail
    if (percentage >= 40) {

        status.value = "Pass";

    } else {

        status.value = "Fail";

    }

}


// ========================================
// ADD / UPDATE RESULT
// ========================================

resultForm.addEventListener(
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


        const total =
            Number(
                document.getElementById(
                    "totalMarks"
                ).value
            );


        const obtained =
            Number(
                document.getElementById(
                    "obtainedMarks"
                ).value
            );


        // Validate marks

        if (
            obtained < 0 ||
            obtained > total
        ) {

            alert(
                "Obtained marks cannot be greater than total marks."
            );

            return;
        }


        const percentage =
            ((obtained / total) * 100)
                .toFixed(2);


        const result = {

            examType:
                document.getElementById(
                    "examType"
                ).value,

            resultDate:
                document.getElementById(
                    "resultDate"
                ).value,

            studentId:
                studentSelect.value,

            studentName:
                studentParts[1] || "",

            department:
                document.getElementById(
                    "department"
                ).value,

            subject:
                document.getElementById(
                    "subject"
                ).value,

            totalMarks:
                total,

            obtainedMarks:
                obtained,

            percentage:
                percentage,

            grade:
                grade.value,

            status:
                status.value,

            remarks:
                document.getElementById(
                    "remarks"
                ).value.trim()

        };


        // ====================================
        // ADD
        // ====================================

        if (editingIndex === -1) {

            results.push(result);

            alert(
                "Result added successfully."
            );

        }


        // ====================================
        // UPDATE
        // ====================================

        else {

            results[editingIndex] = result;

            alert(
                "Result updated successfully."
            );

            editingIndex = -1;

        }


        saveResults();

        displayResults(results);

        resetResultForm();

    }
);


// ========================================
// DISPLAY RESULTS
// ========================================

function displayResults(list) {

    resultTableBody.innerHTML = "";


    document.getElementById(
        "resultCount"
    ).textContent =
        "Total Results: " +
        results.length;


    if (list.length === 0) {

        resultTableBody.innerHTML = `
            <tr>

                <td
                    colspan="11"
                    style="text-align:center; padding:20px;">

                    No results found.

                </td>

            </tr>
        `;

        return;
    }


    list.forEach(function (result) {

        const index =
            results.indexOf(result);


        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                ${escapeHTML(result.examType)}
            </td>

            <td>
                ${escapeHTML(result.resultDate)}
            </td>

            <td>
                ${escapeHTML(result.studentId)}
            </td>

            <td>
                ${escapeHTML(result.studentName)}
            </td>

            <td>
                ${escapeHTML(result.department)}
            </td>

            <td>
                ${escapeHTML(result.subject)}
            </td>

            <td>
                ${escapeHTML(
                    String(result.totalMarks)
                )}
            </td>

            <td>
                ${escapeHTML(
                    String(result.obtainedMarks)
                )}
            </td>

            <td>
                <strong>
                    ${escapeHTML(result.grade)}
                </strong>
            </td>

            <td>
                <strong>
                    ${escapeHTML(result.status)}
                </strong>
            </td>

            <td>

                <button
                    onclick="editResult(${index})">

                    Edit

                </button>


                <button
                    onclick="deleteResult(${index})">

                    Delete

                </button>

            </td>

        `;


        resultTableBody.appendChild(row);

    });

}


// ========================================
// SEARCH
// ========================================

searchResult.addEventListener(
    "input",
    function () {

        const value =
            searchResult.value
                .toLowerCase()
                .trim();


        const filtered =
            results.filter(
                function (result) {

                    return (

                        result.studentId
                            .toLowerCase()
                            .includes(value)

                        ||

                        result.studentName
                            .toLowerCase()
                            .includes(value)

                        ||

                        result.subject
                            .toLowerCase()
                            .includes(value)

                        ||

                        result.department
                            .toLowerCase()
                            .includes(value)

                    );

                }
            );


        displayResults(filtered);

    }
);


// ========================================
// EDIT
// ========================================

function editResult(index) {

    const result =
        results[index];


    if (!result) {
        return;
    }


    document.getElementById(
        "examType"
    ).value =
        result.examType;


    document.getElementById(
        "resultDate"
    ).value =
        result.resultDate;


    document.getElementById(
        "student"
    ).value =
        result.studentId;


    document.getElementById(
        "department"
    ).value =
        result.department;


    document.getElementById(
        "subject"
    ).value =
        result.subject;


    document.getElementById(
        "totalMarks"
    ).value =
        result.totalMarks;


    document.getElementById(
        "obtainedMarks"
    ).value =
        result.obtainedMarks;


    document.getElementById(
        "grade"
    ).value =
        result.grade;


    document.getElementById(
        "status"
    ).value =
        result.status;


    document.getElementById(
        "remarks"
    ).value =
        result.remarks;


    editingIndex = index;


    const button =
        resultForm.querySelector(
            "button[type='submit']"
        );


    button.textContent =
        "Update Result";


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// ========================================
// DELETE
// ========================================

function deleteResult(index) {

    const result =
        results[index];


    if (!result) {
        return;
    }


    const confirmation =
        confirm(
            "Are you sure you want to delete this result?"
        );


    if (!confirmation) {
        return;
    }


    results.splice(index, 1);


    saveResults();

    displayResults(results);


    alert(
        "Result deleted successfully."
    );

}


// ========================================
// RESET FORM
// ========================================

function resetResultForm() {

    resultForm.reset();

    editingIndex = -1;

    grade.value = "";

    status.value = "";


    const button =
        resultForm.querySelector(
            "button[type='submit']"
        );


    button.textContent =
        "Add Result";

}


// ========================================
// SAVE
// ========================================

function saveResults() {

    localStorage.setItem(
        "results",
        JSON.stringify(results)
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