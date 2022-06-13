const express = require('express')
const https = require('https')
const fs = require('fs')
const cors = require('cors')
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')
const cookieParser = require("cookie-parser");

const User = require('./user')

const app = express()
const port = 3000
const mongo = {
  uri: 'mongodb://user:9TF5KKZSu9kDQbxj@database/learnify',
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
}

mongoose.connect(mongo.uri, mongo.options)

mongoose.connection.on('error', function (err) {
  console.error('MongoDB connection error: ' + err)
})

var db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

mongoose.connection.once('open', function () {
  app.use(session({
    secret: 'keyboard dog',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: false,
      sameSite: "none",
      secure: true,
    }
  }))

  //app.use(cookieParser());

  app.use(cors({
    credentials: true,
    exposedHeaders: '*',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    preflightContinue: false,
    origin: true,
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH', 'OPTIONS', 'HEAD']
  }))
  app.options(
    '*',
    cors({
      credentials: true,
      exposedHeaders: '*',
      allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
      preflightContinue: false,
      origin: true,
      methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH', 'OPTIONS', 'HEAD']
    })
  );

  app.use(express.json());
  app.use(express.urlencoded({
    extended: true
  }));

  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(User.createStrategy())

  passport.serializeUser(User.serializeUser())
  passport.deserializeUser(User.deserializeUser())

  app.get('/', (req, res) => {
    res.send('Hello World!')
  })

   // https://localhost/register?name=user&email=user@learnify.com&passwd=123
  app.get('/register', function (req, res) {
    console.log("Register")
    var Users = new User({ email: req.query.email, username: req.query.name })

    User.register(Users, req.query.passwd.toString(), function (err, user) {
      if (err) {
        res.json({
          success: false, message: "Your account could not be saved.", err
        })
      } else {
        res.json({
          success: true, message: "Your account has been saved"
        })
      }
    })
  })        

  app.post('/login', passport.authenticate('local'), (req, res) => {
    console.log("login")
    var user = req.user
    user.hash = undefined
    user.salt = undefined
    res.json(user)
  })

  app.get('/islogin', (req, res) => {
    console.log("islogin")
    res.json({ success: req.isAuthenticated() })
  })

  const httpsOptions = {
    key: fs.readFileSync('./src/security/server.key'),
    cert: fs.readFileSync('./src/security/server.cert')
  }
  const server = https.createServer(httpsOptions, app)
      .listen(port, () => {
          console.log('server running at ' + port)
    })
})