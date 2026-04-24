

const mobileNavlinkContainer = document.getElementById("mobileNavlinkContainer");
function handleMenuBar() {
    mobileNavlinkContainer.classList.toggle("active");
}

// ===========================

let currentSlide = 0;
        const slides = document.querySelectorAll('.bg-slide');
        const indicators = document.querySelectorAll('.indicator');
        const totalSlides = slides.length;

        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            indicators.forEach(ind => {
                ind.classList.remove('w-10', 'rounded-md');
                ind.classList.add('w-3', 'rounded-full', 'bg-white/40');
            });

            slides[index].classList.add('active');
            indicators[index].classList.remove('w-3', 'rounded-full', 'bg-white/40');
            indicators[index].classList.add('w-10', 'rounded-md', 'bg-white');
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            showSlide(currentSlide);
        }

        // Auto slide every 4 seconds for desktop
        if (slides.length > 0) {
            setInterval(nextSlide, 4000);
        }

        // Manual slide control for desktop
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                currentSlide = index;
                showSlide(currentSlide);
            });
        });

        // Mobile Background slideshow functionality
        let currentSlideMobile = 0;
        const slidesMobile = document.querySelectorAll('.bg-slide-mobile');
        const indicatorsMobile = document.querySelectorAll('.indicator-mobile');
        const totalSlidesMobile = slidesMobile.length;

        function showSlideMobile(index) {
            slidesMobile.forEach(slide => slide.classList.remove('active'));
            indicatorsMobile.forEach(ind => {
                ind.classList.remove('w-8', 'rounded-md', 'bg-white');
                ind.classList.add('w-2', 'rounded-full', 'bg-white/40');
            });

            slidesMobile[index].classList.add('active');
            indicatorsMobile[index].classList.remove('w-2', 'rounded-full', 'bg-white/40');
            indicatorsMobile[index].classList.add('w-8', 'rounded-md', 'bg-white');
        }

        function nextSlideMobile() {
            currentSlideMobile = (currentSlideMobile + 1) % totalSlidesMobile;
            showSlideMobile(currentSlideMobile);
        }

        // Auto slide every 4 seconds for mobile
        if (slidesMobile.length > 0) {
            setInterval(nextSlideMobile, 4000);
        }

        // Manual slide control for mobile
        indicatorsMobile.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                currentSlideMobile = index;
                showSlideMobile(currentSlideMobile);
            });
        });
// ===========================

// Modal Functions
const modelRemoveBtn = document.getElementById("modelRemoveBtn");
const modelContainer = document.getElementById("modelContainer");

modelRemoveBtn.addEventListener("click", closeModel);
function openModel(e) {
    const formHeading = document.getElementById("formHeading");
    formHeading.innerText = e || "Enquire Now For More Details"
    modelContainer.style.display = "block";
    mobileNavlinkContainer.classList.remove("active");
}
function closeModel() {
    modelContainer.style.display = "none";
}

setTimeout(openModel, 3000);

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

// Handle Amenities
const amenitiesData = [
    { id: 1, name: "Gymnasium", image: "./images/gym.svg", alt: "Gymnasium" },
    { id: 2, name: "Swimming Pool", image: "./images/swm.svg", alt: "Swimming Pool" },
    { id: 3, name: "Yoga Pavilion", image: "./images/yoga.svg", alt: "Yoga Pavilion" },
    { id: 4, name: "Video Door Phone", image: "./images/videos.svg", alt: "Video Door Phone" },
    { id: 5, name: "Kids Activity Zone", image: "./images/kids.svg", alt: "Kids Activity Zone" },
    { id: 6, name: "Mini Theater", image: "./images/mine.svg", alt: "Mini Theater" },
    { id: 7, name: "Aerobics Room", image: "./images/tennis.svg", alt: "Tennis Court" },
    { id: 8, name: "Indoor Games Room", image: "./images/chess.svg", alt: "Indoor Games Room" },
    { id: 9, name: "Club House", image: "./images/disco-ball.svg", alt: "Club House" },
    { id: 10, name: "Dance/Music", image: "./images/dance.svg", alt: "Dance/Music" },
    { id: 11, name: "24/7 CCTV Monitoring", image: "./images/cctv.svg", alt: "24/7 CCTV Monitoring" },
    { id: 12, name: "Jogging Track", image: "./images/jog.svg", alt: "Jogging Track" }
];

function displayAmenities() {
    const amenitiesContainer = document.getElementById("amenitiesContainer");
    amenitiesData.forEach(data => {
        const amenitiesBox = document.createElement("div");
        amenitiesBox.className = "flex flex-col lg:w-[196px] w-[150px] h-[150px] shadow-[0_4px_10px_rgba(0,0,0,0.25)] p-2 rounded-lg hover:border border-black hover:transition-all hover:duration-300";

        const imgBox = document.createElement("div");
        imgBox.className = "w-full h-[70%] p-4";

        const img = document.createElement("img");
        img.className = "w-full h-[90%]";
        img.src = data.image;
        img.alt = data.alt;

        const name = document.createElement("p");
        name.className = "text-center h-[15%] lato-thin";
        name.innerText = data.name;

        imgBox.appendChild(img);
        amenitiesBox.appendChild(imgBox);
        amenitiesBox.appendChild(name);
        amenitiesContainer.appendChild(amenitiesBox);
    });
}

displayAmenities();

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


const floorPlans = [
    {
        title: "1 BHK Floor Plan",
        image: "./images/1bhk-floor-plan.png",
    },
    {
        title: "2 BHK Small Floor Plan",
        image: "./images/2bhk-small-floor-plan.png",
    },
    {
        title: "2 BHK Large Floor Plan",
        image: "./images/2bhk-large-floor-plan.png",
    },
    {
        title: "3 BHK Samll Floor Plan",
        image: "./images/3bhk-small-floor-plan.png",
    },
    {
        title: "3 BHK Large Floor Plan",
        image: "./images/3bhk-large-floor-plan.png",
    },
    {
        title: "4 BHK Small Floor Plan",
        image: "./images/4bhk-small-floor-plan.png",
    },
    {
        title: "4 BHK Large Floor Plan",
        image: "./images/4bhk-large-floor-plan.png",
    }
];

function renderFloorPlans() {
    const container = document.getElementById("floorPlans");

    floorPlans.forEach(plan => {
        const div = document.createElement("div");
        div.className = "cursor-pointer";

        div.innerHTML = `
            <img class="w-[100%] h-[250px] border border-black hover:bg-zinc-500"
                 src="${plan.image}"
                 alt="${plan.title}" />
            <p class="text-white bg-primary text-center text-md mt-2 p-1 rounded w-full">
                ${plan.title}
            </p>
        `;

        div.addEventListener("click", () => openModel(plan));

        container.appendChild(div);
    });
}

document.addEventListener("DOMContentLoaded", renderFloorPlans);

  const galleryData = [
    { id: 5, image: "./images/galleryimg6.webp", alt: "Gallery Image 6" },
    { id: 6, image: "./images/galleryimg7.webp", alt: "Gallery Image 7" },
    { id: 7, image: "./images/galleryimg8.png", alt: "Gallery Image 8" },
    { id: 8, image: "./images/galleryimg9.jpeg", alt: "Gallery Image 9" },
    { id: 9, image: "./images/galleryimg10.webp", alt: "Gallery Image 10" },
    { id: 10, image: "./images/sobha-trinity.jpg", alt: "Gallery Image 11" },
    { id: 11, image: "./images/sobha-trinity-2.jpg", alt: "Gallery Image 10" },
    { id: 12, image: "./images/sobha-trinity-hoskote.webp", alt: "Gallery Image 11" },
    
];

function displayGallery() {
    const galleryContainer = document.getElementById("galleryContainer");
    galleryData.forEach(data => {
        const img = document.createElement("img");
        img.classList.add("w-[220px]", "h-[150px]", "rounded-md", "transition-all", "duration-2000", "ease-in-out", "cursor-pointer", "hover:scale-105");
        img.src = data.image;
        img.alt = data.alt;
        img.addEventListener("click", () => handleGalleryModel(data.image))
        galleryContainer.appendChild(img)
    });
}

// Display gallery on page load
displayGallery();

function handleGalleryModel(currImg) {
    const galleryModelImg = document.getElementById("galleryModelImg");
    const galleryModelContainer = document.getElementById("galleryModelContainer");
    galleryModelImg.src = currImg;
    galleryModelContainer.style.display = "block";
}

function closeGalleyModal() {
    const galleryModelContainer = document.getElementById("galleryModelContainer");
    galleryModelContainer.style.display = "none";
}

let idx = 0;

function handleGalleryArrowRight() {
    if (galleryData && galleryData.length > 0) {
        console.log("Right arrow clicked");
        handleGalleryModel(galleryData[idx].image);

        idx++;
        if (idx >= galleryData.length) {
            idx = 0; // Loop back to the first image
        }
    }
}

function handleGalleryArrowLeft() {
    if (galleryData && galleryData.length > 0) {
        handleGalleryModel(galleryData[idx].image);

        idx--;
        if (idx < 0) {
            idx = galleryData.length - 1; // Loop back to the last image
        }
    }
}

const faqData = [
  {
    id: 1,
    question: "What is Sobha Trinity?",
    answer: "Sobha Trinity is a premium integrated township developed by Sobha Limited in Bangalore. It offers thoughtfully designed residential spaces along with modern amenities, green landscapes, and commercial facilities, creating a complete urban lifestyle."
  },
  {
    id: 2,
    question: "Where is Sobha Trinity located?",
    answer: "Sobha Trinity is located in Hoskote, East Bangalore, with excellent connectivity to Whitefield, ITPL, KR Puram, and major highways, making daily commuting convenient."
  },
  {
    id: 3,
    question: "Who is the developer of Sobha Trinity?",
    answer: "Sobha Trinity is developed by Sobha Limited, one of India’s most trusted and reputed real estate developers, known for quality construction and timely delivery."
  },
  {
    id: 4,
    question: "What types of homes are available at Sobha Trinity?",
    answer: "The project offers spacious and well-planned 1, 2, and 3 BHK apartments along with luxury villas and row houses, catering to different lifestyle and budget needs."
  },
  {
    id: 5,
    question: "Is Sobha Trinity a RERA-approved project?",
    answer: "Yes, Sobha Trinity is registered under RERA. Buyers can verify the project’s registration details on the official Karnataka RERA website for complete transparency."
  },
  {
    id: 6,
    question: "What amenities are available at Sobha Trinity?",
    answer: "The township provides world-class amenities such as a clubhouse, swimming pool, gymnasium, landscaped gardens, jogging tracks, children’s play areas, sports courts, and 24/7 security."
  },
  {
    id: 7,
    question: "Does Sobha Trinity have commercial and retail spaces?",
    answer: "Yes, Sobha Trinity includes dedicated commercial and retail zones, ensuring residents have easy access to shopping, dining, and essential services within the township."
  },
  {
    id: 8,
    question: "How is the connectivity of Sobha Trinity?",
    answer: "The project enjoys smooth connectivity via NH-75, Old Madras Road, and upcoming metro extensions, providing easy access to IT hubs, schools, hospitals, and shopping centers."
  },
  {
    id: 9,
    question: "Is Sobha Trinity suitable for investment?",
    answer: "Yes, due to its strategic location, trusted developer, and township concept, Sobha Trinity offers strong potential for capital appreciation and rental income."
  },
  {
    id: 10,
    question: "What security features are provided in Sobha Trinity?",
    answer: "The project is equipped with advanced security systems, including CCTV surveillance, gated entry, intercom facilities, and trained security personnel for residents’ safety."
  },
  {
    id: 11,
    question: "Are eco-friendly features included in Sobha Trinity?",
    answer: "Yes, Sobha Trinity focuses on sustainable living with rainwater harvesting, waste management systems, energy-efficient lighting, and large green open spaces."
  },
  {
    id: 12,
    question: "What social infrastructure is near Sobha Trinity?",
    answer: "The township is close to reputed schools, colleges, hospitals, IT parks, malls, and entertainment zones, ensuring a comfortable and convenient lifestyle."
  },
  {
    id: 13,
    question: "What is the possession timeline for Sobha Trinity?",
    answer: "The possession schedule depends on the specific phase and unit type. Buyers are advised to check with the developer or authorized sales partners for updated timelines."
  },
  {
    id: 14,
    question: "Are home loans available for Sobha Trinity?",
    answer: "Yes, leading banks and financial institutions offer home loan facilities for this project with attractive interest rates and flexible repayment options."
  },
  {
    id: 15,
    question: "How can I book a home at Sobha Trinity?",
    answer: "You can book a unit by contacting the official sales team or authorized channel partners, scheduling a site visit, and completing the required documentation and payment process."
  }
];



function showFaqData() {
    const faqContainer = document.getElementById("faqContainer");
    let faqHtml = '';

    faqData.forEach((item) => {
        faqHtml += `
        <div class="w-full shadow-md rounded-lg mb-4">
            <div class="flex justify-between items-center p-4" onclick="toggleAnswer(${item.id})">
                <h3 class="md:text-2xl text-xl  text-slate-800 font-semibold cursor-pointer">
                    ${item.question}
                </h3>
                <!-- Icon will toggle between plus and minus -->
                <i id="icon-${item.id}" class="fa fa-minus cursor-pointer"></i>
            </div>
            <!-- Initially visible -->
            <div id="answer-${item.id}" class="border-t-2 border-gray-200">
                <p class="p-4 leading-relaxed text-slate-800 text-[17px]">
                    ${item.answer}
                </p>
            </div>
        </div>
        `;
    });

    faqContainer.innerHTML = faqHtml;
}

function toggleAnswer(id) {
    const answerElement = document.getElementById(`answer-${id}`);
    const iconElement = document.getElementById(`icon-${id}`);

    if (answerElement.classList.contains("hidden")) {
        answerElement.classList.remove("hidden");
        iconElement.classList.remove("fa-plus");
        iconElement.classList.add("fa-minus");
    } else {
        answerElement.classList.add("hidden");
        iconElement.classList.remove("fa-minus");
        iconElement.classList.add("fa-plus");
    }
}
showFaqData();

// BLOGS
const blogs = [
    {
    id: 1,
    title: "East Bangalore",
    excerpt: "East Bangalore has rapidly transformed from a quiet suburban stretch into one of the most promising real estate destinations in the city.",
    image: "../images/east-bangalore-blog.jpg",
    link: "/east-bangalore.html"
  },
  {
    id: 2,
    title: "Hoskote Bangalore",
    excerpt: "Hoskote Bangalore is rapidly emerging as one of the most promising residential and investment destinations in East Bangalore.",
    image: "../images/hoskote-bangalore.jpg",
    link: "/hoskote.html"
  },
  {
    id: 3,
    title: "Sobha Trinity Nearby Shopping Mall",
    excerpt: "Easy access to shopping malls and retail destinations is an essential part of modern urban living. From daily essentials to weekend entertainment",
    image: "../images/shopping-mall.jpg",
    link: "/sobha-trinity-nearby-shopping-mall.html"
  },
  {
    id: 4,
    title: "Sobha Trinity Near Hospital",
    excerpt: "Sobha Trinity near hospital locations in Hoskote offer a perfect blend of safety, comfort, and future growth. With access to reputed hospitals like MVJ Hospital",
    image: "../images/hospital.jpg",
    link: "/sobha-trinity-near-hospital.html"
  },
  {
    id: 5,
    title: "Sobha Trinity Near By Metro Station",
    excerpt: "Sobha Trinity near by metro station connectivity offers residents a perfect blend of comfort, convenience, and future growth.",
    image: "../images/metro-station.jpg",
    link: "/sobha-trinity-near-by-metro-station.html"
  },
]
blogs.sort((a, b) => b.id - a.id);

const blogContainer = document.getElementById("blogContainer");
if (blogContainer) {
    blogs.forEach(blog => {
        const card = document.createElement("div");
        card.className = "bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition";

        card.innerHTML = `
            <a href="${blog.link}">
                <img src="${blog.image}" alt="${blog.title}" class="w-full h-48 object-cover">
                <div class="p-4">
                    <h3 class="text-lg font-semibold">${blog.title}</h3>
                    <p class="text-slate-600 mt-2">${blog.excerpt.substring(0, 95)}...</p>
                    <button class="mt-4 w-full bg-primary text-white py-2 rounded">
                        Read More
                    </button>
                </div>
            </a>
        `;
        blogContainer.appendChild(card);
    });
}
