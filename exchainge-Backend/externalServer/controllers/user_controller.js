"use strict";
const config = require("../src/config");
const UserModel = require("../models/user");
const {recoverPersonalSignature} = require('eth-sig-util');
const {bufferToHex} = require('ethereumjs-util');
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
    // check if the body of the request contains all necessary properties
    if (!Object.prototype.hasOwnProperty.call(req.body, "metamask_address"))
        return res.status(400).json({
            error: "Bad Request",
            message: "The request body must contain a metamask_address property!",
        });

    if (!Object.prototype.hasOwnProperty.call(req.body, "sign"))
        return res.status(400).json({
            error: "Bad Request",
            message: "The request body must contain a signed message from metamask!",
        });

    // handle the request
    try {
        // get the user from the database
        const user = await UserModel.findOne({'metamask_address':req.body.metamask_address.toLowerCase()});

        
        // check if the address is linked to this user
        const msg = `I am snonceigning my one-time nonce: ${user.nonce}`;

            // We now are in possession of msg, publicAddress and signature. 

            const msgBufferHex = bufferToHex(Buffer.from(msg, 'utf8'));
			const address = recoverPersonalSignature({
					data: msgBufferHex,
					sig: req.body.sign,
				});

        const isAddressLinkedToThisUser = address.toLowerCase() === user.metamask_address.toLowerCase();

        if (!isAddressLinkedToThisUser) {
            //Generating and updating the new nonce
            let newUser = user;
            newUser.nonce = "" + randomNumber(1000, 9999);
            UserModel.updateOne({'metamask_address':req.body.metamask_address.toLowerCase()}, newUser, function(err, res) {
                if (err) throw err;
                console.log("1 document updated");
              });
            return res.status(401).send({token: null})
        };
        
        // jwt token will be used in future as want to allow fetching of data like transcripts only for logged-in user
        const token = jwt.sign(
            {_id: user._id, username: user.username, metamask_address: user.metamask_address, nonce: user.nonce},
            config.JwtSecret,
            {
                expiresIn: 86400,
            }
        );

        //Generating and updating the new nonce
        let newUser = user;
        newUser.nonce = "" + randomNumber(1000, 9999);
        console.log(newUser)
        UserModel.updateOne({'metamask_address':req.body.metamask_address.toLowerCase()}, newUser, function(err, res) {
            if (err) throw err;
            console.log("1 document updated");
            });

        return res.status(200).json({
            token: token,
            username: user.username,
            _id: user._id,
            metamask_address: user.metamask_address
        });
    } catch (err) {
        return res.status(404).json({
            error: "User Not Found",
            message: err.message,
        });
    }

};

const create = async (req, res) => {
    if (!Object.prototype.hasOwnProperty.call(req.body, "metamask_address"))
        return res.status(400).json({
            error: "Bad Request",
            message: "The request body must contain a metamask_address property",
        });

    if (!Object.prototype.hasOwnProperty.call(req.body, "username"))
        return res.status(400).json({
            error: "Bad Request",
            message: "The request body must contain a username property",
        });

    // handle the request
    try {
        // if the body doesn't have nonce or it's null then create a nonce.
        if (!req.body.hasOwnProperty("nonce") || req.body.nonce === null) {
            req.body.nonce = "" + randomNumber(1000, 9999); // gets random number between 1 and 10000 (excluded)
        }
        // create the user in the database
        /*data = {
            "username": req.body.username,
            "metamask_address":  new ObjectIDreq.body.metamask_address
        }*/
        req.body.metamask_address=req.body.metamask_address.toLowerCase()
        let user = await UserModel.create(req.body);

        // if user is registered without errors
        // create a token
        const token = jwt.sign(
            {_id: user._id, username: user.username, metamask_address: user.metamask_address, nonce: user.nonce},
            config.JwtSecret,
            {
                expiresIn: 86400,
            }
        );

        // user created, return generated token
        res.status(201).json({
            token: token,
            username: user.username,
            metamask_address: user.metamask_address,
            nonce: user.nonce
        });
    } catch (err) {
        if (err.code == 11000) {
            return res.status(400).json({
                error: "User exists",
                message: err.message,
            });
        } else {
            return res.status(500).json({
                error: "Internal server error",
                message: err.message,
            });
        }
    }
};

const read = async (req, res) => {
    try {
        // get user with id from database
        let user = await UserModel.findById(req.params.id).exec();

        // if no user with id is found, return 404
        if (!user)
            return res.status(404).json({
                error: "Not Found",
                message: `User not found`,
            });

        // return gotten user
        return res.status(200).json(user);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal Server Error",
            message: err.message,
        });
    }
};

const readNonce = async (req, res) => {
    try {
        // get user with id from database
        let user = await UserModel.findOne({'metamask_address': req.params.publicAddress});

        // if no user with id is found, return 404
        if (!user)
            return res.status(404).json({
                error: "Not Found",
                message: `User not found`,
            });

        // return gotten user
        return res.status(200).json(user.nonce);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal Server Error",
            message: err.message,
        });
    }
};

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
const getAllUsers = async (req, res) => {
    try {
        let user = await UserModel.findId("619e4acf6c9cd89c99017c92").exec();
        if (!user)
            return res.status(404).json({
                error: "Not Found",
                message: `User not found`,
            });
        return res.status(200).json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        error: "Internal server error",
        message: err.message,
      });
    }
  };

module.exports = {
    read,
    login,
    create,
    readNonce,
    getAllUsers
}