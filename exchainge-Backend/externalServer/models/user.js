"use strict";

const mongoose = require("mongoose");

/***
 *
 * @type {mongoose.Schema}
 * username - String
 * metamask_address - String
 * nonce - String
 */
const UserSchema = new mongoose.Schema({

        // username of the university account
        username: {
            type: String,
            required: true,
            unique: true,
            index: true
        },
        // metamask address of the university account
        metamask_address: {
            type: String,
            required: true,
            unique: true
        },
        // nonce
        nonce: {
            type: String,
            required: true,
        }
    },
    {collection: 'userUni2'});
module.exports = mongoose.model("userUni2", UserSchema);