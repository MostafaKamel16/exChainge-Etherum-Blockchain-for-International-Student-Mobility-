import Web3 from "web3";
import { sendTransaction, callMethod } from "./util";

var web3 = new Web3(window.ethereum);

const accountStoreAbi = require("../../contracts-abi/AccountStore.json");
const accountStore = new web3.eth.Contract(
    JSON.parse(JSON.stringify(accountStoreAbi)),
    process.env.REACT_APP_ACCOUNT_STORE_ADDRESS.toLowerCase()
);

const hashStoreAbi = require("../../contracts-abi/HashStore.json");
const hashStore = new web3.eth.Contract(
    JSON.parse(JSON.stringify(hashStoreAbi)),
    process.env.REACT_APP_HASH_STORE_ADDRESS.toLowerCase()
);

// main methods

export const registerAccount = async (name, serverAddress) => {
    console.log(`Registering account ${serverAddress} of ${name} on the blockchain...`);

    const info = { name: name, serverAddress: serverAddress };
    const encoded = accountStore.methods.register(info).encodeABI();
    const rec = await sendTransaction(accountStore._address, encoded);

    if (!rec.status) {
        throw new Error("Failed to register account on the blockchain (Exists already)");
    }
    console.log(`Account ${serverAddress} of ${name} is registered on the blockchain`);
};

export const sendTranscript = async (hash, receiverAddress) => {
    console.log(`Storing transcript hash on the blockchain...`);

    const encoded = hashStore.methods.store(hash, receiverAddress).encodeABI();
    const rec = await sendTransaction(hashStore._address, encoded);

    if (!rec.status) {
        throw new Error("Failed to send transcript");
    }

    const log = rec.logs[0];
    const res = web3.eth.abi.decodeParameters(['string', 'uint256'], log.data);
    const index = res[1];
    console.log(`Hash stored. Accessible by ${receiverAddress} using index ${index}`);
    return index;
};

export const verifyTranscript = async (hash, index) => {
    console.log(`Verifying transcript ${hash}`);
    const encoded = hashStore.methods.validate(hash, index).encodeABI();
    const res = await callMethod(hashStore._address, encoded);
    return web3.eth.abi.decodeParameter('bool', res);
};


// other methods

export const getReceivedTransactionsCount = async () => {
    const encoded = hashStore.methods.getHashesLength().encodeABI();
    const res = await callMethod(hashStore._address, encoded);
    return web3.eth.abi.decodeParameter('uint256', res);
};

export const getAllAccounts = async () => {
    const encoded = accountStore.methods.getAllAccounts().encodeABI();
    console.log("test 21",encoded)

    const res = await callMethod(accountStore._address, encoded);
    console.log("test",res)
    return web3.eth.abi.decodeParameter('address[]', res);
}

export const getAccountInfo = async (address) => {
    const encoded = accountStore.methods.accountInfo(address).encodeABI();
    const res = await callMethod(accountStore._address, encoded);
    const r = web3.eth.abi.decodeParameters(['string', 'string'], res);
    return {name: r[0], serverAddress: r[1]};
}

export const checkAccountExists = async (address) => {
    const encoded = accountStore.methods.accountExists(address).encodeABI();
    const res = await callMethod(accountStore._address, encoded);
    return web3.eth.abi.decodeParameter('bool', res);
};
