// ===============================
// MOBILE NAVIGATION
// ===============================

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");

    if (menuBtn.classList.contains("fa-bars")) {
        menuBtn.classList.remove("fa-bars");
        menuBtn.classList.add("fa-xmark");
    } else {
        menuBtn.classList.remove("fa-xmark");
        menuBtn.classList.add("fa-bars");
    }
});

// Close menu after clicking a link
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");

        menuBtn.classList.remove("fa-xmark");
        menuBtn.classList.add("fa-bars");
    });
});


// ===============================
// DARK MODE
// ===============================

const darkBtn = document.querySelector(".dark-mode-btn");

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    darkBtn.classList.replace("fa-moon", "fa-sun");
}

darkBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {

        darkBtn.classList.replace("fa-moon", "fa-sun");

        localStorage.setItem("theme", "dark");

    } else {

        darkBtn.classList.replace("fa-sun", "fa-moon");

        localStorage.setItem("theme", "light");

    }

});


// ===============================
// TYPING EFFECT
// ===============================

const typing = document.querySelector(".typing");

const words = [
    "Frontend Developer",
    "Web Designer",
    "JavaScript Developer",
    "Virtual Assistant"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function type() {

    const currentWord = words[wordIndex];

    if (!deleting) {

        typing.textContent = currentWord.substring(0, charIndex++);
    } else {

        typing.textContent = currentWord.substring(0, charIndex--);
    }

    let speed = deleting ? 70 : 120;

    if (!deleting && charIndex === currentWord.length + 1) {

        deleting = true;
        speed = 1500;

    } else if (deleting && charIndex === 0) {

        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
    }

    setTimeout(type, speed);
}

type();


// ===============================
// LOADING SCREEN
// ===============================

window.addEventListener("load", () => {

    const loader = document.querySelector(".loader");

    loader.classList.add("hide");

});


// ===============================
// SCROLL TO TOP
// ===============================

const scrollBtn = document.querySelector(".scroll-top");

window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {

        scrollBtn.classList.add("show");

    } else {

        scrollBtn.classList.remove("show");

    }

});

scrollBtn.addEventListener("click", () => {

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});


// ===============================
// ACTIVE NAVIGATION
// ===============================

const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const top = section.offsetTop - 120;
        const height = section.offsetHeight;

        if (scrollY >= top) {

            current = section.getAttribute("id");

        }

    });

    navItems.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});


// ===============================
// CONTACT FORM
// ===============================

const form = document.querySelector(".contact-form");

form.addEventListener("submit", (e)=>{

    e.preventDefault();

    alert("Thank you! Your message has been received.");

    form.reset();

});


// ===============================
// SKILL BAR ANIMATION
// ===============================

const skillSection = document.querySelector(".skills");

const bars = document.querySelectorAll(".progress-bar");

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            bars.forEach(bar => {

                const width = bar.style.width;

                bar.style.width = "0";

                setTimeout(()=>{

                    bar.style.width = width;

                },200);

            });

        }

    });

});

observer.observe(skillSection);


// ===============================
// END
// ===============================