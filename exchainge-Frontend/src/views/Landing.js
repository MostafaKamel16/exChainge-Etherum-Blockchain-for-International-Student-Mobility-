import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import backgroundImage from "../img/blockchain2.jpeg";
import Popup from "reactjs-popup";
import LoginView from "./LoginView";
import SignupView from "./SignupView";
import Timeline from "../component/Timeline";
import TranscriptStatus from "../component/TranscriptStatus";

const useStyles = makeStyles((theme) => ({
    root: {
        height: '200vh',
        backgroundImage: `url(${backgroundImage})`,
        // backgroundRepeat: "repeat-y",
        backgroundSize: "cover",
        // filter: "brightness(80%)",
    },
    text: {
        textAlign: "center",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
    buttons: {
        "& > *": {
            margin: theme.spacing(1),
        },
    },
    buttonStyle1: {
        background: "#1d9419",
        color: "#fff",
    },
    buttonStyle2: {
        background: "#fde2e2",
        color: "#000",
    },
}));

const Landing = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Box p={20}>
                <Box
                    id="LandingTitle"
                    className={classes.text}
                    fontSize="h2.fontSize"
                    fontWeight="fontWeightBold"
                    fontFamily="Monospace"
                >
                    Welcome to ExChainge
                </Box>
                <Box
                    className={classes.text}
                    fontSize="h5.fontSize"
                    fontStyle="italic"
                    fontWeight="fontWeightLight"
                >
                    Verify Transcripts with Blockchain Technology
                </Box>

                <TranscriptStatus items={['Upload transcript', 'Write to Chain', 'Sent Transcript', 'Verify Transcript']}></TranscriptStatus>

                <Box className={classes.buttons} textAlign="center" m={3}>
                    <Popup
                        trigger={
                            <Button
                                className={classes.buttonStyle1}
                                variant="contained"
                            >
                                Sign Up
                            </Button>
                        }
                    >
                        <div>
                            {" "}
                            <SignupView></SignupView>{" "}
                        </div>
                    </Popup>

                    <LoginView></LoginView>{" "}
                </Box>
            </Box>
        </div>
    );
};

export default Landing;
