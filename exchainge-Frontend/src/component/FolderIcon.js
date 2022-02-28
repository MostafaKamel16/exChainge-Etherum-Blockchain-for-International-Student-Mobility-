import UploadFileIcon from "@mui/icons-material/UploadFile";
import Grid from "@material-ui/core/Grid";
import { Checkbox } from "@mui/material";
import React, { Component } from "react";

class FolderIcon extends React.Component {
    
    render() {
        return (
            <Grid xs={1}>
                {" "}
               {/* <Checkbox id="checkboxPosition" />{" "}*/ }
                <UploadFileIcon id="icon"></UploadFileIcon>
            </Grid>
        );
    }
}
export default FolderIcon;
