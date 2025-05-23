app.get('/scholarships', async (req, res) => {
  const { keyword = '', limit = '10' } = req.query;

  const url = `https://scholaroo.com/api/scholarships?search=${encodeURIComponent(keyword)}&limit=${limit}`;

  try {
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
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

