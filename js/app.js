

const menu = document.getElementById("menu");

function toggleMenu() {
  menu.classList.toggle("right-0");
}

// ===========================

document.addEventListener("DOMContentLoaded", () => {

  let current = 0;
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");

  function showSlide(i) {
    slides.forEach(s => s.classList.remove("active"));
    dots.forEach(d => d.classList.remove("active"));

    slides[i].classList.add("active");
    dots[i].classList.add("active");
  }

  function nextSlide() {
    current = (current + 1) % slides.length;
    showSlide(current);
  }

  // Auto slide
  if (slides.length) {
    setInterval(nextSlide, 4000);
  }

  // Click control
  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      current = i;
      showSlide(current);
    });
  });

  });
// ===========================

document.addEventListener("DOMContentLoaded", function () {

  const modal = document.getElementById("modelContainer");
  const closeBtn = document.getElementById("modelRemoveBtn");

  // Open Modal
  window.openModel = function (text) {
    const heading = document.getElementById("formHeading");
    heading.innerText = text || "Enquire Now For More Details";
    modal.classList.remove("hidden");
  };

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

 // Close Modal
  function closeModel() {
    const modal = document.getElementById("modelContainer");
    modal.classList.add("hidden");
}


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
        company_email: 'ahaanwell@gmail.com',
        project_name: "Sobha One World"
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


async function submitBtn2(e) {
    e.preventDefault();
    const submitBtn_2 = document.getElementById("submitBtn_2");
    const name = document.getElementById("name_2").value;
    const email = document.getElementById("email_2").value;
    const number = document.getElementById("number_2").value;
    const countryCode = document.getElementById("country_code_2").value;

    try {
        submitBtn_2.innerText = "Submitting...";
        if (validateForm(name, email, number)) {
            const isSuccess = await submitForm(name, email, number, countryCode);
            if (isSuccess) {
                document.getElementById("name_2").value = "";
                document.getElementById("email_2").value = "";
                document.getElementById("number_2").value = "";
            }
        }
    } catch (error) {
        console.error("Submission error:", error);
    } finally {
        submitBtn_2.innerText = "Submit";
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


const galleryData = [
  { image: "./images/galleryimg6.webp" },
  { image: "./images/galleryimg7.webp" },
  { image: "./images/galleryimg8.png" },
  { image: "./images/galleryimg9.jpeg" }
];

let currentIndex = 0;

function openModal(index) {
  currentIndex = index;
  document.getElementById("modalImg").src = galleryData[index].image;
  document.getElementById("image_modal").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("image_modal").classList.add("hidden");
}

function nextImage() {
  currentIndex = (currentIndex + 1) % galleryData.length;
  openModal(currentIndex);
}

function prevImage() {
  currentIndex = (currentIndex - 1 + galleryData.length) % galleryData.length;
  openModal(currentIndex);
}

