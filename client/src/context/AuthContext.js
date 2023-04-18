import { createContext, useReducer } from "react"

// 1 - defined the initial state
const INITIAL_STATE = {
    user: null,
    loading: false,
    error: null,
}

export const AuthContext = createContext(INITIAL_STATE)

//create reducers
const AuthReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_START":
            return {
                user: null,
                loading: true,
                error: null,
            }
        case "LOGIN_SUCCESS":
            return {
                user: action.payload,
                loading: false,
                error: null,
            }
        case "LOGIN_FAILURE":
            return {
                user: null,
                loading: false,
                error: action.payload,
            }
        case "LOGOUT":
            return {
                user: null,
                loading: false,
                error: null,
            }
        default:
            return state
    }
}

//make use of reducer in the context
export const AuthContextProvider = ({ children }) => {
    //children will be our components that wants to use the data

    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    //save user in localstorage

    return (
        <AuthContext.Provider
            value={{
                user: state.userloading,
                loading: state.loading,
                error: state.error,
                dispatch
            }}>
            {children}
        </AuthContext.Provider>
    )
}