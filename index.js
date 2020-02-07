const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const users = require('./routes/api/users');
const sujets = require('./routes/api/sujets');

// create server
const app = express();

// app.use(cors);
//bodyParser Middleware 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

//DB config
const db='mongodb://localhost:27017/projectdb';

//connect to mongo
mongoose
    .connect(db)
    .then(()=> console.log('Mongo connected...'))
    .catch(err => console.log(err));

//Use routes
app.use('/api/users',users);
app.use('/api/sujets',sujets);


const port = process.env.PORT || 5000 ;


app.listen(port, () => console.log(`server started on port ${port}`));