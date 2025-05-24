// Scroll animation
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  animatedElements.forEach(el => observer.observe(el));

  // Fade out on language switch
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      document.body.classList.add('fade-out');
      const href = this.getAttribute('href');
      setTimeout(() => {
        window.location.href = href;
      }, 300);
    });
  });
});