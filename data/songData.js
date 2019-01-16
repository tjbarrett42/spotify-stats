const mongoCollections = require("../config/mongoCollections");
const mySongs = mongoCollections.song;

let methods = {

	async setSongBasic(json) {
		console.log(json);
		const s = await mySongs();
		let formatted = [];
		Object.keys(json).forEach(k => {
			formatted.push({
				title: json[k][0],
				artist: json[k][1],
				album: json[k][2],
				release_date: json[k][3],
				id: json[k][4]
			});
		});
		ins = formatted.reduce(function(result, item, index, array) {
  			
  			var _key = Object.keys(item)[0];
  			var _key1 = Object.keys(item)[1];
  			var _key2 = Object.keys(item)[2];
  			var _key3 = Object.keys(item)[3];
  			var _key4 = Object.keys(item)[4];

  			result[_key] = item[_key];
  			result[_key1] = item[_key1];
  			result[_key2] = item[_key2];
  			result[_key3] = item[_key3];
  			result[_key4] = item[_key4];

  			return result
		}, {});

		console.log(ins);

		await s.insertOne(ins);
		//return await this.getSong(formatted[4]);
	},

	async setSong(json) {
		const s = await mySongs();
		let formatted = [];
		Object.keys(json).forEach(k => {
			formatted.push({
				key: json[k][0],
				mode: json[k][1],
				time_signature: json[k][2],
				acousticness: json[k][3],
				danceability: json[k][4],
				energy: json[k][5],
				instrumentalness: json[k][6],
				liveness: json[k][7],
				loudness: json[k][8],
				speechiness: json[k][9],
				tempo: json[k][10],
				id: json[k][11],
				uri: json[k][12],
				track_href: json[k][13],
				analysis_url: json[k][14],
				type: json[k][15],
				artist: json[k][16],
				album: json[k][17],
				title: json[k][18],
				release_date: json[k][19]
			});
		});
		await s.insertOne(formatted);
		return await this.getSong(formatted[11]);
	},

	async getSong(id) {
		const s = await mySongs();
		return song = await s.findOne({id: id});
	},

	async getAllSongs() {
		const s = await mySongs();
		const all = await s.find({}).toArray();
		let formatted = [];
		for(let i = 0; i < all.length; i++) {
				formatted.push({duration_ms: all[i].duration_ms, 
								key: all[i].key,
								mode: all[i].mode,
								time_signature: all[i].time_signature,
								acousticness: all[i].acousticness,
								danceability: all[i].danceability,
								energy: all[i].energy,
								instrumentalness: all[i].instrumentalness,
								liveness: all[i].liveness,
								loudness: all[i].loudness,
								speechiness: all[i].speechiness,
								valence: all[i].valence,
								tempo: all[i].tempo,
								id: all[i].id,
								uri: all[i].uri,
								track_href: all[i].track_href,
								analysis_url: all[i].analysis_url,
								type: all[i].type,
								artist: all[i].artist,
								album: all[i].album,
								title: all[i].title,
								release_date: all[i].release_date,
								});
		}
		return formatted;
	}

};
module.exports = methods;

//db.song.insert({duration_ms: 1, key: 1, mode: 1, time_signature: 1, acousticness: 1.01, danceability: 1.01, enery: 1.01, instrumentalness: 1.01, liveness: 1.01, loudness: 1.01, speechiness: 1.01, valence: 1.01, tempo: 1.01, id: "myID", uri: "myURI", track_href: "myHREF", analysis_url: "myURL", type: "myType", artist: "myArtist", album: "myAlbum", title: "myTitle", release_date: "2018"})