const dbConnection = require("../config/mongoConnection");
const data = require("../data");
const users = data.users;

// TODO i should probably add in some relevant song data for this user

const main = async () => {
  const db = await dbConnection();
  // await db.dropDatabase();
  // idk if the drop db is useful or annoying on here
  
  const firstUser = {
    email: "example@gmail.com",
    sessionId:"",
    playlist: [
      {
        title:"song title one",
        artist:"song artist",
        album:"song album",
        release:"the release date",
        spotifySongId: "song id from spotify"
      },
      {
        title:"song title two",
        artist:"song artist",
        album:"song album",
        release:"the release date",
        spotifySongId: "song id from spotify"
      }
    ]
  };

  let ins = await users.addUser(firstUser);
  //console.log(ins);
  return;
};

main().catch(console.log);