const menu = document.getElementById("menu");

function toggleMenu() {
  menu.classList.toggle("right-0");
}

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
const smtp_api = "https://m2nserver.online/send-lead";

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


const galleryData = [
  { image: "./images/sobha-one-world-banner.webp" },
  { image: "./images/sobha-one-world.webp" },
  { image: "./images/sobhaoneworld.webp" },
  { image: "./images/sobhaoneworld-price.webp" },
  { image: "./images/sobha-one-world-gallery-1.webp" },
  { image: "./images/sobha-one-world-gallery-2.webp" },
  { image: "./images/sobha-one-world-gallery-3.webp" },
  { image: "./images/sobha-one-world-gallery-4.webp" },
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

function escapeHtml(str) {
    return String(str ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

// The CMS API blocks any browser request carrying an Origin header, so this
// calls blog-list.php (same origin) instead, which fetches from the CMS
// server-side and passes the data through.
async function loadBlogs() {
    const grid = document.getElementById("blogGrid");
    if (!grid) return;

    try {
        const res = await fetch("/blog-list.php");
        if (!res.ok) throw new Error(`Failed to load blogs: ${res.status}`);

        const data = await res.json();
        const blogs = data.blogs || [];

        if (!blogs.length) {
            grid.innerHTML = `<p class="text-center text-gray-500 col-span-full">No blogs available yet.</p>`;
            return;
        }

        grid.innerHTML = blogs.map(blog => {
            const image = blog.featuredImage?.url || "./images/logo.webp";
            const date = new Date(blog.publishedAt).toLocaleDateString("en-IN", {
                year: "numeric", month: "long", day: "numeric"
            });

            return `
                <a href="/${blog.slug}.html" class="group block bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div class="h-44 overflow-hidden">
                        <img src="${image}" alt="${escapeHtml(blog.title)}" loading="lazy" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
                    </div>
                    <div class="p-4">
                        <h3 class="font-semibold text-gray-900 mb-2 line-clamp-2">${escapeHtml(blog.title)}</h3>
                        <p class="text-sm text-gray-600 line-clamp-2">${escapeHtml(blog.metaDescription)}</p>
                        <span class="inline-block mt-3 text-sm font-semibold text-primary">Read More &rarr;</span>
                    </div>
                </a>
            `;
        }).join("");
    } catch (error) {
        console.log("blogs error", error.message);
        grid.innerHTML = `<p class="text-center text-gray-500 col-span-full">Unable to load blogs right now.</p>`;
    }
}

document.addEventListener("DOMContentLoaded", loadBlogs);