"use strict";
const config = require("../src/config");
const UserModel = require("../models/user");
const { recoverPersonalSignature } = require('eth-sig-util');
const { bufferToHex } = require('ethereumjs-util');
const jwt = require("jsonwebtoken");
const expressJWT = require('express-jwt')

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
        const user = await UserModel.findOne({ 'metamask_address': req.body.metamask_address.toLowerCase() });


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
            UserModel.updateOne({ 'metamask_address': req.body.metamask_address.toLowerCase() }, newUser, function (err, res) {
                if (err) throw err;
                console.log("1 document updated");
            });
            return res.status(401).send({ token: null })
        }
        else {
            // jwt token will be used in future as want to allow fetching of data like transcripts only for logged-in user
            /*const token = jwt.sign(
                {_id: user._id, username: user.username, metamask_address: user.metamask_address},
                config.JwtSecret,
                {
                    expiresIn: 86400,
                }
            );*/

            //Generating and updating the new nonce
            let newUser = user;
            newUser.nonce = "" + randomNumber(1000, 9999);
            console.log(newUser)
            UserModel.updateOne({ 'metamask_address': req.body.metamask_address.toLowerCase() }, newUser, function (err, res) {
                if (err) throw err;
                console.log("1 document updated");
            });

            //Generating a signed token with uid and secret 
            const token = jwt.sign({ _id: user._id }, process.env.JWT_secret)
            res.cookie("t", { expire: new Date() + 9999 })
            const { _id, metamask_address, username } = user
            return res.json({ token, user: { _id, username, metamask_address } })
        }
    } catch (err) {
        return res.status(404).json({
            error: "User Not Found f2",
            message: err.message,
        });
    }

};

const create = async (req, res) => {
    console.log(req.body)
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

    if (!Object.prototype.hasOwnProperty.call(req.body, "nameServer_address"))
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


        req.body.metamask_address = req.body.metamask_address.toLowerCase()
        let user;
        const meta = await UserModel.findOne({ metamask_address: req.body.metamask_address }).exec()
        if (!meta)
            user = await UserModel.create(req.body);
        else {
            return res.status(400).json({
                error: "User exists",

            });
        }
        // if user is registered without errors

        //Generating a signed token with uid and secret 
        const token = jwt.sign({ _id: user._id }, process.env.JWT_secret)
        res.cookie("t", { expire: new Date() + 9999 })
        const { _id, metamask_address, username } = user
        return res.json({ token, user: { _id, username, metamask_address } })

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
        let user = await UserModel.findOne({ 'metamask_address': req.params.id }).exec();

        // if no user with id is found, return 404
        if (!user)
            return res.status(404).json({
                error: "Not Found",
                message: `User not found f1`,
            });

        //Generating a signed token with uid and secret 
        const token = jwt.sign({ _id: user._id }, process.env.JWT_secret)
        res.cookie("t", { expire: new Date() + 9999 })
        const { _id, metamask_address, username } = user
        return res.json({ token, user: { _id, username, metamask_address } })
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
        console.log(req.params.publicAddress)
        // get user with id from database
        let user = await UserModel.findOne({ 'metamask_address': req.params.publicAddress }).exec();

        // if no user with id is found, return 404
        if (!user)
            return res.status(404).json({
                error: "Not Found",
                message: `User not found f3`,
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

const signout = (req, res) => {
    res.clearCookie("t")
    res.json({ message: "Signed out!" })
}

const authorize = (req, res, next) => {
    let authorized = req.profile && req.profile._id.equals(req.auth._id);
    if (!authorized) return res.status(403).json({ error: 'Access denied' });
    next();
};

const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.auth = user;
            req.isAuthenticated = true;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

module.exports = {
    read,
    login,
    create,
    readNonce,
    signout,
    authorize,
    authenticate
}