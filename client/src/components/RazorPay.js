import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useContext} from 'react'
import { userContext } from "../App";


const RazorPay =() =>{

    const {state,dispatch} = useContext(userContext);
    let navigate =useNavigate();
    const [email, setEmail] =useState('');
    const [password, setPassword] = useState('');

   

  return(   
    <>

    <br/><br/>
    <div className="form-group form-button" align="center">
    <input type="submit" name="signin" id="signin" className="form-submit"
            value="Login"
            onClick={loginUser}/>
            <br/><br/>
            <a className="nav-link" href="/PatientRegister"><strong>Create an Account</strong></a>
    </div>
                    
    
    </>
  )
}

export default RazorPay