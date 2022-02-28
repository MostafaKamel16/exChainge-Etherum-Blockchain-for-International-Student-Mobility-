const Semester = {
    SUM2021: "SUM2021",
    WIN2021_22: "WIN2021_22",
    SUM2022: "SUM2022"
}

const PassingStatus = {
    PASSED: "PASSED",
    FAILED: "FAILED"
}

const TranscriptStatusRecieved = { //recieved transcripts
    NOTVALIDATING: "NOT VALIDATING",
    VERIFIED: "VERIFIED",
    //VALIDATING: "VALADATING",
    INVALID: "INVALID"
}

const TranscriptStatusSent = {//sent transcrits 
    NOTUPLOAED:"NOT UPLOADED",
    UPLOADED: "UPLOADED",
    BATCHED: "BATCHED",
    UPLOADING: "UPLOADING",
    UPLOADFALIED: "UPLOAD FAILED"
}


module.exports = {
    Semester,
    PassingStatus,
    TranscriptStatusSent,
    TranscriptStatusRecieved
}