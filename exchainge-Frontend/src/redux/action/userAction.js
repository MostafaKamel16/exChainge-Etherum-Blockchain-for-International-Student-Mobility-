import { readPartnerUni, userLogin, registerUser, updatePartnerUnis } from "../../services/api";
import { authenticate } from "../../auth/auth";
import { getAllAccounts, getAccountInfo } from "../../services/blockchain/contractCalls";

export function signup(username, publicAddress, serverAddress) {
    function onSuccess(user) {
        console.log("Success" + user);
        return { type: "SIGNUP_SUCCESS", user };
    }

    function onFailure(error) {
        return { type: "SIGNUP_FAILURE", error };
    }

    function onUserAlreadyExists(error) {
        return { type: "SIGNUP_USER_EXISTS", error };
    }

    return async (dispatch) => {
        try {
            //const user = await readUser(publicAddress);
            // if (username !== user.username) {
            const data = await registerUser(publicAddress, username, serverAddress);
            if (data) {
                updatePartnerUniList(data.token);
                dispatch(onSuccess({ username: data.username, metamask_address: data.metamask_address }));
                console.log(data)
                authenticate(data);
            } else dispatch(onUserAlreadyExists("User resgistered already"));
        } catch (e) {
            if (e === 401) {
                dispatch(onFailure(e));
            } else {
                dispatch(onUserAlreadyExists(e));
            }
        }
    };
}

export function login(signData) {
    function onSuccess(user) {
        console.log("Success" + user);
        return { type: "LOGIN_SUCCESS", user };
    }

    function onFailure(error) {
        return { type: "LOGIN_FAILURE", error };
    }

    function onUserNotFound(error) {
        return { type: "LOGIN_USER_NOT_FOUND", error };
    }

    return async (dispatch) => {
        try {
            const data = await userLogin(
                signData.publicAddress,
                signData.signature
            );
            const { user } = data;
            const resp = user.metamask_address.toLowerCase() === signData.publicAddress.toLowerCase();
            if (resp) {
                await updatePartnerUniList(data.token);
                dispatch(onSuccess({ username: user.username, metamask_address: user.metamask_address }));
                authenticate(data);
            }
            else dispatch(onUserNotFound("User not present"));
        } catch (e) {
            if (e === 401) {
                dispatch(onFailure(e));
            } else {
                dispatch(onUserNotFound(e));
            }
        }
    };
}

const updatePartnerUniList = async (token) => {
    const blockchainList = await getAllAccounts();
    const storedUnis = await readPartnerUni(token);
    console.log('stored accs', storedUnis);

    var userList = [];
    for (var i = storedUnis.length; i !== blockchainList.length; ++i) {
        const blockchainAddress = blockchainList[i];
        const res = await getAccountInfo(blockchainAddress);
        userList.push({ partner_university: res.name, server_address: res.serverAddress, blockchain_address: blockchainAddress });
    }

    console.log('new accs', userList);
    const res = await updatePartnerUnis(userList, token);
    console.log('all accs', res);
    await localStorage.setItem('partnerUnis', JSON.stringify(res));
}
