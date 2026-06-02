import React from 'react';
import { useSelector } from 'react-redux';
import ProtectedFallback from './ProtectedFallback';

const CustomerProtected = ({ compo }) => {
    const { customer } = useSelector(state => state.auth)
    console.log("find User", customer);
    return (
        <>
            {customer ? compo : <ProtectedFallback to="/login" />}
        </>
    );
};

export default CustomerProtected;


