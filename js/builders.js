
document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".builders-grid");

  fetch("data/builders.json")
    .then(res => res.json())
    .then(data => {
      data.forEach(builder => {
        const card = document.createElement("div");
        card.className = "builder-card";

        const h2 = document.createElement("h2");
        h2.textContent = builder.builder;
        card.appendChild(h2);

        for (const city in builder.cities) {
          const cityBlock = document.createElement("div");

          const cityTitle = document.createElement("h3");
          cityTitle.textContent = city;
          cityBlock.appendChild(cityTitle);

          builder.cities[city].forEach(community => {
            const link = document.createElement("a");
            link.href = `cities/${city.toLowerCase()}.html?builder=${encodeURIComponent(builder.builder)}&community=${encodeURIComponent(community)}`;
            link.textContent = community;
            link.style.display = "block";
            link.style.marginLeft = "1.5rem";
            link.style.textDecoration = "none";
            link.style.color = "inherit";
            cityBlock.appendChild(link);
          });

          card.appendChild(cityBlock);
        }

        grid.appendChild(card);
      });
    })
    .catch(err => {
      console.error("Error loading builders:", err);
    });
});
