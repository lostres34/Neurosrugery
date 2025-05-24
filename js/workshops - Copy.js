
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

function openWorkshop(category) {
  currentCategory = category;
  currentIndex = 0;
  updateViewer();
  renderPreview();
  setTimeout(() => {
    document.getElementById("viewerBox").classList.add("active");
    document.body.classList.add("viewer-active");
  }, 10);
  document.body.classList.add("viewer-active");
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateViewer() {
  const viewer = document.getElementById("viewerMedia");
  const file = mediaContent[currentCategory][currentIndex];
  if (!file) return;
  viewer.innerHTML = file.type === "image"
    ? `<img src="${file.src}" alt="Workshop Image">`
    : `<video controls><source src="${file.src}" type="video/mp4"></video>`;
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
  document.getElementById("viewerBox").classList.remove("active");
  document.body.classList.remove("viewer-active");
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




function openWorkshop(category) {
  currentCategory = category;
  currentIndex = 0;
  updateViewer();
  renderPreview();

  const viewerBox = document.getElementById("viewerBox");


  document.body.classList.add("viewer-active");

  setTimeout(() => {
    viewerBox.classList.add("active");
  }, 50);

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function closeViewer() {
  const viewerBox = document.getElementById("viewerBox");
  viewerBox.classList.remove("active");

  document.body.classList.remove("viewer-active");
}


document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeViewer();
});

document.addEventListener("DOMContentLoaded", () => {
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

