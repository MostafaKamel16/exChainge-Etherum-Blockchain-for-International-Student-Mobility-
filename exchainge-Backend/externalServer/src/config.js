"use strict";

// Configuration variables
const port = process.env.PORT || "4004";
//const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/moviedb";
const mongoURI = process.env.MONGODB_URI || "mongodb+srv://seba-user:OlvShH0UWnjGIGLJ@seba-mobility-dev-1.asdjs.mongodb.net/dbOne?retryWrites=true&w=majority";
const JwtSecret = process.env.JWT_SECRET || "very secret secret";

module.exports = {
    port,
    mongoURI,
    JwtSecret,
};