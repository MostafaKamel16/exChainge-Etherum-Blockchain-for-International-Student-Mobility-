const util = require('../util');
const assert = require('assert');

const address = process.argv[2]; // address of the deployed contract

const compiledContract = util.compileContract('AccountStore', 'interfaces/IAccountStore.sol');
const abi = util.getABI(compiledContract);
const contract = util.createContract(abi, address);

testAccountStore();

async function testAccountStore() {
    const coinbase = await util.getCoinbase();
    contract.defaultAccount = coinbase;
    await util.unlockAccount();

    assert(!await contract.methods.accountExists(coinbase).call());
    console.log("Testing registration...");
    const info = {name: "uni1", serverAddress: "http://localhost:3000"};
    await contract.methods.register(info).send({ from: coinbase });
    assert(await contract.methods.accountExists(coinbase).call());

    console.log("Testing deregistration...");
    await contract.methods.deregister().send({ from: coinbase });
    assert(!await contract.methods.accountExists(coinbase).call());
    console.log("All tests successful");
}

