var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const cors = require('cors')
const mongoose = require('mongoose')
const uri = 'mongodb://article:article@ds127892.mlab.com:27892/wordpress'
mongoose.connect(uri)
var db = mongoose.createConnection(uri)
var index = require('./routes/index');


var app = express();

// view engine setup
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cors())
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', index);


// catch 404 and forward to error handler


module.exports = app;
