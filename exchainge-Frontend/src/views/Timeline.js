import React, { Component } from "react";
import {withRouter} from "react-router-dom";
import {connect, useSelector} from "react-redux";
import Timeline from "../component/Timeline";
import TranscriptStatus from "../component/TranscriptStatus";
import { Container } from "react-bootstrap";
import { Theme } from "../component/UI/Theme";
import { ThemeProvider } from "@material-ui/styles";
import AppNavBar from "../component/AppNavBar";

const TimeLine= (props) =>{
    
const items = ['Upload transcript', 'Writing to chain', 'Transcript sent', 'Transcript Verified'];

return(
        <Container >
            <AppNavBar></AppNavBar>
            {/*<br />
            <Timeline items = {items} step={4}/>
            <br />*/}
            <TranscriptStatus items = {items}/>
        </Container>    

  );
 }
 
export default TimeLine;