"use strict";

const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user_controller")
const partnerUniversity = require("../controllers/partnerUniversity")


router.get(
    "/get",
    UserController.authenticate,partnerUniversity.getPartnerUnis
);

router.put(
    "/add",
    UserController.authenticate,partnerUniversity.updatePartnerUnis
);

router.get(
    "/getStats/:uni",
    UserController.authenticate,partnerUniversity.getPartnerStats
);

module.exports = router;