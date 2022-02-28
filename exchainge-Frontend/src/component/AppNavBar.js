import React, { Component } from "react";
import { AppBar, Toolbar, IconButton, Button, Box, Typography } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import { withRouter } from "react-router-dom";
import { signout } from "../services/api";
import AccountButton from "./AccountButton";

export class AppNavBar extends Component {

    logoff() {
        signout();
        window.location.assign('/');
    }

    timeline() {
        window.location.assign('/timeline');
    }

    goToUpload() {
        this.props.history.push("/upload");
    }
    goToBlockExplorer() {
        window.location.assign('/explorer');
    }
    goToVerify() {
        this.props.history.push("/verify");
    }
    gotoBatchUpload() {
        this.props.history.push("/universities");
    }
    goToLanding() {
        this.props.history.push("/");
    }

    render() {
        const currentPath = window.location.pathname;

        const getColor = (page) => {
            return currentPath === page ? "black" : "inherit";
        };

        return (
            <AppBar style={{
                backgroundColor: "rgb(53, 110, 255)",
            }} position="static">
                <Toolbar>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <IconButton color="inherit">
                            <HomeIcon id="home" onClick={() => this.goToLanding()} />
                        </IconButton>

                        <Button variant="text" style={{ marginLeft: 30 }} id="upload" color={getColor('/upload')} onClick={() => this.goToUpload()}>Upload</Button>
                        <Button id="verify" style={{ marginLeft: 30 }} color={getColor('/verify')} onClick={() => this.goToVerify()}>Verify</Button>{""}
                        <Button id="explorer" style={{ marginLeft: 30 }} color={getColor('/explorer')} onClick={() => this.goToBlockExplorer()}>Explorer</Button>
                        <Button id="batchSend" style={{ marginLeft: 30 }} color={getColor('/universities')} onClick={() => this.gotoBatchUpload()}>Universities</Button>
                    </Box>

                    <Box style={{
                        display: 'flex',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                    }}>
                        <Typography color="inherit" style={{ marginRight: 10 }}>{localStorage.getItem("username")}</Typography>
                        <AccountButton signout={this.logoff} />
                    </Box>
                </Toolbar>
            </AppBar>
        );
    }
}

export default withRouter(AppNavBar);
