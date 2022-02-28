const util = require('./util');
const fs = require('fs');

const contractName = process.argv[2]; // name of the contract, filename must be contractName.sol and file must be inside contracts folder
const arg = process.argv[3] || ""; // deployment arg
const importLocation = "";//process.argv[4] ?? ""; // relative location of import, e.g. interfaces/IAccountStore.sol

const compiledContract = util.compileContract(contractName, importLocation);
const abi = util.getABI(compiledContract);
const bytecode = util.getBytecode(compiledContract);
const contract = util.createContract(abi);

fs.writeFile(`abi/${contractName}.json`, JSON.stringify(abi), 'utf8', function (err) {
    if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
    }
});

deploy();

async function deploy() {
    const coinbase = await util.getCoinbase();
    contract.defaultAccount = coinbase;
    await util.unlockAccount();

    console.log("Deploying the contract");
    const newContractInstance = await contract.deploy({
        data: bytecode,
        arguments: arg.length == 0 ? [] : [arg],
    }).send({
        from: coinbase,
        gas: 1500000,
        gasPrice: '300000000000'
    }, function (error, transactionHash) {
        if (error !== null) {
            console.log("error: " + error);
        }
        console.log("Transaction hash: " + transactionHash);
    }).on('receipt', function (receipt) {
        console.log("Deployed contract at address: " + receipt.contractAddress);
    });

    console.log("Successful deployment");
}