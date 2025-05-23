const carouselTrack = document.querySelector('.carousel-images');
const images = document.querySelectorAll('.carousel-images img');
const prevBtn = document.querySelector('.arrow.left');
const nextBtn = document.querySelector('.arrow.right');

let index = 0;
let visibleCount = getVisibleCount();

function getVisibleCount() {
  const width = window.innerWidth;
  if (width <= 600) return 1;
  if (width <= 900) return 2;
  return 3;
}

function updateCarousel() {
  const gap = 20; // Same as CSS
  const imgWidth = images[0].clientWidth;
  const offset = (imgWidth + gap) * index;
  carouselTrack.style.transform = `translateX(-${offset}px)`;
}

function cycleNext() {
  const maxIndex = images.length - visibleCount;
  index = (index + 1) > maxIndex ? 0 : index + 1;
  updateCarousel();
}

function cyclePrev() {
  const maxIndex = images.length - visibleCount;
  index = (index - 1) < 0 ? maxIndex : index - 1;
  updateCarousel();
}

let interval = setInterval(cycleNext, 3000);

nextBtn.addEventListener('click', () => {
  clearInterval(interval);
  cycleNext();
  interval = setInterval(cycleNext, 3000);
});

prevBtn.addEventListener('click', () => {
  clearInterval(interval);
  cyclePrev();
  interval = setInterval(cycleNext, 3000);
});

// Pause on hover
carouselTrack.addEventListener('mouseenter', () => clearInterval(interval));
carouselTrack.addEventListener('mouseleave', () => interval = setInterval(cycleNext, 3000));

// Update on resize
window.addEventListener('resize', () => {
  visibleCount = getVisibleCount();
  index = 0; // reset index on resize to avoid overflow
  updateCarousel();
});

// Initial layout adjustment
window.addEventListener('load', updateCarousel);
