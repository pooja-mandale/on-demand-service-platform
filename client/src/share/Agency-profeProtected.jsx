import React from 'react';
import { useSelector } from 'react-redux';
import ProtectedFallback from './ProtectedFallback';

const Agency_professionalProtected = ({ compo }) => {
    const { agency_professional } = useSelector(state => state.auth)
    console.log("find User", agency_professional);
    return (
        <>
            {agency_professional ? compo : <ProtectedFallback to="/agency-professional-login" />}
        </>
    );
};

export default Agency_professionalProtected;





