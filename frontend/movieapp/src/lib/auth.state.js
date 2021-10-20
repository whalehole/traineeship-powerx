import { createContext, useReducer, useContext} from "react";
import axios from 'axios'; 

const AUTH_DEFAULT_STATE = {
    accessToken: null,
    status: "guest"
}

// First create context
const AuthContext = createContext();

// Second create values for the provider BEFORE creating the provider
    // REDUCER "used to update the values"
    // useAuthState() CUSTOM HOOK "this returns the values required and the methods to update the values"
const authReducer = (state, event) => {
    switch (event.type) {
        case "login":
            localStorage.setItem("accessToken", event.accessToken);
            return {
                accessToken: event.accessToken,
                status: "authenticated"
            }
        case "logout":
            localStorage.removeItem("accessToken");
            return {
                accessToken: null,
                status: "guest"
            }
        default:
            throw new Error(`????? whatychu doing dood`);
    }
}

const useAuthState = () => {
    const [state, dispatch] = useReducer(authReducer, AUTH_DEFAULT_STATE);

    const login = (accessToken) => {
        dispatch({
            type: "login",
            accessToken: accessToken
        });
    }
    const logout = () => {
        dispatch({
            type: "logout"
        });
    }

    return {...state, login, logout}
}

// Third create the actual provider now
export const AuthProvider = ({children}) => {
    const auth = useAuthState();

    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

// custom hook to use the value in any component, kinda of a tiny little shortcut??
export const useAuth = () => {
    const auth = useContext(AuthContext);

    return auth
}

const login = (email, password) => 
    axios.post(`https://ecomm-service.herokuapp.com/login`, {
        username: email,
        password
    })
    .then(res=>{
        return res.data
    })

const register = (name, email, password, avatar) => 
    axios.post(`https://ecomm-service.herokuapp.com/register`, {
        name: name,
        email: email,
        password: password,
        avatar: avatar
    })
    .then(res=>{
        return res.data
    })


// custom hook to update login status after login
export const useLogin = () => {
    const auth = useContext(AuthContext);

    return function invokeLogin(email, password) {
        return login(email, password).then(res=>{
            auth.login(res.access_token);
        })
    }
}

export const useRegister = () => {
    const auth = useContext(AuthContext);

    return function invokeRegister(name, email, password, avatar) {
        return register(name, email, password, avatar).then(res=>{
            console.log("registering: ", res.email, res.password);
            login(email, password).then(res=>{
                auth.login(res.access_token);
            })
        })
    }
}

