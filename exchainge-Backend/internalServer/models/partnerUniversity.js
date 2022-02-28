const mongoose = require('mongoose');
const recieved = require('./recievedTranscript');
const sent = require('./internalTranscripts');

const partnerUniversitySchema = new mongoose.Schema(
    {
        partner_university: {
            type: String,
            trim:true,
            required:true,
            unique:true
        },
        server_address: {
            type: String,
            trim:true,
            required:true,
            unique:true
        }
    },{collection: 'partnerUniversity'}
);
module.exports = mongoose.model("partnerUniversity", partnerUniversitySchema);