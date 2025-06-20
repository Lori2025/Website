
const isCityPage = window.location.pathname.includes("/cities/");
const basePath = isCityPage ? "../partials/" : "/partials/";
const headerFile = isCityPage ? "header-cities.html" : "header.html";
const footerFile = "footer.html";

fetch(basePath + headerFile)
  .then(res => res.text())
  .then(html => {
    const target = document.getElementById("header-placeholder");
    if (target) target.innerHTML = html;
  });

fetch(basePath + footerFile)
  .then(res => res.text())
  .then(html => {
    const footer = document.querySelector("footer");
    if (footer) footer.innerHTML = html;
  });
