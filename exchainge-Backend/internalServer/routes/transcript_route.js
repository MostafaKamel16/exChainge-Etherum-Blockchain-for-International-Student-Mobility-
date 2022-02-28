"use strict";

const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user_controller")
const InternalTranscript = require("../controllers/internal_transcript_controller")
const TranscriptController = require("../controllers/transcript_controller");


router.post(
    "/create",
    UserController.authenticate,TranscriptController.create);
router.get(
    "/:id",
    InternalTranscript.readById ,UserController.authenticate); // Read a transcript by id
router.get(
    "/sending_university/:username",
    UserController.authenticate,TranscriptController.readAllSentTranscripts); // Fetch all transcripts by sending university username
router.get(
    "/receiving_university/:username",
    UserController.authenticate,TranscriptController.readAllReceivedTranscripts); // Fetch all transcripts by receiving university username

router.get(
"/verify/list",
UserController.authenticate,TranscriptController.readAllTranscriptsForVerificationPage); // Fetch all transcripts that have been recieved
    
router.get(
    "/internalTranscripts/List",
    UserController.authenticate,UserController.authenticate, InternalTranscript.readInternalTranscripts);

router.post(
    "/internalTranscripts",
    UserController.authenticate,InternalTranscript.addTranscript);

router.patch(
    "/setUploaded",
    UserController.authenticate,TranscriptController.setUploaded);

module.exports = router;