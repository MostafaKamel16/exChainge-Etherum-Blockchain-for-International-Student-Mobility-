import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import UploadFileIcon from "@mui/icons-material/UploadFile";

  function AlertDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
         variant="contained"
         color="primary"
        component="span"
        onClick={handleClickOpen}>
         Send to University
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Select recieving university "}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <h4
             id="universities"
             onclick="selectText()"
                 >
                   Technical University of Munich{" "}
                        </h4>
                        <h4
                            id="universities"
                            
                        >
                            Ludwig Maximilian University of Munich
                        </h4>
                        <h4
                            id="universities"
                         
                        >
                            {" "}
                            ETH Zürich{" "}
                        </h4>
                        <h4
                            id="universities"
                         
                        >
                            {" "}
                            University of Twente
                        </h4>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose} autoFocus>
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default AlertDialog;
