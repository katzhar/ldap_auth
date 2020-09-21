const express = require('express'),
    passport = require('passport'),
    bodyParser = require('body-parser'),
    signin = require('./routes/signin'),
    app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

app.use('/signin', signin);

app.listen(8080);
