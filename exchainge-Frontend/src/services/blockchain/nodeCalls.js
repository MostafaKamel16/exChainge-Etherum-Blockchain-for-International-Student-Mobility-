import Web3 from "web3";
import { weiFundString } from "./util";

// transfer funds to newly created accounts
export const transferFund = async (address) => {
    const web3 = new Web3(process.env.REACT_APP_LOCAL_BLOCKCHAIN_NODE_URL);
    const coinbase = await web3.eth.getCoinbase();
    console.log(coinbase, process.env.REACT_APP_LOCAL_COINBASE_PASSWORD)
    await web3.eth.personal.unlockAccount(coinbase, process.env.REACT_APP_LOCAL_COINBASE_PASSWORD);
    await web3.eth.sendTransaction({
        from: coinbase,
        to: address,
        value: weiFundString
    }).then((receipt) => {
        console.log('Funded account', address);
    });
};