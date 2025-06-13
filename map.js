var map = L.map('map').setView([38.2928, -122.4580], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

L.marker([38.2928, -122.4580])
  .addTo(map)
  .bindPopup('My Business Location')
  .openPopup();
