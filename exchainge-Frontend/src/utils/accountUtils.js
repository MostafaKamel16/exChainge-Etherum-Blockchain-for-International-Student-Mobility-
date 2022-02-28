import { getBalance, getCurrentAccount, minWeiBalance } from "../services/blockchain/util";
import { transferFund } from "../services/blockchain/nodeCalls";
import hash from "object-hash";

export const fundAccount = async () => {
    const account = getCurrentAccount();
    const balance = parseInt(await getBalance());
    if (balance < minWeiBalance) {
        await transferFund(account);
    }
};

export const hashTranscripts = (transcripts) => {
    const data = transcripts.length === 1 ? transcripts[0] : transcripts;
    return hash(data, {
        unorderedArrays: true, unorderedObjects: true, respectType: false, respectFunctionProperties: false,
        respectFunctionNames: false, excludeKeys: (key) => {
            return key === '_id' || key === '__v' || key === 'index' || key === 'batched';
        }
    });
};