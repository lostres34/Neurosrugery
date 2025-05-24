
function openLightbox(src, caption = '', isVideo = false) {
  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-img');
  const vid = document.getElementById('lightbox-video');
  const captionBox = document.getElementById('lightbox-caption');

  if (isVideo) {
    img.style.display = 'none';
    vid.style.display = 'block';
    vid.src = src;
  } else {
    img.style.display = 'block';
    vid.style.display = 'none';
    img.src = src;
  }

  captionBox.textContent = caption || '';
  lb.style.display = 'flex';
}

function closeLightbox() {
  const lb = document.getElementById('lightbox');
  const vid = document.getElementById('lightbox-video');
  lb.style.display = 'none';
  vid.removeAttribute('src');
}

function filterGallery(category) {
  const items = document.querySelectorAll('.gallery-item');
  document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
  items.forEach(item => {
    if (category === 'all' || item.classList.contains(category)) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}
