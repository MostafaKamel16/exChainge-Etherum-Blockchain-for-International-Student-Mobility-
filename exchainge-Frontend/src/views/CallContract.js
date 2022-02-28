import web3 from '../web3';

const address = ''//address of contract on chain 

const abi = {} //application binary interface can be found in remix under compiled details 

export default new web3.eth.Contract(abi,address)