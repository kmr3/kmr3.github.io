const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("main .section");
const reveals = document.querySelectorAll(".reveal");
const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const navMenu = document.querySelector(".nav-menu");

const setMobileMenuOpen = (isOpen) => {
    navMenu.classList.toggle("active", isOpen);
    mobileMenuBtn?.setAttribute("aria-expanded", String(isOpen));
    mobileMenuBtn?.setAttribute(
        "aria-label",
        isOpen ? "メニューを閉じる" : "メニューを開く",
    );
};

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
        setMobileMenuOpen(false);
    });
});

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", () => {
        setMobileMenuOpen(!navMenu.classList.contains("active"));
    });
}

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        setMobileMenuOpen(false);
    }
});

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
