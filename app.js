require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const app = express()


// Controllers setup
const userController = require('./controllers/userController')
app.use('/users', userController)
app.get('*', userController)

const gamesController = require('./controllers/gamesController')
app.use('/users/:userId/games', gamesController)

const infoController = require('./controllers/infoController')
app.use('/users/:userId/games/:gameId/info', infoController)

// Automatically 

// const index = require('./routes/index');
// const users = require('./routes/users');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'))

// Mongo connection set-up
mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.once('open', () => {
  console.log('Mongoose has connected to MongoDB!')
})

mongoose.connection.on('error', (error) => {
  console.error(`
    MongoDB connection error!!! 
    ${error}
  `)
  process.exit(-1)
})


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
