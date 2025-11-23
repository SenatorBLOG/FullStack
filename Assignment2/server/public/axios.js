const accessKey = 'wIV1ZG1i7YTr7bl4RLumfNkd2FZzM2L69zzww0GULSM';

document.getElementById('showBtn').addEventListener('click', async () => {
  const query = document.getElementById('searchQuery').value.trim();
  const count = parseInt(document.getElementById('imageCount').value, 10);

  if (!query || isNaN(count) || count < 2) {
    alert('Keyword cannot be empty and number of images must be at least 2.');
    return;
  }

  const resultsDiv = document.getElementById('gallery');
  resultsDiv.innerHTML = ''; // clear

  try {
    // Используем params — удобнее и безопаснее для кодирования
    const res = await axios.get('https://api.unsplash.com/search/photos', {
      params: {
        query: query,
        per_page: count,
        client_id: accessKey
      }
    });

    const data = res.data;

    if (!data || !data.results || data.results.length === 0) {
      alert('No results found.');
      return;
    }

    data.results.forEach(photo => {
      const orientation = photo.width > photo.height ? 'landscape' :
                          photo.height > photo.width ? 'portrait' : 'square';

      const card = document.createElement('div');
      card.className = 'image-item';
      card.innerHTML = `
        <img src="${photo.urls.small}" alt="${photo.alt_description || photo.description || 'Image'}">
        <div class="image-details">
          <p><strong>Photographer:</strong> ${photo.user?.name || 'Unknown'}</p>
          <p><strong>Description:</strong> ${photo.description || photo.alt_description || 'None'}</p>
          <p><strong>Likes:</strong> ${photo.likes}</p>
          <p><strong>Image URL:</strong> <a href="${photo.links.html}" target="_blank" rel="noopener">${photo.links.html}</a></p>
          <p><strong>Orientation:</strong> ${orientation}</p>
          <p><strong>Full URL:</strong> <a href="${photo.urls.full}" target="_blank" rel="noopener">View full</a></p>
        </div>
      `;
      resultsDiv.appendChild(card);
    });

  } catch (err) {
    console.error('Axios error:', err);
    const message = err.response ? `API error ${err.response.status}` : err.message;
    alert('Error fetching images: ' + message);
  }
});