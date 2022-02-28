"use strict";
const Enum = require("../src/enum")
const mongoose = require("mongoose");
const SubjectSchema = require("../models/subject")


/***
 * @type {mongoose.Schema}
 */
const InternalTranscriptSchema = new mongoose.Schema({

    // current status of the transcripts
    status_processing:{
        type: Enum.TranscriptStatusSent,
        required: true,
        default: Enum.TranscriptStatusSent.NOTUPLOAED
    }, 
    // semester
    semester: {
        type: Enum.Semester,
        required: true,
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
{collection: 'internalTranscript'});

module.exports = mongoose.model("internalTranscript", InternalTranscriptSchema);