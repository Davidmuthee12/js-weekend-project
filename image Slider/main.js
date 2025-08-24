const slides = document.querySelectorAll(".slides img");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

let currentIndex = 0;

function showSlide(index) {
  slides.forEach((slide) => (slide.style.display = "none"));
  

  slides[index].style.display = "block";
}

nextBtn.addEventListener("click", () => {
  console.log("next index");
  currentIndex++;
  if (currentIndex >= slides.length) {
    currentIndex = 0;
  }
  showSlide(currentIndex);
});

prevBtn.addEventListener("click", () => {
  console.log("prev index");
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = slides.length - 1;
  }
  showSlide(currentIndex);
});

setInterval(() => {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
}, 5000);

showSlide(currentIndex);
