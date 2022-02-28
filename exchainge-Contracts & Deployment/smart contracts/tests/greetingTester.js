const util = require('../util');
const assert = require('assert');

const address = process.argv[2]; // address of the deployed contract

const compiledContract = util.compileContract('HelloWorld');
const abi = util.getABI(compiledContract);
const contract = util.createContract(abi, address);

testHelloWorld();

async function testHelloWorld() {
    const coinbase = await util.getCoinbase();
    contract.defaultAccount = coinbase;
    await util.unlockAccount();

    console.log("Testing first greeting...");
    console.log("Setting greeting to 'Hello'");
    var res = await contract.methods.setGreeting("Hello").send({ from: coinbase });
    console.log("Greeting set to 'Hello'");
    console.log("Retrieving greeting...'");
    res = await contract.methods.getGreeting().call();
    console.log("Retrieved greeting:", res);
    assert("Hello" === res);

    console.log("Testing second greeting...");
    await contract.methods.setGreeting("Hey").send({ from: coinbase });
    assert("Hey" === await contract.methods.getGreeting().call());
    console.log("All tests successful");
}

