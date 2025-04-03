document.addEventListener("DOMContentLoaded", function () {
    let lastScrollY = window.scrollY;
    const carousel = document.querySelector(".carousel-container");
    const slides = document.querySelectorAll(".mobile-slide");
    const totalSlides = slides.length;
    let slideWidth = slides[0].offsetWidth + 15; // Adjust spacing
    let isScrolling = false;
    let currentIndex = 0;
    let autoSlideInterval;

    // Function to move carousel based on scroll
    function handleScroll() {
        isScrolling = true;
        const currentScrollY = window.scrollY;
        const scrollDifference = currentScrollY - lastScrollY;

        let currentTransform = parseFloat(getComputedStyle(carousel).transform.split(",")[4]) || 0;

        if (scrollDifference > 0) {
            // Scroll Down → Move Left
            currentTransform = Math.max(currentTransform - slideWidth / 2, -(totalSlides * slideWidth - window.innerWidth));
        } else {
            // Scroll Up → Move Right
            currentTransform = Math.min(currentTransform + slideWidth / 2, 0);
        }

        carousel.style.transition = "transform 0.5s ease-out";
        carousel.style.transform = `translateX(${currentTransform}px)`;
        lastScrollY = currentScrollY;

        clearTimeout(window.resumeScrollEffect);
        window.resumeScrollEffect = setTimeout(() => {
            isScrolling = false;
        }, 500);
    }

    // Auto-slide function
    function autoSlide() {
        if (!isScrolling) {
            currentIndex = (currentIndex + 1) % totalSlides;
            let newTransformValue = -(currentIndex * slideWidth);
            carousel.style.transition = "transform 0.8s ease-in-out";
            carousel.style.transform = `translateX(${newTransformValue}px)`;
        }
    }

    // Start auto-slide
    function startAutoSlide() {
        autoSlideInterval = setInterval(autoSlide, 5000);
    }

    // Stop auto-slide when user scrolls
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Event listeners
    window.addEventListener("scroll", () => {
        stopAutoSlide(); // Pause auto-slide during scrolling
        handleScroll();
        startAutoSlide(); // Restart auto-slide after scrolling stops
    });

    window.addEventListener("resize", () => {
        slideWidth = slides[0].offsetWidth + 15;
    });

    startAutoSlide(); // Initialize auto-slide on page load
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

// floating video code here
const video = document.getElementById("floatingVideo");
const videoContainer = document.getElementById("videoContainer");

function togglePlayPause() {
    if (video.paused) {
        video.play();
        document.getElementById("playPauseBtn").innerHTML = "❚❚";
    } else {
        video.pause();
        document.getElementById("playPauseBtn").innerHTML = "▶";
    }
}

function toggleMute() {
    video.muted = !video.muted;
    document.getElementById("muteBtn").innerHTML = video.muted ? "🔇" : "🔊";
}

function minimizeVideo() {
    videoContainer.classList.toggle("minimized");
}

function closeVideo() {
    videoContainer.style.display = "none";
}

