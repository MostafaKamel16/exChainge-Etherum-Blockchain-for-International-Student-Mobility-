import subprocess
import re
import dotenv
import os

# from https://github.com/regispietra/CreatePrivateEthereum/blob/master/pgeth.py

dotenv_file = dotenv.find_dotenv()
dotenv.load_dotenv(dotenv_file)

# genesis file, PoA
GENESIS = u"""{
  "config": {
    "chainId": 1379,
    "homesteadBlock": 0,
    "eip150Block": 0,
    "eip150Hash": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "eip155Block": 0,
    "eip158Block": 0,
    "byzantiumBlock": 0,
    "constantinopleBlock": 0,
    "petersburgBlock": 0,
    "istanbulBlock": 0,
    "clique": {
      "period": 15,
      "epoch": 30000
    }
  },
  "nonce": "0x0",
  "timestamp": "0x619fe2da",
  "extraData": "0x0000000000000000000000000000000000000000000000000000000000000000$ADDRESS$0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
  "gasLimit": "0x47b760",
  "difficulty": "0x1",
  "mixHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
  "coinbase": "0x0000000000000000000000000000000000000000",
  "alloc": {
    "0x$ADDRESS$": {
        "balance": "0x200000000000000000000000000000000000000000000000000000000000000"
    }
  },
  "number": "0x0",
  "gasUsed": "0x0",
  "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
  "baseFeePerGas": null
}"""

def getAddress():
    """Get the address of the account 0"""
    cmdListAccounts = ['geth', 'account', 'list']
    res = subprocess.check_output(cmdListAccounts).decode('utf-8')
    accountQty = len(res.split('\n')) - 1
    if accountQty == 0:
        return None
    line = res.split('\n')[0]
    regexp = re.search(u"{([0-9abcdefABCDEF]+)}", line)
    result = regexp.group(1)
    os.environ["WALLET_ADDRESS"] = result

    # TODO set wallet_address in .env file for use in docker_compose.yml (line 51)
    # dotenv.set_key(dotenv_file, "WALLET_ADDRESS", os.environ["WALLET_ADDRESS"])

def changeAddress():
    """Writes address in genesis file"""
    address = os.environ.get("WALLET_ADDRESS")
    txt = GENESIS.replace("$ADDRESS$", address)
    f = open("/tmp/genesis.json", "w+")
    f.write(txt)
    f.close()

def main():
    getAddress()
    changeAddress()

if __name__ == "__main__":
    main()
