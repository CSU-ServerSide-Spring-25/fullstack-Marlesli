const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { forecastApi, currentWeatherApi, alertsApi } = require('./externalApi/externalApiCalls');

const app = express();
const PORT = process.env.PORT || 9000;

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET'],
    allowedHeaders: ['Content-Type'],
    credentials: true
  };
  
  // Use CORS middleware globally
  app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Weather endpoints
app.get('/forecast', async (req, res) => {
    console.log("Received forecast request:", req.query.location);
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



// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const { forecastApi, currentWeatherApi, alertsApi } = require('./externalApi/externalApiCalls');

// const app = express();
// const PORT = process.env.PORT || 9000;

// // app.use(cors());
// const allowedOrigin = 'https://crispy-chainsaw-r9xx5p5r5q92x66g-9010.app.github.dev';

// app.use(cors({
//     origin: allowedOrigin,
//     methods: ['GET', 'POST', 'OPTIONS'],
//     allowedHeaders: ['Content-Type'],
// }));

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));


// app.get('/forecast', async (req, res) => {
//     console.log("Received forecast request:", req.query.location); // Log the request
//     try {
//         const result = await forecastApi(req.query.location, req.query.days);
//         console.log("Forecast API result:", result); // Log the result
//         res.json(result);
//     } catch (error) {
//         console.error("Error in forecast function:", error);
//         res.status(500).json({ error: "An error occurred" });
//     }
// });

// // app.get('/forecast', async (req, res) => {  
// //     try {
// //         const result = await forecastApi(req.query.location, req.query.days);
// //         res.json(result);
// //     } catch (error) {
// //         console.error("Error in forecast function:", error);
// //         res.status(500).json({ error: "An error occurred" });
// //     }
// // });

// app.get('/current', async (req, res) => { 
//     try {
//         const result = await currentWeatherApi(req.query.location);
//         res.json(result);
//     } catch (error) {
//         console.error("Error in current weather function:", error);
//         res.status(500).json({ error: "An error occurred" });
//     }
// });

// app.get('/alerts', async (req, res) => { 
//     try {
//         const result = await alertsApi(req.query.location);
//         res.json(result);
//     } catch (error) {
//         console.error("Error in alerts function:", error);
//         res.status(500).json({ error: "An error occurred" });
//     }
// });

// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });