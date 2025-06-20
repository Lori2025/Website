export function createCityCard({
  name,
  image,
  link,
  tagline,
  builderCount,
  communityCount,
  priceRange
}) {
  const fullLink = "/" + link;
  console.log("Rendering link for:", link);
  
  return `
    <a href="${fullLink}" class="city-card-link">
      <div class="city-card">
        <img src="${image}" alt="${name}" class="city-image"/>
        <div class="city-details">
          <h2>${name}</h2>
          <p class="city-tagline">${tagline}</p>
          <ul class="city-stats">
            <li><strong>Builders:</strong> ${builderCount}</li>
            <li><strong>Communities:</strong> ${communityCount}</li>
            <li><strong>Price Range:</strong> ${priceRange}</li>
          </ul>
        </div>
      </div>
    </a>
  `;
}
