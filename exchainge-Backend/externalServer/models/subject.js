"use strict";
const Enum = require("../src/enum")
const mongoose = require("mongoose");

const SubjectSchema = new mongoose.Schema({
    // subject name
    subject_name: {
        type: String,
        required: true
    },

    // subject code
    subject_code: {
        type: String,
        required: true
    },

    // grade
    grade: {
        type: String,
        required: true
    },

    // passed/ failed
    passing_status: {
        type: Enum.PassingStatus,
        required: true
    },

    //
});

module.exports = SubjectSchema;