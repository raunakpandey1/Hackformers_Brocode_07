import { createContext, useEffect, useReducer, useState } from "react"
import { check_police_auth } from "../service/policeApi";
import { check_user_auth } from "../service/userApi";

const INITIAL_STATE = {
    userAuth: false,
    policeAuth: false,
    user: null,
    police: null,
    isFetching: false,
    error: false
}

const AppReducer = (state, actions) => {
    switch (actions.type) {
        case "EMPTY_STATE":
            return {
                userAuth: false,
                policeAuth: false,
                user: null,
                police: null,
                error: false
            };
        case "FETCH_SUCCESS":
            return {
                userAuth: actions.value.userAuth,
                policeAuth: actions.value.policeAuth,
                user: actions.value.user,
                police: actions.value.police,
                error: false
            };
        case "FETCH_FAILED":
            return {
                userAuth: false,
                policeAuth: false,
                user: null,
                police: null,
                error: actions.payload
            };
        default:
            return state;
    }
}

export const AppContext = createContext(INITIAL_STATE);

export const AppContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(AppReducer, INITIAL_STATE);
    const [contextLoading, setContextLoading] = useState(true);

    const setContext = async ()=>{
        setContextLoading(true);
        const policeData = await check_police_auth()
        const userData = await check_user_auth()
        if(policeData){
            dispatch({ type: "FETCH_SUCCESS", value: {userAuth: false, policeAuth: true, user: null, police: policeData}});
            setContextLoading(false);
        }else if(userData){
            dispatch({ type: "FETCH_SUCCESS", value: {userAuth: true, policeAuth: false, user: userData, police: null}});
            setContextLoading(false);
        }else{
            dispatch({ type: "EMPTY_STATE" });
            setContextLoading(false);
        }
    }

    useEffect(()=>{
        setContext()
    },[])

    return (
        <AppContext.Provider
            value={{
                userAuth: state.userAuth,
                policeAuth: state.policeAuth,
                user: state.user,
                police: state.police,
                isFetching: state.isFetching,
                error: state.error,
                contextLoading: contextLoading,
                setContextLoading,
                dispatch,
                setContext,
            }}>
                {children}
        </AppContext.Provider>
    )
}