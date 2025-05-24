
document.addEventListener("DOMContentLoaded", function () {
  const toFarsiDigits = (str) => str.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);

  const convertNumbers = (el) => {
    el.childNodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE && /\d/.test(node.textContent)) {
        const span = document.createElement("span");
        span.className = "persian-num";
        span.textContent = toFarsiDigits(node.textContent);
        el.replaceChild(span, node);
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        convertNumbers(node);
      }
    });
    el.style.textAlign = "center";
  };

  document.querySelectorAll(".contact-numbers").forEach(convertNumbers);
});
