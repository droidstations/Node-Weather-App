const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()

// https://home.openweathermap.org/api_keys
// user - droidstation
// password - webprogramming
// email - droidstations@gmail.com

const apiKey = 'a9bb6112a70aaad6bbd7daebaca9b1de';

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.render('index', { weather: null, error: null });
});

app.post('/', function (req, res) {
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

    request(url, function(err, response, body) {
        if (err) {
            res.render('index', { weather: null, error: JSON.stringify(body, null, 4) } );
        } else {
            let weather = JSON.parse(body);

            if (weather.main == undefined) {
                res.render('index', { weather: null, error: JSON.stringify(body, null, 4) })
            } else {
                let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
                res.render('index', { weather: weatherText, error:null });
            }
        }
    });
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
