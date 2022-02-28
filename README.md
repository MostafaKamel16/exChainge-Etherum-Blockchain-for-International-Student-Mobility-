# ExChainge - Ethereum Blockchain for Student Exchange

Exchainge is a prototype for digital academic credential management based on distributed ledger technology to facilitate student exchange between the participating universities by making the process of sending and verifying of transcripts more secure and transparent using Blockchain Technology.

It consist of 4 components 

# 1) Mobility Blockchain Backend Blockchain

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

# 2)Ethereum Lite Explorer by Alethio
The **Lite Explorer**  is a client-side only web application that connects directly to a [Ethereum JSON RPC](https://github.com/ethereum/wiki/wiki/JSON-RPC) compatible node.


## Technical Details

The project is built on a React/MobX and TypeScript stack, using the [Alethio CMS](https://github.com/Alethio/cms), which allows us to add extensions dynamically through 3rd party plugins.
The basic functionality of the explorer is implemented via a series of open-source [core plugins](https://github.com/Alethio/explorer-core-plugins), which we also use internally for our [aleth.io](https://aleth.io) platform. Please refer to [Alethio CMS](https://github.com/Alethio/cms) for documentation on the plugin system.

### Project structure
```
📁ethereum-lite-explorer
├─📁dev             - dev server for serving the app
├─📁dist            - target folder for application that contains deployables
└─📁src             - source files
  ├─📁app (*1)      - application source code
  ├─📁assets        - static assets (e.g. images) that will be bundled together with the application
  └─📁public        - contains static assets that are copied to the dist folder as they are

(*1)
📁app
├─📁components      - React components
├─📁translation     - localized strings
├─📁util            - application-agnostic utilities. Ideally these would be in a separate repo/package.
└─📄index.ts         - entry point
```

## Getting started

### Prerequisites
Please make sure you have the following installed and running properly
- [Node.js](https://nodejs.org/en/download/) >= 8.0 or [Docker](https://www.docker.com/)
- If building it you will also need NPM >= 6.9 (NPM is distributed with Node.js. For more information see: https://www.npmjs.com/get-npm)
- A JSON-RPC enabled and accessible Ethereum Client, some examples:
    * [An Infura Account](#with-infura)
    * [Parity Light Client](#with-parity-light-client)
    * [Ganache](#with-ganache)
    * [Besu Dev Mode](#with-besu) - private chain example
- If not using the pre-built Docker images, you will need an HTTP server for serving the app and it must be deployed at the root of the domain/subdomain.

### Configuration

The application requires a JSON configuration file which is loaded at runtime but with different approaches for `development` vs `production` environments.

For `development` the config file is called `config.dev.json` located in the root of the repository.
As for the `production` environment the config file is copied in the `dist` folder and renamed to `config.json`.

The `dist` is the target folder for the built application that needs to be served by an HTTP server.

Here are 3 sample config files as starting point.

| Config name | Description |
| --- | --- |
| config.default.json | Default configuration file which contains the core plugins of the app that are enough to run the explorer. |
| config.ibft2.json | Configuration file that has the default core plugins plus an extra one useful for [IBFT2 based chains](https://pegasys.tech/another-day-another-consensus-algorithm-why-ibft-2-0/) that decodes the extraData field of a block. |
| config.memento.json | Configuration file that has the default core plugins plus the memento plugins to use the Memento API as a data source |

The possibility to change the URL of the RPC enabled Ethereum node is done through the `eth-lite` core plugin.
See the [`nodeUrl`](https://github.com/Alethio/ethereum-lite-explorer/blob/master/config.default.json#L16) attribute for the plugin which has the default value set to `https://mainnet.infura.io/`.

For advanced configuration editing, please refer to the [Alethio CMS documentation](https://github.com/Alethio/cms)

### Running in Docker
You can run the Lite Explorer in Docker by using the already published images on [Docker Hub](https://hub.docker.com/r/alethio/ethereum-lite-explorer).
The config file in the Docker images have the default values from the `config.default.json` sample file.
By default it will connect to `https://mainnet.infura.io/`.

The simplest command to run it is
```sh
$ docker run -p 80:80 alethio/ethereum-lite-explorer
```
which will start a container on port 80 of your computer with a nginx embedded to serve the pre-build explorer. You can now open [localhost](http://localhost) in your browser and use it.

There are 2 env vars that can be passed in at runtime:

| ENV var | Description |
|---|---|
| APP_NODE_URL | URL of RPC enabled node. (e.g. `https://host:port`, also supports Basic Auth by prepending `user:pass@` to the `host`). This overrides in the config file the `nodeUrl` attribute of the `eth-lite` core plugin. |
| APP_BASE_URL | It is used ONLY in `index.html` for `og:tags` (e.g. `https://my.app.tld`). Overrides build time defined value. |

For example if you want to connect to your node on localhost with all default configs run the following command:
```sh
$ docker run -p 80:80 -e APP_NODE_URL="http://localhost:8545" alethio/ethereum-lite-explorer
```
If more customization is needed, a full configuration file can be mounted in the application root (e.g. in the `/usr/share/nginx/html` folder).
```sh
$ docker run -p 80:80 -v /your-config-dir/config.json:/usr/share/nginx/html/config.json alethio/ethereum-lite-explorer
```
### Running in Kubernetes
You can deploy the Lite Explorer in Kubernetes using the following steps:
- `cd .kubernetes`
- Run `./deploy.sh` to deploy, uses `config.default.json` as config.
- Use for example `./deploy.sh ../config.memento.json` to select other config files.
- Run `./remove.sh` to remove


### Building from source
Clone the explorer in a folder of your choosing
```sh
$ git clone https://github.com/Alethio/ethereum-lite-explorer.git
$ cd ethereum-lite-explorer
```

**IMPORTANT**: Make sure you are using npm 6.9+ for the next step. Older versions will NOT work due to `alias` feature usages introduced in npm 6.9.

Install npm packages
```sh
$ npm install
```

Copy the sample config file
```sh
$ cp config.default.json config.dev.json
```
Make necessary modifications into `config.dev.json` if needed. For development, you must also remove the version query strings `?v=#.#.#` from the `"plugins"` URIs. Full list of configuration options available [here](#configuration)

To start the development build run the following command:
```sh
$ npm run watch
```

This terminal will be kept open, as the above command continuously watches the source files for changes and triggers an incremental build on every change.

Alternatively, to build the minified version (used also for `production`) use:
```sh
$ npm run build
```

Since the app is using the Alethio CMS for using the core plugins the next step is to install them:
```sh
$ npm i -g @alethio/cms-plugin-tool
$ acp install --dev \
    @alethio/explorer-plugin-eth-common \
    @alethio/explorer-plugin-eth-lite \
    @alethio/explorer-plugin-eth-memento \
    @alethio/explorer-plugin-3box
```

If you need other custom plugins like for example to decode the extraData field of a block for the IBFT2 based networks, you can install them at this step:
```sh
$ acp install --dev @alethio/explorer-plugin-eth-ibft2
```

The above command `acp` installs the plugins in the `dist` folder. Basically they will be copied, together with the base app.

**IMPORTANT**: Whenever you use `npm run build` or `npm run build-dev` the `dist` folder is emptied, thus the plugins are also deleted and they need to be reinstalled.

Finally, you can start the local Explorer development server with
```sh
$ npm start
```

#### Deploying the built assets to production

When building from source, you are responsible for setting up your own production environment. There are two available options: you can either start from our existing Dockerfile found in the root of the repo and customize that, or you can use your own custom solution.

For a custom deployment, first make sure you have built the Explorer distributables for production, using `npm run build`. Assuming you already have a web server, such as Nginx, you will need to copy everything from the `dist/` folder to the public folder of the web server (e.g. /usr/share/nginx/html). Then, in the same target folder you need a valid `config.json` file. Note the filename, which is different from the development version. You can use the `config.*.json` from the root of the repo as templates. Make sure to also fill in the `nodeUrl` in the `eth-lite` plugin config section. Lastly, make sure that your web server redirects all routes to the `index.html` to enable HTML5 routing. You can refer to `.docker/nginx.conf` as an example.

# 3)Mobility Blockchain Backend

Backend for the SEBA Lab blockchain project.

# How to start up the REST API
Fetch the config
    
    Copy the config.js from the story: https://gitlab.lrz.de/student-mobility-seba/mobility-blockchain-backend/-/issues/4
    and add it to the directory ./express/src/

Build

    $ npm install

Run

    $ cd express
    $ npm start

# API Endpoints Examples
1. Create new User


    POST http://localhost:4003/user/create
   
     Payload:
     {
     "username": "test-6",
     "metamask_address": "random"
     }

     Response: 201 Created
     {
     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
     "username": "test-6",
     "metamask_address": "random",
     "nonce": "7601"
     }


2. User login


    POST http://localhost:4003/user/login
   
    Payload:
    {
    "username": "test-6",
    "metamask_address": "random"
    "sign": "random_sign"
    }
   
    Response: 200 OK
    {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
    "username": "test-6",
    "metamask_address": "random",
    "nonce": "7601"
    }
   

3. Read Nonce

    
    GET http://localhost:4003/user/nonce/metamask_address
   
    Response: 200 OK
    3532
   

4. Create Transcript 


    POST http://localhost:4003/transcript/create
    
    Payload:
    {
       "sending_university_username": "test-3",
       "receiving_university_username": "test-user",
       "semester": "WIN2021_22",
       "university": "TUM",
       "student_id": "ge45mnd",
       "subject_grades": [{
            "subject_name": "SEBA Lab",
            "subject_code": "IN2031",
            "grade": "4,3",
            "passing_status": "FAILED"
       }]
    }
   

