import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;
const accessKey = process.env.UNSPLASH_ACCESS_KEY; 

if (!accessKey) {
  console.warn('WARNING: No UNSPLASH_ACCESS_KEY found in .env');
}

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// GET / -> render empty page but pass all template vars
app.get('/', (req, res) => {
  res.render('unsplashGallery', {
    images: [],
    error: null,
    query: '',
    count: 4
  });
});

// POST /search -> validate, fetch from Unsplash, map results, render
app.post('/search', async (req, res) => {
  try {
    const query = (req.body.searchQuery  || '').trim();
    const count = parseInt(req.body.imageCount, 10) || 0;

    // Validation
    if (!query) {
      return res.status(400).render('unsplashGallery', {
        images: [],
        error: 'Search keyword is required.',
        query,
        count
      });
    }
    if (Number.isNaN(count) || count < 2) {
      return res.status(400).render('unsplashGallery', {
        images: [],
        error: 'Number of images must be at least 2.',
        query,
        count
      });
    }

    const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=${count}&client_id=${accessKey}`;

    // //Axios GET request
    // const response = await axios.get(url);
    // const results = response.data.results || [];

   // Fetch API GET request 
     const response = await fetch(url);
     const results = (await response.json()).results || [];

    // Map Unsplash items to the shape EJS 
    const images = results.map(item => ({
      photographer: item.user && item.user.name ? item.user.name : 'Unknown',
      description: item.alt_description || item.description || '',
      likes: item.likes || 0,
      urls: item.urls || {},
      links: item.links || {},
      width: item.width,
      height: item.height,
      orientation: (item.width && item.height) ? (item.width > item.height ? 'landscape' : (item.width < item.height ? 'portrait' : 'square')) : 'unknown'
    }));

    res.render('unsplashGallery', { images, error: null, query, count });
  } catch (err) {
    console.error('Server error:', err?.response?.data || err.message || err);
    res.status(500).render('unsplashGallery', {
      images: [],
      error: 'Server error: failed to fetch images.',
      query: req.body.query || '',
      count: req.body.count || 4
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
