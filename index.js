const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const ip = require('ip');

console.log(ip.address())

//morgan logs requests coming to the api
app.use(morgan('dev'));

//body-parser allows you to pass data into api
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

//cors allows access to api from other urls or servers
app.use(cors(['http://localhost:3000', 'http://localhost:5000', 'www.frontend-app.com']));

//importing products routes
const productsRoutes = require('./api/routes/products');
const usersRoutes = require('./api/routes/users');

//defining route(endpoint) to productsRoutes
//NB: any route(path) found in products route will be preceeded by /products.
app.use('/products', productsRoutes);
app.use('/users', usersRoutes);

//handles errors i.e. endpoints that do not exist.
app.use('*', (req, res, next) => {
    res.status(404).json({
        message: 'Error! Page not Found'
    });
});

//runs the server
app.listen(process.env.PORT || 2900, console.log('Server is running on port 2900'));
