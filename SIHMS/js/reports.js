// ========================================
// REPORTS MANAGEMENT SYSTEM
// ========================================


// ========================================
// GET DATA FROM LOCALSTORAGE
// ========================================

const students =
    JSON.parse(
        localStorage.getItem("students")
    ) || [];


const faculty =
    JSON.parse(
        localStorage.getItem("faculty")
    ) || [];


const subjects =
    JSON.parse(
        localStorage.getItem("subjects")
    ) || [];


const attendanceRecords =
    JSON.parse(
        localStorage.getItem("attendanceRecords")
    ) || [];


const results =
    JSON.parse(
        localStorage.getItem("results")
    ) || [];


const fees =
    JSON.parse(
        localStorage.getItem("fees")
    ) || [];


// ========================================
// SUMMARY
// ========================================

document.getElementById(
    "totalStudents"
).textContent =
    students.length;


document.getElementById(
    "totalFaculty"
).textContent =
    faculty.length;


document.getElementById(
    "totalSubjects"
).textContent =
    subjects.length;


document.getElementById(
    "totalAttendance"
).textContent =
    attendanceRecords.length;


document.getElementById(
    "totalResults"
).textContent =
    results.length;


// ========================================
// FEES SUMMARY
// ========================================

let totalFees = 0;

let feesCollected = 0;

let feesPending = 0;


fees.forEach(function (fee) {

    totalFees +=
        Number(fee.totalAmount) || 0;


    feesCollected +=
        Number(fee.paidAmount) || 0;


    feesPending +=
        Number(fee.remainingAmount) || 0;

});


document.getElementById(
    "totalFees"
).textContent =
    formatCurrency(totalFees);


document.getElementById(
    "feesCollected"
).textContent =
    formatCurrency(feesCollected);


document.getElementById(
    "feesPending"
).textContent =
    formatCurrency(feesPending);


// ========================================
// STUDENT REPORT
// ========================================

const studentReportBody =
    document.getElementById(
        "studentReportBody"
    );


if (students.length === 0) {

    studentReportBody.innerHTML = `
        <tr>
            <td
                colspan="7"
                style="text-align:center; padding:20px;">

                No student records found.

            </td>
        </tr>
    `;

} else {

    students.forEach(function (student) {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                ${escapeHTML(
                    student.studentId
                )}
            </td>

            <td>
                ${escapeHTML(
                    student.studentName
                )}
            </td>

            <td>
                ${escapeHTML(
                    student.email
                )}
            </td>

            <td>
                ${escapeHTML(
                    student.phone
                )}
            </td>

            <td>
                ${escapeHTML(
                    student.gender
                )}
            </td>

            <td>
                ${escapeHTML(
                    student.department
                )}
            </td>

            <td>
                ${escapeHTML(
                    student.semester
                )}
            </td>

        `;


        studentReportBody.appendChild(
            row
        );

    });

}


// ========================================
// RESULT REPORT
// ========================================

const resultReportBody =
    document.getElementById(
        "resultReportBody"
    );


if (results.length === 0) {

    resultReportBody.innerHTML = `
        <tr>
            <td
                colspan="7"
                style="text-align:center; padding:20px;">

                No result records found.

            </td>
        </tr>
    `;

} else {

    results.forEach(function (result) {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                ${escapeHTML(
                    result.studentId
                )}
            </td>

            <td>
                ${escapeHTML(
                    result.studentName
                )}
            </td>

            <td>
                ${escapeHTML(
                    result.subject
                )}
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
                    ${escapeHTML(
                        result.grade
                    )}
                </strong>
            </td>

            <td>
                <strong>
                    ${escapeHTML(
                        result.status
                    )}
                </strong>
            </td>

        `;


        resultReportBody.appendChild(
            row
        );

    });

}


// ========================================
// FEES REPORT
// ========================================

const feesReportBody =
    document.getElementById(
        "feesReportBody"
    );


if (fees.length === 0) {

    feesReportBody.innerHTML = `
        <tr>
            <td
                colspan="7"
                style="text-align:center; padding:20px;">

                No fee records found.

            </td>
        </tr>
    `;

} else {

    fees.forEach(function (fee) {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                ${escapeHTML(
                    fee.feeId
                )}
            </td>

            <td>
                ${escapeHTML(
                    fee.studentName
                )}
            </td>

            <td>
                ${escapeHTML(
                    fee.feeType
                )}
            </td>

            <td>
                ${formatCurrency(
                    fee.totalAmount
                )}
            </td>

            <td>
                ${formatCurrency(
                    fee.paidAmount
                )}
            </td>

            <td>
                ${formatCurrency(
                    fee.remainingAmount
                )}
            </td>

            <td>
                <strong>
                    ${escapeHTML(
                        fee.paymentStatus
                    )}
                </strong>
            </td>

        `;


        feesReportBody.appendChild(
            row
        );

    });

}


// ========================================
// PRINT REPORT
// ========================================

function printReport(
    reportId
) {

    const report =
        document.getElementById(
            reportId
        );


    if (!report) {
        return;
    }


    const printWindow =
        window.open(
            "",
            "_blank"
        );


    printWindow.document.write(`

        <!DOCTYPE html>

        <html>

        <head>

            <title>
                Student Management Report
            </title>

            <style>

                body {
                    font-family: Arial, sans-serif;
                    padding: 30px;
                }

                h1 {
                    text-align: center;
                    margin-bottom: 25px;
                }

                table {
                    width: 100%;
                    border-collapse: collapse;
                }

                th,
                td {
                    border: 1px solid #333;
                    padding: 8px;
                    text-align: left;
                }

                th {
                    background: #eeeeee;
                }

                @media print {

                    body {
                        padding: 10px;
                    }

                }

            </style>

        </head>


        <body>

            <h1>
                Student Information Management System
            </h1>

            ${report.innerHTML}

        </body>

        </html>

    `);


    printWindow.document.close();


    printWindow.focus();


    setTimeout(function () {

        printWindow.print();

    }, 300);

}


// ========================================
// CURRENCY FORMAT
// ========================================

function formatCurrency(
    amount
) {

    return "₹" +
        Number(amount || 0)
            .toLocaleString(
                "en-IN",
                {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                }
            );

}


// ========================================
// ESCAPE HTML
// ========================================

function escapeHTML(
    value
) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        value || "";


    return div.innerHTML;

}