import React from "react";
import { Backdrop, CircularProgress, Typography } from "@mui/material";


function Spinner(props) {
    const { message } = props;

    return (
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={message.length !== 0}>
            <CircularProgress style={{ position: 'absolute' }} color="inherit" />
            <Typography style={{ paddingTop: 100 }}>{message}</Typography>
        </Backdrop>
    );
}

export default Spinner;
