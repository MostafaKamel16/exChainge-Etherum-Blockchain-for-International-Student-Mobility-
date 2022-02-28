"use strict";
const Enum = require("../src/enum")
const mongoose = require("mongoose");
const SubjectSchema = require("./subject")

/***
 *
 * @type {mongoose.Schema}
 * user_id - String
 * semester - String
 * university - String
 * student_id - String
 * subject_grades - String
 */
const TranscriptSchema = new mongoose.Schema({

        index: {
            type:Number,
            required:true,
        },
        // current status of the transcripts
        status_processing:{
            type: Enum.TranscriptStatusRecieved,
            required: true,
            default: Enum.TranscriptStatusRecieved.NOTVALIDATING
        },
        // sending user_id of the user which sent the transcript
        sending_university_username: {
            type: String,
            required: true,
            index: true,
        },
        // receiving user_id of the user which received the transcript
        receiving_university_username: {
            type: String,
            required: true,
            index: true,
        },
        // semester
        semester: {
            type: Enum.Semester,
            required: true,
        },
        // student id
        student_id: {
            type: String,
            required: true,
        },
        // subject grades
        subject_grades: {
            type: [SubjectSchema],
            required: true,
        }
    },
{collection: 'recievedTranscript'});

module.exports = mongoose.model("recievedTranscript", TranscriptSchema);