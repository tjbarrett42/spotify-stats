# Music App

* Ryan Little
* Jake Fallin
* Matt Sirota
* Tim Barrett
* John Craig Borman

## Users

The user collection will store all users and their profiles. Users will be able to login, update their profile, connect to spotify, and load their playlists.

```
{
    "_id":"7b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310",
    "sessionId":"b3988882-627f-4c59-8d5d-54b7a43b030e",
    "hashedPassword":"$2a$08$XdvNkfdNIL8Fq7l8xsuIUeSbNOFgK0M0iV5HOskfVn7.PWncShU.O",
    "profile":{
        "name":"Example",
        "spotifyKey": "aadDHFLSAHDLFJHSDLFJSLDFJSD",
        "_id":"7b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310"
    },
    "playlists" : [
        "aadDHFLSAHDLFJHSDLFJSLDFJSD",
        "aadDHFLSAHDLFJHSDLFJSLDFJSD"
    ]
}
```

| Name | Type | Description |
|------|------|-------------|
| _id  | string | A globally unique identifier to represent the user |
| sessionId   | string | A globally unique identifier to represent the user's current session |
| hashedPassword | string | A bcrypted string that is a hashed version of the user's password |
| profile | User Profile | The user's profile | 
| playlists | string | A list of playlist ids that belong to this user

## User Profile (subdocument; not stored in a collection)

This subdocument is used to describe the user's profile.

```
{
    "name":"Francis Underwood",
    "spotifyKey":"API key to use spotify for searching songs and creatinga playlist",
    "_id":"c5d0fd67-7977-4fc5-9088-33d0347c932b"
}
```

| Name | Type | Description |
|------|------|-------------|
| name  | string | The user's name. | 
| spotifyKey | API key to use spotify for searching songs and creatinga playlist |
| _id  | string | A globally unique identifier to represent the user |

## Playlists

The playlists collection will store all information about playlists. Playlist id's will be stored in an array in the user's profile info

```
{
    "_id": "aadDHFLSAHDLFJHSDLFJSLDFJSD",
    "title": "Example title",
    "songs": [
        "song one",
        "song two"
    ]
}
```

| Name | Type | Description|
|------|------|------------|
| _id | string | the id of the playlist, stored in an array of the user's profile to keep track of who owns each playlist |
| title | string | The title of the playlist |
| songs | list | A list of songs in the playlist |


## Song

The song collection will store information about an individual song. Each one will be part of an array that is stored in the songs section of a playlist or independently.

```
{
  "duration_ms" : 255349,
  "key" : 5,
  "mode" : 0,
  "time_signature" : 4,
  "acousticness" : 0.514,
  "danceability" : 0.735,
  "energy" : 0.578,
  "instrumentalness" : 0.0902,
  "liveness" : 0.159,
  "loudness" : -11.840,
  "speechiness" : 0.0461,
  "valence" : 0.624,
  "tempo" : 98.002,
  "id" : "06AKEBrKUckW0KREUWRnvT",
  "uri" : "spotify:track:06AKEBrKUckW0KREUWRnvT",
  "track_href" : "https://api.spotify.com/v1/tracks/06AKEBrKUckW0KREUWRnvT",
  "analysis_url" : "https://api.spotify.com/v1/audio-analysis/06AKEBrKUckW0KREUWRnvT",
  "type" : "audio_features"
}
```

| Name | Type | Description|
|------|------|------------|
 duration_ms | int | The duration of the track in milliseconds. |
| key | int | The estimated overall key of the track. Integers map to pitches using standard Pitch Class notation. |
| mode | int | Mode indicates the modality (major or minor) of a track, the type of scale from which its melodic content is derived. Major is represented by 1 and minor is 0. |
| time_signature | int | An estimated overall time signature of a track. The time signature (meter) is a notational convention to specify how many beats are in each bar (or measure). |
| acousticness | float | A confidence measure from 0.0 to 1.0 of whether the track is acoustic. 1.0 represents high confidence the track is acoustic.  |
| danceability | float | Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A value of 0.0 is least danceable and 1.0 is most danceable. |
| energy | float | Energy is a measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy. Perceptual features contributing to this attribute include dynamic range, perceived loudness, timbre, onset rate, and general entropy. |
| instrumentalness | float | Predicts whether a track contains no vocals. “Ooh” and “aah” sounds are treated as instrumental in this context. Rap or spoken word tracks are clearly “vocal”. The closer the instrumentalness value is to 1.0, the greater likelihood the track contains no vocal content. Values above 0.5 are intended to represent instrumental tracks, but confidence is higher as the value approaches 1.0. | 
| liveness | float | Detects the presence of an audience in the recording. Higher liveness values represent an increased probability that the track was performed live.  |
| loudness | float | The overall loudness of a track in decibels (dB). |
| speechiness | float | Speechiness detects the presence of spoken words in a track.  |
| valence | float | A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track.  |
| tempo | float | The overall estimated tempo of a track in beats per minute (BPM). |
| id | string | The Spotify ID for the track. |
| uri | string | The Spotify URI for the track. |
| track_href | string | A link to the Web API endpoint providing full details of the track. |
| analysis_url | string | An HTTP URL to access the full audio analysis of this track. An access token is required to access this data. |
| type | string | The object type. |

## Artist

The artist collection will store data on individual artists and the general properties

```
{
  "external_urls" : {
    "spotify" : "https://open.spotify.com/artist/0OdUWJ0sBjDrqHygGUXeCF"
  },
  "followers" : {
    "href" : null,
    "total" : 306565
  },
  "genres" : [ "indie folk", "indie pop" ],
  "href" : "https://api.spotify.com/v1/artists/0OdUWJ0sBjDrqHygGUXeCF",
  "id" : "0OdUWJ0sBjDrqHygGUXeCF",
  "images" : [ {
    "height" : 816,
    "url" : "https://i.scdn.co/image/eb266625dab075341e8c4378a177a27370f91903",
    "width" : 1000
  }, {
    "height" : 522,
    "url" : "https://i.scdn.co/image/2f91c3cace3c5a6a48f3d0e2fd21364d4911b332",
    "width" : 640
  }, {
    "height" : 163,
    "url" : "https://i.scdn.co/image/2efc93d7ee88435116093274980f04ebceb7b527",
    "width" : 200
  }, {
    "height" : 52,
    "url" : "https://i.scdn.co/image/4f25297750dfa4051195c36809a9049f6b841a23",
    "width" : 64
  } ],
  "name" : "Band of Horses",
  "popularity" : 59,
  "type" : "artist",
  "uri" : "spotify:artist:0OdUWJ0sBjDrqHygGUXeCF"
}
```

| Name | Type | Description|
|------|------|------------|
| external_urls | an external URL object | Known external URLs for this artist.|
| followers | A followers object | Information about the followers of the artist.|
| genres | array of strings | A list of the genres the artist is associated with. For example: "Prog Rock" , "Post-Grunge". (If not yet classified, the array is empty.)|
| href | string | A link to the Web API endpoint providing full details of the artist.|
| id | string | The Spotify ID for the artist.|
| images | array of image objects | Images of the artist in various sizes, widest first.|
| name | string | The name of the artist|
| popularity | int | The popularity of the artist. The value will be between 0 and 100, with 100 being the most popular. The artist’s popularity is calculated from the popularity of all the artist’s tracks.|
| type | string | The object type: "artist"|
| uri | string | The Spotify URI for the artist.|


## Album

The album collection will store information about released collections of songs by artists.

```
{
  "href": "https://api.spotify.com/v1/artists/1vCWHaC5f2uS3yhpwWbIA6/albums?offset=0&limit=2&include_groups=appears_on&market=ES",
  "items": [
    {
      "album_group": "appears_on",
      "album_type": "album",
      "artists": [
        {
          "external_urls": {
            "spotify": "https://open.spotify.com/artist/0LyfQWJT6nXafLPZqxe9Of"
          },
          "href": "https://api.spotify.com/v1/artists/0LyfQWJT6nXafLPZqxe9Of",
          "id": "0LyfQWJT6nXafLPZqxe9Of",
          "name": "Various Artists",
          "type": "artist",
          "uri": "spotify:artist:0LyfQWJT6nXafLPZqxe9Of"
        }
      ],
      "available_markets": ["AD", "AR", "AT", "AU", "BE", "BG", "BO", "BR", "CH", "CL", "CO", "CR", "CY", "CZ", "DE", "DK", "DO", "EC", "EE", "ES", "FI", "FR", "GB", "GR", "GT", "HK", "HN", "HU", "ID", "IE", "IL", "IS", "IT", "JP", "LI", "LT", "LU", "LV", "MC", "MT", "MY", "NI", "NL", "NO", "NZ", "PA", "PE", "PH", "PL", "PT", "PY", "RO", "SE", "SG", "SK", "SV", "TH", "TR", "TW", "UY", "VN", "ZA"],
      "external_urls": {
        "spotify": "https://open.spotify.com/album/43977e0YlJeMXG77uCCSMX"
      },
      "href": "https://api.spotify.com/v1/albums/43977e0YlJeMXG77uCCSMX",
      "id": "43977e0YlJeMXG77uCCSMX",
      "images": [
        {
          "height": 640,
          "url": "https://i.scdn.co/image/0da79956d0440a55b20ea4e8e38877bce43275cd",
          "width": 640
        },
        {
          "height": 300,
          "url": "https://i.scdn.co/image/29368267cc6b1eab2600e6e42485d3774621e7d4",
          "width": 300
        },
        {
          "height": 64,
          "url": "https://i.scdn.co/image/779dd6d6a0e124e03a5143d2be729ee4bab3f15f",
          "width": 64
        }
      ],
      "name": "Shut Up Lets Dance (Vol. II)",
      "release_date": "2018-02-09",
      "release_date_precision": "day",
      "type": "album",
      "uri": "spotify:album:43977e0YlJeMXG77uCCSMX"
    },
    {
      "album_group": "appears_on",
      "album_type": "compilation",
      "artists": [
        {
          "external_urls": {
            "spotify": "https://open.spotify.com/artist/0LyfQWJT6nXafLPZqxe9Of"
          },
          "href": "https://api.spotify.com/v1/artists/0LyfQWJT6nXafLPZqxe9Of",
          "id": "0LyfQWJT6nXafLPZqxe9Of",
          "name": "Various Artists",
          "type": "artist",
          "uri": "spotify:artist:0LyfQWJT6nXafLPZqxe9Of"
        }
      ],
      "available_markets": ["AD", "AR", "AT", "AU", "BE", "BG", "BO", "BR", "CA", "CH", "CL", "CO", "CR", "CY", "CZ", "DE", "DK", "DO", "EC", "EE", "ES", "FI", "FR", "GB", "GR", "GT", "HK", "HN", "HU", "ID", "IE", "IL", "IS", "IT", "JP", "LI", "LT", "LU", "LV", "MC", "MT", "MX", "MY", "NI", "NL", "NO", "NZ", "PA", "PE", "PH", "PL", "PT", "PY", "RO", "SE", "SG", "SK", "SV", "TH", "TR", "TW", "US", "UY", "VN", "ZA"],
      "external_urls": {
        "spotify": "https://open.spotify.com/album/189ngoT3WxR5mZSYkAGOLF"
      },
      "href": "https://api.spotify.com/v1/albums/189ngoT3WxR5mZSYkAGOLF",
      "id": "189ngoT3WxR5mZSYkAGOLF",
      "images": [
        {
          "height": 600,
          "url": "https://i.scdn.co/image/42f4dbe7e54d52efa14f058fab74d8a0505ef26d",
          "width": 600
        },
        {
          "height": 300,
          "url": "https://i.scdn.co/image/b221fb6d689f84f8e09b493776520194a6f4ef88",
          "width": 300
        },
        {
          "height": 64,
          "url": "https://i.scdn.co/image/0fc4a3cb2ee5b14fdefeb8f20afd84b7fbae7707",
          "width": 64
        }
      ],
      "name": "Classic Club Monsters (25 Floor Killers)",
      "release_date": "2018-02-02",
      "release_date_precision": "day",
      "type": "album",
      "uri": "spotify:album:189ngoT3WxR5mZSYkAGOLF"
    }
  ],
  "limit": 2,
  "next": "https://api.spotify.com/v1/artists/1vCWHaC5f2uS3yhpwWbIA6/albums?offset=2&limit=2&include_groups=appears_on&market=ES",
  "offset": 0,
  "previous": null,
  "total": 308
}
```

| Name | Type | Description|
|------|------|------------|
| album_group |  string, optional |  The field is present when getting an artist’s albums. Possible values are “album”, “single”, “compilation”, “appears_on”. Compare to album_type this field represents relationship between the artist and the album.|
| album_type |  string |  The type of the album: one of “album”, “single”, or “compilation”.|
| artists |  array of simplified artist objects |  The artists of the album. Each artist object includes a link in href to more detailed information about the artist.|
| available_markets |  array of strings |  The markets in which the album is available: ISO 3166-1 alpha-2 country codes. Note that an album is considered available in a market when at least 1 of its tracks is available in that market.|
| external_urls |  an external URL object |  Known external URLs for this album.|
| href |  string |  A link to the Web API endpoint providing full details of the album.|
| id |  string |  The Spotify ID for the album.|
| images |  array of image objects |  The cover art for the album in various sizes, widest first.|
| name |  string |  The name of the album. In case of an album takedown, the value may be an empty string.|
| type |  string |  The object type: “album”|
| uri |  string |  The Spotify URI for the album.|