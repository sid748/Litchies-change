// navigation bar code here
document.addEventListener("DOMContentLoaded", function () {
    let navbarToggler = document.querySelector(".navbar-toggler");
    let navbarCollapse = document.querySelector(".navbar-collapse");
    let navLinks = document.querySelectorAll(".nav-link");

    // Navbar close when clicking on a nav item
    navLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            if (navbarCollapse.classList.contains("show")) {
                navbarToggler.click();
            }
        });
    });

    // Navbar close when clicking outside
    document.addEventListener("click", function (event) {
        let isClickInside = navbarCollapse.contains(event.target) || navbarToggler.contains(event.target);
        if (!isClickInside && navbarCollapse.classList.contains("show")) {
            navbarToggler.click();
        }
    });

    // Navbar toggler par border remove karna
    navbarToggler.addEventListener("click", function () {
        setTimeout(() => {
            navbarToggler.style.outline = "none";
            navbarToggler.style.boxShadow = "none";
        }, 300);
    });
});



// mobile slider code here
document.addEventListener("DOMContentLoaded", function () {
    let lastScrollY = window.scrollY;

    // Initialize Swiper
    let swiper = new Swiper(".mySwiper", {
        loop: true,
        slidesPerView: 1,
        centeredSlides: true,
        spaceBetween: 10,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        },
        breakpoints: {
            600: {
                slidesPerView: 2
            },
            768: {
                slidesPerView: 3
            },
            992: {
                slidesPerView: 4
            },
            1200: {
                slidesPerView: 5
            },
            1400: {
                slidesPerView: 6
            }
        }
    });

    // Scroll effect for sliding
    window.addEventListener("scroll", function () {
        let currentScrollY = window.scrollY;
        let scrollDifference = currentScrollY - lastScrollY;

        if (scrollDifference > 0) {
            swiper.slideNext(); // Scroll down → move left
        } else {
            swiper.slidePrev(); // Scroll up → move right
        }

        lastScrollY = currentScrollY;
    });
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


// faq section starts here
document.addEventListener("DOMContentLoaded", function () {
    const accordionButtons = document.querySelectorAll(".accordion-button");

    accordionButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const icon = this.querySelector(".answer-btn");

            // Check if the clicked button is collapsed or expanded
            setTimeout(() => {
                if (this.classList.contains("collapsed")) {
                    icon.textContent = "+";
                } else {
                    icon.textContent = "−";
                }
            }, 200); // Adding a slight delay to ensure correct toggle
        });
    });

    // Set initial state when page loads
    document.querySelectorAll(".accordion-collapse.show").forEach((item) => {
        const btn = item.previousElementSibling.querySelector(".answer-btn");
        if (btn) {
            btn.textContent = "−";
        }
    });
});



