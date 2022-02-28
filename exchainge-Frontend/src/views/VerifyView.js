import TranscriptCard from "../component/TranscriptCard";
import React, { useEffect, useState } from "react";
import DynamicCard from "../component/DynamicCard";
import AppNavBar from "../component/AppNavBar";
import { Col, Row, Container } from "react-bootstrap";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from '@material-ui/core/Typography';
import transcriptIcon from "../img/transcript_icon.jpg";
import failedIcon from "../img/failed.jpeg";
import successIcon from "../img/success.png";
import {readExternalTranscripts, updateTranscriptStatus, readBatchedByIndex} from "../services/api"
import {verifyTranscript} from "../services/blockchain/contractCalls";
import { hashTranscriptBatch, hashTranscripts } from "../utils/accountUtils";
import hash from 'object-hash'
import { startService } from "../services/blockchain/util";
const useStyles = makeStyles((theme) => ({
    root: {
        padding: "20px",
        paddingTop: '80px',
    },
    searchBarContainer: {
        paddingTop: '80px'
    },
    box: {
        // margin: '0 2px',
        // paddingTop: '-10px',
        marginTop: '10px',
        paddingLeft: '0px',
        marginRight: '10px',
        paddingRight: '25px',
        position: "relative",
        height: "75vh",
        overflow: "scroll"
    },
}));

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    backgroundColor: "#c0d1fcac",
    color: theme.palette.text.secondary
}));

// const verifyTranscriptOnBlockchain = async (item) => {
//     let verificationStatus = await verifyTranscript(item, item._id);
// }

const VerifyView = () => {

    const classes = useStyles();
    const [pendingTranscriptsList2, setPendingTranscriptsList2] = useState([]);
    const [compeletedTranscriptsList2, setCompeletedTranscriptsList2] = useState([]);
    const [cardSelectedInPendingTranscripts, changeCardSelectedInPendingTranscripts] = useState(-1);
    const [cardSelectedInApprovedTranscripts, changeCardSelectedInApprovedTranscripts] = useState(-1);
    const [openDialog1, setOpenDialog1] = useState(false);
    const [openDialog2, setOpenDialog2] = useState(false);
    const [openDialog3, setOpenDialog3] = useState(false);
    const [verifyRequestCompleted, setVerifyRequestCompleted] = useState(false);
    const [pendingRequestsSearchString, setPendingRequestsSearchString] = useState("");
    const [completedRequestsSearchString, setCompletedRequestsSearchString] = useState("");
    const [transcriptsInCurrentBatch, setTranscriptsInCurrentBatch] = useState([]);
    const [currentTranscriptIdx, changeTranscriptIdx] = useState({});


    useEffect(async () => {
        let token = localStorage.getItem('jwt');
        let transcripts = await readExternalTranscripts(token);

        setPendingTranscriptsList2([]);
        setCompeletedTranscriptsList2([]);
        let pendingTranscriptCount = 0;
        let completedTranscriptCount = 0;
        for (const transcript of transcripts) {

            if(transcript.hasOwnProperty("status_processing") && transcript.status_processing === "NOT VALADATING") {
                if(completedRequestsSearchString.length > 0 ) {
                    if(transcript.student_id.toLowerCase().startsWith( completedRequestsSearchString)) {
                        transcript.id = pendingTranscriptCount;
                        setPendingTranscriptsList2(pendingTranscriptsList2 => [...pendingTranscriptsList2, transcript]);
                        pendingTranscriptCount++;
                    }
                } else {
                    transcript.id = pendingTranscriptCount;
                    setPendingTranscriptsList2(pendingTranscriptsList2 => [...pendingTranscriptsList2, transcript]);
                    pendingTranscriptCount++;
                }
            } else {
                if(completedRequestsSearchString.length > 0 ) {
                    if(transcript.student_id.toLowerCase().startsWith( completedRequestsSearchString)) {
                        transcript.id = completedTranscriptCount;
                        setCompeletedTranscriptsList2( compeletedTranscriptsList2 => [...compeletedTranscriptsList2, transcript]);
                        completedTranscriptCount++;
                    }
                } else {
                    transcript.id = completedTranscriptCount;
                    setCompeletedTranscriptsList2( compeletedTranscriptsList2 => [...compeletedTranscriptsList2, transcript]);
                    completedTranscriptCount++;
                }
                
            }
        }
        setVerifyRequestCompleted(false);

        },[verifyRequestCompleted, pendingRequestsSearchString, completedRequestsSearchString]);


    const clickHandler1 = (item) => (
        changeCardSelectedInPendingTranscripts(item.id),
            changeCardSelectedInApprovedTranscripts(-1),
            setOpenDialog2(false),
            setOpenDialog3(false),
            setOpenDialog1(true),
            getCountOftranscriptsInCurrentBatch(item),
            changeTranscriptIdx(pendingTranscriptsList2[item.id])
    );
    const clickHandler2 = (item) => (
        changeCardSelectedInApprovedTranscripts(item.id),
        changeCardSelectedInPendingTranscripts(-1),
        setOpenDialog1(false),
        setOpenDialog3(false),
        setOpenDialog2(true),
        changeTranscriptIdx(compeletedTranscriptsList2[item.id])

    );

    const clickHandler3 = (item) => (
        changeCardSelectedInApprovedTranscripts(item.id),
        changeCardSelectedInPendingTranscripts(-1),
        setOpenDialog1(false),
        setOpenDialog2(false),
        setOpenDialog3(true),
        changeTranscriptIdx(compeletedTranscriptsList2[item.id])
    );
    


    const handleClose = () => (
        setOpenDialog1(false),
        setOpenDialog2(false),
        setOpenDialog3(false)
    );
    
    const pendingRequestsSearcHandler = () => {
        let elem = document.getElementById("pending-request-search");
        let value = elem.value;
        if(value.length >= 3) {
            setPendingRequestsSearchString(value);
        } 
        if(value.length < 3) {
            setPendingRequestsSearchString("");
        }
    }

    const completedRequestsSearcHandler = () => {
        let elem = document.getElementById("completed-request-search");
        let value = elem.value;
        if(value.length >= 3) {
            setCompletedRequestsSearchString(value);
        }
        if(value.length < 3) {
            setCompletedRequestsSearchString("");
        }
    }

    const getCountOftranscriptsInCurrentBatch = async (transcript) => {
        let transcripts = await readBatchedByIndex(transcript.index, transcript.sending_university_username);
        setTranscriptsInCurrentBatch(transcripts);
    }
    
    const handleVerifyRequest = async (transcript) => {
        //verifyRequest()
        setOpenDialog1(false);
            setOpenDialog2(false);
            setOpenDialog3(false);

        const combinedHash = hashTranscripts(transcriptsInCurrentBatch)

        await startService();
        let verificationStatus = await verifyTranscript(combinedHash, transcript.index);
        if(verificationStatus===true) {
            for(const currTranscript of transcriptsInCurrentBatch) {
                updateTranscriptStatus(currTranscript._id, "VERIFIED", localStorage.getItem('jwt'));
            }
        } else {
            for(const currTranscript of transcriptsInCurrentBatch) {
                updateTranscriptStatus(currTranscript._id, "INVALID", localStorage.getItem('jwt'));
            }
        }
        setVerifyRequestCompleted(true);
        //Location().reload()
    }


    // const handleVerify = () => (
    //
    // );
    return (
        <Container>
            <AppNavBar />

            {/*<TextField id="standard-basic" label="Student Id or University Name" variant="standard" />*/}
            {/*<h2 style={{color : "#356EFF"}}>Verify Transcripts</h2>*/}
            <Grid container xs={12} spacing={6} className={classes.searchBarContainer}>
                
                <Grid container item xs={12} spacing={4} direction="row" justifyContent="flex-end" alignItems="flex-start">
                    <p style={{marginTop: "-20px"}}>Search : </p>&nbsp;<TextField id="completed-request-search" label="Student Id (min 3 chars)" onKeyUp={() => completedRequestsSearcHandler()} style={{marginTop: "-40px", paddingRight: "50px"}} variant="filled" size={"small"}/><br/>
                </Grid>
            </Grid>
            <Grid container xs={12} spacing={6} className={classes.root}>
                <Grid container item xs={6} spacing={4} className={classes.box} direction="row" justifyContent="center" alignItems={"flex-start"}>
                    {/*Search By : <TextField id="standard-basic" label="Student Id or Uni Name" style={{marginTop: "-40px"}} variant="filled" size={"normal"}/><br/>*/}
                    <Grid item xs={12} style={{marginTop: "-90px"}}><h4 style={{color : "#356EFF"}}>Pending Requests ({pendingTranscriptsList2.length})</h4></Grid>
                        {pendingTranscriptsList2.map((item => (
                            <Grid item xs={4}>
                                
                                <Item onClick={() => clickHandler1(item)} ><img src={transcriptIcon} width="25" height="35"/><br/>{item.student_id} - {item.university}<br/>{item.semester}</Item>
                                
                            </Grid>
                            )))}
                    </Grid>
                    <Grid container item xs={6} spacing={4} className={classes.box} direction="row" justifyContent="center" alignItems="flex-start">
                        <Grid item xs={12} style={{marginTop: "-90px"}}><h4 style={{color : "#356EFF"}}>Completed Requests({compeletedTranscriptsList2.length})</h4></Grid>
                        {compeletedTranscriptsList2.map((item => item.status_processing === "VERIFIED"? (

                            <Grid item xs={4}><Item onClick={() => clickHandler2(item)}><img src={successIcon} width="35" height="35"/><br/>{item.student_id} - {item.university}<br/>{item.semester}</Item></Grid>
                        ) :
                                (<Grid item xs={4}><Item onClick={() => clickHandler3(item)}><img src={failedIcon} width="35" height="35"/><br/>{item.student_id} - {item.university}<br/>{item.semester}</Item></Grid>)
                        ))}
                    </Grid>
            </Grid>

            <div>
                <Dialog
                    open={openDialog1}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Verify Request"}
                    </DialogTitle>
                    <DialogContent style={{minWidth : "350px"}}>
                        <DialogContentText id="alert-dialog-description">
                            Student Id : {currentTranscriptIdx?.student_id} <br/>
                            Semester : {currentTranscriptIdx?.semester} <br/>
                            Sending University username: {currentTranscriptIdx?.sending_university_username} <br/>
                            Receiving University username: {currentTranscriptIdx?.receiving_university_username} <br/>
                            Transcripts in the batch : {transcriptsInCurrentBatch?.length} <br/><br/>
                            **note: all the transcripts in a single batch <br/>
                            will be sent for verification together<br/>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => handleClose()}>Close</Button>
                        <Button onClick={() => handleVerifyRequest(currentTranscriptIdx)}>Verify Transcript(s)</Button>
                    </DialogActions>
                </Dialog>
            </div>

            <div>
                <Dialog
                    open={openDialog2}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Successful Request"}
                    </DialogTitle>
                    <DialogContent style={{minWidth : "300px"}}>
                        <DialogContentText id="alert-dialog-description">
                            Student Id : {currentTranscriptIdx?.student_id} <br/>
                            Semester : {currentTranscriptIdx?.semester} <br/>
                            Sending University username: {currentTranscriptIdx?.sending_university_username} <br/>
                            Receiving University username: {currentTranscriptIdx?.receiving_university_username} <br/>
                            Status - Transcript Validated <br/>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => handleClose()}>Close</Button>
                    </DialogActions>
                </Dialog>
            </div>

            <div>
                <Dialog
                    open={openDialog3}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Invalid Request"}
                    </DialogTitle>
                    <DialogContent style={{minWidth : "300px"}}>
                        <DialogContentText id="alert-dialog-description">
                            Student Id : {currentTranscriptIdx?.student_id} <br/>
                            Semester : {currentTranscriptIdx?.semester} <br/>
                            Sending University username: {currentTranscriptIdx?.sending_university_username} <br/>
                            Receiving University username: {currentTranscriptIdx?.receiving_university_username} <br/>
                            Status - Invalid Transcript<br/>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => handleClose()}>Close</Button>
                    </DialogActions>
                </Dialog>
            </div>

        </Container>
    );
};

export default VerifyView;
