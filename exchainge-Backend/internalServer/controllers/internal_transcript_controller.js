const InternalTranscripts = require('../models/internalTranscripts')
 
// Storage and retrival of internal transcripts that are to be sent

const addTranscript = async (req,res) =>{
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
    
    try {

        let transcript = await InternalTranscripts.create(req.body);

        res.status(201).json(transcript);
    } catch (err) {
        res.status(400).json({message: err.message})
    }
}

const readById = async (req, res) => {
    try {
        // get transcript with id from database
        let user = await InternalTranscripts.findById(req.params.id).exec();

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

const readInternalTranscripts = async (req, res) =>{
    try {
        // get all transcripts for a user
        let transcripts = await InternalTranscripts.find().exec();

        // if no transcript with id is found, return 404
        if (!transcripts)
            return res.status(404).json({
                error: "Not Found",
                message: `Transcripts not found`,
            });

        // return gotten transcripts
        return res.status(200).json(transcripts);
    } catch (err) {
        return res.status(500).json({
            error: "Internal Server Error",
            message: err.message,
        });
    }
};

const setUploaded = async (req, res) => {
    try{
        InternalTranscripts.findOneAndUpdate(
            {_id: req.body._id},
            {$set: {status_processing : req.body.status}},
            {new: true},
            (err, data) =>{
                if (err || !data){
                    return res.status(400).json({
                        error: "Statud not updated"
                    });
                }
                console.log(req.body._id)
            });            
            return res.json();
    }catch (err) {
        return res.status(500).json({
            error: "Internal Server Error",
            message: err.message,
        });
    }
}

module.exports = {
    readInternalTranscripts,
    addTranscript,
    readById,
    setUploaded
}