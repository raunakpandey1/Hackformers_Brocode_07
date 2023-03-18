import { useContext, useEffect } from 'react';
import { Navigate, Route } from 'react-router-dom'
import { AppContext } from '../../context/AppContext';

const PolicePrivateRoute = ({ children }) => {

    const { policeAuth, contextLoading } = useContext(AppContext);

    return (
        !contextLoading ?
            policeAuth ? children : <Navigate to="/" />
            : <p>Loading...</p>
    )
}

export default PolicePrivateRoute;