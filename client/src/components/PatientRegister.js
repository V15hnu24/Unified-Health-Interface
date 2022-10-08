import React from 'react'

const PatientRegister =() =>{
  return(
    <>
    <div>
    <p className="pt-5">Welcome</p>
    <h1 align="center">Register <span className="justfordemo"> Patient</span> Details</h1>
    </div>
    <section className='="signup'>
        <div className="container mt-5">
            <div className="signup-content">
                <div className="signup-form">
                    <h2 className="form-title" align="center">Sign up</h2>
                    <form className="register-form" id="register-form">
                        <div className="form-group" align="center">
                            <input type ="text" name="name" id="name" autoComplete="off"
                             placeholder="Patient's Name"
                            />
                            <br/><br/>
                            <input type ="text" name="email" id="name" autoComplete="off"
                             placeholder="Your Email" required="true"
                            />
                            <br/><br/>
                            <input type ="text" name="phone" id="name" autoComplete="off"
                             placeholder="Your Phone Number" required="true"
                            />
                            <br/><br/>
                            <input type ="text" name="work" id="name" autoComplete="off"
                             placeholder="Your Profession" required="true"
                            />
                            <br/><br/>
                            <input type ="password" name="password" id="name" autoComplete="off"
                             placeholder="Your password" required="true"
                            />
                            <br/><br/>
                            <input type ="password" name="cpassword" id="name" autoComplete="off"
                             placeholder="Confirm Your password" required="true"
                             
                            />
                        </div>
                        <br/><br/>
                        <div className="form-group form-button" align="center">
                            <input type="submit" name="signup" id="signup" className="form-submit"
                             value="Register"
                            />
                            <br/><br/>
                            <a className="nav-link" href="/PatientLogin"><strong>I am already registered</strong></a>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    </section>
    {/* <form>
  <div className="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"></input>
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1"></input>
        </div>
        <div className="form-group form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1"></input>
            <label className="form-check-label" for="exampleCheck1">Check me out</label>
        </div>
        <button type="submit" className="btn btn-primary" align="center">Submit</button>
</form> */}
    </>
  )
}

export default PatientRegister