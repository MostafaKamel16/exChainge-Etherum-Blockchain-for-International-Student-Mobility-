# Mobility Blockchain Backend Blockchain

Blockchain contracts and chain setup for the SEBA Lab blockchain project.

# Mobility Blockchain Setup

Setup the chain locally:
`docker-compose up -d`

Add `--build` to the previous command after changing the Dockerfile, in order to avoid using cached results.

The endpoint for the rpc request can be accessed at localhost:8545

Close the blockchain: `docker-compose down`

If the commands fail, try running them with `sudo`.

## Helpful commands

Access terminal: `docker exec -it ${CONTAINER_NAME} /bin/sh`

container names of the different nodes: 
- container_geth-rpc-endpoint_1
- container_geth-miner_1
- container_geth-bootnode_1

### Geth commands

Open console and attach to open session: `geth attach`

Show list of accounts: `geth account list`

Reset blockchain: `geth removedb`

### JS commands

After opening a JS console through geth, the following commands can be used:

Check latest block mined: `eth.blockNumber`

See if the blockchain is up-to-date: `eth.syncing`

Get block data: `eth.getBlock(${BLOCK_NUMBER})`
`"latest"` can be used instead of BLOCK_NUMBER

#### Account

Show list of accounts: `eth.accounts`

Address of the main account: `eth.coinbase`

Unlock an account: `personal.unlockAccount(${ACCOUNT}, ${PASSWORD}, 0)`

Check account balance: `eth.getBalance(${ACCOUNT})`

#### Mining

The miner node starts mining automatically. If issues arise with mining, you can try stopping and starting again. Should be run on the miner node. **If the miner fails to run, make sure that the value of the `unlock` argument of the miner inside the docker compose file is set to the coinbase account**.

Check if blocks are being mined: `eth.mining`

Stop mining: `miner.stop()`

Start mining: `miner.start()`
