const util = require('../util');
const assert = require('assert');

const address = process.argv[2]; // address of the deployed contract
const addressAS = process.argv[3]; // address of the accountstore

const compiledContract = util.compileContract('HashStore', 'interfaces/IAccountStore.sol');
const abi = util.getABI(compiledContract);
const contract = util.createContract(abi, address);

testHashStore();

async function testHashStore() {
    const coinbase = await util.getCoinbase();
    contract.defaultAccount = coinbase;
    await util.unlockAccount();

    console.log("Registering account on AccountStore..");
    const compiledContractAS = util.compileContract('AccountStore', 'interfaces/IAccountStore.sol');
    const abiAS = util.getABI(compiledContractAS);
    const contractAS = util.createContract(abiAS, addressAS);

    const accountExists = await contractAS.methods.accountExists(coinbase).call();
    if (!accountExists) {
        await contractAS.methods.register().send({ from: coinbase });
    }

    const transcript = {
        studentName: "test_student",
        subject: {
            name: "test_subject",
            grade: 2,
        }
    }

    const fakeTranscript = {
        studentName: "test_student",
        subject: {
            name: "test_subject",
            grade: 3,
        }
    }

    const length = await contract.methods.getHashesLength().call();
    console.log("length:" + length);

    // TODO fix
    // assert(await contract.methods.getHashesLength().call() === 0);

    // TODO fix issue with return value, check events
    // console.log("Testing storing...");
    // const index = await contract.methods.store(transcript, coinbase).send({from: coinbase});
    // console.log(index)
    // assert(await contract.methods.getHashesLength().call() === length + 1);

    // console.log("Testing validating...");
    // assert(await contract.methods.validate(transcript, index).send({from: coinbase}));
    // assert(await !contract.methods.validate(fakeTranscript, index).send({ from: coinbase }));
    // console.log("All tests successful");
}
