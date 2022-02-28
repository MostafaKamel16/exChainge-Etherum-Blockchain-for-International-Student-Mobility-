"use strict";

const express = require("express");
const router = express.Router();

const TranscriptController = require("../controllers/transcript_controller");
// TODO Mehul - add checkAuthentication for authenticated routes as user shouldn't be able to access transcripts until
//  he isn't authorised

router.post(
    "/create",
    TranscriptController.create);
router.get(
    "/:id",
    TranscriptController.readById); // Read a transcript by id
router.get(
    "/sending_university/:username",
    TranscriptController.readAllSentTranscripts); // Fetch all transcripts by sending university username
router.get(
    "/receiving_university/:username",
    TranscriptController.readAllReceivedTranscripts); // Fetch all transcripts by receiving university username

module.exports = router;