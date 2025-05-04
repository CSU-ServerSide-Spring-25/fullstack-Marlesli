const express = require('express');
const axios = require('axios');
const router = express.Router();

const apiKey = process.env.WEATHER_API_KEY;

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
