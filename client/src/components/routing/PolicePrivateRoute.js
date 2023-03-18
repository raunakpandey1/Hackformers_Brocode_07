import { useContext, useEffect } from 'react';
import { Navigate, Route } from 'react-router-dom'
import { AppContext } from '../../context/AppContext';

const PolicePrivateRoute = ({ children }) => {

    const { adminAuth, contextLoading } = useContext(AppContext);

    return (
        !contextLoading ?
            adminAuth ? children : <Navigate to="/" />
            : <p>Loading...</p>
    )
}

export default PolicePrivateRoute;