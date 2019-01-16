const spotifyconfig = require("../config/spotify")
// A script with functions for extracting specific data from Spotify queries

const spotifyAPI = spotifyconfig.spotifyApi;

let methods ={
    getSongItems (track_items) {
        // Returns an array containg the song title, artists, album, release date and Spotfy ID for the songs			
        var results = [];
        var artists;
        var result;
        
        track_items.forEach(track => {

            artists = [];

            // Extract array of artists
            track.album.artists.forEach(artist =>{
                artists.push(artist.name);
            });

            result = {
                title: track.name,
                artists: artists.join(", "),
                album: track.album.name,
                release_date: track.album.release_date,
                id: track.id                                //The Spotify ID
            }

            // Store in results object
            results.push(result); 
        });
    
        return results;
    },
    async getAudioData (song_list){
        // Returns a object keyed by Spotify ID containing Audio data
        console.log("getting Audio data:\n", song_list);
        
        // Define containers
        var meta_data = {};         // Will contain track meta data (title, artist, album)
        var audio_data;             // Will contain track audio data (temp, liveliness, duration, etc..)
        var result_data = {};       // Will contain both audio and meta

        // Index spotify_ids by the spotify id
        Object.keys(song_list).forEach(key => {
            meta_data[song_list[key][4]] = {
                title: song_list[key][0],
                artists: song_list[key][1],
                album: song_list[key][2]
            };
        })

        // Query spotify API for audio features
        audio_data = await spotifyAPI.getAudioFeaturesForTracks(Object.keys(meta_data));
        audio_data = audio_data.body.audio_features

        // Add meta and audio data under one result data object
        audio_data.forEach(obj => {
            result_data[obj.id] = {
                meta: meta_data[obj.id],
                audio: obj
            }
        });

        // return that ish
        return result_data;
    }
}

module.exports = methods;