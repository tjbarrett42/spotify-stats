const express = require('express')
const data = require ("../data/index");
const song = require("../config/mongoCollections")
const spotifyconfig = require("../config/spotify")
const dExtract = require("../scripts/data-extraction")
const songData = data.songs;
const spotifyAPI = spotifyconfig.spotifyApi;
const Table = require("table-builder")


// const request = require('request')
// const querystring = require('querystring')
const router = express.Router()
// const path = require('path')

router.get("/", (req, res) => {
	const info = {
		display_name: req.query.display_name,
		email: req.query.email,
		id: req.query.id
	}
	res.render('landing/landing', {layout: false, display_name: info.display_name, email: info.email, id: info.id});
});

router.get("/song-list", async function(req, res) {
	console.log("get request to /song-list");

	var song_table;
	let songs = await songData.getAllSongs();

	const headers = {"title": "Title", "artist": "Artist(s)", "album": "Album", "release_date": "Release Date", "id": "Spotify ID"};
	song_table = (new Table({'id': 'song-list'})).setHeaders(headers).setData(songs).render();

	res.render('landing/song-list', {song_table: song_table});
});

router.post("/song-list", async function(req, res) {
	/* var to_add = [];
	var data = req.body;

	Object.keys(req.body).forEach(key => {
		to_add.push({
			title: data[key][0],
			artists: data[key][1],
			album: data[key][2],
			release_date: data[key][3],
			id: data[key][4]
		});
	});

	console.log(to_add); */

	let song = await songData.setSongBasic(req.body);

	console.log("SONGS");
	console.log(song);
	
	res.redirect('/private/song-list');
});

router.post('/song-analysis', async function(req, res) {

	console.log("SONG ANALYSIS");

	// var song_list = req.body;
	// var data = dExtract.getAudioData(song_list);

	let f = [];
	Object.keys(req.body).forEach(k => {
		f.push({
		title: req.body[k][0],
		artist: req.body[k][1],
		album: req.body[k][2],
		release_date: req.body[k][3],
		id: req.body[k][4],
		});
	});

	console.log(f);
	var t1 = f[0].title;
	var ar1 = f[0].artist;
	var al1 = f[0].album;
	var rd1 = f[0].release_date;	
	var ID1 = f[0].id;
	var t2 = f[1].title;
	var ar2 = f[1].artist;
	var al2 = f[1].album;
	var rd2 = f[1].release_date;	
	var ID2 = f[1].id;

	var track1, track2;

	analysis = await spotifyAPI.getAudioFeaturesForTrack(ID1).then(
  		function(data) {

			console.log("DATA.BODY")
			console.log(data.body);
			track1 = data.body;
			return "good";
  		}, function(err) {
    		console.error(err);
	});
	
	analysis1 = await spotifyAPI.getAudioFeaturesForTrack(ID2).then(
  		function(data) {

			console.log("DATA.BODY")
			console.log(data.body);
			track2 = data.body
			return "good2";
  		}, function(err) {
    		console.error(err);
	});

	var t1 = f[0].title;
	var ar1 = f[0].artist;
	var al1 = f[0].album;
	var rd1 = f[0].release_date;	
	var ID1 = f[0].id;
	var t2 = f[1].title;
	var ar2 = f[1].artist;
	var al2 = f[1].album;
	var rd2 = f[1].release_date;	
	var ID2 = f[1].id;

	const boring1 = (track1.loudness + track1.tempo + (track1.energy*100) + (track1.danceability*100)); 
	const boring2 = (track2.loudness + track2.tempo + (track2.energy*100) + (track2.danceability*100));
	// console.log(boring2)
	// console.log(boring1)

	console.log("\n\n\n")
	console.log("Title           :\t"+ t1+"\t"+ t2)
	console.log("Artist          :\t"+ ar1+"\t"+ ar2)
	console.log("Album           :\t"+ al1+"\t"+ al2)
	console.log("Release         :\t"+ rd1+"\t"+ rd2)
	console.log("Danceability    :\t"+track1.danceability+"\t"+track2.danceability)
	console.log("Energy          :\t"+track1.energy+"\t"+track2.energy)
	console.log("Loudness        :\t"+track1.loudness+"\t"+track2.loudness)
	console.log("Speechiness     :\t"+track1.speechiness+"\t"+track2.speechiness)
	console.log("Acousticness    :\t"+track1.acousticness+"\t"+track2.acousticness)
	console.log("Instrumentalness:\t"+track1.instrumentalness+"\t"+track2.instrumentalness)
	console.log("Liveness        :\t"+track1.liveness+"\t"+track2.liveness)
	console.log("Valence         :\t"+track1.valence+"\t"+track2.valence)
	console.log("Tempo           :\t"+track1.tempo+"\t"+track2.tempo)
	console.log("Tempo           :\t"+track1.tempo+"\t"+track2.tempo)
	console.log("Key             :\t"+track1.key+"\t"+track2.key)
	console.log("Boringness      :\t"+boring1+"\t"+boring2)
	console.log("Lower means more boring");
	
	
	res.render('landing/song-analysis', {
										title1: t1, title2: t2, 
										artist1: ar1, artist2: ar2,
										album1: al1, album2: al2,
										release_date1: rd1, release_date2: rd2,
										danceability1: track1.danceability, danceability2: track2.danceability,
										energy1: track1.energy, energy2: track2.energy,
										loudness1: track1.loudness, loudness2: track2.loudness,
										speechiness1: track1.speechiness, speechiness2: track2.speechiness,
										acousticness1: track1.acousticness, acousticness2: track2.acousticness,
										instrumentalness1: track1.instrumentalness, instrumentalness2: track2.instrumentalness,
										liveness1: track1.liveness, liveness2: track2.liveness,
										valence1: track1.valence, valence2: track2.valence,
										tempo1: track1.tempo, tempo2: track2.tempo,
										boringness1: boring1, boringness2: boring2
										});
	
	// res.redirect('/search ')
});





module.exports = router;