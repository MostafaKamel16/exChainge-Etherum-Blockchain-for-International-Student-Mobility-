"use strict";
const config = require("../src/config");
const TranscriptModel = require("../models/transcript");
const UserModel = require("../models/user");
const jwt = require("jsonwebtoken");

const create = async (req, res) => {
    if (!Object.prototype.hasOwnProperty.call(req.body, "sending_university_username"))
        return res.status(400).json({
            error: "Bad Request",
            message: "The request body must contain a sending_university_username",
        });
    let sending_university = await UserModel.find({username: req.body.sending_university_username}).exec();

    // if no sending unversity with username is found, return 404
    if (!sending_university)
        return res.status(404).json({
            error: "Sending University not registered",
            message: `Sending University not registered`,
        });

    let receiving_university = await UserModel.find({username: req.body.receiving_university_username}).exec();

    // if no receiving unversity with username is found, return 404
    if (!receiving_university)
        return res.status(404).json({
            error: "Receiving University not registered",
            message: `Receiving University not registered`,
        });

    if (!Object.prototype.hasOwnProperty.call(req.body, "receiving_university_username"))
        return res.status(400).json({
            error: "Bad Request",
            message: "The request body must contain a receiving_university_username",
        });
    if (!Object.prototype.hasOwnProperty.call(req.body, "semester"))
        return res.status(400).json({
            error: "Bad Request",
            message: "The request body must contain a semester property",
        });

    if (!Object.prototype.hasOwnProperty.call(req.body, "student_id"))
        return res.status(400).json({
            error: "Bad Request",
            message: "The request body must contain a student_id property",
        });

    if (!Object.prototype.hasOwnProperty.call(req.body, "university"))
        return res.status(400).json({
            error: "Bad Request",
            message: "The request body must contain a university property",
        });

    if (!Object.prototype.hasOwnProperty.call(req.body, "subject_grades"))
        return res.status(400).json({
            error: "Bad Request",
            message: "The request body must contain a subject_grades property",
        });

    // handle the request
    try {

        let transcript = await TranscriptModel.create(req.body);
        res.status(201).json(transcript);
    } catch (err) {
        console.log(err)
        res.status(400).json({message: err.message})
    }
};

const readById = async (req, res) => {
    try {
        // get transcript with id from database
        let user = await TranscriptModel.findById(req.params.id).exec();

        // if no transcript with id is found, return 404
        if (!user)
            return res.status(404).json({
                error: "Not Found",
                message: `Transcript not found`,
            });

        // return gotten transcript
        return res.status(200).json(user);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal Server Error",
            message: err.message,
        });
    }
};

const readAllSentTranscripts = async (req, res) => {
    try {
        // get all transcripts for a user
        let transcripts = await TranscriptModel.find({sending_university_username: req.params.username}).exec();

        // if no transcript with id is found, return 404
        if (!transcripts)
            return res.status(404).json({
                error: "Not Found",
                message: `Transcript not found`,
            });

        // return gotten transcripts
        return res.status(200).json(transcripts);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal Server Error",
            message: err.message,
        });
    }
};

const readAllReceivedTranscripts = async (req, res) => {
    try {
        // get all transcripts for a user
        let transcripts = await TranscriptModel.find({receiving_university_username: req.params.username}).exec();

        // if no transcript with id is found, return 404
        if (!transcripts)
            return res.status(404).json({
                error: "Not Found",
                message: `Transcript not found`,
            });

        // return gotten transcripts
        return res.status(200).json(transcripts);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Internal Server Error",
            message: err.message,
        });
    }
};


module.exports = {
    readById,
    readAllSentTranscripts,
    readAllReceivedTranscripts,
    create
}
