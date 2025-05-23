import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/scholarships', async (req, res) => {
  const { keyword = '', state = '', limit = '10' } = req.query;

  const API_KEY = process.env.CAREERONESTOP_API_KEY;
  const AGENCY_ID = process.env.CAREERONESTOP_AGENCY_ID;

  if (!API_KEY || !AGENCY_ID) {
    return res.status(500).json({ error: 'Missing API credentials' });
  }

  const
