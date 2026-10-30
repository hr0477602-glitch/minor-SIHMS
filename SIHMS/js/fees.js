// ========================================
// FEES MANAGEMENT SYSTEM
// ========================================

let fees =
    JSON.parse(localStorage.getItem("fees")) || [];

let editingIndex = -1;


// ========================================
// HTML ELEMENTS
// ========================================

const feeForm =
    document.getElementById("feeForm");

const feeTableBody =
    document.getElementById("feeTableBody");

const searchFee =
    document.getElementById("searchFee");

const totalAmount =
    document.getElementById("totalAmount");

const paidAmount =
    document.getElementById("paidAmount");

const remainingAmount =
    document.getElementById("remainingAmount");


// Display existing records
displayFees(fees);


// ========================================
// AUTO CALCULATE REMAINING AMOUNT
// ========================================

totalAmount.addEventListener(
    "input",
    calculateRemaining
);

paidAmount.addEventListener(
    "input",
    calculateRemaining
);


function calculateRemaining() {

    const total =
        Number(totalAmount.value) || 0;

    const paid =
        Number(paidAmount.value) || 0;


    if (paid > total) {

        remainingAmount.value = 0;

        return;
    }


    remainingAmount.value =
        (total - paid).toFixed(2);


    updatePaymentStatus(
        total,
        paid
    );

}


// ========================================
// AUTO PAYMENT STATUS
// ========================================

function updatePaymentStatus(
    total,
    paid
) {

    const paymentStatus =
        document.getElementById(
            "paymentStatus"
        );


    if (total <= 0) {

        paymentStatus.value = "";

        return;
    }


    if (paid >= total) {

        paymentStatus.value = "Paid";

    } else if (paid > 0) {

        paymentStatus.value = "Partial";

    } else {

        paymentStatus.value = "Pending";

    }

}


// ========================================
// ADD / UPDATE FEE
// ========================================

feeForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const studentSelect =
            document.getElementById(
                "student"
            );


        const studentText =
            studentSelect.options[
                studentSelect.selectedIndex
            ].text;


        const studentParts =
            studentText.split(" - ");


        const total =
            Number(
                document.getElementById(
                    "totalAmount"
                ).value
            );


        const paid =
            Number(
                document.getElementById(
                    "paidAmount"
                ).value
            );


        // Validate amount

        if (total < 0 || paid < 0) {

            alert(
                "Amount cannot be negative."
            );

            return;
        }


        if (paid > total) {

            alert(
                "Paid amount cannot be greater than total amount."
            );

            return;
        }


        const remaining =
            total - paid;


        let paymentStatus;


        if (remaining === 0) {

            paymentStatus = "Paid";

        } else if (paid > 0) {

            paymentStatus = "Partial";

        } else {

            paymentStatus = "Pending";

        }


        const fee = {

            feeId:
                document.getElementById(
                    "feeId"
                ).value.trim(),

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

            feeType:
                document.getElementById(
                    "feeType"
                ).value,

            totalAmount:
                total,

            paidAmount:
                paid,

            remainingAmount:
                remaining,

            paymentDate:
                document.getElementById(
                    "paymentDate"
                ).value,

            paymentMethod:
                document.getElementById(
                    "paymentMethod"
                ).value,

            paymentStatus:
                paymentStatus,

            remarks:
                document.getElementById(
                    "remarks"
                ).value.trim()

        };


        // ====================================
        // CHECK DUPLICATE FEE ID
        // ====================================

        const duplicate =
            fees.some(
                function (item, index) {

                    return (
                        item.feeId.toLowerCase() ===
                        fee.feeId.toLowerCase() &&
                        index !== editingIndex
                    );

                }
            );


        if (duplicate) {

            alert(
                "Fee ID already exists."
            );

            return;
        }


        // ====================================
        // ADD
        // ====================================

        if (editingIndex === -1) {

            fees.push(fee);

            alert(
                "Fee record added successfully."
            );

        }


        // ====================================
        // UPDATE
        // ====================================

        else {

            fees[editingIndex] = fee;

            alert(
                "Fee record updated successfully."
            );

            editingIndex = -1;

        }


        saveFees();

        displayFees(fees);

        resetFeeForm();

    }
);


// ========================================
// DISPLAY FEES
// ========================================

function displayFees(list) {

    feeTableBody.innerHTML = "";


    document.getElementById(
        "feeCount"
    ).textContent =
        "Total Records: " +
        fees.length;


    if (list.length === 0) {

        feeTableBody.innerHTML = `
            <tr>

                <td
                    colspan="11"
                    style="text-align:center; padding:20px;">

                    No fee records found.

                </td>

            </tr>
        `;

        return;
    }


    list.forEach(
        function (fee) {

            const index =
                fees.indexOf(fee);


            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>
                    ${escapeHTML(fee.feeId)}
                </td>

                <td>
                    ${escapeHTML(fee.studentId)}
                </td>

                <td>
                    ${escapeHTML(fee.studentName)}
                </td>

                <td>
                    ${escapeHTML(fee.department)}
                </td>

                <td>
                    Semester
                    ${escapeHTML(fee.semester)}
                </td>

                <td>
                    ${escapeHTML(fee.feeType)}
                </td>

                <td>
                    ₹${Number(
                        fee.totalAmount
                    ).toFixed(2)}
                </td>

                <td>
                    ₹${Number(
                        fee.paidAmount
                    ).toFixed(2)}
                </td>

                <td>
                    ₹${Number(
                        fee.remainingAmount
                    ).toFixed(2)}
                </td>

                <td>
                    <strong>
                        ${escapeHTML(
                            fee.paymentStatus
                        )}
                    </strong>
                </td>

                <td>

                    <button
                        onclick="editFee(${index})">

                        Edit

                    </button>


                    <button
                        onclick="deleteFee(${index})">

                        Delete

                    </button>

                </td>

            `;


            feeTableBody.appendChild(row);

        }
    );

}


// ========================================
// SEARCH FEES
// ========================================

searchFee.addEventListener(
    "input",
    function () {

        const searchValue =
            searchFee.value
                .toLowerCase()
                .trim();


        const filteredFees =
            fees.filter(
                function (fee) {

                    return (

                        fee.feeId
                            .toLowerCase()
                            .includes(searchValue)

                        ||

                        fee.studentId
                            .toLowerCase()
                            .includes(searchValue)

                        ||

                        fee.studentName
                            .toLowerCase()
                            .includes(searchValue)

                        ||

                        fee.department
                            .toLowerCase()
                            .includes(searchValue)

                        ||

                        fee.feeType
                            .toLowerCase()
                            .includes(searchValue)

                        ||

                        fee.paymentStatus
                            .toLowerCase()
                            .includes(searchValue)

                    );

                }
            );


        displayFees(filteredFees);

    }
);


// ========================================
// EDIT FEE
// ========================================

function editFee(index) {

    const fee =
        fees[index];


    if (!fee) {
        return;
    }


    document.getElementById(
        "feeId"
    ).value =
        fee.feeId;


    document.getElementById(
        "student"
    ).value =
        fee.studentId;


    document.getElementById(
        "department"
    ).value =
        fee.department;


    document.getElementById(
        "semester"
    ).value =
        fee.semester;


    document.getElementById(
        "feeType"
    ).value =
        fee.feeType;


    document.getElementById(
        "totalAmount"
    ).value =
        fee.totalAmount;


    document.getElementById(
        "paidAmount"
    ).value =
        fee.paidAmount;


    document.getElementById(
        "remainingAmount"
    ).value =
        fee.remainingAmount;


    document.getElementById(
        "paymentDate"
    ).value =
        fee.paymentDate;


    document.getElementById(
        "paymentMethod"
    ).value =
        fee.paymentMethod;


    document.getElementById(
        "paymentStatus"
    ).value =
        fee.paymentStatus;


    document.getElementById(
        "remarks"
    ).value =
        fee.remarks;


    editingIndex = index;


    document.getElementById(
        "formTitle"
    ).textContent =
        "Edit Fee Record";


    document.getElementById(
        "submitBtn"
    ).textContent =
        "Update Fee Record";


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// ========================================
// DELETE FEE
// ========================================

function deleteFee(index) {

    const fee =
        fees[index];


    if (!fee) {
        return;
    }


    const confirmation =
        confirm(
            "Are you sure you want to delete this fee record?"
        );


    if (!confirmation) {
        return;
    }


    fees.splice(index, 1);


    saveFees();

    displayFees(fees);


    alert(
        "Fee record deleted successfully."
    );

}


// ========================================
// RESET FORM
// ========================================

function resetFeeForm() {

    feeForm.reset();

    editingIndex = -1;


    remainingAmount.value = "";


    document.getElementById(
        "formTitle"
    ).textContent =
        "Add Fee Record";


    document.getElementById(
        "submitBtn"
    ).textContent =
        "Add Fee Record";

}


// ========================================
// SAVE TO LOCALSTORAGE
// ========================================

function saveFees() {

    localStorage.setItem(
        "fees",
        JSON.stringify(fees)
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