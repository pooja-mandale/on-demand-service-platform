import React from 'react'
import { useSelector } from 'react-redux'
import ProtectedFallback from './ProtectedFallback';

const ProfessionalProtected = ({ compo }) => {
    const { professional } = useSelector(state => state.auth)
    console.log("find professional", professional);
    return <>
        {professional ? compo : <ProtectedFallback to="/professional-login" />}
    </>
}

export default ProfessionalProtected