import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'


const HealthCareProfessionalRegister =() =>{
    let navigate =useNavigate();
    const[user,setUser ] = useState({                          // Do this same in Patient Register
        name:"", email:"", phone:"",qualification:"",gender:"",dob:"",location:"",pincode:"", password:"", cpassword: "",
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
        const{name,email,phone,qualification,gender,dob,location,pincode,password,cpassword} =user;
        console.log("Hello")
        const res =await fetch('/HealthCareProfessionalRegister', {
        method:"POST",
        headers:{
            "Content-Type" : "application/json"
         },
        body:JSON.stringify({
            name,email,phone,qualification,gender,dob,location,pincode,password,cpassword
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
        navigate("/HealthCareProfessionalLogin");
        }
       
    }
    function foo() {
        alert("Submit button clicked!");
        return true;
     }
  return(
    <>
    <section className="signup">
    <div align="center"></div><div align="center">
                    <h2 className="form-title" align="center">HealthCareProfessional Registeration Portal</h2>
                    <form method="POST">
                        <div className="form-group" align="center">
                            <input type ="text" name="name" id="name" autoComplete="off"
                            value={user.name}
                            onChange={handleInputs}
                            placeholder="Name"
                            />
                            <br/><br/>
                            <input type ="text"  name="email" id="email" autoComplete="off"
                               value={user.email}
                               onChange={handleInputs}
                             placeholder="Email" required="true"
                            />
                            <br/><br/>
                            <input type ="text"   name="phone" id="phone" autoComplete="off"
                               value={user.phone}
                               onChange={handleInputs}
                             placeholder="Phone Number" 
                            />
                            <br/><br/>
                            <input type ="text"  name="work" id="work" autoComplete="off"
                               value={user.qualification}
                               onChange={handleInputs}
                             placeholder="Your Qualification" 
                            />
                            <br></br>
                            <input type ="text"  name="gender" id="gender" autoComplete="off"
                               value={user.gender}
                               onChange={handleInputs}
                             placeholder="Your Gender" 
                            />
                            <br></br>
                            <input type ="text"  name="dob" id="dob" autoComplete="off"
                               value={user.dob}
                               onChange={handleInputs}
                             placeholder="Your DOB" 
                            />
                            <br></br>
                             <input type ="text"  name="location" id="work" autoComplete="off"
                               value={user.location}
                               onChange={handleInputs}
                             placeholder="Your Location" 
                            />
                            <br/><br/>
                            <input type ="Number" name="pincode" id="pincode" autoComplete="off"
                            //  placeholder="Your Pincode" required="true"
                             value={user.pincode}
                             onChange={handleInputs}
                             placeholder="Your Pincode" 
                            />
                            <br/><br/>
                            <input type ="password" name="password" id="password" autoComplete="off"
                               value={user.password}
                               onChange={handleInputs}
                             placeholder="Your password" 
                            />
                            <br/><br/>
                            <input type ="password"  name="cpassword" id="cpassword" autoComplete="off"
                               value={user.cpassword}
                               onChange={handleInputs}
                             placeholder="Confirm Your password" 
                             
                            />
                        </div>
                        <br/><br/>
                        <div  align="center">
                            <input type="submit" name="signup" id="signup"
                             value="register" onClick={PostData} 
                            />
                            <br/><br/>
                            <a className="nav-link" href="/login"><strong>I am already registered</strong></a>
                        </div>
                    </form>
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

export default HealthCareProfessionalRegister