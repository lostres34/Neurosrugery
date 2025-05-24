function toggleNav() {
      const nav = document.querySelector('.section-nav');
      nav.classList.toggle('show');
    }

    function openModal(el) {
      
    document.getElementById("modalTitle").textContent = el.dataset.title;
    document.getElementById("modalDescription").textContent = el.dataset.description;
    document.querySelector("#modalBox .news-date")?.remove();
    const dateTag = document.createElement("span");
    dateTag.textContent = "🗓 " + el.dataset.date;
    dateTag.className = "news-date";
    dateTag.style.cssText = "font-size: 13px; color: #555; display: block; margin-bottom: 8px;";
    document.getElementById("modalTitle").before(dateTag);
    
    const modalImg = document.getElementById("modalImage");
    const modalVid = document.getElementById("modalVideo");
    if (el.dataset.type === "video") {
      modalImg.style.display = "none";
      modalVid.src = el.dataset.video;
      modalVid.style.display = "block";
    } else {
      modalImg.src = el.querySelector("img").src;
      modalImg.style.display = "block";
      modalVid.style.display = "none";
      modalVid.removeAttribute("src");
    }
    
      document.getElementById("modalDescription").textContent = el.dataset.description;
      document.getElementById("modalImage").src = el.querySelector("img").src;
      const overlay = document.getElementById("modalOverlay"); overlay.style.display = "flex"; overlay.classList.add("show");
    }

    function closeModal() {
      const overlay = document.getElementById("modalOverlay"); overlay.style.display = "none"; overlay.classList.remove("show");
    }

    function filterاخبار() {
      currentPage = 1;
      paginateاخبار();
    }

    let currentPage = 1;
    const itemsPerPage = 4;

    function paginateاخبار() {
      const allItems = Array.from(document.querySelectorهمه(".news-item"));
      const search = document.getElementById("newsSearch").value.toLowerCase();

      const filteredItems = allItems.filter(item => {
        const title = item.dataset.title.toLowerCase();
        const desc = item.dataset.description.toLowerCase();
        return title.includes(search) || desc.includes(search);
      });

      const pagination = document.getElementById("pagination");
      const newsList = document.getElementById("newsList");

      allItems.forEach(item => item.style.display = "none");

      const start = (currentPage - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      filteredItems.slice(start, end).forEach(item => item.style.display = "flex");

      pagination.innerHTML = "";
      const pageCount = Math.ceil(filteredItems.length / itemsPerPage);
      for (let i = 1; i <= pageCount; i++) {
        const btn = document.createElement("button");
        btn.textContent = i;
        if (i === currentPage) btn.classList.add("active");
        btn.onclick = () => {
          currentPage = i;
          paginateاخبار();
        };
        pagination.appendChild(btn);
      }
    }

    document.addEventListener("DOMContentLoaded", paginateاخبار);