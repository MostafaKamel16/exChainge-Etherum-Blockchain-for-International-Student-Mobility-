export const readNonce = (publicAddress) => {
    return fetch(process.env.REACT_APP_LOCAL_SERVER_ADDRESS + `/user/nonce/${publicAddress.toLowerCase()}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err));
};

export const userLogin = (publicAddress, sign) => {
    return fetch(process.env.REACT_APP_LOCAL_SERVER_ADDRESS + `/user/login`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            sign: sign,
            metamask_address: publicAddress,
        }),
    })
        .then((response) => {
            const resp = response.json();
            return resp;
        })
        .catch((err) => console.log(err));
};

export const registerUser = (publicAddress, username, serverAddress) => {

    const data = {
        'username': username,
        'metamask_address': publicAddress,
        'nameServer_address': serverAddress
    }
    return fetch(process.env.REACT_APP_LOCAL_SERVER_ADDRESS + `/user/create`, {
        'method': "POST",
        'headers': {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        'body': JSON.stringify(data),
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err));
};

export const signout = () => {
    if (typeof window !== 'undefined') {

        const { token } = JSON.parse(localStorage.getItem('jwt'));
        window.localStorage.clear();
        return fetch(process.env.REACT_APP_LOCAL_SERVER_ADDRESS  + `/user/signout`, {
          method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        },
      })
          .then((response) => {
            console.log('signout', response);

            })
            .catch((err) => console.log(err));
    }
};

export const readUser = (publicAddress,token) => {
    return fetch(process.env.REACT_APP_LOCAL_SERVER_ADDRESS + `/user/${publicAddress}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err));
};

//To read all received trancritps(the ones that need to be verified)
export const readExternalTranscripts = async (token) => {
    return fetch(process.env.REACT_APP_LOCAL_SERVER_ADDRESS + `/transcript/verify/list`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err));
};

//To read all recieved trancritps(the ones that need to be verified)
export const readInternalTranscriptsbyId = async (token,id) => {
    return fetch(process.env.REACT_APP_LOCAL_SERVER_ADDRESS  + `/transcript/${id}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err));
};

//To update one of the received trancritps(the one that need to be verified)
export const updateTranscriptStatus = async (id, status,token) => {
    return fetch(process.env.REACT_APP_LOCAL_SERVER_ADDRESS + `/transcript/setUploaded`, {
        method: "PATCH",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            '_id': id,
            'status': status
        })
    }).then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err));
};


//To read a list of all internal transcripts(ones that need to be uploded/sent)
export const readInternalTranscripts = async (token) => {
    return fetch(process.env.REACT_APP_LOCAL_SERVER_ADDRESS + `/transcript/internalTranscripts/List`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err));
};

export const storeInternalTranscripts = async (files) => {
    return fetch(process.env.REACT_APP_LOCAL_SERVER_ADDRESS + '/transcript/internalTranscripts', {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(files),
    }).then((response) => {
        console.log(response);
    });
}

// to read partner University 
export const readPartnerUni = async (token) => {
    return fetch(process.env.REACT_APP_LOCAL_SERVER_ADDRESS  + `/partners/get`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    })
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            console.log(json.Unis)
            return json.Unis;
        })
        .catch((err) => console.log(err));
};

export const readPartnerUniList = async (token) => {
    return fetch(`${process.env.REACT_APP_LOCAL_SERVER_ADDRESS }/partners/get`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    })
        .then(async(response) => {
            const data = await response.json()
            let formattedData = [];
            for (let i = 0; i < data.Unis.length; i++) {
                formattedData.push([data.Unis[i].partner_university])
            }        
            return formattedData;
        })
        .catch((err) => console.log(err));
};

// to set and update the partner uni list 
export const updatePartnerUnis = (data, token) => {
    return fetch(process.env.REACT_APP_LOCAL_SERVER_ADDRESS  + `/partners/add`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            partnerUnis: data
        }),
    })
        .then(async(response) => {
            // localStorage.setItem("partnerUniList",response.json())
            // return response.json();
            const data = await readPartnerUni(token);
            await localStorage.setItem('partnerUnis', JSON.stringify(data.Unis));
            return data;
        })
        .catch((err) => console.log(err));
};

// to read stats on transcript count for a partner University 
export const getPartnerStats = async (uni,token) => {
    return fetch(process.env.REACT_APP_LOCAL_SERVER_ADDRESS  + `/partners/getStats/${uni}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err));
};


//sending transcripts to 2nd uni for now sending to ourself
export const sendTranscripts = async (files) => {
    return fetch(process.env.REACT_APP_LOCAL_SERVER_ADDRESS + '/transcript/create', {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(files),
    }).then((response) => {
        console.log(response.data);
    });
}


export const readBatchedByIndex = async (index,uni) => {
    return fetch(`${process.env.REACT_APP_LOCAL_SERVER_ADDRESS }/transcript/index/${index}/${uni}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
    .then((response) => {
        return response.json();
    })
    .catch((err) => console.log(err));
};

export const readBatchedInternalTranscripts = async (token, uni) => {
    return fetch(`${process.env.REACT_APP_LOCAL_SERVER_ADDRESS }/transcript/internalTranscripts/${uni}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
    .then((response) => {
        return response.json();
    })
    .catch((err) => console.log(err));
};

export const setTranscriptsToNotBatched = async (token, uni) => {
    return fetch(`${process.env.REACT_APP_LOCAL_SERVER_ADDRESS }/transcript/internalTranscripts/update/${uni}`, {
        method: "PATCH",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
    .then((response) => {
        // return response.json();
    })
    .catch((err) => console.log(err));
};