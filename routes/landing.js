const express = require('express')
const request = require('request')
const cookieParser = require("cookie-parser")
const uuidv4 = require("uuid/v4");
const querystring = require('querystring')
const router = express.Router()
const path = require('path')
const spotify = require('spotify-web-api-node')
const spotifyconfig = require("../config/spotify")
const data = require ("../data/index");
const users = data.users;
var client_id = spotifyconfig.client_id;
var client_secret = spotifyconfig.client_secret;
var redirect_uri = spotifyconfig.redirect_uri;
var spotifyAPI = spotifyconfig.spotifyApi;

var generateRandom = function(length) {
	var text = '';
	var characterBank = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	for(var i = 0; i < length; i++) {
		text += characterBank.charAt(Math.floor(Math.random() * characterBank.length));
	}
	return text;
}
var stateKey = 'spotify_auth_state'

router.get('/', async (req, res) => {
	res.render("home/home");
})

router.get("/login", async (req, res) => {
	state = generateRandom(16)
	res.cookie(stateKey, state);
	var scope = 'user-read-private user-read-email';
	res.redirect('https://accounts.spotify.com/authorize?' +
		querystring.stringify({
			response_type: 'code',
			client_id: client_id,
			scope: scope,
			redirect_uri: redirect_uri,
			state: state
		}));	
});

router.get('/callback', async (req, res) => {
		var code = req.query.code || null;
  		var state = req.query.state || null;
  		var storedState = req.cookies ? req.cookies[stateKey] : null;

	  if (state === null || state !== storedState) {
	  	console.log("NULL PATH")
	    res.redirect('/#' +
	      querystring.stringify({
	        error: 'state_mismatch'
	      }));
	  } else {
	  	console.log("GOOD PATH")
	    res.clearCookie(stateKey);
	    var authOptions = {
	      url: 'https://accounts.spotify.com/api/token',
	      form: {
	        code: code,
	        redirect_uri: redirect_uri,
	        grant_type: 'authorization_code'
	      },
	      headers: {
	        'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64'))
	      },
	      json: true

	    };
	    console.log("CONTINUING")
	    request.post(authOptions, async function(error, response, body) {
	      if (!error && response.statusCode === 200) {
	      	console.log("GOOD POST")
	        var access_token = body.access_token,
	            refresh_token = body.refresh_token,
	            display_name = body.display_name
					spotifyAPI.setAccessToken(access_token.toString());
	        var options = {
	          url: 'https://api.spotify.com/v1/me',
	          headers: { 'Authorization': 'Bearer ' + access_token },
	          json: true
	        };
					
	        request.get(options, async function(error, response, body) {
	        	console.log("NAME: " + body.display_name)
	        	console.log("RESPONSE: " + response[0]);
						console.log(body);
						// trying to store new user or update token if user exists
						// do so in db and in browser
						// TODO will have to improve schema for adding new guy
						var me;
						try{
							me = await users.getUserByEmail(body.email);
						}catch(e){
							me = null;
						}
						let meSess = new uuidv4();
						if(me === null){
							users.addUser({email: body.email, sessionId:  meSess});
						}else{
							users.updateAuthToken(body.email, meSess.toString());
						}
						res.cookie("sessionId", meSess.toString());
	          res.redirect('/private?' + 
	          querystring.stringify({
	            display_name: body.display_name,
	            email: body.email,
	            id: body.id
	          }));
	        });
	      } else {
	      	console.log("BAD POST")
	        res.redirect('/#' +
	          querystring.stringify({
	            error: 'invalid_token'
	          }));
	      }
	    });


	  }
});

router.get('/refresh_token', (req, res) => {
	var refresh_token = req.query.refresh_token;
  	var authOptions = {
	    url: 'https://accounts.spotify.com/api/token',
	    headers: { 'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64')) },
	    form: {
	      grant_type: 'refresh_token',
	      refresh_token: refresh_token
	    },
	    json: true
	  };

	  request.post(authOptions, function(error, response, body) {
	    if (!error && response.statusCode === 200) {
	      var access_token = body.access_token;
	      res.send({
	        'access_token': access_token
	      });
	    }
	  });
});

module.exports = router;