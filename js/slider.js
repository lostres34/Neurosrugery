
document.addEventListener("DOMContentLoaded", () => {
  const slidesWrapper = document.querySelector(".slides");
  const slideItems = document.querySelectorAll(".slide");
  const thumbnails = document.querySelectorAll(".thumb");
  const dotsContainer = document.querySelector(".dots");
  const totalSlides = slideItems.length;
  let currentIndex = 0;
  let startX = 0;
  let isDragging = false;

  const goToSlide = (index) => {
    slidesWrapper.style.transform = `translateX(-${index * 100}%)`;
    thumbnails.forEach(t => t.classList.remove("active"));
    if (thumbnails[index]) thumbnails[index].classList.add("active");
    dotsContainer.querySelectorAll("button").forEach((d, i) => {
      d.classList.toggle("active", i === index);
    });
    currentIndex = index;
  };

  // Add dots
  dotsContainer.innerHTML = '';
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement("button");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goToSlide(i));
    dotsContainer.appendChild(dot);
  }

  // Thumbnail clicks
  thumbnails.forEach((thumb, i) => {
    thumb.addEventListener("click", () => goToSlide(i));
  });

  // Arrows
  document.querySelector(".prev-slide").addEventListener("click", () => {
    goToSlide((currentIndex - 1 + totalSlides) % totalSlides);
  });
  document.querySelector(".next-slide").addEventListener("click", () => {
    goToSlide((currentIndex + 1) % totalSlides);
  });

  // Auto loop
  setInterval(() => {
    goToSlide((currentIndex + 1) % totalSlides);
  }, 5000);

  // Swipe gesture
  slidesWrapper.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
    isDragging = true;
  });

  slidesWrapper.addEventListener("touchend", e => {
    if (!isDragging) return;
    const endX = e.changedTouches[0].clientX;
    const delta = startX - endX;
    if (delta > 50) goToSlide((currentIndex + 1) % totalSlides);
    else if (delta < -50) goToSlide((currentIndex - 1 + totalSlides) % totalSlides);
    isDragging = false;
  });

  // Modal zoom fullscreen with captions
  slideItems.forEach(slide => {
    const img = slide.querySelector("img");
    const captionText = img.getAttribute("alt") || "";

    if (img) {
      img.style.cursor = "zoom-in";
      img.addEventListener("click", () => {
        const overlay = document.createElement("div");
        overlay.style.position = "fixed";
        overlay.style.top = 0;
        overlay.style.left = 0;
        overlay.style.width = "100%";
        overlay.style.height = "100%";
        overlay.style.backgroundColor = "rgba(0,0,0,0.85)";
        overlay.style.display = "flex";
        overlay.style.flexDirection = "column";
        overlay.style.justifyContent = "center";
        overlay.style.alignItems = "center";
        overlay.style.zIndex = 9999;
        overlay.style.padding = "20px";

        const fullImg = document.createElement("img");
        fullImg.src = img.src;
        fullImg.style.maxWidth = "90%";
        fullImg.style.maxHeight = "80%";
        fullImg.style.borderRadius = "10px";
        fullImg.style.boxShadow = "0 0 15px rgba(255,255,255,0.3)";

        const caption = document.createElement("p");
        caption.textContent = captionText;
        caption.style.color = "white";
        caption.style.marginTop = "20px";
        caption.style.fontSize = "18px";
        caption.style.textAlign = "center";

        overlay.appendChild(fullImg);
        if (captionText.trim() !== "") overlay.appendChild(caption);

        overlay.addEventListener("click", () => overlay.remove());
        document.body.appendChild(overlay);
      });
    }
  });

  goToSlide(0);
});
