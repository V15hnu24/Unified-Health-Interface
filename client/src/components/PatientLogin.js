import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useContext} from 'react'
import { userContext } from "../App";

const PatientLogin =() =>{

    const {state,dispatch} = useContext(userContext);
    let navigate =useNavigate();
    const [email, setEmail] =useState('');
    const [password, setPassword] = useState('');

    const loginUser =async (e) =>{
        e.preventDefault();

        const res=await fetch('/auth/patient_login', 
        {
            method:"POST",
            headers:{
            "Content-Type" : "application/json"
            },
            body:JSON.stringify({
            email,password
            })
        });

        const data =res.json();
        console.log(data);
        if(res.status==200){
            // dispatch({type:"USER", payload:true});
            window.alert("Login Sucessful");
            navigate("/PatientHome");
        }
        else{
            window.alert("Invalid Credentials");
        }
    }

  return(   
    <>
    <div>
       <section className='signup'>
                    <h2 className="form-title" align="center"> Patient Login Portal</h2>
                    <form>
                        <div className="form-group" align="center">
                            <input type ="email" name="email" id="name" autoComplete="off"
                            value ={email}
                            onChange ={(e)=> setEmail(e.target.value)}
                            placeholder="Your Email" required="true"
                            />
                            <br/><br/>
                            <input type ="password" name="password" id="password" autoComplete="off"
                             value ={password}
                             onChange ={(e)=> setPassword(e.target.value)}
                             placeholder="Your password" required="true"
                            />
                        </div>
                        <br/><br/>
                        <div className="form-group form-button" align="center">
                            <input type="submit" name="signin" id="signin" className="form-submit"
                                value="Login"
                                onClick={loginUser}
                            />
                            <br/><br/>
                            <a className="nav-link" href="/PatientRegister"><strong>Create an Account</strong></a>
                        </div>
                    </form>
    </section>
    </div>
    </>
  )
}

export default PatientLogin