// Mobile slider scroll code here
let lastScrollY = window.scrollY;
const carousel = document.querySelector(".carousel-container");
const slides = document.querySelectorAll(".mobile-slide");
const totalSlides = slides.length;
const slideWidth = slides[0].offsetWidth + 10; // Adjusting for spacing

window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;
    const scrollDifference = currentScrollY - lastScrollY;

    if (scrollDifference > 0) {
        // Scrolling Down - Move Carousel Left
        carousel.style.transform = `translateX(-${Math.min(currentScrollY / 8, totalSlides * slideWidth)}px)`;
    } else {
        // Scrolling Up - Move Carousel Right
        carousel.style.transform = `translateX(${Math.max(-currentScrollY / 8, 0)}px)`;
    }

    lastScrollY = currentScrollY;
});

// why choose us counter code here


document.addEventListener("DOMContentLoaded", function () {
    function animateCounter(counter) {
        let count = 0;
        let target = parseInt(counter.getAttribute("data-count"));
        let increment = target / 100;
        let interval = setInterval(() => {
            count += increment;
            if (count >= target) {
                count = target;
                clearInterval(interval);
            }
            counter.innerText = Math.floor(count) + "+"; // Added "+" after the number
        }, 20);
    }

    function handleScroll() {
        document.querySelectorAll(".counter").forEach(counter => {
            let rect = counter.getBoundingClientRect();
            if (rect.top < window.innerHeight && !counter.dataset.animated) {
                counter.dataset.animated = "true"; // Prevents multiple animations
                animateCounter(counter);
            }
        });
    }

    // Debounce function to improve performance
    function debounce(func, delay) {
        let timeout;
        return function () {
            clearTimeout(timeout);
            timeout = setTimeout(func, delay);
        };
    }

    window.addEventListener("scroll", debounce(handleScroll, 100));
    handleScroll(); // Runs once on page load to check visibility
});


// Testimonial slider code here
let currentIndex = 0;
const testimonials = document.querySelectorAll(".testimonial");
const dots = document.querySelectorAll(".dot");

function showSlide(index) {
    testimonials.forEach((testimonial, i) => {
        testimonial.classList.remove("active");
        dots[i].classList.remove("active");
        if (i === index) {
            testimonial.classList.add("active");
            dots[i].classList.add("active");
        }
    });
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % testimonials.length;
    showSlide(currentIndex);
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
    showSlide(currentIndex);
}

function currentSlide(index) {
    currentIndex = index;
    showSlide(currentIndex);
}

// Auto slide every 5 seconds
setInterval(nextSlide, 5000);

// watch video
document.addEventListener("DOMContentLoaded", function () {
    let modal = document.getElementById("video-modal");
    let playButton = document.getElementById("play-video");
    let closeButton = document.querySelector(".close");
    let videoFrame = document.getElementById("video-frame");

    // Ensure modal is hidden on page load (if CSS is overridden)
    modal.style.display = "none";

    // Play button click -> Open modal
    playButton.addEventListener("click", function () {
        modal.style.display = "flex";
    });

    // Close button click -> Hide modal
    closeButton.addEventListener("click", function () {
        modal.style.display = "none";
        videoFrame.src = videoFrame.src; // Stop video
    });

    // Click outside modal -> Hide modal
    modal.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
            videoFrame.src = videoFrame.src; // Stop video
        }
    });
});


