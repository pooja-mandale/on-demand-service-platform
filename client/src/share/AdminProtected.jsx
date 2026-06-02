import React from 'react';
import { useSelector } from 'react-redux';
import ProtectedFallback from './ProtectedFallback';

const AdminProtected = ({ compo }) => {
    const { admin } = useSelector(state => state.auth)
    console.log("find User", admin);
    return (
        <>
            {admin ? compo : <ProtectedFallback to="/admin/login" />}
        </>
    );
};

export default AdminProtected;


