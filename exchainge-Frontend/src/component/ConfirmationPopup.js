import React, { Component } from "react";
import CloseIcon from "@material-ui/icons/Close";

class ConfirmationPopup extends React.Component {
    render() {
        return (
            <div className="popup">
                <div className="popup_inner">
                    <button id="close" onClick={this.props.closePopup}>
                        <CloseIcon></CloseIcon>{" "}
                    </button>
                    <h2 id="confirmation">
                        Transcript has been successfully sent{" "}
                    </h2>
                </div>
            </div>
        );
    }
}
export default ConfirmationPopup;
