let scale = 1;
let isDragging = false;
let startX, startY;
let currentX = 0, currentY = 0;

let lastTouchDistance = null;
let lastTouchMidpoint = null;
let swipeStartX = null, swipeStartY = null;

const img = document.getElementById('lightbox-img');

// Lightbox
function openLightbox(src, caption = '', isVideo = false) {
  const lb = document.getElementById('lightbox');
  const vid = document.getElementById('lightbox-video');
  const captionBox = document.getElementById('lightbox-caption');

  if (isVideo) {
    img.classList.remove('fading');
    img.style.display = 'none';
    vid.style.display = 'block';
    vid.src = src;
  } else {
    img.classList.add('fading');
    setTimeout(() => {
      img.src = src;
      img.classList.remove('fading');
    }, 150);
    img.style.display = 'block';
    vid.style.display = 'none';
    vid.removeAttribute('src');
  }

  resetZoom();
  captionBox.textContent = caption || '';
  lb.style.display = 'flex';
  lb.setAttribute('aria-hidden', 'false');

  updateIndicatorsBySrc(src);
}

// Close Lightbox
function closeLightbox() {
  const lb = document.getElementById('lightbox');
  const vid = document.getElementById('lightbox-video');
  lb.style.display = 'none';
  lb.setAttribute('aria-hidden', 'true');
  vid.pause();
  vid.removeAttribute('src');
  resetZoom();
}

// Filter
function filterGallery(category, event) {
  const items = document.querySelectorAll('.gallery-item');
  document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
  event?.target.classList.add('active');
  items.forEach(item => {
    item.style.display = category === 'all' || item.classList.contains(category) ? 'block' : 'none';
  });
}

// Keyboard
document.addEventListener('keydown', function(event) {
  const lb = document.getElementById('lightbox');
  if (lb.style.display !== 'flex') return;

  if (event.key === 'Escape') closeLightbox();
  else if (event.key === 'ArrowRight') navigateLightbox(1);
  else if (event.key === 'ArrowLeft') navigateLightbox(-1);
});

// Navigate
function navigateLightbox(direction) {
  const galleryItems = Array.from(document.querySelectorAll('.gallery-item'))
    .filter(item => item.style.display !== 'none');
  const sources = galleryItems.map(item => {
    const imgEl = item.querySelector('img');
    return {
      src: imgEl?.getAttribute('src'),
      alt: imgEl?.getAttribute('alt') || '',
      isVideo: imgEl?.getAttribute('data-type') === 'video'
    };
  });
  const currentSrc = img.src;
  const currentIndex = sources.findIndex(item => currentSrc.includes(item.src));
  if (currentIndex === -1) return;
  const nextIndex = (currentIndex + direction + sources.length) % sources.length;
  const next = sources[nextIndex];
  openLightbox(next.src, next.alt, next.isVideo);
  updateIndicators(nextIndex, sources.length);
}

function updateIndicators(activeIndex, total) {
  const indicators = document.getElementById('lightbox-indicators');
  if (!indicators) return;
  indicators.innerHTML = '';
  for (let i = 0; i < total; i++) {
    const dot = document.createElement('span');
    if (i === activeIndex) dot.classList.add('active');
    indicators.appendChild(dot);
  }
}

function updateIndicatorsBySrc(src) {
  const galleryItems = Array.from(document.querySelectorAll('.gallery-item'))
    .filter(item => item.style.display !== 'none');
  const sources = galleryItems.map(item => item.querySelector('img')?.getAttribute('src'));
  const index = sources.findIndex(s => src.includes(s));
  updateIndicators(index, sources.length);
}

// Mouse Zoom
img.addEventListener('wheel', function(e) {
  e.preventDefault();
  const delta = Math.sign(e.deltaY);
  scale += delta * -0.1;
  scale = Math.min(Math.max(1, scale), 5);
  applyTransform();
});

// Mouse Pan
img.addEventListener('mousedown', function(e) {
  isDragging = true;
  startX = e.pageX - currentX;
  startY = e.pageY - currentY;
  img.style.cursor = 'grabbing';
});
document.addEventListener('mouseup', () => {
  isDragging = false;
  img.style.cursor = 'grab';
});
document.addEventListener('mousemove', function(e) {
  if (!isDragging) return;
  currentX = e.pageX - startX;
  currentY = e.pageY - startY;
  applyTransform();
});

// Touch Pan + Pinch Zoom
img.addEventListener('touchstart', function(e) {
  if (e.touches.length === 2) {
    lastTouchDistance = getTouchDistance(e.touches);
    lastTouchMidpoint = getTouchMidpoint(e.touches);
  } else if (e.touches.length === 1) {
    startX = e.touches[0].clientX - currentX;
    startY = e.touches[0].clientY - currentY;
  }
}, { passive: false });

img.addEventListener('touchmove', function(e) {
  e.preventDefault();
  if (e.touches.length === 2) {
    const newDistance = getTouchDistance(e.touches);
    scale *= newDistance / lastTouchDistance;
    scale = Math.min(Math.max(1, scale), 5);
    lastTouchDistance = newDistance;
    const newMid = getTouchMidpoint(e.touches);
    currentX += (newMid.x - lastTouchMidpoint.x);
    currentY += (newMid.y - lastTouchMidpoint.y);
    lastTouchMidpoint = newMid;
    applyTransform();
  } else if (e.touches.length === 1 && scale > 1) {
    currentX = e.touches[0].clientX - startX;
    currentY = e.touches[0].clientY - startY;
    applyTransform();
  }
}, { passive: false });

// Swipe Navigation
img.addEventListener('touchstart', function(e) {
  if (e.touches.length === 1 && scale === 1) {
    swipeStartX = e.touches[0].clientX;
    swipeStartY = e.touches[0].clientY;
  }
}, { passive: true });

img.addEventListener('touchend', function(e) {
  if (!swipeStartX || !swipeStartY || scale !== 1) return;
  const endX = e.changedTouches[0].clientX;
  const endY = e.changedTouches[0].clientY;
  const deltaX = endX - swipeStartX;
  const deltaY = endY - swipeStartY;
  if (Math.abs(deltaX) > 50 && Math.abs(deltaY) < 40) {
    deltaX > 0 ? navigateLightbox(-1) : navigateLightbox(1);
  }
  swipeStartX = swipeStartY = null;
}, { passive: true });

// Helpers
function getTouchDistance(touches) {
  const dx = touches[0].clientX - touches[1].clientX;
  const dy = touches[0].clientY - touches[1].clientY;
  return Math.sqrt(dx * dx + dy * dy);
}
function getTouchMidpoint(touches) {
  return {
    x: (touches[0].clientX + touches[1].clientX) / 2,
    y: (touches[0].clientY + touches[1].clientY) / 2
  };
}
function applyTransform() {
  img.style.transform = `scale(${scale}) translate(${currentX / scale}px, ${currentY / scale}px)`;
}
function resetZoom() {
  scale = 1; currentX = 0; currentY = 0;
  lastTouchDistance = null;
  img.style.transform = 'scale(1)';
  img.style.cursor = 'grab';
}
