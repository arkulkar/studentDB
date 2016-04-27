/**
 * Created by arkulkar on 4/20/2016.
 */
var mongoose = require('mongoose');                     // mongoose for mongodb
var express = require('express');
var app = express();
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var studentRoute = require('./server/student/route/student.route');
var collegeRoute = require('./server/college/route/college.route');

mongoose.connect('mongodb://localhost:27017/studentDb');     // connect to mongoDB database on modulus.io

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

studentRoute(app);
collegeRoute(app);

app.listen(3000);
console.log('listening on port 3000');