import React, { useEffect,useState,useContext } from 'react';
import {useNavigate} from 'react-router-dom';
import {userContext} from "../App";
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'

const PatientAbout =() =>{

  const {state,dispatch} = useContext(userContext);
  let navigate = useNavigate();
  const[userData, setUserData] = useState({});
  const callAboutPage = async (req,res)=>{

    console.log("Hello");
    try{
      const res = await fetch('/about',{
        method: "GET",
        headers:{
          Accept:"application/json",
          "Content-Type":"application/json"
        },
        credentials:"include"
      });

      const data  =await res.json();
      console.log(data);
      setUserData(data);
      if(!res.status ==200)
      {
          const error = new Error(res.error);
          throw error;
      }
      else{
        dispatch({type:"USER", payload:true});
      }
    }catch(err)
    {
        console.log(err);
        navigate('/login');
    }
  }
  useEffect(()=>{
    callAboutPage();
  },[]);
  navigate =useNavigate();
  const Edit=()=>{

    navigate("/PatientEditdetails");
  
  }
  
//   return(
//     <>
//     <div>
//     <br/>
//     {/* <div class="container">
//       <h2>Patient Details</h2>
//   <div class="row">
//     <div class="col">
//       Name
//     </div>
//     <div class="col">
//       2 of 3
//     </div>
//     <div class="col">
//       3 of 3
//     </div>
//   </div>
// </div>8/*/}
// <form method="GET">
// <table class="table">
// <div align="center">
//   <h2>Patient Details</h2>
//   <tbody>
//     <tr>
//       <th scope="col">ID:</th>
//       <td>1</td>
//     </tr>  
//     <tr>
//       <th scope="col">NAME:</th>
//       <td>{userData.name}</td>
//     </tr>
//     <tr>
//       <th scope="col">Email ID::</th>
//       <td>{userData.email}</td>
//     </tr>
//     <tr>
//       <th scope="col">Gender:</th>
//       <td>{userData.Gender}</td>
//     </tr>
//     <tr>
//       <th scope="col">Phone Number:</th>
//       <td>{userData.mobile}</td>
//     </tr>
//     <tr>
//       <th scope="col">DOB:</th>
//       <td>{userData.dob}</td>
//     </tr>
//     <tr>
//       <th scope="col">Pincode:</th>
//       <td>{userData.pincode}</td>
//     </tr>
//     <tr>
//       <th scope="col">Country:</th>
//       <td>{userData.country}</td>
//     </tr>
//     <tr>
//       <th scope="col">State:</th>
//       <td>{userData.state}</td>
//     </tr>
//     <tr>
//       <th scope="col">City:</th>
//       <td>{userData.city}</td>
//     </tr>
//     {/* <tr>
//       <th scope="row">3</th>
//     </tr> */}
//   </tbody>
//   </div>

// </table>
// <br/><br/>

// </form>

//     </div> 
//     <div align="center">
//     <input type="submit"  value="Edit Details" onClick={Edit} 
//     />
//     </div>


// <br/><br/>
// </>

// )

  return (
    <Container>
      <Row>
        <Col></Col>
        <Col xs={6}>
        <h1 style={{'paddingTop':40, 'textAlign':'center', 'fontFamily':'Serif', 'fontSize':40}}>Patient Details</h1>
          <Table striped bordered hover variant="dark">
            <tbody>
              <tr>
                <td>ID</td>
                <td>#</td>
              </tr>
              <tr>
                <td>Name</td>
                <td>{userData.name}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{userData.email}</td>
              </tr>
              <tr>
                <td>Gender</td>
                <td>{userData.gender}</td>
              </tr>
              <tr>
                <td>Phone Number</td>
                <td>{userData.mobile}</td>
              </tr>
              <tr>
                <td>Date of Birth</td>
                <td>{userData.dob}</td>
              </tr>
              <tr>
                <td>City</td>
                <td>{userData.city}</td>
              </tr>
              <tr>
                <td>State</td>
                <td>{userData.state}</td>
              </tr>
              <tr>
                <td>Country</td>
                <td>{userData.country}</td>
              </tr>
              <tr>
                <td>Pincode</td>
                <td>{userData.pincode}</td>
              </tr>
            </tbody>
          </Table>
          <div className="d-grid gap-2">
            <Button variant="dark" size="lg" type="submit" value="Edit Details" onClick={Edit}>
              Edit Details
            </Button>
          </div>

        </Col>
        <Col></Col>
      </Row>
    </Container>
  )

}

export default PatientAbout