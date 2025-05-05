const axios = require('axios');
 const apiKey = 'YouApiKey'
 //forecast api
 
 module.exports = {
     forecastApi: async (location, days) => {
         return await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=${days}&aqi=no&alerts=no`)
             .then(function (response) {
                return response.data;
             })
             .catch(function (error) {
                 console.log(error);
                 return{ error: "Unable to fetch forecast information." }
             })

            },

              // current weather 
    currentWeatherApi: async (location) => {
        return await axios.get(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`)
            .then(response => response.data)
            .catch(error => {
                console.log(error);
                return { error: "Unable to fetch current weather information." };
            });
    },

    //Alerts API
    alertsApi: async (location) => {
        return await axios.get(`http://api.weatherapi.com/v1/alerts.json?key=${apiKey}&q=${location}&days=1&alerts=yes`)
            .then(response => response.data.alerts || [])
            .catch(error => {
                console.log(error);
                return { error: "Unable to fetch weather alerts." };
            });
     // add alert API call hint: change forecast.json to match api wanted 
     // add current API
     // documentation https://www.weatherapi.com/docs/#intro-request
        }
 }