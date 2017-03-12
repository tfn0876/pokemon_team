var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');
var passport = require('passport');
var mongoose = require('mongoose');
var config = require('./config/database');
var index = require('./routes/index');
var courses = require('./routes/courses');
var students = require('./routes/student');
var users = require('./routes/users');
var multer = require('multer');
var fs = require('fs');
var DIR = './uploads/';

// connect to mongoose
mongoose.connect(config.database);
mongoose.connection.on('connected', () => {
	console.log('connected to database ' + config.database);
});
var upload = multer({dest: DIR});
mongoose.connection.on('error', (err) => {
	console.log('Error in connecting database  ' + err);
});


var app = express();
var port = 3000;
// cross browser origin requests
app.use(cors());
// view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// set static folder
app.use(express.static(path.join(__dirname, 'client')));

// Body Parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use('/', index);
app.use('/api', courses);
app.use('/api', students);
app.use('/api/users', users);

app.get('/api/upload', function (req, res) {
  res.end('file catcher example');
});
 
app.post('/api/upload', function (req, res) {
  upload(req, res, function (err) {
    if (err) {
      return res.end(err.toString());
    }
    res.end('File is uploaded');
  });
});
app.listen(port, function() {
	console.log('Server started on port ' + port);
});