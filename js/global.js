

const menu = document.getElementById("menu");

function toggleMenu() {
  menu.classList.toggle("right-0");
}


document.addEventListener("DOMContentLoaded", function () {

  const modal = document.getElementById("modelContainer");
  const closeBtn = document.getElementById("modelRemoveBtn");

  // Open Modal
  window.openModel = function (text) {
    const heading = document.getElementById("formHeading");
    heading.innerText = text || "Enquire Now For More Details";
    modal.classList.remove("hidden");
  };

  // Close Modal
  function closeModel() {
    modal.classList.add("hidden");
  }

  closeBtn.addEventListener("click", closeModel);

  // Close on outside click
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      closeModel();
    }
  });

  // Close on ESC key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeModel();
    }
  });

  // Auto open after 3 sec
  setTimeout(() => {
    openModel();
  }, 3000);

});

// Form Submission Handling
const smtp_api = "https://smtp-server-sepia.vercel.app/send-email";

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

