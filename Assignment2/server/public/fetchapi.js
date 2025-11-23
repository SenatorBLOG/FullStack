const accessKey = 'wIV1ZG1i7YTr7bl4RLumfNkd2FZzM2L69zzww0GULSM';

document.getElementById('showBtn').addEventListener('click', async () => {
    const query = document.getElementById('searchQuery').value.trim();
    const count = parseInt(document.getElementById('imageCount').value);

    if (!query || isNaN(count) || count < 2) {
        alert('Keyword cannot be empty and number of images must be at least 2.');
        return;
    }

    const resultsDiv = document.getElementById('gallery');
    resultsDiv.innerHTML = '';  // Clear previous results

    const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=${count}&client_id=${accessKey}`;
    console.log('Fetching URL:', url);  // For debugging

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }
        const data = await response.json();

        data.results.forEach(photo => {
            const orientation = photo.width > photo.height ? 'landscape' :
                                photo.height > photo.width ? 'portrait' : 'square';

            const card = document.createElement('div');
            card.className = 'image-item';
            card.innerHTML = `
                <img src="${photo.urls.small}" alt="${photo.alt_description || photo.description || 'Image'}">
                <div class="image-details">
                    <p><strong>Photographer:</strong> ${photo.user.name}</p>
                    <p><strong>Description:</strong> ${photo.description || photo.alt_description || 'None'}</p>
                    <p><strong>Likes:</strong> ${photo.likes}</p>
                    <p><strong>Image URL:</strong> <a href="${photo.links.html}" target="_blank">${photo.links.html}</a></p>
                    <p><strong>Orientation:</strong> ${orientation}</p>
                    <p><strong>Full URL:</strong> ${photo.urls.full}</p>
                </div>
            `;
            resultsDiv.appendChild(card);
        });
    } catch (error) {
        console.error(error);
        alert('Error fetching images: ' + error.message);
    }
});