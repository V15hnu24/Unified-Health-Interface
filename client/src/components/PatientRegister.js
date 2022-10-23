import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'


const PatientRegister =() =>{
    let navigate =useNavigate();
    const[user,setUser ] = useState({                          // Do this same in Patient Register
        name:"", email:"", phone:"",profession:"",gender:"",dob:"",pincode:"",work:"", password:"", cpassword: "",
    });
    let name,value;
    const handleInputs =(e)=>{
        console.log(e);
        name = e.target.name;
        value =e.target.value;

        setUser({...user,[name]:value})
    }

    const PostData =async(e)=>{
        e.preventDefault();
        const{name,email,phone,gender,dob,pincode,work,password,cpassword} =user;
        console.log("Hello")
        const res =await fetch('/register', {
        method:"POST",
        headers:{
            "Content-Type" : "application/json"
         },
        body:JSON.stringify({
            name,email,phone,gender,dob,pincode,work,password,cpassword
         })
        });
       
       const data = await res.json();
       if(res.status==422 || !data)
       {
            window.alert("Invalid Registration");
            console.log("Invalid Registration");
       }
       else{
        window.alert("Registartion Successful");
        console.log("Successful Registration");
       // alert("Hello");
        navigate("/PatientLogin");
        }
       
    }
    function foo() {
        alert("Submit button clicked!");
        return true;
     }
  return(
    <>
    <div>
    {/* <p className="pt-5">Welcome</p> */}
    <h1 align="center">Register <span className="justfordemo"> Patient</span> Details</h1>
    </div>
    <section className='="signup'>
    <h2 className="form-title" align="center">Sign up</h2>
                    <form method="POST">
                        <div className="form-group" align="center">
                            <input type ="text" name="name" id="name" autoComplete="off"
                            //  placeholder="Patient's Name"
                            value={user.name}
                             onChange={handleInputs}
                             placeholder="Patient's Name" 
                            />
                            <br/><br/>
                            <input type ="text" name="email" id="email" autoComplete="off"
                            //  placeholder="Your Email" required="true"
                            value={user.email}
                             onChange={handleInputs}
                             placeholder="Your Emal ID:" 
                            />
                            <br/><br/>
                            <input type ="text" name="phone" id="phone" autoComplete="off"
                            //  placeholder="Your Phone Number" required="true"
                             value={user.phone}
                             onChange={handleInputs}
                             placeholder="Your Phone Number" 
                            />
                            <br/><br/>
                            <input type ="text" name="work" id="work" autoComplete="off"
                            //  placeholder="Your Profession" required="true"
                             value={user.work}
                             onChange={handleInputs}
                             placeholder="Your Work" 
                            />
                            <br/><br/>
                            <input type ="text" name="gender" id="gender" autoComplete="off"
                            //  placeholder="Your Gender" required="true"
                            value={user.gender}
                             onChange={handleInputs}
                             placeholder="Your Gender" 
                            />
                            <br/><br/>
                            <input type ="text" name="dob" id="dob" autoComplete="off"
                            //  placeholder="Your DOB" required="true"
                             value={user.dob}
                             onChange={handleInputs}
                             placeholder="Your DOB" 
                            />
                            <br/><br/>
                            <input type ="Number" name="pincode" id="pincode" autoComplete="off"
                            //  placeholder="Your Pincode" required="true"
                             value={user.pincode}
                             onChange={handleInputs}
                             placeholder="Your Pincode" 
                            />
                            <br/><br/>
                            <input type ="password" name="password" id="name" autoComplete="off"
                            //  placeholder="Your password" required="true"
                            value={user.password}
                               onChange={handleInputs}
                             placeholder="Confirm Your password"
                            />
                            <br/><br/>
                            <input type ="password" name="cpassword" id="name" autoComplete="off"
                            //  placeholder="Confirm Your password" required="true"
                             value={user.cpassword}
                             onChange={handleInputs}
                             placeholder="Confirm Your password"
                             
                            />
                        </div>
                        <br/><br/>
                        <div className="form-group form-button" align="center">
                            <input type="submit" name="signup" id="signup" className="form-submit"
                            //  value="Register" onClick={PostData} 
                            />
                            <br/><br/>
                            <a className="nav-link" href="/PatientLogin"><strong>I am already registered</strong></a>
                        </div>
                    </form>
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