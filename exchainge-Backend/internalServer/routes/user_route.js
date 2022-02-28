"use strict";

const express = require("express");
const router = express.Router();

const UserController = require("../controllers/user_controller");
// TODO - add checkAuthentication for authenticated routes as user shouldn't be able to access transcripts until
//  he isn't authorised

router.post(
    "/login",
    UserController.login,
); // Login a user, if user isn't found then returns 404
router.post(
    "/create",
    UserController.create
)

router.get(
    "/nonce/:publicAddress",
    UserController.readNonce); // Read a user nonce by address

router.get(
    "/:id",
    UserController.authenticate,UserController.read); // Read a user by Id

router.get('/signout/user',UserController.authenticate, UserController.signout);

module.exports = router;