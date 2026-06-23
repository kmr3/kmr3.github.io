const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("main .section");
const reveals = document.querySelectorAll(".reveal");
const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const navMenu = document.querySelector(".nav-menu");

const updateNav = () => {
    let current = "hero";

    sections.forEach((section) => {
        if (window.scrollY >= section.offsetTop - 160) {
            current = section.id;
        }
    });

    navLinks.forEach((link) => {
        link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${current}`,
        );
    });

    navbar.classList.toggle("scrolled", window.scrollY > 20);
};

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("active");
    });
});

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });
}

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    },
    { threshold: 0.14, rootMargin: "0px 0px -40px 0px" },
);

reveals.forEach((item) => observer.observe(item));
updateNav();
window.addEventListener("scroll", updateNav, { passive: true });
