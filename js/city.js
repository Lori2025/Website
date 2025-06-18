
document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const builderFilter = urlParams.get("builder");
  const citySlug = window.location.pathname.split("/").pop().replace(".html", "");
  const builderContainer = document.getElementById("city-builder-list");
  const introContainer = document.querySelector(".page-intro");
  const mapContainer = document.getElementById("map");

  let cityData = null;

  // Load cityData.json
  fetch("../data/cityData.json")
    .then(res => res.json())
    .then(cities => {
      cityData = cities.find(city => city.slug === citySlug);
      if (!cityData) return;

      // Inject intro text and stats
      if (introContainer) {
        let heading = `New Construction Homes in ${cityData.name}, CA`;
        if (builderFilter) {
          heading = `${builderFilter} Homes in ${cityData.name}`;
        }

        introContainer.innerHTML = `
          <h1>${heading}</h1>
          <p>${cityData.blurb}</p>
          <p><strong>Recent Market Stats:</strong> Median new home price: $${cityData.median_price.toLocaleString()} · Avg. time on market: ${cityData.avg_days_on_market} days</p>
        `;
      }

      // Initialize map
      if (mapContainer && typeof L !== "undefined") {
        const map = L.map("map").setView(cityData.map_center, 13);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);

        cityData.map_markers.forEach(marker => {
          if (!builderFilter || marker.builder === builderFilter) {
            L.marker(marker.coords).addTo(map)
              .bindPopup(`<strong>${marker.community}</strong><br>${marker.builder}`);
          }
        });
      }

      // Load builder data and inject filtered content
      return fetch("../data/builders.json");
    })
    .then(res => res.json())
    .then(builders => {
      builders.forEach(builder => {
        const builderName = builder.builder;
        if (builderFilter && builderName !== builderFilter) return;

        const communities = builder.cities[cityData.name];
        if (communities && builderContainer) {
          const card = document.createElement("div");
          card.className = "builder-card";

          const h2 = document.createElement("h2");
          h2.textContent = builderName;
          card.appendChild(h2);

          communities.forEach(community => {
            const p = document.createElement("p");
            p.style.marginLeft = "1.5rem";
            p.textContent = community;
            card.appendChild(p);
          });

          builderContainer.appendChild(card);
        }
      });
    })
    .catch(err => console.error("City page load error:", err));
});
