// navigation bar code here
document.addEventListener("DOMContentLoaded", function() {
    const navbar = document.querySelector(".navbar");
    const navbarToggler = document.querySelector(".navbar-toggler");
    const navbarCollapse = document.querySelector(".navbar-collapse");
    const navLinks = document.querySelectorAll(".nav-link");
    let lastScroll = 0;
    const scrollThreshold = 100;

    // Scroll hide/show functionality
    window.addEventListener("scroll", function() {
        const currentScroll = window.pageYOffset;
        
        // Add/remove scrolled class
        if (currentScroll > 50) {
            navbar.classList.add("navbar-scrolled");
        } else {
            navbar.classList.remove("navbar-scrolled");
        }

        // Hide/show logic
        if (currentScroll <= 0) {
            navbar.classList.remove("navbar-hide");
            return;
        }

        if (!navbarCollapse.classList.contains("show")) {
            if (currentScroll > lastScroll && currentScroll > scrollThreshold) {
                navbar.classList.add("navbar-hide");
            } else if (currentScroll < lastScroll) {
                navbar.classList.remove("navbar-hide");
            }
        }
        
        lastScroll = currentScroll;
    });

    // Existing navbar functionality
    navLinks.forEach(function(link) {
        link.addEventListener("click", function() {
            if (navbarCollapse.classList.contains("show")) {
                navbarToggler.click();
            }
        });
    });

    document.addEventListener("click", function(event) {
        let isClickInside = navbarCollapse.contains(event.target) || navbarToggler.contains(event.target);
        if (!isClickInside && navbarCollapse.classList.contains("show")) {
            navbarToggler.click();
        }
    });

    navbarToggler.addEventListener("click", function() {
        setTimeout(() => {
            navbarToggler.style.outline = "none";
            navbarToggler.style.boxShadow = "none";
        }, 300);
    });
});

// mobile slider code here
document.addEventListener("DOMContentLoaded", function () {
    const swiper = new Swiper(".mySwiper", {
        loop: true,
        slidesPerView: 1,
        centeredSlides: false, // mobile ke liye false
        spaceBetween: 10,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
                centeredSlides: false // 👈 ye important hai
            },
            600: {
                slidesPerView: 2,
                centeredSlides: false
            },
            768: {
                slidesPerView: 3,
                centeredSlides: true
            },
            992: {
                slidesPerView: 4,
                centeredSlides: true
            },
            1200: {
                slidesPerView: 5,
                centeredSlides: true
            },
            1400: {
                slidesPerView: 6,
                centeredSlides: true
            }
        },
        resistanceRatio: 0.7,
        touchReleaseOnEdges: false,
    });

    // Only for desktop scroll-to-slide
    if (window.innerWidth > 992) {
        let lastScrollTime = 0;
        let lastScrollY = window.scrollY;
        const scrollCooldown = 300;
        const scrollThreshold = 30;

        window.addEventListener("scroll", () => {
            const now = Date.now();
            const currentScrollY = window.scrollY;
            const scrollDistance = Math.abs(currentScrollY - lastScrollY);

            if (now - lastScrollTime > scrollCooldown && scrollDistance > scrollThreshold) {
                if (currentScrollY > lastScrollY) {
                    swiper.slideNext(500);
                } else {
                    swiper.slidePrev(500);
                }
                lastScrollTime = now;
                lastScrollY = currentScrollY;
            }
        }, { passive: true });
    }
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
        const videoToggleIcon = document.getElementById("videoToggleIcon");
        const playPauseBtn = document.getElementById("playPauseBtn");
        const muteBtn = document.getElementById("muteBtn");
        const fullscreenBtn = document.getElementById("fullscreenBtn");
        const closeBtn = document.getElementById("closeBtn");

        // Toggle play/pause
        playPauseBtn.addEventListener('click', function() {
            if (video.paused) {
                video.play();
                playPauseBtn.textContent = "❚❚";
            } else {
                video.pause();
                playPauseBtn.textContent = "▶";
            }
        });

        // Toggle mute
        muteBtn.addEventListener('click', function() {
            video.muted = !video.muted;
            muteBtn.textContent = video.muted ? "🔇" : "🔊";
        });

        // Toggle fullscreen
        fullscreenBtn.addEventListener('click', function() {
            if (!document.fullscreenElement) {
                videoContainer.requestFullscreen().catch(err => {
                    console.error("Fullscreen error:", err);
                });
            } else {
                document.exitFullscreen();
            }
        });

        // Close video
        closeBtn.addEventListener('click', function() {
            video.pause();
            videoContainer.style.display = "none";
            videoToggleIcon.style.display = "flex";
        });

        // Restore video
        videoToggleIcon.addEventListener('click', function() {
            videoContainer.style.display = "flex";
            videoToggleIcon.style.display = "none";
            video.play();
        });

        // Handle fullscreen changes
        document.addEventListener('fullscreenchange', function() {
            if (!document.fullscreenElement) {
                videoContainer.classList.remove("fullscreen");
            } else {
                videoContainer.classList.add("fullscreen");
            }
        });

        // Handle orientation changes
        window.addEventListener('orientationchange', function() {
            if (document.fullscreenElement) {
                setTimeout(() => {
                    videoContainer.style.width = "100%";
                    videoContainer.style.height = "100%";
                }, 300);
            }
        });



        

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



