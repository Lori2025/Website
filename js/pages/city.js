
import { createCityBuilderCard } from "../components/createCityBuilderCard.js";

// Inject header/footer using root-relative paths
fetch("/partials/header.html")
  .then(res => res.text())
  .then(data => document.getElementById("header-placeholder").innerHTML = data);

fetch("/partials/footer.html")
  .then(res => res.text())
  .then(data => document.querySelector("footer").innerHTML = data);

// Get current city slug from URL
const citySlug = window.location.pathname.split("/").pop().replace(".html", "");
const cityName = citySlug.charAt(0).toUpperCase() + citySlug.slice(1).toLowerCase();

const container = document.getElementById("city-builder-list");

fetch("/data/builders.json")
  .then(res => res.json())
  .then(builders => {
    const cityBuilders = builders.filter(b => b.cities && b.cities[cityName]);

    if (cityBuilders.length === 0) {
      container.innerHTML = "<p>No communities found in this city.</p>";
      return;
    }

    cityBuilders.forEach(builder => {
      const communities = builder.cities[cityName] || [];
      const card = createCityBuilderCard(builder, communities);
      container.insertAdjacentHTML("beforeend", card);
    });
  })
  .catch(err => {
    console.error("Error loading city builder data:", err);
    container.innerHTML = "<p>Error loading communities for this city.</p>";
  });
