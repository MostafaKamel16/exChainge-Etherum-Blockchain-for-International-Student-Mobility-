export const authenticate = async (data) => {
    if (typeof window !== 'undefined') {
        await localStorage.setItem('jwt', JSON.stringify(data.token));
        await localStorage.setItem('metamask_address', data.user.metamask_address);
        await localStorage.setItem('username', data.user.username);
    }
};


export const isAuthenticated = () => {
    if (typeof window == 'undefined') {
        return false;
    }
    if (localStorage.getItem('jwt')) {
        return JSON.parse(localStorage.getItem('jwt'));
    } else {
        return false;
    }
};
