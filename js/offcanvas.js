document.addEventListener("DOMContentLoaded", function () {
  const menu = document.querySelector(".off-canvas-menu");
  const overlay = document.querySelector(".off-canvas-overlay");
  const toggleBtn = document.querySelector(".nav-toggle");
  const closeBtn = document.querySelector(".off-canvas-close");

  function closeMenu() {
    menu.classList.remove("open");
    overlay.classList.remove("show");
  }

  function toggleMenu() {
    menu.classList.toggle("open");
    overlay.classList.toggle("show");
  }

  if (toggleBtn) toggleBtn.addEventListener("click", toggleMenu);
  if (closeBtn) closeBtn.addEventListener("click", closeMenu);
  if (overlay) overlay.addEventListener("click", closeMenu);
});
