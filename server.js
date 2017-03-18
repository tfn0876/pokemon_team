var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var courses = require('./routes/courses');
var app = express();
var port = 8001;

// view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// set static folder
app.use(express.static(path.join(__dirname, 'client')));

// Body Parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', index);
app.use('/api', courses);
app.set('port', process.env.PORT || port);
app.listen(process.env.PORT || port, function () {
    console.log('Server started on port ' + (process.env.PORT || port));
});
