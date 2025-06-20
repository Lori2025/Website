import { createBuilderCard } from "../components/createBuilderCard.js";

document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("builders-container");

  try {
    const response = await fetch("../data/builders.json");
    const builders = await response.json();

    builders.forEach(builder => {
      const cardHTML = createBuilderCard(builder);
      container.insertAdjacentHTML("beforeend", cardHTML);
    });
  } catch (error) {
    console.error("Failed to load builder data:", error);
    container.innerHTML = "<p>Error loading builder cards.</p>";
  }
});
