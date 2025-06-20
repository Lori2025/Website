console.log("✅ map.js script loaded");

document.addEventListener("DOMContentLoaded", async () => {
  const mapContainer = document.getElementById("map");
  if (!mapContainer) {
    console.warn("🛑 No map container found.");
    return;
  }

  const pathParts = window.location.pathname.split("/");
  const pageName = pathParts[pathParts.length - 1].replace(".html", "").toLowerCase();

  let center = [36.2077, -119.3473]; // Default center

  try {
    const cityRes = await fetch("/data/cities.json");
    const cityData = await cityRes.json();
    const cityMatch = cityData.find(c => c.city.toLowerCase() === pageName);
    if (cityMatch) {
      center = [cityMatch.lat, cityMatch.lng];
    }
  } catch (err) {
    console.error("❌ Failed to load city coordinates:", err);
  }

  const map = L.map("map").setView(center, 11);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors"
  }).addTo(map);

  try {
    const res = await fetch("/data/builders.json");
    const builders = await res.json();

    builders.forEach(builder => {
      const cityName = capitalize(pageName);
      const cityData = builder.cities?.[cityName];
      if (cityData) {
        cityData.forEach(community => {
          if (community.lat && community.lng) {
            L.marker([community.lat, community.lng])
              .addTo(map)
              .bindPopup(`
                <strong>${community.community}</strong><br/>
                ${builder.builder}<br/>
                ${community.priceRange}
              `);
          }
        });
      }
    });
  } catch (err) {
    console.error("❌ Error loading builder data:", err);
  }
});

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
