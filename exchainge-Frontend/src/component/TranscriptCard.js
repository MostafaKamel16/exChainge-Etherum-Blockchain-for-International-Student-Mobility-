import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from "@material-ui/core/CardMedia";
import {Col, Row} from "react-bootstrap";
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import transcriptIcon from "../img/transcript_icon.jpg";

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        minHeight: 75,
        paddingLeft: 5,
        paddingRight: 5
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    pos: {
        marginBottom: 12,
    },
});

export default function TranscriptCard(props) {
    const classes = useStyles();
    const [color, changeColor] = useState();
    //const [openDialog, setOpenDialog] = useState(false);
    const clickHandler = () => (
        props.onClick(props.item.id)

        //console.log(props.item.id)
    )
    return (
        <Card onClick={clickHandler} style={{maxWidth: 130}}>
            <CardActionArea key={props.id} className={classes.root} style={{backgroundColor: props.color}}>
                    
                            <Col md={3} sm={3} xs={6}>
                                <img src={transcriptIcon} width="25" height="35"/>
                                <Col>
                                    <Row >
                                        {props.item.student_name} - {props.item.university_name}
                                    </Row>
                                    <Row >
                                        {props.item.semester}
                                    </Row>
                                </Col>
                            </Col>
            </CardActionArea>
        </Card>


    );
}