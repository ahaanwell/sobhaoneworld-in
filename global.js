
function handleMenuBar() {
    const mobileNavlinkContainer = document.getElementById("mobileNavlinkContainer");
    mobileNavlinkContainer.classList.toggle("active");
}

// Modal Functions
const modelContainer = document.getElementById("modelContainer");
const modelRemoveBtn = document.getElementById("modelRemoveBtn");

function openModel() {
  if (modelContainer) {
    modelContainer.classList.remove("hidden");
    modelContainer.style.display = "block";
  }
}

function closeModel() {
  if (modelContainer) {
    modelContainer.classList.add("hidden");
    modelContainer.style.display = "none";
  }
}

if (modelRemoveBtn) {
  modelRemoveBtn.addEventListener("click", closeModel);
}

// Show modal automatically after 10 seconds
setTimeout(() => {
  if (modelContainer) openModel();
}, 10000);


// Toggle Brochure Download Form
const broucherDownloadContainer = document.getElementById("broucherDownloadContainer");
const costSheetDownloadContainer = document.getElementById("costSheetDownloadContainer");

const brochureArrow = document.getElementById("brochureArrow");
const costSheetArrow = document.getElementById("costSheetArrow");

function toggleBrochureDownloadForm() {
    const isActive = broucherDownloadContainer.classList.toggle("broucherActive");
    costSheetDownloadContainer.classList.remove("costSheetActive");

    // Arrow toggle
    brochureArrow.classList.toggle("fa-arrow-circle-down", isActive);
    brochureArrow.classList.toggle("fa-arrow-circle-up", !isActive);

    // Reset other arrow
    costSheetArrow.classList.remove("fa-arrow-circle-down");
    costSheetArrow.classList.add("fa-arrow-circle-up");

    mobileNavlinkContainer.classList.remove("active");
}

function toggleCostSheetDownloadForm() {
    const isActive = costSheetDownloadContainer.classList.toggle("costSheetActive");
    broucherDownloadContainer.classList.remove("broucherActive");

    // Corrected Arrow toggle (split class names!)
    costSheetArrow.classList.toggle("fa-arrow-circle-down", isActive);
    costSheetArrow.classList.toggle("fa-arrow-circle-up", !isActive);

    // Reset other arrow
    brochureArrow.classList.remove("fa-arrow-circle-down");
    brochureArrow.classList.add("fa-arrow-circle-up");

    mobileNavlinkContainer.classList.remove("active");
}

window.onload = () => {
    toggleBrochureDownloadForm();
};

// Form Submission Handling
// Form Submission Handling
const smtp_api = "https://smtp-server-sepia.vercel.app/send-email";

const phoneNumberPattern = /^(\+\d{1,2}\s?)?(\(?\d{3}\)?[\s.-]?)?\d{3}[\s.-]?\d{4}$/;

function validateForm(name, email, number) {
    if (!name || !email || !number) {
        alert("Please fill in all required fields.");
        return false;
    }
    return true;
}

// info@searchmyspace.in

async function submitForm(name, email, number, countryCode = '') {
    const data = {
        name,
        email,
        number,
        country_code: countryCode,
        company_email: 'info@searchmyspace.in',
        project_name: "Adarsh Lake View"
    };

    try {
        const res = await fetch(smtp_api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (res.ok) {
            const responseData = await res.json();
            alert(responseData.message);
            return true;
        } else {
            alert("Something went wrong");
        }
    } catch (error) {
        console.log("error",error.message)
        alert("Something went wrong, please try again");
    }
    return false;
}

async function submitBtn1(e) {
    e.preventDefault();

    const submitBtn_1 = document.getElementById("submitBtn_1");
    const name = document.getElementById("name_1").value;
    const email = document.getElementById("email_1").value;
    const number = document.getElementById("number_1").value;
    const countryCode = document.getElementById("country_code_1").value;

    try {
        submitBtn_1.innerText = "Submitting...";
        if (validateForm(name, email, number)) {
            const isSuccess = await submitForm(name, email, number, countryCode);
            if (isSuccess) {
                document.getElementById("name_1").value = "";
                document.getElementById("email_1").value = "";
                document.getElementById("number_1").value = "";
                closeModel();
            }
        }
    } catch (error) {
        console.error("Submission error:", error);
    } finally {
        submitBtn_1.innerText = "Submit";
    }
}

async function submitBtn3(e) {
    e.preventDefault();
    const submitBtn_3 = document.getElementById("submitBtn_3");
    const name = document.getElementById("name_3").value;
    const email = document.getElementById("email_3").value;
    const number = document.getElementById("number_3").value;
    try {
        submitBtn_3.innerText = "Downloading...";
        if (validateForm(name, email, number)) {
            const isSuccess = await submitForm(name, email, number);
            if (isSuccess) {
                document.getElementById("name_3").value = "";
                document.getElementById("email_3").value = "";
                document.getElementById("number_3").value = "";
            }
        }
    } catch (error) {
        console.error("Submission error:", error);
    } finally {
        submitBtn_3.innerText = "Download";
    }
}

async function submitBtn4(e) {
    e.preventDefault();
    const submitBtn_4 = document.getElementById("submitBtn_4");
    const name = document.getElementById("name_4").value;
    const email = document.getElementById("email_4").value;
    const number = document.getElementById("number_4").value;
    try {
        submitBtn_4.innerText = "Downloading...";
        if (validateForm(name, email, number)) {
            const isSuccess = await submitForm(name, email, number);
            if (isSuccess) {
                document.getElementById("name_4").value = "";
                document.getElementById("email_4").value = "";
                document.getElementById("number_4").value = "";
            }
        }
    } catch (error) {
        console.error("Submission error:", error);
    } finally {
        submitBtn_4.innerText = "Download";
    }
}
