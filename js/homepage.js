
function switchTab(tabId) {
  const tabs = document.querySelectorAll('.tab');
  const contents = document.querySelectorAll('.tab-content');

  tabs.forEach(tab => {
    tab.classList.remove('active');
    if (tab.textContent.trim().toLowerCase() === tabId) {
      tab.classList.add('active');
    }
  });

  contents.forEach(content => {
    content.style.display = 'none';
  });

  const showTab = document.getElementById(tabId);
  if (showTab) {
    showTab.style.display = 'block';
  }
}

function autoScrollLoop(id) {
  const container = document.getElementById(id + "-inner");
  const parent = container.parentElement;
  container.innerHTML += container.innerHTML;
  let scrollY = 0;
  const speed = 0.3;
  function step() {
    if (!container.matches(':hover')) {
      scrollY += speed;
      if (scrollY >= container.scrollHeight / 2) scrollY = 0;
      parent.scrollTop = scrollY;
    }
    requestAnimationFrame(step);
  }
  step();
}

document.addEventListener("DOMContentLoaded", () => {
  autoScrollLoop("news");
  autoScrollLoop("workshops");
});
