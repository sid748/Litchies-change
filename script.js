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
    let swiper;
  
    function initSwiper() {
      if (swiper) swiper.destroy(true, true);
  
      swiper = new Swiper(".mySwiper", {
        loop: true,
        loopAdditionalSlides: 3,
        slidesPerView: 1.4, // default for mobile
        spaceBetween: 10,
        centeredSlides: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },
        pagination: false,
        breakpoints: {
          480: {
            slidesPerView: 1.6,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 2.5,
            spaceBetween: 20,
          },
          992: {
            slidesPerView: 3.5,
            centeredSlides: true,
            spaceBetween: 20,
          },
          1200: {
            slidesPerView: 5,
            centeredSlides: true,
            spaceBetween: 0,
          },
        },
        resistanceRatio: 0.7,
        touchReleaseOnEdges: false,
      });
  
      swiper.on("slideChange", () => {
        console.log("Slide changed to:", swiper.activeIndex);
      });
    }
  
    initSwiper();
    window.addEventListener("resize", initSwiper);
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

document.addEventListener("DOMContentLoaded", function () {
    const video = document.getElementById("floatingVideo");
    const videoContainer = document.getElementById("videoContainer");
    const videoToggleIcon = document.getElementById("videoToggleIcon");
    const playPauseBtn = document.getElementById("playPauseBtn");
    const muteBtn = document.getElementById("muteBtn");
    const fullscreenBtn = document.getElementById("fullscreenBtn");
    const closeBtn = document.getElementById("closeBtn");

    // Ensure video is muted and autoplay
    video.muted = true;
    video.play().catch((err) => {
        console.warn("Autoplay blocked:", err);
    });

    // Set correct mute icon
    muteBtn.innerHTML = video.muted ? '<i class="fa-solid fa-volume-xmark"></i>' : '<i class="fa-solid fa-volume-high"></i>';

    // Play/Pause toggle
    playPauseBtn.addEventListener("click", () => {
        if (video.paused) {
            video.play();
            playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
        } else {
            video.pause();
            playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
        }
    });

    // Mute toggle
    muteBtn.addEventListener("click", () => {
        video.muted = !video.muted;
        muteBtn.innerHTML = video.muted
            ? '<i class="fa-solid fa-volume-xmark"></i>'
            : '<i class="fa-solid fa-volume-high"></i>';
    });

    // Fullscreen toggle
    fullscreenBtn.addEventListener("click", () => {
        if (!document.fullscreenElement) {
            if (videoContainer.requestFullscreen) {
                videoContainer.requestFullscreen();
            } else if (videoContainer.webkitRequestFullscreen) {
                videoContainer.webkitRequestFullscreen();
            } else if (videoContainer.msRequestFullscreen) {
                videoContainer.msRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
    });

    // Handle fullscreen changes (fix for Android scroll freeze)
    document.addEventListener("fullscreenchange", () => {
        const isFullscreen = !!document.fullscreenElement;

        videoContainer.classList.toggle("fullscreen", isFullscreen);

        if (!isFullscreen) {
            // Restore scrolling
            document.body.style.overflow = "";
            document.body.style.position = "";
            document.body.style.height = "auto";
            document.documentElement.style.overflow = "";
            document.documentElement.style.position = "";
            document.documentElement.style.height = "auto";

            // Force scroll reflow (Android fix)
            setTimeout(() => {
                window.scrollTo(0, 1);
                window.scrollTo(0, 0);
            }, 100);
        }
    });

    // Orientation change (fullscreen fix)
    window.addEventListener("orientationchange", () => {
        if (document.fullscreenElement) {
            setTimeout(() => {
                videoContainer.style.width = "100vw";
                videoContainer.style.height = "100vh";
            }, 300);
        }
    });

    // Close video
    closeBtn.addEventListener("click", () => {
        if (document.fullscreenElement) {
            document.exitFullscreen?.().catch(() => {});
        }

        video.pause();
        videoContainer.style.display = "none";
        videoToggleIcon.style.display = "flex";

        // Restore scrolling
        document.body.style.overflow = "";
        document.body.style.position = "";
        document.body.style.height = "auto";
        document.documentElement.style.overflow = "";
        document.documentElement.style.position = "";
        document.documentElement.style.height = "auto";

        // Android Chrome reflow
        setTimeout(() => {
            window.scrollTo(0, 1);
            window.scrollTo(0, 0);
        }, 100);
    });

    // Reopen video
    videoToggleIcon.addEventListener("click", () => {
        videoContainer.style.display = "flex";
        videoToggleIcon.style.display = "none";
        video.play();
    });
});




// faq section starts here
document.addEventListener("DOMContentLoaded", function () {
    const accordionButtons = document.querySelectorAll(".accordion-button");

    accordionButtons.forEach((button) => {
        const targetId = button.getAttribute("data-bs-target");
        const icon = button.querySelector(".answer-btn");
        const target = document.querySelector(targetId);

        // Initial icon state
        if (target.classList.contains("show")) {
            icon.textContent = "−";
        } else {
            icon.textContent = "+";
        }

        // Listen to the show/hide events
        target.addEventListener("show.bs.collapse", () => {
            icon.textContent = "−";
        });

        target.addEventListener("hide.bs.collapse", () => {
            icon.textContent = "+";
        });
    });
});



