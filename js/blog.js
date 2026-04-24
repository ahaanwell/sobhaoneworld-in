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