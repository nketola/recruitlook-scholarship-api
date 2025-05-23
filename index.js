import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/scholarships', async (req, res) => {
  const { keyword = '', limit = '10' } = req.query;

  const url = `https://scholaroo.com/api/scholarships?search=${encodeURIComponent(keyword)}&limit=${limit}`;

  try {
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'Referer': 'https://scholaroo.com/',
      },
    });

    if (!response.ok) {
      throw new Error(`Scholaroo API Error: ${response.statusText}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error('Scholaroo API Error:', err);
    res.status(500).json({ error: 'Failed to fetch scholarships' });
  }
});

app.listen(PORT, () => {
  console.log(`Scholarship API running on port ${PORT}`);
});
