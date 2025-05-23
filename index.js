import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

const AGENCY_ID = process.env.CAREERONESTOP_AGENCY_ID;
const API_KEY = process.env.CAREERONESTOP_API_KEY;

app.get('/scholarships', async (req, res) => {
  const { keyword = '', state = '', limit = '10' } = req.query;

  const url = `https://api.careeronestop.org/v1/scholarshipfinder/${AGENCY_ID}/${encodeURIComponent(keyword)}/${state}/${limit}`;

  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`CareerOneStop API Error: ${response.statusText}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error('CareerOneStop API Error:', err);
    res.status(500).json({ error: 'Failed to fetch scholarships' });
  }
});

app.listen(PORT, () => {
  console.log(`Scholarship API running on port ${PORT}`);
});
