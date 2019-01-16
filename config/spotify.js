const spotify = require('spotify-web-api-node')
const client_id = 'fc2d4d66be6f487da418752d7a405c24';
const client_secret = '2a99d8ce90ef46c18ff31c0010908c41';
const redirect_uri = 'http://localhost:3000/callback';

module.exports.client_id = client_id;
module.exports.client_secret = client_secret;
module.exports.redirect_uri = redirect_uri;

module.exports.spotifyApi = new spotify({
	clientId: "'" + client_id + "'",
	clientSecret: "'" + client_secret + "'",
	redirectUri: "'" + redirect_uri + "'"
});