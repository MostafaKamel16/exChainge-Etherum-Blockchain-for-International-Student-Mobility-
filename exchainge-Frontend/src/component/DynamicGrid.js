import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import transcriptIcon from "../img/transcript_icon.jpg";

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function DynamicGridItem(props) {
    return (
        <Grid item xs={4}>
            <Item>
                <img src={transcriptIcon} width="25" height="35"/><br/>{props.item.student_name} - {props.item.university_name}<br/>{props.item.semester}
            </Item>
        </Grid>
    );
}