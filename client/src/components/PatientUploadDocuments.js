import React from 'react'
// import "../App.css"
import { useEffect,useState,useContext } from 'react';
import {useNavigate} from 'react-router-dom';
import {userContext} from "../App";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'

const PatientUploadDocuments =() =>{

    const {state,dispatch} = useContext(userContext);
    const [show,setShow]  =useState(false);
    let navigate = useNavigate();
    const[userData, setUserData] = useState({Link1:"",Link2:""});

    let name,value;
    const handleInputs =(e)=>{
        // console.log(e);
        name = e.target.name;
        value =e.target.value;

        setUserData({...userData,[name]:value})
    }
  
      const PatientUploadDocuments =async(e)=>{
        e.preventDefault();
        const{Link1,Link2} =userData;
        // console.log("Hello")
        const res =await fetch('/PatientDocuments', {
        method:"POST",
        headers:{
            "Content-Type" : "application/json"
         },
        body:JSON.stringify({
            Link1,Link2
         })
        });
       
       const data = await res.json();
       if(res.status==422 || !data)
       {
            window.alert("Invalid Registration");
            // console.log("Invalid Registration");
       }
       else{
        window.alert("Link Uploaded");
        // console.log("Successful Registration");
       // alert("Hello");
        navigate("/PatientLogin");
        }
      }
    


//      }
    
    // useEffect(()=>{
    //   userHomePage();
    //   //  SearchData();
    // },[]);  
   // const {query} = useGlobalContext();

  // return(
  //   <div>
  //     <div className="home-div">
  //   {/* <p className="pt-5">Welcome</p> */}
  //   <h1 align="center">Welcome to<span> Patient</span>  HealthCare System</h1>
  //   <h2 align="center">Welcome {userData.name}</h2>
  //   <br></br>
    
  //   <form  align="center"action="Search Health Organizations">
  //     <div>
  //       {/* <input type="text" placeholder="Search Health Organizations"/> */}
  //       <br></br>
  //       <br></br>
  //       <h1 align="center">Enter <span className="justfordemo">Drive</span>Links For Uploads</h1>
  //                   <form method="POST">
  //                       <div className="form-group" align="center">
  //                           <input type ="text" name="Link1" id="Link1" autoComplete="off"
  //                           value={userData.Link1}
  //                           onChange={handleInputs}
  //                           placeholder="Your Link1"
  //                           />
  //                           <br/><br/>
  //                           <input type ="text"  name="Link2" id="Link2" autoComplete="off"
  //                              value={userData.Link2}
  //                              onChange={handleInputs}
  //                            placeholder="Your Link2" required="true"
  //                           /></div>
  //                           <br/><br/>
  //                           <div  align="center">
  //                           <input type="submit" name="signup" id="signup"
  //                            value="Submit Links" onClick={PatientUploadDocuments} 
  //                           />
  //                           <br/><br/>
  //                           </div>
  //                           </form>
  //       {/* <div className="list"> */}
  //         {/* {userData.map((user)=>{
  //             <li className='listItem'>Apollo</li>
  //         })} */}
  //       {/* </div> */}
  //     </div>
  //   </form>
  //   </div>
  //   </div>
  // )
  return (

    <Container>
        <Row>
        <Col></Col>
        <Col xs={4}>
            <h1 style={{'paddingTop':40, 'textAlign':'center', 'fontFamily':'Serif', 'fontSize':30}}>Upload Documents</h1>
            <div style={{'paddingTop':20}}>
                <Form method="POST">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Document 1</Form.Label>
                        <Form.Control name="Link1" id="Link1" autoComplete="off"
                            value={userData.Link1}
                            onChange={handleInputs}
                            placeholder="Your Link1" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Document 2</Form.Label>
                        <Form.Control type ="text"  name="Link2" id="Link2" autoComplete="off"
                               value={userData.Link2}
                               onChange={handleInputs}
                              placeholder="Your Link2" required={true}/>
                    </Form.Group>
                </Form>
            </div>
            <div className="d-grid gap-2">
                <Button variant="dark" size="lg" type="submit" name="signup" id="signup"
                             value="Submit Links" onClick={PatientUploadDocuments} >
                    Submit
                </Button>
            </div>

        </Col>
        <Col></Col>
        </Row>
    </Container>
    
  )
}

export default PatientUploadDocuments