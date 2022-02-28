let fs = require("fs");
const path = require('path');
const solc = require('solc');

let Web3 = require('web3');
let web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'), undefined, { transactionConfirmationBlocks: 1 });

const Contract = require('web3-eth-contract');
Contract.setProvider('http://localhost:8545');


function createContract(abi) {
    return new Contract(abi);
}

function createContract(abi, address) {
    return new Contract(abi, address);
}

function compileContract(name, importLocation) {
    console.log("Compiling contract...");
    
    const file = name + '.sol';
    let contractPath = path.resolve(__dirname, 'contracts', file);
    let source = fs.readFileSync(contractPath, 'utf-8');
    
    var sources = {
        [file]: {
            content: source
        },
        "interfaces/IAccountStore.sol": {
            content: fs.readFileSync(path.resolve(__dirname, 'contracts', 'interfaces', 'IAccountStore.sol'), 'utf8')
        },
        "@openzeppelin/contracts/access/Ownable.sol": {
            content: fs.readFileSync(path.resolve('./node_modules/@openzeppelin/contracts/access/Ownable.sol'), 'utf8')
        },
        "@openzeppelin/contracts/utils/Context.sol": {
            content: fs.readFileSync(path.resolve('./node_modules/@openzeppelin/contracts/utils/Context.sol'), 'utf8')
        },
    };
    const input = {
        language: 'Solidity',
        sources,
        settings: {
            optimizer: {
                enabled: true
            },
            outputSelection: {
                '*': {
                    '*': ['*']
                }
            }
        }
    };


    const findImports = (dir) => {
        return {
            // contents: fs.readFileSync(path.resolve(__dirname, 'contracts', importLocation)).toString()
            contents: fs.readFileSync(path.resolve(importLocation)).toString()
        };
    };
    // const findImports = (dir) => {
    //     const files = walkSync(dir);
    //     return (fileName) => {
    //         const fileNames = Object.keys(files);
    //         for (const key in files) {
    //             if (key.indexOf(fileName) > -1) {
    //                 return { contents: files[key].toString() };
    //             }
    //         }
    //         return { error: fileName + 'not Found' };
    //     };
    // };
// 
//     const walkSync = (dir, filelist) => {
//         var fs = fs || require('fs'),
//             files = fs.readdirSync(dir);
//         filelist = filelist || [];
//         files.forEach(function (file) {
//             if (fs.statSync(dir + '/' + file).isDirectory()) {
//                 console.log('Directory:', dir + '/' + file);
//                 filelist = walkSync(dir + '/' + file, filelist);
//             }
//             else {
//                 if (file.indexOf('.sol') > 0) {
//                     console.log('File: ', dir + '/' + file);
//                     // filelist.push({[file]: fs.readFileSync(dir + '/' + file, 'utf-8')});
//                     filelist[dir + '/' + file] = fs.readFileSync(dir + '/' + file, 'utf-8');
//                 }
//             }
//         });
//         return filelist;
//     };

    var compiledData;
    // if (importLocation == "") {
        compiledData = solc.compile(JSON.stringify(input));
    // } else {
    //     compiledData = solc.compile(JSON.stringify(input), { import: findImports });
    // }

    const output = JSON.parse(compiledData);
    return output.contracts[file][name];
}

function getABI(compiledContract) {
    return compiledContract.abi;
}

function getBytecode(compiledContract) {
    return '0x' + compiledContract.evm.bytecode.object;
}

async function getCoinbase() {
    var accounts = await web3.eth.getAccounts();
    var coinbase = accounts[0];
    web3.eth.defaultAccount = coinbase;
    return coinbase;
}

async function unlockAccount() {
    const coinbase = await getCoinbase();
    console.log("Unlocking coinbase account");
    const password = "123456";
    try {
        web3.eth.personal.unlockAccount(coinbase, password, 0);
    } catch (e) {
        console.log(e);
        return;
    }
}

module.exports = {
    createContract,
    compileContract,
    getABI,
    getBytecode,
    getCoinbase,
    unlockAccount,
};