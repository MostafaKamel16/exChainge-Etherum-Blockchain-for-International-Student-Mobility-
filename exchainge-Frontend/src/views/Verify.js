import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import AppNavBar from "../component/AppNavBar";
import Grid from "@material-ui/core/Grid";
import { Paper, Button, TextField, Typography } from "@material-ui/core";
import { verifyTranscript } from "../services/blockchain/contractCalls";
import { readInternalTranscriptsbyId } from "../services/api";
import Timeline from "../component/Timeline";
import hash from "object-hash";

const host = 'http://192.168.0.105:8545'
/**
 * For transcript verification .
 * @param {props} props
 */

function Verify(props) {
    const [fakeTranscript, setTranscript] = React.useState("");
    const [activeStep, setActiveStep] = React.useState(0)
    const [transcriptIndex, setTranscriptIndex] = React.useState(0);

    const [openDialog, setOpenTimeline] = React.useState(false);
    const isValid = () => {
        if (openDialog) return 'VALID'
        else return 'INVALID'
    }
    const steps = ['NOTVERIFIED', 'VERIFYING', isValid()]
    const onChange = (e) => {
        setTranscript(e.target.value);
        setStatus("Not started");
    };
    const [Status, setStatus] = React.useState("Not started");
    const onChangeStatus = (val) => {
        setStatus(val);
    };

    const transcriptStored = {
        studentName: "test_student",
        subject: {
            name: "test_subject",
            grade: 2,
        },
    };

    const handleSetTranscriptIndex = (e) => {
        setTranscriptIndex(parseInt(e.target.value));
    };


    const handleVerifyTranscript = async () => {
        const selectedFile = {}; // file the user selected
        const index = selectedFile.index;
        const files = [] // fetch all transcripts with the same index (SAME ORDER) sort the files by some value while fetching
        const combinedHash = hash(files);
        const isValid = await verifyTranscript(combinedHash, index);
        // set each file in files as valid on backend


        // onChangeStatus("Processing of transcript underway");
        // if (result) {
        //     onChangeStatus("Processing of transcript Successful!!!");
        // }
        // else {
        //     onChangeStatus("Processing of transcript Failed :(");
        // }
        return isValid;
    }

    const checkStatus = async () => {
        const transcript = await readInternalTranscriptsbyId(localStorage.getItem('jwt'), '61ed43288536553efc2a3544');
        const possibleSteps = ['NOTUPLOADED', 'UPLOADING', 'BATCHED', 'VALID', 'INVALID']
        if (transcript) {
            if (possibleSteps.includes(transcript.status_processing)) {
                if (transcript.status_processing === 'VALID')
                    await setActiveStep(3)
                else if (transcript.status_processing === 'BATCHED')
                    await setActiveStep(1)
                else if (transcript.status_processing === 'INVALID')
                    await setActiveStep(3)
                await setOpenTimeline(true);

                await onChangeStatus(transcript.status_processing + openDialog);

            }
            else
                onChangeStatus("Failed to fetch a transcript")
        }
        else
            onChangeStatus("Failed to fetch a transcript")
    }

    return (
        <container>
            <AppNavBar />
            <div >
                <Button
                    variant="contained"
                    color="primary"
                    component="span"
                    onClick={checkStatus}
                >Check Status
                </Button>
                <br />
                {!openDialog ? (<br />) :
                    (<Timeline step={activeStep} items={steps}></Timeline>)
                }
            </div>
            <Grid id="iconsPosition" container>
                <Grid xs={1}> </Grid>

                <div >
                    <TextField
                        label="Transcript"
                        fullWidth
                        value={fakeTranscript}
                        onChange={onChange}
                    />
                </div>

                <div>
                    <TextField
                        label="TranscriptIndex"
                        fullWidth
                        value={transcriptIndex}
                        onChange={handleSetTranscriptIndex}
                    />
                </div>

                <Grid xs={1}> </Grid>

                <div >
                    <Button
                        variant="contained"
                        color="primary"
                        component="span"
                        onClick={handleVerifyTranscript}
                    >Verify Transcript
                    </Button>
                </div>
                <Grid xs={1}> </Grid>

                <div>
                    <h3>Stored Tramscript : {JSON.stringify(transcriptStored)}</h3>
                </div>
                <Grid xs={1}> </Grid>
                <div>
                    <h3>Transcript Verification Status : {Status}</h3>
                </div>
            </Grid>
        </container>
    );
}

export default connect()(withRouter(Verify));