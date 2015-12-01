// require modules and the required parameters to use the facebook-authentication
var         passport = require('passport'),
       LocalStrategy = require('passport-local').Strategy,
    FacebookStrategy = require('passport-facebook').Strategy,
          configAuth = require('./auth.js'),
                User = require('../models/User.js'),
            Favorite = require('../models/Favorite.js')

// store current user's information as a cookie
passport.serializeUser(function(user, done){
  done(null, user.id)
})

// extract information from a cookie
passport.deserializeUser(function(id, done){
  User.findById(id, function(err, user){
    done(err, user)
  })
})

// create a local-user using passport & passport-local
passport.use('local-signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
},
  function(req, email, password, done) {
    User.findOne({'local.email': email}, function(err, user) {
      if(err) return done(err)
      if(user) return done(null, false, req.flash('signupMessage','That email is already taken.'))

      var newUser = new User()
      newUser.local.name = req.body.name
      newUser.local.email = email
      newUser.local.password = newUser.generateHash(password)

      newUser.save(function(err){
        if (err) throw err
        return done(null, newUser)
      })
    })
  }
))


// create a session when logging in with a local-account using passport & passport-local
passport.use('local-login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, function(req, email, password, done) {
  // check if a user with the email specified exists in the database
  User.findOne({'local.email': email}, function(err, user) {
    if (err) throw err
    // if no user was found, inform the user and exit the function
    if (!user) return done(null, false, req.flash('loginMessage', 'No User Found.'))
    // if a user was found but the password did not match, then inform the user and exit the function
    if (!user.validPassword(password)) return done(null, false, req.flash('loginMessage', 'Invalid Credentials'))
    // otherwise, create a session
    return done(null, user)
  })
}))

// create a facebook-user using passport & passport-facebook
passport.use(new FacebookStrategy({
  clientID: configAuth.facebookAuth.clientID,
  clientSecret: configAuth.facebookAuth.clientSecret,
  callbackURL: configAuth.facebookAuth.callbackURL,
  profileFields: configAuth.facebookAuth.profileFields},
  function (token, refreshToken, profile, done){
    // check if the user with this facebook acount has already created an account;
    // if yes, then login
    User.findOne({'facebook.id': profile.id}, function(err, user) {
      if (err) return done(err)
      if (user){
        return done(null, user)
      } else {
        // if not, then create an account and session
        var newUser = new User()
        newUser.facebook.id = profile.id
        newUser.facebook.token = token
        newUser.facebook.name = profile.displayName
        newUser.facebook.email = profile.emails[0].value

        newUser.save(function(err){
          if (err) throw err
          return done(null, newUser)
        })
      }
    })
}))

module.exports = passport
