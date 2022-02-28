const getUser = () => {
    if (window.localStorage["jwtToken-mobility"]) {
        const token = window.localStorage["jwtToken-mobility"];
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace("-", "+").replace("_", "/");
        const userJson = JSON.parse(window.atob(base64));
        // if token is expired delete it and return {}
        // --> User is not logged in anymore.
        if (userJson.exp > Date.now()) {
            window.localStorage.removeItem("jwtToken-mobility");
            return {};
        }
        return {
            user: {
                username: userJson.username,
                serverAddress: userJson.serverAddress,
                metamask_address: userJson.metamask_address,
                token,
            },
        };
    }
    return {};
};

// For results carrying over
// dispatch("SET_RESULTS", {results: {areas, languages, results, ....}})

export default function user(state = getUser(), action) {
    switch (action.type) {
        case "EDIT_SUCCESS":
            return { user: action.user };
        case "EDIT_FAILURE":
            return { error: "Could not edit your profile" };
        case "SET_USER":
            return { user: action.user };
        case "LOGIN_SUCCESS":
            return { user: action.user };
        case "LOGIN_FAILURE":
            return { error: "E-Mail or Password incorrect" };
        case "LOGIN_USER_NOT_FOUND":
            return { error: "User not found" };
        case "LOGIN_RESET":
            return {};
        case "SET_RESULTS":
            return { results: action.results };
        case "LOGOUT":
            return {};
        case "SIGNUP_SUCCESS":
            return { user: action.user };
        case "SINGUP_FAILURE":
            return { user: action.user };
        case "SINGUP_USER_EXISTS":
            return { user: action.user };
        default:
            return state;
    }
}
