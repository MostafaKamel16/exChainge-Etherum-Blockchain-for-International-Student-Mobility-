FROM ethereum/client-go:v1.10.1

# install python and packages
RUN apk add --no-cache python3 py3-pip
RUN pip3 install python-dotenv

ARG ACCOUNT_PASSWORD

# restart blockchain
# RUN rm -f /tmp
# RUN mkdir /tmp

RUN rm -f ~/.ethereum/geth/nodekey
# https://ethereum.stackexchange.com/questions/60394/all-geth-nodes-getting-the-same-enode-id

RUN echo $ACCOUNT_PASSWORD > /tmp/password.txt
RUN geth account new --password /tmp/password.txt > /tmp/account1.txt

COPY init.py /tmp
# COPY .env /tmp
RUN python3 /tmp/init.py

# todo use wallet_address
# ARG WALLET_ADDRESS
# RUN geth --unlock $WALLET_ADDRESS --password /tmp/password.txt
# RUN rm -f /tmp/password.txt

RUN geth init /tmp/genesis.json

RUN rm -f ~/.ethereum/geth/nodekey

# CMD exec geth --http --http.corsdomain="chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn" --http.vhosts "*" --miner.etherbase ${WALLET_ADDRESS}
#     --mine --fast --cache=1024

ENTRYPOINT [ "geth" ]