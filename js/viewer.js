let currentWorkshop = null;
let currentIndex = 0;

document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("viewerOverlay");
  const mediaContainer = document.getElementById("viewerMedia");
  const thumbnails = document.getElementById("viewerThumbnails");

  function openViewer(id) {
    const workshop = workshopsData.find(w => w.id === id);
    if (!workshop) return;

    currentWorkshop = workshop;
    currentIndex = 0;

    document.body.classList.add("viewer-active");
    overlay.classList.remove("hidden");

    renderMedia();
    renderThumbnails();
  }

  function closeViewer() {
    overlay.classList.add("hidden");
    document.body.classList.remove("viewer-active");
    mediaContainer.innerHTML = "";
    thumbnails.innerHTML = "";
  }

  function renderMedia() {
    const media = currentWorkshop.media[currentIndex];
    if (!media) return;

    mediaContainer.innerHTML = media.type === "image"
      ? `<img src="${media.src}" class="media-content" alt="workshop media" />`
      : `<video src="${media.src}" class="media-content" controls></video>`;
  }

  function renderThumbnails() {
    thumbnails.innerHTML = "";
    currentWorkshop.media.forEach((m, i) => {
      const el = document.createElement(m.type === "image" ? "img" : "video");
      el.src = m.src;
      el.className = "thumb";
      el.loading = "lazy";
      el.title = m.type === "image" ? "📷 Image" : "🎥 Video";
      el.onclick = () => {
        currentIndex = i;
        renderMedia();
      };
      thumbnails.appendChild(el);
    });
  }

  // Control buttons
  document.getElementById("viewerClose")?.addEventListener("click", closeViewer);

  document.getElementById("viewerPrev")?.addEventListener("click", () => {
    if (!currentWorkshop) return;
    currentIndex = (currentIndex - 1 + currentWorkshop.media.length) % currentWorkshop.media.length;
    renderMedia();
  });

  document.getElementById("viewerNext")?.addEventListener("click", () => {
    if (!currentWorkshop) return;
    currentIndex = (currentIndex + 1) % currentWorkshop.media.length;
    renderMedia();
  });

  document.getElementById("viewerZoomIn")?.addEventListener("click", () => {
    const media = document.querySelector(".media-content");
    if (media?.tagName === "IMG") {
      media.style.transform = "scale(1.5)";
    }
  });

  document.getElementById("viewerZoomOut")?.addEventListener("click", () => {
    const media = document.querySelector(".media-content");
    if (media?.tagName === "IMG") {
      media.style.transform = "scale(1)";
    }
  });

  document.getElementById("viewerFullscreen")?.addEventListener("click", () => {
    const media = document.querySelector(".media-content");
    if (!media) return;
    if (media.requestFullscreen) media.requestFullscreen();
    else if (media.webkitRequestFullscreen) media.webkitRequestFullscreen();
    else if (media.msRequestFullscreen) media.msRequestFullscreen();
  });

  // Enable keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (!currentWorkshop) return;
    if (e.key === "ArrowRight") document.getElementById("viewerNext")?.click();
    if (e.key === "ArrowLeft") document.getElementById("viewerPrev")?.click();
    if (e.key === "Escape") document.getElementById("viewerClose")?.click();
  });

  // Expose globally
  window.openViewer = openViewer;
});