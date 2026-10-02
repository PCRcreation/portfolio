const body = document.body;
const themeToggle = document.getElementById("themeToggle");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const typing = document.getElementById("typing");
const topBtn = document.getElementById("topBtn");
const toast = document.getElementById("toast");

const roles = ["Full Stack Developer", "Web Developer", "Python Learner", "Problem Solver"];
let roleIndex = 0, charIndex = 0, deleting = false;

function typeEffect() {
  const current = roles[roleIndex];
  typing.textContent = deleting ? current.slice(0, charIndex--) : current.slice(0, charIndex++);
  if (!deleting && charIndex > current.length) {
    deleting = true;
    setTimeout(typeEffect, 1200);
    return;
  }
  if (deleting && charIndex < 0) {
    deleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    charIndex = 0;
  }
  setTimeout(typeEffect, deleting ? 55 : 95);
}
typeEffect();

const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme === "light") body.classList.add("light");
updateThemeIcon();

function updateThemeIcon() {
  themeToggle.textContent = body.classList.contains("light") ? "🌙" : "☀️";
}
themeToggle.addEventListener("click", () => {
  body.classList.toggle("light");
  localStorage.setItem("portfolio-theme", body.classList.contains("light") ? "light" : "dark");
  updateThemeIcon();
});

menuToggle.addEventListener("click", () => navLinks.classList.toggle("open"));
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, {threshold: 0.12});
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

document.querySelectorAll(".filter").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
    button.classList.add("active");
    const filter = button.dataset.filter;
    document.querySelectorAll(".project").forEach(card => {
      card.style.display = filter === "all" || card.dataset.category === filter ? "" : "none";
    });
  });
});

window.addEventListener("scroll", () => {
  topBtn.classList.toggle("show", window.scrollY > 500);
});
topBtn.addEventListener("click", () => window.scrollTo({top:0, behavior:"smooth"}));

document.getElementById("year").textContent = new Date().getFullYear();

document.getElementById("contactForm").addEventListener("submit", (event) => {
  event.preventDefault();
  toast.classList.add("show");
  event.target.reset();
  setTimeout(() => toast.classList.remove("show"), 4500);
});
