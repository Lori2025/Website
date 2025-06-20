
export function createBuilderCard(builder) {
  const {
    builder: name = "Unnamed Builder",
    logo = "images/meow.jpg",
    website = "#",
    description = "No description provided.",
    cities = {}
  } = builder;

  let cityBlocks = "";
  for (const [cityName, communities] of Object.entries(cities)) {
    const communityCards = communities.map(community => {
      return `
        <div class="community-card">
          <h4 class="community-name">${community.community}</h4>
          <p><strong>Price:</strong> ${community.priceRange || "—"}</p>
          <p><strong>Sq Ft:</strong> ${community.sqft || "—"}</p>
          <p><strong>Bedrooms:</strong> ${community.beds || "—"}</p>
          <p><strong>Bathrooms:</strong> ${community.baths || "—"}</p>
          <p><strong>Status:</strong> ${community.status || "—"}</p>
        </div>
      `;
    }).join("");

    cityBlocks += `
      <div class="city-card">
        <h3>${cityName}</h3>
        <div class="community-card-grid">
          ${communityCards}
        </div>
      </div>
    `;
  }

  return `
    <div class="builder-card-nested">
      <div class="builder-header">
        <div class="builder-info">
          <h2>${name}</h2>
          <p>${description}</p>
          <a href="${website}" target="_blank" class="builder-link">Visit Builder Website</a>
        </div>
        <img src="${logo}" alt="${name} logo" class="builder-logo" />
      </div>
      <div class="builder-cities">
        ${cityBlocks}
      </div>
    </div>
  `;
}
