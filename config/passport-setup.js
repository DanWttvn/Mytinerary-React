const passport = require("passport");

const GoogleStrategy = require("passport-google-oauth20");
const FacebookStrategy = require("passport-facebook");
const jwt = require("jsonwebtoken");

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const mongoose = require("mongoose")
const keys = require("./keys")
const userModel = require("../models/userModel")

// --------------- GOOGLE --------------- //
module.exports = passport.use(
	new GoogleStrategy({
		callbackURL: "/api/auth/google/redirect", // where I redirect after the auth (also set in the google credentials)
		clientID: keys.google.clientID,
		clientSecret: keys.google.clientSecret
		}, (accessToken, refreshToken, profile, done) => {
		//passport callback function. fired after the first auth page and comes with a code
		console.log("en google");
		// check if user already exists
		userModel.findOne({ googleID: profile.id })
			.then((currentUser) => {
				if (currentUser) {
					console.log("already exists. user is:", currentUser);
					done(null, currentUser);
				} else {					
					console.log("this user doesnt exist yet");
					// create new user in OUR db  with googles data
					new userModel({
						username: profile.displayName,
						googleID: profile.id,
						avatar: profile.photos[0].value,
						favorites: []
					}).save()
						.then((newUser) => {
							console.log("new user:" + newUser);
							done(null, newUser);
						});
				}
			})	
}));	

// ---------- FACEBOOK --------------- //
// https://developers.facebook.com/apps/2529892880664148/settings/basic/
module.exports = passport.use(
	new FacebookStrategy({
		callbackURL: "/api/auth/facebook/redirect", // where I redirect after the auth (also set in the google credentials)
		clientID: keys.facebook.clientID,
		clientSecret: keys.facebook.clientSecret
		}, (accessToken, refreshToken, profile, done) => {
		//passport callback function. fired after the first auth page and comes with a code
		console.log("cb fb fired");
		// check if user already exists
		userModel.findOne({ facebookID: profile.id })
			.then((currentUser) => {
				if (currentUser) {
					console.log("already exists. user is:", currentUser);
					done(null, currentUser);
				} else {
					console.log("user does not exist YET");
							
					// create new user in OUR db  with fb data
					new userModel({
						username: profile.displayName,
						facebookID: profile.id,
						avatar: "",
						favorites: []
					})
					.save()
						.then((newUser) => {
							console.log("new user:" + newUser);
							done(null, newUser);
						});
				}
			})	
}));	


// --------------- JWT --------------- //
// new JwtStrategy(options, verify). opts to control how the token is  extracted from the request or verified. verify is a function
let opts = {}; 
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken(); // aqui extrae el token del header
opts.secretOrKey = keys.secretOrKey;

module.exports = passport.use(
	new JwtStrategy(opts, (jwt_payload, done) => {
		//* estaba como user.id y por eso no funcionaba. mi payload solo tiene el hijo id
		userModel.findById(jwt_payload.id) // check if decoded token matches a user. payload el que he puesto al guardar el obj
			.then(user => {
				// Token matches
				if (user) { 
					return done(null, user)
				}
				// Token doesn't match
				else {
					return done(null, false)
				}
			}).catch(err => console.log(err));
	})
); // estoy exportando el user. ahora en auth.js en la llamada puedo usar user porque lo imporo y comparo al poner  passport.authenticate("jwt"... 
