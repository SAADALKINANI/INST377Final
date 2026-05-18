async function loadFavorites() {
  const response = await fetch('/api/favorites');
  const data = await response.json();

  const container = document.getElementById('favorites-list');

  container.innerHTML = '';

  data.forEach(item => {
    container.innerHTML += `
      <div>
        ${item.base_currency} → ${item.target_currency}
        <button onclick="deleteFavorite(${item.id})">
          Delete
        </button>
      </div>
      <hr>
    `;
  });
}

async function deleteFavorite(id) {
  await fetch(`/api/favorites/${id}`, {
    method: 'DELETE'
  });

  loadFavorites();
}

loadFavorites();