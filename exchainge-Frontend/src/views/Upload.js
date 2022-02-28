import "../App.css";
import { Button } from "@mui/material";
import React from "react";
import AppNavBar from "../component/AppNavBar";
import Spinner from "../component/Spinner";

import { DropzoneAreaBase } from 'material-ui-dropzone';
import SelectionList from "../component/SelectionList";
import { storeInternalTranscripts } from "../services/api";
import Snackbar from '@mui/material/Snackbar';
import { sendTranscript } from "../services/blockchain/contractCalls";
import { startService } from "../services/blockchain/util";
import { hashTranscripts } from "../utils/accountUtils";

function Upload(props) {
    const [selectedUniIndex, setSelectedUniIndex] = React.useState(-1);
    const [spinnerMessage, setSpinnerMessage] = React.useState("");

    const [showToast, setShowToast] = React.useState(false);
    const [uploadedFile, setUploadedFile] = React.useState(null);
    const [selectedFile, setSelectedFile] = React.useState({});

    const [receiverList, setReceiverList] = React.useState(JSON.parse(localStorage.getItem('partnerUnis')));

    const handleselectedFileDropzone = async (event) => {
        console.log(event[0].file);
        var file = event[0].file;
        var reader = new FileReader();
        reader.onload = async (event) => {
            console.log(event.target.result);
            setUploadedFile(event.target.result);
        };
        reader.readAsText(file);
        setSelectedFile(event[0].file);
    };

    const handleSendLater = async () => {
        const file = JSON.parse(uploadedFile);
        file.batched = true;

        await storeInternalTranscripts([file]);
        console.log("Stored transcript locally");

        setShowToast(true);
    };

    const handleSendNow = async () => {
        const receiverUni = receiverList[selectedUniIndex];

        await startService();

        const file = JSON.parse(uploadedFile);
        //const transcriptHash = hashTranscript(file);
        const transcriptHash = hashTranscripts(file);

        try {
            console.log("this is the hash",transcriptHash)
            const index = await sendTranscript(transcriptHash, receiverUni.blockchain_address);
            
            file.index = index;
            console.log('file', file);

            await storeInternalTranscripts([file]);
            setSpinnerMessage("Sending file...");
            await postToServer(receiverUni.server_address, [file]);
            setSpinnerMessage("");
            setShowToast(true);
        } catch (e) {
            console.log(e);
        }
    };

    const postToServer = async (address, data) => {
        const response = await fetch(address, {
            'method': "POST",
            'headers': {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            'body': JSON.stringify(data),
        });
        console.log('Sent transcript to the foreign university server');
        return response;
    };

    const onSendNow = async () => {
        setSpinnerMessage("Sending transcripts..");
        await handleSendNow()
        setSpinnerMessage("");
    };

    return (
        <container>
            <Spinner message={spinnerMessage} />
            <AppNavBar />

            <h1 id="title2">exChainge</h1>
            <div id="subTitle2">Upload your transcripts and send it to the exchange university easily and safely </div>

            <div id="dropDown2">
                <DropzoneAreaBase onAdd={handleselectedFileDropzone} />
                <p></p>
                {uploadedFile !== null && receiverList !== null && (
                    <>
                        <h3>Uploaded file: {selectedFile.name}</h3>
                        <SelectionList options={receiverList} selection={selectedUniIndex} setSelection={setSelectedUniIndex} />
                    </>
                )}
                <p></p>
                {selectedUniIndex !== -1 &&
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
                        <Button onClick={handleSendLater} style={{ backgroundColor: "rgb(53, 110, 255)" }} variant="contained">Send Later</Button>
                        <Button onClick={onSendNow} style={{ backgroundColor: "rgb(53, 110, 255)" }} variant="contained">Send Now</Button>
                    </div>
                }
            </div>

            <Snackbar
                open={showToast}
                autoHideDuration={3000}
                onClose={() => setShowToast(false)}
                message="Transcript sent"
            />
        </container>
    );
}
export default Upload;
