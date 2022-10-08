import React from 'react'

const Contact =() =>{
  return(
    <>
    <div className="contact_info">
      <div className="container-fluid">
        <div className="col-lg-10 offset-">
          <br/><br/>
        <h1 align="center">Contact Us </h1>
        <form className="register-form" id="register-form">
              <div className="form-group" align="center">
              <input type ="text" name="Name" id="name" autoComplete="off"
                      placeholder="Your Name" 
                      /> 
                      <br/><br/>
                    <input type ="text" name="email" id="name" autoComplete="off"
                      placeholder="Your Email" 
                      /> 
                      <br/><br/>
                    <input type ="Number" name="Phone Number" id="name" autoComplete="off"
                    placeholder="Your Phone Number" 
                    />
                    </div>
                    <br/><br/>
                    <div className="form-group form-button" align="center">
                    <input type="submit" name="signin" id="signin" className="form-submit"
                    value="Send"
                    />
                    </div>
                    </form> 
                    <br/><br/><br/>  
                    <div align="center" > 
                    <h4>Contact Details</h4>
                    <h5>Email: www.xyz@gmail.com</h5>
                    <h5>Phone Number: 98xxxxxx12</h5>
                    <h5>Address:Delhi,India</h5>
                    </div>     
        </div>

      </div>
    </div>
    </>
  )
}

export default Contact