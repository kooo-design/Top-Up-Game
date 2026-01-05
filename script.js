let currentSlideIndex = 0;
let autoSlideInterval = null;

function initSlider() {
  const slides = document.querySelectorAll(".slide");
  const nav = document.querySelector(".slider-nav");
  if (!nav) return;
  nav.innerHTML = "";
  slides.forEach((_, i) => {
    const span = document.createElement("span");
    span.className = "slider-dot";
    if (i === 0) span.classList.add("active");
    span.addEventListener("click", () => currentSlide(i));
    nav.appendChild(span);
  });
  updateSlider();
}

function moveSlide(direction) {
  const slides = document.querySelectorAll(".slide");
  if (!slides.length) return;

  currentSlideIndex += direction;
  if (currentSlideIndex >= slides.length) currentSlideIndex = 0;
  if (currentSlideIndex < 0) currentSlideIndex = slides.length - 1;

  updateSlider();
}

function currentSlide(index) {
  const slides = document.querySelectorAll(".slide");
  if (!slides.length) return;
  currentSlideIndex = index % slides.length;
  updateSlider();
}

function updateSlider() {
  const slidesContainer = document.querySelector(".slides");
  const dots = document.querySelectorAll(".slider-dot");
  const slides = document.querySelectorAll(".slide");
  if (!slidesContainer) return;

  slidesContainer.style.transform = `translateX(-${currentSlideIndex * 100}%)`;

  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentSlideIndex);
  });

  const nav = document.querySelector(".slider-nav");
  if (nav) nav.style.display = slides.length <= 1 ? "none" : "";
}

function startAutoSlide() {
  if (autoSlideInterval) clearInterval(autoSlideInterval);
  autoSlideInterval = setInterval(() => moveSlide(1), 5000);
}

window.addEventListener("load", () => {
  initSlider();
  startAutoSlide();
});
