function handleMenuBar() {
    const mobileNavlinkContainer = document.getElementById("mobileNavlinkContainer");
    mobileNavlinkContainer.classList.toggle("active");
}

// Modal Functions
const modelRemoveBtn = document.getElementById("modelRemoveBtn");
const modelContainer = document.getElementById("modelContainer");

modelRemoveBtn.addEventListener("click", closeModel);
function openModel() {
    modelContainer.style.display = "block";
}
function closeModel() {
    modelContainer.style.display = "none";
}

setTimeout(openModel, 10000);

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
const smtp_api = "https://smtp-server-sepia.vercel.app/send-email";

// const phoneNumberPattern = /^(\+\d{1,2}\s?)?(\(?\d{3}\)?[\s.-]?)?\d{3}[\s.-]?\d{4}$/;

function validateForm(name, email, number) {
    if (!name || !email || !number) {
        alert("Please fill in all required fields.");
        return false;
    }
    return true;
}

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
            alert("Successfully Submitted we will call you");
            return true;
        } else {
            alert("Something went wrong");
        }
    } catch (error) {
        alert("Something went wrong, please try again");
    }
    return false;
}

// Form Submission Event Listeners
document.getElementById("submitBtn_1").addEventListener("click", async (e) => {
    e.preventDefault();
    const name = document.getElementById("name_1").value;
    const email = document.getElementById("email_1").value;
    const number = document.getElementById("number_1").value;
    const countryCode = document.getElementById("country_code_1").value;

    if (validateForm(name, email, number)) {
        submitBtn_1.innerText = "Submitting...";
        const isSuccess = await submitForm(name, email, number, countryCode);
        if (isSuccess) {
            document.getElementById("name_1").value = "";
            document.getElementById("email_1").value = "";
            document.getElementById("number_1").value = "";
            closeModel();
        }
        submitBtn_1.innerText = "Submit";
    }
});


document.getElementById("submitBtn_3").addEventListener("click", async (e) => {
    e.preventDefault();
    const name = document.getElementById("name_3").value;
    const email = document.getElementById("email_3").value;
    const number = document.getElementById("number_3").value;

    if (validateForm(name, email, number)) {
        submitBtn_3.innerText = "Downloading..."
        const isSuccess = await submitForm(name, email, number);
        if (isSuccess) {
            document.getElementById("name_3").value = "";
            document.getElementById("email_3").value = "";
            document.getElementById("number_3").value = "";
        }
        submitBtn_3.innerText = "Download"
    }
});

document.getElementById("submitBtn_4").addEventListener("click", async (e) => {
    e.preventDefault();
    const name = document.getElementById("name_4").value;
    const email = document.getElementById("email_4").value;
    const number = document.getElementById("number_4").value;

    if (validateForm(name, email, number)) {
        submitBtn_4.innerText = "Downloading..."
        const isSuccess = await submitForm(name, email, number);
        if (isSuccess) {
            document.getElementById("name_4").value = "";
            document.getElementById("email_4").value = "";
            document.getElementById("number_4").value = "";
        }
        submitBtn_4.innerText = "Download"
    }

});

const priceDetails = [
    { type: "1 BHK", size: "703 Sq. Ft", price: "80 Lakhs" },
    { type: "2 BHK (Small)", size: "1,015 Sq. Ft", price: "1.20 Crore" },
    { type: "2 BHK (Large)", size: "1,213 Sq. Ft", price: "1.40 Crore" },
    { type: "3 BHK (Small)", size: "1,511 Sq. Ft", price: "1.80 Crore" },
    { type: "3 BHK (Large)", size: "1,811 Sq. Ft", price: "2.10 Crore" },
    { type: "4 BHK (Small)", size: "2,102 Sq. Ft", price: "2.50 Crore" },
    { type: "4 BHK (Large)", size: "2,407 Sq. Ft", price: "2.80 Crore" },
];

function showPrice() {
    const container = document.getElementById("price-cards");
    if (!container) return;

    container.innerHTML = `
        
        <!-- Desktop Table -->
        <div class="hidden md:block overflow-x-auto">
            <table class="w-full border-collapse rounded-md overflow-hidden shadow-md">
                <thead class="bg-primary text-white">
                    <tr>
                        <th class="p-4">Configuration</th>
                        <th class="p-4">Size</th>
                        <th class="p-4">Price</th>
                        <th class="p-4">Action</th>
                    </tr>
                </thead>
                <tbody>
                    ${priceDetails.map(card => `
                        <tr class="text-center bg-white hover:bg-gray-100 transition">
                            <td class="p-4 font-semibold">${card.type}</td>
                            <td class="p-4">${card.size}</td>
                            <td class="p-4 font-bold text-lg">₹ ${card.price}</td>
                            <td class="p-4">
                                <button 
                                    class="bg-primary text-white px-4 py-2 rounded-full"
                                    onclick='openModel("${card.type} Price Enquiry")'>
                                    Download
                                </button>
                            </td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        </div>

        <!-- Mobile Stacked Layout -->
        <div class="md:hidden space-y-4">
            ${priceDetails.map(card => `
                <div class="bg-white shadow-md rounded-xl p-4 space-y-3 text-center">
                    <h4 class="font-semibold text-lg">${card.type}</h4>
                    <p class="text-gray-600">${card.size}</p>
                    <p class="font-bold text-xl">₹ ${card.price}</p>
                    <button 
                        class="w-full bg-primary text-white py-2 rounded-full"
                        onclick='openModel("${card.type} Price Enquiry")'>
                        Download Price Sheet
                    </button>
                </div>
            `).join("")}
        </div>
    `;
}

showPrice();
