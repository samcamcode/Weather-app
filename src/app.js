const path = require('path');
const express = require('express');
const hbs = require('hbs');
const weatherAddress = require('./utils/weatherStack');
const { response } = require('express');

const app = express();
const port = process.env.PORT || 3000;

// define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// setup static dir to serve
app.use(express.static(publicDirectoryPath));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Samuel Camacho'
    })
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Samuel Camacho'
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is the help page!',
        title: 'Help', 
        name: 'Samuel Camacho'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    weatherAddress(req.query.address, (error, response) => {
        if (error) {
            return res.send({error})
        }

        res.send({
            location: req.query.address,
            forecast: response
        })
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'you must provide a search term'
        })
    }
    console.log(req.query.look)
    res.send({
        products: []
    })
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help 404',
        message: 'Help article not found',
        name: 'Samuel Camacho'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 404,
        message: 'page not found',
        name: 'Samuel Camacho'
    })
})


app.listen(port, () => {
    console.log(`server up on port: ${port}`)
});

