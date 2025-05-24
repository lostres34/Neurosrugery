const mediaContent = {
  workshop1: [
    { type: 'image', src: 'images/workshops/workshop1-1.jpg' },
    { type: 'image', src: 'images/workshops/workshop1-2.jpg' },
    { type: 'video', src: 'images/workshops/workshop1.mp4' }
  ],
  workshop2: [
    { type: 'image', src: 'images/workshops/workshop2-1.jpg' },
    { type: 'video', src: 'images/workshops/workshop2.mp4' }
  ],
  workshop3: [
    { type: 'image', src: 'images/workshops/workshop3-1.jpg' }
  ],
  workshop4: [
    { type: 'image', src: 'images/workshops/workshop4-1.jpg' }
  ],
  workshop5: [
    { type: 'image', src: 'images/workshops/workshop5-1.jpg' }
  ]
};

let currentCategory = '';
let currentIndex = 0;

let scale = 1;
let isDragging = false;
let dragStartX = 0;
let dragStartY = 0;
let imgOffsetX = 0;
let imgOffsetY = 0;

function openWorkshop(category) {
  currentCategory = category;
  currentIndex = 0;
  updateViewer();
  renderPreview();

  document.body.classList.add("viewer-active");
  document.getElementById("viewerBox").classList.add("active");
  document.querySelector(".viewer-overlay").classList.add("show");

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateViewer() {
  const viewer = document.getElementById("viewerMedia");
  const file = mediaContent[currentCategory][currentIndex];
  if (!file) return;

  viewer.innerHTML = file.type === "image"
    ? `<img src="${file.src}" alt="Workshop Image" id="zoomable">`
    : `<video controls id="zoomable"><source src="${file.src}" type="video/mp4"></video>`;

  const zoomable = document.getElementById("zoomable");
  if (zoomable) {
    zoomable.addEventListener("click", toggleFullscreen); // CLICK to toggle
  }

  setupZoomAndDrag();
}

function renderPreview() {
  const preview = document.getElementById("viewerPreview");
  preview.innerHTML = "";
  mediaContent[currentCategory].forEach((file, index) => {
    const thumb = document.createElement(file.type === "image" ? "img" : "video");
    thumb.src = file.src;
    thumb.className = "thumb";
    thumb.onclick = () => {
      currentIndex = index;
      updateViewer();
    };
    if (file.type === "video") thumb.muted = true;
    preview.appendChild(thumb);
  });
}

function closeViewer() {
  const viewerBox = document.getElementById("viewerBox");
  viewerBox.classList.remove("active");
  viewerBox.classList.remove("viewer-fullscreen");
  document.body.classList.remove("viewer-active");
  document.body.style.overflow = "";
  document.querySelector(".viewer-overlay").classList.remove("show");
}

function nextMedia() {
  const files = mediaContent[currentCategory];
  currentIndex = (currentIndex + 1) % files.length;
  updateViewer();
}

function prevMedia() {
  const files = mediaContent[currentCategory];
  currentIndex = (currentIndex - 1 + files.length) % files.length;
  updateViewer();
}

function setupZoomAndDrag() {
  const zoomable = document.getElementById("zoomable");
  if (!zoomable || zoomable.tagName === "VIDEO") return;

  scale = 1;
  imgOffsetX = 0;
  imgOffsetY = 0;
  updateTransform();

  zoomable.addEventListener("wheel", (e) => {
    e.preventDefault();
    scale += e.deltaY * -0.001;
    scale = Math.min(Math.max(1, scale), 5);
    updateTransform();
  });

  zoomable.addEventListener("mousedown", (e) => {
    if (scale <= 1) return;
    isDragging = true;
    dragStartX = e.clientX - imgOffsetX;
    dragStartY = e.clientY - imgOffsetY;
    zoomable.style.cursor = "grabbing";
  });

  window.addEventListener("mouseup", () => {
    isDragging = false;
    if (zoomable) zoomable.style.cursor = "grab";
  });

  window.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    imgOffsetX = e.clientX - dragStartX;
    imgOffsetY = e.clientY - dragStartY;
    updateTransform();
  });
}

function updateTransform() {
  const zoomable = document.getElementById("zoomable");
  if (zoomable && zoomable.tagName === "IMG") {
    zoomable.style.transform = `scale(${scale}) translate(${imgOffsetX / scale}px, ${imgOffsetY / scale}px)`;
  }
}

function toggleFullscreen() {
  const viewerBox = document.getElementById("viewerBox");
  if (viewerBox.classList.contains("viewer-fullscreen")) {
    viewerBox.classList.remove("viewer-fullscreen");
    document.body.style.overflow = "";
  } else {
    viewerBox.classList.add("viewer-fullscreen");
    document.body.style.overflow = "hidden";
  }
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeViewer();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // Ensure viewer box is centered initially
  const viewerBox = document.getElementById("viewerBox");
  if (viewerBox) {
    Object.assign(viewerBox.style, {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      zIndex: "9999",
      maxHeight: "90vh",
    });
  }
});
