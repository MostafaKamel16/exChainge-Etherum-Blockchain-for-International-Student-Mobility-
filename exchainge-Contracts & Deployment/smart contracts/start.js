const Web3 = require('web3');

const rpcURL = "ws://localhost:8545";

const address = "0x6c7e0957fa59f03b131bc941f8591e58bafe2a65";

const web3 = new Web3(rpcURL);

const balance = web3.eth.getBalance(address).then(console.log);


// const abi = [];
// const contract = new web3.eth.Contract(abi, address);


// DEPLOY TEST CONTRACT
// https://medium.com/coinmonks/deploy-your-first-private-ethereum-smart-contract-using-geth-and-web3-js-2e495c1aadf4
var ownerContractCompiled = { "contracts": { "Owner.sol:Owner": { "abi": "[{\"inputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"oldOwner\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"newOwner\",\"type\":\"address\"}],\"name\":\"OwnerSet\",\"type\":\"event\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"newOwner\",\"type\":\"address\"}],\"name\":\"changeOwner\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"getOwner\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"}]", "bin": "608060405234801561001057600080fd5b50336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167f342827c97908e5e2f71151c08502a66d44b6f758e3ac2f1de95f02eb95f0a73560405160405180910390a36102a8806100dc6000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063893d20e81461003b578063a6f9dae114610085575b600080fd5b6100436100c9565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6100c76004803603602081101561009b57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506100f2565b005b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146101b4576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260138152602001807f43616c6c6572206973206e6f74206f776e65720000000000000000000000000081525060200191505060405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff166000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f342827c97908e5e2f71151c08502a66d44b6f758e3ac2f1de95f02eb95f0a73560405160405180910390a3806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505056fea26469706673582212209cdc3f74dd170c7513c9408f4f408e42b9f43da5e5e5ddb24facbd03b25cc22b64736f6c63430006060033" } }, "version": "0.6.6+commit.6c089d02.Linux.g++" };

typeof ownerContractCompiled.contracts["Owner.sol:Owner"].abi // string
var ownerContract = eth.contract(JSON.parse(ownerContractCompiled.contracts["Owner.sol:Owner"].abi))
eth.mining // true
eth.coinbase // same
var deployTransactionObject = { from: eth.coinbase, data: "0x" + ownerContractCompiled.contracts["Owner.sol:Owner"].bin, gas: 1000000 }
personal.unlockAccount(eth.coinbase); // password
var ownerContractInstance = ownerContract.new(deployTransactionObject)

ownerContractInstance // abi

eth.getTransactionReceipt(ownerContractInstance.transactionHash); // blockhash

var ownerContractAddress = eth.getTransactionReceipt(ownerContractInstance.transactionHash).contractAddress

ownerContractAddress // address

var ownerContractInstance = ownerContract.at(ownerContractAddress)