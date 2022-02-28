import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Button, TextField, Typography } from "@material-ui/core";
import AlertDialog from "../modal/Dialog";
import { useSelector } from "react-redux";
import validator from 'validator';

const useStyles = makeStyles((theme) => ({
    userLoginRoot: {
        margin: "auto",
    },
    loginPaper: {
        width: "400px",
        padding: theme.spacing(2),
    },
    loginRow: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        "&:last-child": {
            paddingBottom: theme.spacing(1),
        },
        "&:first-child": {
            paddingTop: theme.spacing(0),
        },
    },
    loginButtons: {
        display: "flex",
        justifyContent: "space-between",
    },
    loginButton: {
        marginLeft: theme.spacing(1),
    },
}));

/**
 * For user login
 * @param {props} props
 */
function SignupComponent(props) {
    const classes = useStyles();

    const user = useSelector((state) => state.user);
    const [addressErrorMessage, setAddressErrorMessage] = React.useState('');
    const [errorMessage, setErrorMessage] = React.useState('');

    const [username, setUsername] = React.useState("");
    const [serverAddress, setServerAddress] = React.useState("");
    const [openDialog, setOpenDialog] = React.useState(false);
    const [loginError, setLoginError] = React.useState("");

    useEffect(() => {
        if (user?.error) {
            setErrorMessage("User not created!");
            setOpenDialog(true);
        } else {
        }
    }, [user]);

    const onSignup = (e) => {
        e.preventDefault();
        props.onSignup(username, serverAddress);
    };

    const onChangeUsername = (e) => {
        setUsername(e.target.value);
        setLoginError("");
    };

    const onChangeServerAddress = (e) => {
        setServerAddress(e.target.value);
        const errorMessage = validator.isURL(e.target.value) ? "" : "Please enter a valid address";
        setAddressErrorMessage(errorMessage);
    };

    return (
        <div className={classes.userLoginRoot}>
            <Paper className={classes.loginPaper} component="form">
                <div className={classes.loginRow}>
                    <TextField
                        label="Username"
                        fullWidth
                        value={username}
                        onChange={onChangeUsername}
                        error={loginError !== ""}
                    />
                </div>
                <div className={classes.loginRow}>
                    <TextField
                        label="Server address"
                        fullWidth
                        value={serverAddress}
                        onChange={onChangeServerAddress}
                        error={addressErrorMessage !== ""}
                        helperText={addressErrorMessage}
                    />
                </div>
                {loginError !== "" ? (
                    <div className={classes.loginRow}>
                        <Typography color="error">{loginError}</Typography>
                    </div>
                ) : null}
                <div className={classes.loginRow + " " + classes.loginButtons}>
                    <div>
                        <Button
                            className={classes.loginButton}
                            onClick={props.onCancel}
                        >
                            Cancel
                        </Button>
                        <Button
                            className={classes.loginButton}
                            variant="contained"
                            color="primary"
                            onClick={onSignup}
                            disabled={username === ""}
                            type="submit"
                        >
                            Signup
                        </Button>
                    </div>
                </div>
            </Paper>
            <AlertDialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                secondButton={false}
                title={errorMessage}
            />
        </div>
    );
}

export default SignupComponent;
