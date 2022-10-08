import React from 'react'
//import './Signup'
import SignUp from './Signup'
import './Login'
import Login from './Login'
import{Route,Routes} from "react-router-dom";
const PatientLogin =() =>{
  return(
    <>
    <div>
    <p className="pt-5">Welcome</p>
    <h1 align="center">Login <span className="justfordemo"> Patient</span> Details</h1>
    <section className='="signup'>
        <div className="container mt-5">
            <div className="signup-content">
                <div className="signin-form">
                    <h2 className="form-title" align="center">Login</h2>
                    <form className="register-form" id="register-form">
                        <div className="form-group" align="center">
                        
                            <input type ="text" name="email" id="name" autoComplete="off"
                             placeholder="Your Email" required="true"
                            />
                            <br/><br/>
                            <input type ="password" name="password" id="name" autoComplete="off"
                             placeholder="Your password" required="true"
                            />
                        </div>
                        <br/><br/>
                        <div className="form-group form-button" align="center">
                            <input type="submit" name="signin" id="signin" className="form-submit"
                             value="Login"
                            />
                            <br/><br/>
                            <a className="nav-link" href="/PatientRegister"><strong>Create an Account</strong></a>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    </section>
    {/* <SignUp/> */}
    {/* <Login/> */}
    {/* <Routes>
      
        <Route path="/login" element={<Login/>} />
        <Route path="/registration" element={ <SignUp/> } />
     
    </Routes> */}
    </div>
    </>
  )
}

export default PatientLogin