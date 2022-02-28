import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Container } from "react-bootstrap";
import AppNavBar from "../component/AppNavBar";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Typography, Grid, Container as MUIContainer } from '@mui/material';
import { getPartnerStats } from "../services/api";
import { isAuthenticated } from "../auth/auth";
import { PieChart } from 'react-minimal-pie-chart';
import { setTranscriptsToNotBatched, readBatchedInternalTranscripts } from "../services/api";
import hash from "object-hash";
import { sendTranscript } from "../services/blockchain/contractCalls";
import { startService } from "../services/blockchain/util";
import SelectionList from "../component/SelectionList";
import { hashTranscriptBatch, hashTranscripts } from "../utils/accountUtils";
import Spinner from "../component/Spinner";


const useStyles = makeStyles((theme) => ({
    container: {
        //height: '89vh',
        display: 'flex',
        justifyContent: 'start',
        //backgroundColor: theme.palette.primary.light,

    },
    textField: {
        width: '100%',
    },
    questionContainer: {
        width: '70%',
    },
    questionSectionContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },

    addQuestionIconContainer: {
        display: 'flex',
        height: '12rem',
    },
    circleIcon: {
        display: 'box',
    },
    leftPane: {
        width: '60%',
        paddingTop: '4rem',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        border: '1px grey solid'
    },
    leftPaneSection: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    rightPane: {
        width: '100%',
        display: 'flex',
        overflowY: 'scroll',
        flexDirection: 'column',
    },
    rightPaneTop: {
        height: '14.5rem',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white',
        border: '1px grey solid',
        padding: '2rem'
    },

    modal: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '15rem',
        marginLeft: '30rem',
        marginRight: '30rem',
        minHeight: "220px",
        width: "40%"
    },
    MenuItem: {
        marginTop: "30px",
    },
    button: {
        margin: "2rem",
        justifyContent: 'center',
    },
    sectionListContainer: {
        marginTop: '1rem',
        height: '20rem',
        width: '100%',
        overflowY: 'scroll',
    },
    surveyListContainer: {
        marginTop: '1rem',
        height: '27.5rem',
        width: '22rem',
        overflowY: 'scroll',
    },
    surveyListItem: {
        display: 'flex',
        height: '4rem',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        '&:hover': {
            backgroundColor: theme.palette.primary.light,
            cursor: 'pointer',
        },
    },
    sectionListItem: {
        'display': 'flex',
        'justifyContent': 'center',
        'height': '4rem',
        'width': '70%',
        'marginBottom': '0.5rem',
        'marginTop': '0.5rem',
        'alignItems': 'center',
        '&:hover': {
            'backgroundColor': theme.palette.primary.light,
            'cursor': 'pointer',
        },
    },
    upload: {
        display: 'flex',
        marginTop: '0.5rem',
        height: '9rem',
        width: '75%',
    },
    createSurveyButton: {
        display: 'flex',
        height: '3rem',
        width: '15rem',
    },
    centerDiv: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '1rem',
    },
    form: {
        margin: '1rem',
        width: '40%'
    },
    inline: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    chart: {
        height: '250px',
    }
}));

const postToServer = async (address, data) => {
    const response = await fetch(address, {
        'method': "POST",
        'headers': {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        'body': JSON.stringify(data),
    });
    console.log('Sent transcripts to the foreign university server');
    return response;
};

const BatchSend = (props) => {
    const classes = useStyles();
    const [partnerList, setPartnerList] = useState([]);
    const [stats, setStats] = useState({});
    const [batchedTranscripts, setBatchedTranscripts] = useState([]);
    const [spinnerMessage, setSpinnerMessage] = React.useState("");

    const [selectedUniIndex, setSelectedUniIndex] = React.useState(-1);

    const selectedUni = selectedUniIndex >= 0 ? partnerList[selectedUniIndex] : {};
    const selectedUniName = selectedUniIndex >= 0 ? selectedUni.partner_university : "all Universities";

    useEffect(() => {
        setPartnerList(JSON.parse(localStorage.getItem('partnerUnis')));
    }, []);

    useEffect(() => {
        const getStats = async () => {
            setStats(await getPartnerStats(selectedUniName, isAuthenticated()));
        };
        const updateBatchedTranscripts = async () => {
            setBatchedTranscripts(await readBatchedInternalTranscripts(isAuthenticated(), selectedUniName)); //receiverUni
        };

        getStats();
        updateBatchedTranscripts();
    }, [selectedUniName]);

    const handleSendBatchedTranscripts = async () => {
        console.log(`Sending batched transcripts to ${selectedUniName}`);

        const token = isAuthenticated();

        const combinedHash = hashTranscripts(batchedTranscripts);

        await startService();

        try {
            const index = await sendTranscript(combinedHash, selectedUni.blockchain_address);//
            for (var file of batchedTranscripts) {
                console.log('file', file);
                file.index = index;
            }
            await postToServer(selectedUni.server_address, batchedTranscripts);
            await setTranscriptsToNotBatched(token, selectedUniName);
        } catch (e) {
            console.log(e);
        }
    };

    const onSend = async () => {
        setSpinnerMessage("Sending transcripts..");
        await handleSendBatchedTranscripts()
        setSpinnerMessage("");
    };

    return (
        <Container>
            <Spinner message={spinnerMessage} />

            <AppNavBar></AppNavBar>

            <MUIContainer maxWidth='sm' sx={{ mt: 5 }}>
                <Typography sx={{ mb: 1 }}>
                    Select a university to see some interaction statistics
                </Typography>
                <SelectionList options={partnerList} selection={selectedUniIndex} setSelection={setSelectedUniIndex} />
                <Typography variant="h4" style={{ textAlign: 'center', marginTop: 50 }}>Interaction with {selectedUniName}</Typography>
            </MUIContainer>

            <Grid container spacing={2} sx={{ mt: 10 }}>
                <Grid item xs={6}>
                    {stats.sent !== 0 || stats.recieved !== 0 ?
                        <PieChart
                            className={classes.chart}
                            animate={true}
                            label={({ dataEntry }) => dataEntry.value === 0 ? '' : `${dataEntry.title}: ${dataEntry.value}`}
                            labelStyle={{ fontSize: '35%' }}
                            data={[
                                { title: 'Sent', value: stats.sent, color: '#E38627' },
                                { title: 'Received', value: stats.recieved, color: '#C13C37' }
                            ]}
                        />
                        : <Typography align="center">No transcripts have been exchanged yet</Typography>
                    }
                </Grid>

                <Grid item xs={6}>
                    {selectedUniIndex >= 0 &&
                        <div className={classes.questionSectionContainer}>
                            <Typography>Number of batched transcripts: {batchedTranscripts.length}</Typography>
                            <Button
                                style={{ backgroundColor: "rgb(53, 110, 255)" }}
                                variant="contained"
                                onClick={onSend}
                                disabled={batchedTranscripts.length === 0}
                            > Send Batched Transcripts
                            </Button>
                        </div>
                    }
                    {selectedUniIndex < 0 &&
                        <div className={classes.questionSectionContainer}>
                            <Typography>Number of partner universities: {partnerList.length}</Typography>
                        </div>
                    }
                </Grid>
            </Grid>
        </Container>
    );
};

export default connect()(withRouter(BatchSend));