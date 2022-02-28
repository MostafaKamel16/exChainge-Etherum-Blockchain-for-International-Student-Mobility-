import Web3 from "web3";

var wl = window.ethereum;
var web3;
var account;

// should be called the first time Metamask is needed
export const startService = async () => {
    if (!wl) {
        window.alert("Please install MetaMask first.");
        return;
    }
    if (!web3) {
        try {
            // Request account access if needed
            await wl.enable();

            // We don't know window.web3 version, so we use our own instance of Web3
            // with the injected provider given by MetaMask
            web3 = new Web3(wl);
        } catch (error) {
            window.alert("You need to allow MetaMask.");
            return;
        }
    }
    const coinbase = await web3.eth.getCoinbase();
    if (!coinbase) {
        window.alert("Please activate MetaMask first.");
        return;
    }

    // set account to the account currently connected
    account = (await web3.eth.getAccounts())[0];
};

export const getCurrentAccount = () => {
    return account;
};

export const getBalance = async () => {
    return await web3.eth.getBalance(account);
}

export const signNonce = async (nonce) => {
    return await web3.eth.personal.sign(
        `I am signing my one-time nonce: ${nonce}`,
        getCurrentAccount(),
        "" // MetaMask will ignore the password argument here
    );
};

export const sendTransaction = async (contractAddress, encodedData) => {
    const txHash = await ethRequest('eth_sendTransaction', contractAddress, encodedData);
    console.log('Transaction hash', txHash);
    return await getTransactionReceipt(txHash);
};

export const getTransactionReceipt = (hash) => {
    return new Promise((resolve, reject) => {
        const interval = setInterval(async () => {
            console.log("Attempting to get transaction receipt...");
            const rec = await web3.eth.getTransactionReceipt(hash);
            if (rec) {
                console.log('found receipt');
                clearInterval(interval);
                resolve(rec);
            }
        }, 1000);
    });
};

export const callMethod = async (contractAddress, encodedData) => {
    return await ethRequest('eth_call', contractAddress, encodedData);
};

export const ethRequest = (method, toAddress, data) => {
    const account = getCurrentAccount();
    return wl.request({
        method: method,
        params: [
            {
                from: account,
                to: toAddress,
                data: data,
            }
        ]
    });
};

export const minWeiBalance = 0x5AF3107A4000; // 0.0001eth
export const weiFundString = "0x2386F26FC10000"; // 0.01eth (enough for ~1000 transactions)
