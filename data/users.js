const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;

let methods = {
    async getUserByEmail(email) {
        let userCollection = await users();
        let user = await userCollection.findOne({email: email});
        if(user === null) throw "User not found";
        return user;
    },
    async addUser(userObject){
        let userCollection = await users();
        let userEmail = userObject.email;
        let exists = await userCollection.findOne({email: userEmail});
        console.log(exists);
        if(exists === null){
            userCollection.insertOne(userObject);
        }else{
            throw "User already exists";
        }
    },
    async updateAuthToken(email, token){
        let userCollection = await users();
        let res = userCollection.updateOne(
            {email: email},
            {$set: 
                {sessionId: token}
            },
            {}
        );
    },
    async getUserToken(email){
        let userCollection = await users();
        let user = userCollection.findOne({email:email});
        if(user === null) throw "User does nto exist";
        return user.sessionId;
    }
};

module.exports = methods;