import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { ThemeProvider } from "@material-ui/styles";
import { login } from "../redux/action/userAction";
import { Theme } from "../component/UI/Theme";
import { readNonce } from "../services/api";
import { getCurrentAccount, signNonce, startService } from "../services/blockchain/util";
import { fundAccount } from "../utils/accountUtils";
import Spinner from "../component/Spinner";
import Button from '@mui/material/Button';


/**
 * For user login
 * @param {props} props
 */

function LoginView(props) {
    const userData = useSelector((state) => state.user);
    const [spinnerMessage, setSpinnerMessage] = React.useState("");

    useEffect(() => {
        if (userData?.user?.username) {
            props.history.push("/upload");
        }
    }, [userData, props.history]);

    const handleSignMessage = async (publicAddress) => {
        try {
            const nonce = await readNonce(publicAddress.toLowerCase());
            const signature = await signNonce(nonce);
            return { publicAddress, signature };
        } catch (err) {
            window.alert(
                "You need to sign the message to be able to log in."
            );
            window.location.reload(false);
        }
    };

    const onLogin = async () => {
        setSpinnerMessage("Connecting to Metamask..");
        await startService();
        const account = getCurrentAccount();

        setSpinnerMessage("Funding account..");
        await fundAccount();

        setSpinnerMessage("Authenticating user..");
        const data = await handleSignMessage(account);

        setSpinnerMessage("Logging in..");
        props.dispatch(login(data));
        setSpinnerMessage("");
    };

    return (
        <ThemeProvider theme={Theme}>
            <Spinner message={spinnerMessage} />
            <Button onClick={onLogin} color="primary" variant="contained" type="submit">
                Login
            </Button>
        </ThemeProvider>
    );
}

export default connect()(withRouter(LoginView));
