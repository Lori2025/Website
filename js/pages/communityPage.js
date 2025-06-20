import { createCommunityCard } from "../components/createCommunityCard.js";

// Get current city from URL (e.g., cities/corcoran.html → "corcoran")
const currentCity = window.location.pathname
  .split("/")
  .pop()
  .replace(".html", "")
  .toLowerCase();

document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("community-container");

  try {
    const res = await fetch("../data/communityData.json");
    const data = await res.json();
    const communities = data[currentCity] || [];

    if (communities.length === 0) {
      container.innerHTML = "<p>No communities listed for this city yet.</p>";
      return;
    }

    communities.forEach(community => {
      const cardHTML = createCommunityCard(community);
      container.insertAdjacentHTML("beforeend", cardHTML);
    });
  } catch (err) {
    console.error("Failed to load community data:", err);
    container.innerHTML = "<p>Error loading communities.</p>";
  }
});
