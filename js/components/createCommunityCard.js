export function createCommunityCard(community) {
  const {
    name = "Unnamed Community",
    builder = "Unknown Builder",
    priceRange = "Price unavailable",
    beds = "—",
    baths = "—",
    sqft = "—",
    status = "Coming Soon"
  } = community;

  return `
    <div class="community-card">
      <h3>${name}</h3>
      <p><strong>Builder:</strong> ${builder}</p>
      <p><strong>Price:</strong> ${priceRange}</p>
      <p><strong>Specs:</strong> ${beds} beds • ${baths} baths • ${sqft} sqft</p>
      <p class="status ${status.toLowerCase().replace(/\s+/g, "-")}">${status}</p>
    </div>
  `;
}
