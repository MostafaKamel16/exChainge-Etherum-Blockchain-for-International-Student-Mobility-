import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { Container, Col } from "react-bootstrap";
import { ThemeProvider } from "@material-ui/styles";
import { signup } from "../redux/action/userAction";
import SignupComponent from "../component/SignupComponent";
import Spinner from "../component/Spinner";
import { Theme } from "../component/UI/Theme";
import { registerAccount } from "../services/blockchain/contractCalls";
import { getCurrentAccount, startService } from "../services/blockchain/util";
import { fundAccount } from "../utils/accountUtils";

/**
 * For user login
 * @param {props} props
 */

function SignupView(props) {
    const userData = useSelector((state) => state.user);
    const [spinnerMessage, setSpinnerMessage] = React.useState("");

    useEffect(() => {
        if (userData?.user?.username) {
            props.history.push("/upload");
        }
    }, [userData, props.history]);

    const onSignUp = async (username, serverAddress) => {
        setSpinnerMessage("Connecting to Metamask..");

        // make sure metamask is open
        await startService();

        const account = getCurrentAccount();

        try {
            setSpinnerMessage("Funding account..");
            await fundAccount(); // ensure account has enough funds

            setSpinnerMessage("Registering account on the blockchain..");
            await registerAccount(username, serverAddress);

            setSpinnerMessage("Logging in..");
            props.dispatch(signup(username, account, serverAddress)); // store account locally
        } catch (e) {
            console.log(e);
        }
        setSpinnerMessage("");
    };

    const onCancel = () => {
        props.history.push("/");
    };
    const onLogin = () => {
        props.history.push("/login");
    };

    return (
        <ThemeProvider theme={Theme}>
            <Spinner message={spinnerMessage} />
            <div className="Landing">
                <Container>
                    <center>
                        <br />
                        <Col>
                            <SignupComponent
                                user={userData.user}
                                onLogin={onLogin}
                                onCancel={onCancel}
                                onSignup={onSignUp}
                            />
                        </Col>
                        <br />
                    </center>
                </Container>
            </div>
        </ThemeProvider>
    );
}

export default connect()(withRouter(SignupView));
