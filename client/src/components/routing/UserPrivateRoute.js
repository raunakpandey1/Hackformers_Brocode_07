import { useContext, useEffect } from 'react';
import { Navigate, Route } from 'react-router-dom'
import { AppContext } from '../../context/AppContext';
import axios from '../../axios';

const UserPrivateRoute = ({ children }) => {

    const { userAuth, contextLoading } = useContext(AppContext);

    return (
        !contextLoading ?
            userAuth ? children : <Navigate to="/user/sign-in" />
            : null
    )
}

export default UserPrivateRoute;