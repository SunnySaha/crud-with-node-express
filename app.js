const express = require('express');
const path = require('path');

const customerApiEndPoint = '/api/customers/';

const customerApiRouter = './public/api/customerApi';

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, 'public')));

app.use(customerApiEndPoint, require(customerApiRouter));

app.listen(PORT, () => console.log(`Server Running on ${PORT}`))

