import React, { useEffect,useState } from 'react';
import {useNavigate} from 'react-router-dom';
import {useContext} from 'react'
import { userContext } from "../App";
import AdminNavbar from './AdminNavbar';

const AdminHandlePatient = () => {

    const {state,dispatch} = useContext(userContext);
    let navigate = useNavigate();
    const[userData, setUserData] = useState([]);
    const[searchApiData, setSearchApiData] = useState([]);
    const[filterVal,setFilterVal] =useState('');
    
    return (
      <>
      <AdminNavbar />
      </>
    )
}

export default AdminHandlePatient