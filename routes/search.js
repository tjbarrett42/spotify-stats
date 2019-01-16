const express = require('express')
// const request = require('request')
// const querystring = require('querystring')
const router = express.Router()
// const path = require('path')
const spotifyconfig = require("../config/spotify")
const dExtract = require("../scripts/data-extraction")
const Table = require("table-builder")

const spotifyAPI = spotifyconfig.spotifyApi;

router.post("/song", async function(req, res) {
	const headers = {"title": "Title", "artists": "Artist(s)", "album": "Album", "release_date": "Release Date", "id": "Spotify ID"};
	var track = req.body.songtitle;
	var artist = req.body.artist;
	var q = "";
	var search_results, results_table;
	console.log("SONG: " + track);

	let results = [];
	//

	if (track.trim() !== ""){
		q = q + `track:${track}`;
	}

	if (artist.trim() !== ""){
		q = q + `artist:${artist}`;
	}

	search_results = await spotifyAPI.searchTracks(q).then(
  		function(data) {

			let track_num = 1;

			results = dExtract.getSongItems(data.body.tracks.items);

			results.forEach(elem => {
				console.log(`[Track: ${track_num++}]:\tTitle: ${elem.title}\tArtist: ${elem.artists}\tAlbum: ${elem.album}\tRelease Date: ${elem.release_date}\tSpotify ID: ${elem.id}`);
			});

			return results;

  		}, function(err) {
    		console.error(err);
	});

	results_table = (new Table({'id': 'search-results'})).setHeaders(headers).setData(search_results).render();


	res.render('landing/search-results', {results_table: results_table});
}),

router.post("/playlist", async function(req, res) {
	const headers = {"title": "Title", "user":"Playlist Creator"};
	var title = req.body.playlistTitle;
	var user = req.body.user;
	var q = "";
	var search_results, results_table;
	console.log("PLAYLIST: " + title);

	let results = [];
	//

	if (title.trim() !== ""){
		q = q + `title:${title}`;
	}

	if (user.trim() !== ""){
		q = q + `user:${user}`;
	}

	search_results = await spotifyAPI.searchPlaylists(q).then(
  		function(data) {

			//console.log(data.body);

			results=data.body;
			

			return results;

  		}, function(err) {
    		console.error(err);
	});
	console.log(search_results)

	results_table = (new Table({'id': 'search-results'})).setHeaders(headers).setData(search_results).render();


	res.render('landing/search-results', {results_table: results_table});
});

module.exports = router;