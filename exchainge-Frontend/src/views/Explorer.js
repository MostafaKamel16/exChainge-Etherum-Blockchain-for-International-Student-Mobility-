import "../App.css";
import React from "react";
import AppNavBar from "../component/AppNavBar";

class Explorer extends React.Component {
    render() {
        return (
            <div style={{display: 'flex', height: '100vh', flexDirection: 'column'}}>
                <AppNavBar />
                <iframe title="Explorer" src={process.env.REACT_APP_LOCAL_EXPLORER_URL} style={{ border: 0, flexGrow: 1 }} />
            </div>
        );
    }
}
export default Explorer;
