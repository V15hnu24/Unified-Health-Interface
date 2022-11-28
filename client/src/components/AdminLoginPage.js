import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useContext} from 'react'
import { userContext } from "../App";


const AdminLogin =() =>{

    const {state,dispatch} = useContext(userContext);
    let navigate =useNavigate();
    const [email, setEmail] =useState('');
    const [password, setPassword] = useState('');

    const loginUser =async (e) =>{
        e.preventDefault();

        const res =await fetch('/signin', 
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

        if(res.status==400 || !data){
            window.alert("Invalid Credentials");
        }
        else{
            dispatch({type:"USER", payload:true});
            window.alert("Login Sucessful");
            navigate("/AdminHomePage");
        }
    }

  return(   
    <>
       <section className='="signup'>
       <div align="center"></div> <div align="center">
                    <h2 className="form-title" align="center"> Admin Login Portal</h2>
                    <form method="POST">
                        <div className="form-group" align="center">
                        
                            <input type ="text" name="email" id="name" autoComplete="off"
                            value ={email}
                            onChange ={(e)=> setEmail(e.target.value)}
                            placeholder="Your Email" required="true"
                            />
                            <br/><br/>
                            <input type ="password" name="password" id="name" autoComplete="off"
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
                    </div>
    </section>
    </>
  )
}

export default AdminLogin