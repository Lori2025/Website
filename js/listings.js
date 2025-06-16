fetch('data/listings.json')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('listing-container');
    data.forEach(home => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <img src="${home.image}" alt="House photo">
        <div class="card-body">
          <h3>${home.address}</h3>
          <p><strong>Price:</strong> $${home.price.toLocaleString()}</p>
          <p>${home.beds} Beds / ${home.baths} Baths</p>
          <p><em>${home.builder}</em></p>
          <a href="${home.page}">View Listing →</a>
        </div>
      `;
      container.appendChild(card);
    });
  });
