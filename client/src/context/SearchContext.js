import { createContext, useReducer } from "react"

// 1 - defined the initial state
const INITIAL_STATE = {
    city: undefined,
    dates: [],
    options: {
        adult: undefined,
        children: undefined,
        room: undefined,
    }
}

export const SearchContext = createContext(INITIAL_STATE)

//create reducers
const SearchReducer = (state, action) => {
    switch (action.type) {
        case "NEW_SEARCH":
            return action.payload;
        case "RESET_SEARCH":
            return INITIAL_STATE;
        default:
            return state;
    }
}

//make use of reducer in the context
export const SearchContextProvider = ({ children }) => {
    //children will be our components that wants to use the data

    const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE)

    return (
        <SearchContext.Provider
            value={{
                city: state.city,
                dates: state.dates,
                options: state.options,
                dispatch
            }}>
            {children}
        </SearchContext.Provider>
    )
}