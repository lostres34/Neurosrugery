document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".section-nav");

  if (!toggleButton || !nav) return;

  // Global toggle function for inline onclick
  window.toggleNav = function () {
    nav.classList.toggle("show");
  };

  // Optional: Also attach eventListener (safe to keep for other uses)
  toggleButton.addEventListener("click", function () {
    nav.classList.toggle("show");
  });

  // Close menu on scroll
  window.addEventListener("scroll", function () {
    nav.classList.remove("show");
  });

  // Close menu if clicking outside
  document.addEventListener("click", function (e) {
    if (!nav.contains(e.target) && !toggleButton.contains(e.target)) {
      nav.classList.remove("show");
    }
  });
});