const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { forecastApi } = require('./externalApi/externalApiCalls'); // add additional functions comma separated example { foo, bar }

const app = express();
const PORT = process.env.PORT || 9000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const weatherRoutes = require('./routes/weather');
app.use('/api/weather', weatherRoutes);


app.get('/forecast', async (req, res) => {  // example with data /forecast?location=31909&days=3
    try {
        const result = await forecastApi(req.query.location, req.query.days);
        res.json(result);
    } catch (error) {
        console.error("Error in forecast function:", error);
        res.status(500).json({ error: "An error occurred" });
    }
});

// app.get /current location

//app.get /alerts

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});