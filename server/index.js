const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { forecastApi, currentWeatherApi, alertsApi } = require('./externalApi/externalApiCalls'); // add additional functions comma separated example { foo, bar }

const app = express();
const PORT = process.env.PORT || 9000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/forecast', async (req, res) => {  
    try {
        const result = await forecastApi(req.query.location, req.query.days);
        res.json(result);
    } catch (error) {
        console.error("Error in forecast function:", error);
        res.status(500).json({ error: "An error occurred" });
    }
});

app.get('/current', async (req, res) => { 
    try {
        const result = await currentWeatherApi(req.query.location);
        res.json(result);
    } catch (error) {
        console.error("Error in current weather function:", error);
        res.status(500).json({ error: "An error occurred" });
    }
});

app.get('/alerts', async (req, res) => { 
    try {
        const result = await alertsApi(req.query.location);
        res.json(result);
    } catch (error) {
        console.error("Error in alerts function:", error);
        res.status(500).json({ error: "An error occurred" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});