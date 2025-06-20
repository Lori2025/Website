import { createCityCard } from "../components/createCityCard.js";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("city-directory");

  if (!container) {
    console.error("🛑 No element with ID 'city-directory' found. Aborting city load.");
    return;
  }

  console.log("📦 Loading cities from /data/cities.json...");

  loadCityCards(container);
});

async function loadCityCards(container) {
  try {
    const res = await fetch("/data/cities.json"); // ✅ site-root relative
    const cities = await res.json();

    if (!Array.isArray(cities)) {
      throw new Error("cities.json is not an array.");
    }

    const rendered = new Set();


cities.forEach(city => {
  const key = city.city.toLowerCase();
  if (rendered.has(key)) return;
  rendered.add(key);

  const cardHTML = createCityCard({
    name: city.city,
    image: city.image || "../images/default-city.jpg",
    link: city.link,
    tagline: city.vibe || city.blurb,
    builderCount: city.numBuilders,
    communityCount: city.numCommunities,
    priceRange: city.avgPriceRange
  });

  container.insertAdjacentHTML("beforeend", cardHTML);

});

  } catch (err) {
    console.error("❌ Failed to fetch cities.json:", err);
    container.innerHTML = "<p>Sorry, city listings could not be loaded.</p>";
  }
}
