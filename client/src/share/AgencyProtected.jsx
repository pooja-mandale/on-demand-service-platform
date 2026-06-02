import React from 'react';
import { useSelector } from 'react-redux';
import ProtectedFallback from './ProtectedFallback';

const AgencyProtected = ({ compo }) => {
    const { agency } = useSelector(state => state.auth)
    console.log("find User", agency);
    return (
        <>
            {agency ? compo : <ProtectedFallback to="/agency/login" />}
        </>
    );
};

export default AgencyProtected;


