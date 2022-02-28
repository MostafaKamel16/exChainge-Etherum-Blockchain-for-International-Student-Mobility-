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
            unique: true
        },
        // metamask address of the university account
        metamask_address: {
            type: String,
            required: true,
            unique: true
        },
        // metamask address of the university account
        nameServer_address: {
            type: String,
            required: true,
        },
        // nonce
        nonce: {
            type: String,
            required: true,
        }
    },
    {collection: 'user'});
module.exports = mongoose.model("user", UserSchema);