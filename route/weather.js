const express = require('express');
const axios = require('axios');
const router = express.Router();

const apiKey = process.env.c8a0e813580a474584c181228250405;

router.get('/current', async (req, res) => {
  const city = req.query.city;
  if (!city) return res.status(400).json({ error: 'City is required' });

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await axios.get(url);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch current weather' });
  }
});

module.exports = router;
