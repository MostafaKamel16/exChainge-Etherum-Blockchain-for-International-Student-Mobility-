const partnerUniversity = require('../models/partnerUniversity')
const recievedTranscript = require('../models/recievedTranscript')
const internalTranscript = require('../models/internalTranscripts')

const getPartnerStats = async (req, res) =>{
    try {
        // get all transcripts for a user
        console.log(req.params.uni)
        let transcriptsSent = await recievedTranscript.find({'receiving_university_username':req.params.uni}).count();
        let transcriptsRecieved = await recievedTranscript.find({'sending_university_username':req.params.uni}).count();

        // if no transcript with id is found, return 404  
        if (!transcriptsSent && !transcriptsRecieved)
            return res.status(404).json({
                error: "Not Found",
            });

        // return gotten transcripts

        return res.status(200).json({sent:transcriptsSent, recieved:transcriptsRecieved});
    } catch (err) {
        return res.status(500).json({
            error: "Internal Server Error",
            message: err.message,
        });
    }
};

const getPartnerUnis = async (req, res) =>{
    try {
        // get all transcripts for a user
        let Unis = await partnerUniversity.distinct('partner_university').exec();

        // if no transcript with id is found, return 404
        if (!Unis)
            return res.status(404).json({
                error: "Not Found",
                message: `Transcripts not found`,
            });

        // return gotten transcripts
        return res.status(200).json({Unis:Unis});
    } catch (err) {
        return res.status(500).json({
            error: "Internal Server Error",
            message: err.message,
        });
    }
};

//for testing only 
const addPartnerUnis = async (req, res) =>{
    try {
        // get all transcripts for a user
        let Unis = await partnerUniversity.create(req.body);

        // if no transcript with id is found, return 404
        if (!Unis)
            return res.status(404).json({
                error: "Not Found",
                message: `Transcripts not found`,
            });

        // return gotten transcripts
        return res.status(200).json(Unis);
    } catch (err) {
        return res.status(500).json({
            error: "Internal Server Error",
            message: err.message,
        });
    }
};

const updatePartnerUnis = async (req, res) =>{
    try {
        let Unis = await partnerUniversity.distinct('partner_university').exec();
        if (!Unis)
            return res.status(404).json({
                error: "Failure to read from database",

            });
        // get all transcripts for a user
        req.body.partnerUnis.forEach(async (item, index) => {
            if( !Unis.includes(item.partner_university)){
                let x =await partnerUniversity.create({"partner_university":item.partner_university,"server_address":item.server_address});
                if (!Unis)
                    return res.status(404).json({
                        error: "Failure adding new unis",
                    });
          }});

        // return all transcripts
        Unis = await partnerUniversity.find().exec();
        if (!Unis)
            return res.status(404).json({
                error: "Failure to read from database",
            });
        return res.status(200).json(Unis);
    } catch (err) {
        return res.status(500).json({
            error: "Internal Server Error",
            message: err.message,
        });
    }
};

module.exports = {
    getPartnerUnis,
    updatePartnerUnis,
    getPartnerStats,
    addPartnerUnis
}