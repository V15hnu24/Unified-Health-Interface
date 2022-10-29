import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'


const PatientRegister =() =>{
    let navigate =useNavigate();
    const[user,setUser ] = useState({                          // Do this same in Patient Register
        name:"", email:"", mobile:"",country:"", gender:"",state:"",city:"",dob:"",pincode:"", password:"",cpassword:"",doc1:"", doc2:""
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
        const{name,email,mobile,country,gender,state,city,dob,pincode,password,cpassword,doc1, doc2} =user;
        const documents = [doc1, doc2];
        if(password!=cpassword)
        {
            window.alert("Password are not Matching.");
        }
        console.log("Hello")
        const res =await fetch('/register', {
        method:"POST",
        headers:{
            "Content-Type" : "application/json"
         },
        body:JSON.stringify({
            name,email,mobile,country,gender,state,city,dob,pincode,password,cpassword,documents
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
    
    <section className="signup">
    <div align="center"></div><div align="center">
                    <h1 align="center">Register <span className="justfordemo"> Patient</span> Details</h1>
                    <h2 className="form-title" align="center">Sign up</h2>
                    <form method="POST">
                        <div className="form-group" align="center">
                            <input type ="text" name="name" id="name" autoComplete="off"
                            value={user.name}
                            onChange={handleInputs}
                            placeholder="Your Name"
                            />
                            <br/><br/>
                            <input type ="text"  name="email" id="email" autoComplete="off"
                               value={user.email}
                               onChange={handleInputs}
                             placeholder="Your Email" required="true"
                            />
                            <br/><br/>
                            <input type ="text"   name="mobile" id="mobile" autoComplete="off"
                               value={user.mobile}
                               onChange={handleInputs}
                             placeholder="Your Phone Number" 
                            />
                            <br/><br/>
                            <input type ="text"  name="country" id="country" autoComplete="off"
                               value={user.country}
                               onChange={handleInputs}
                             placeholder="Your Country" 
                            />
                            <br></br>
                            <br></br>
                            <input type ="text" name="gender" id="gender" autoComplete="off"
                            //  placeholder="Your Gender" required="true"
                            value={user.gender}
                             onChange={handleInputs}
                             placeholder="Your Gender" 
                            />
                            <br/><br/>
                            <input type ="text"  name="state" id="state" autoComplete="off"
                               value={user.state}
                               onChange={handleInputs}
                             placeholder="Your state" 
                            />
                            <br/><br/>
                            <input type ="text"  name="city" id="city" autoComplete="off"
                               value={user.city}
                               onChange={handleInputs}
                             placeholder="Your City" 
                            />
                            <br></br>
                            <br></br>
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
                        <br/><br/>
                            <input type ="doc1"  name="doc1" id="doc1" autoComplete="off"
                               value={user.doc11}
                               onChange={handleInputs}
                             placeholder="Document 1" 
                             
                            />
                            <br/><br/>
                            <input type ="doc2"  name="doc2" id="doc2" autoComplete="off"
                               value={user.doc2}
                               onChange={handleInputs}
                             placeholder="Document 2" 
                             
                            />
                            <br></br>
                            <br></br>
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

export default PatientRegister

