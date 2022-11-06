import React, { useEffect,useState } from 'react';
import {useNavigate} from 'react-router-dom';
import {useContext} from 'react'
import { userContext } from "../App";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';

const PatientEditdetails =() =>{

  const {state,dispatch} = useContext(userContext);
  let navigate = useNavigate();
  const[userData, setUserData] = useState({name:"", email:"",mobile:"",country:"",gender:"",state:"",city:"",dob:"",pincode:""});
  const id = window.localStorage.getItem("id");

  const callAboutPage = async (req,res)=>{

    try{
      const res = await fetch(`/patient/${id}`,{
        method: "GET",
        headers:{
          Accept:"application/json",
          "Content-Type":"application/json"
        },
        credentials:"include"
      });

      const data  =await res.json();

    //   setUserData(data);
    setUserData({...userData, name: data.tempPatient.name, email:data.tempPatient.email, mobile:data.tempPatient.mobile, country:data.tempPatient.country, gender:data.tempPatient.gender, state:data.tempPatient.state, city:data.tempPatient.city, dob:data.tempPatient.dob, pincode:data.tempPatient.pincode,});
      if(!res.status === 200)
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
        navigate('/PatientLogin');
    }
  }
  const Edit2= async(e)=>{
 
    e.preventDefault();
    const {name, email, mobile , country,gender,state,city, dob, pincode,} = userData;
    console.log(name);
    console.log(email);
    const res = await fetch(`/patient/${id}`,{
      method:"PUT",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name, email, mobile ,country,gender,state,city, dob, pincode, 
      })
    });
    console.log("Hello");
    const data = await res.json();
    console.log(data);
    if(!data)
    {
        console.log("not Updated");
        alert("Details Not Updated");
    }
    else{
      alert("Details Updated");
      setUserData({...userData, name:"",});
      navigate("/PatientAbout");
    }
    
    // navigate("/Editdetails");
  
  }
  useEffect(()=>{
    callAboutPage();
  },[]);

  const handleInputs =(e) =>{
    const name = e.target.name;
    const value = e.target.value;
    setUserData({...userData,[name]:value});
  }
  
  const handleInputs2 = async(e) =>{
    const name = e.target.name;
    const value = e.target.value;
  }

  // navigate =useNavigate();
  

//   return(
//       <>
//       <div>
//       <br/>
//       {/* <div class="container">
//         <h2>Patient Details</h2>
//     <div class="row">
//       <div class="col">
//         Name
//       </div>
//       <div class="col">
//         2 of 3
//       </div>
//       <div class="col">
//         3 of 3
//       </div>
//     </div>
//   </div>8/*/}
//   <form method="POST">
//   <table class="table">
//   <div align="center">
//     <h2>Patient Details</h2>
//     <tbody>
//       <tr>
//         <th scope="col">ID:</th>
//         <td>1</td>
//       </tr>  
//       <tr>
//         <th scope="col">NAME:</th>
//         <td>{userData.name}</td>
//         <input type="submit"  value="Edit Name" 
//       />
      
//         <input type="text" id="name"
//         name ="name"
//         value ={userData.name}
//         onChange={handleInputs}>
//         </input>
//       </tr>
//       <tr>
//         <th scope="col">Email ID::</th>
//         <td>{userData.email}</td>
//         <input type="submit"  value="Edit Email" 
//       />
//         <input type="text" id="name"
//         name="email"
//         onChange={handleInputs}>

//         </input>
//       </tr>
//       <tr>
//         <th scope="col">Phone Number:</th>
//         <td>{userData.mobile}</td>
//         <input type="submit"  value="Edit Phone Number" 
//       />
//         <input type="text"
//         name ="mobile"
//         onChange={handleInputs}>
//         </input>
//       </tr>
//       <tr>
//         <th scope="col">Gender:</th>
//         <td>{userData.gender}</td>
//         <input type="submit"  value="Edit Gender" 
//       />
//         <input type="text"
//         name ="gender"
//         onChange={handleInputs}>
//         </input>
//       </tr>
//       <tr>
//         <th scope="col">DOB:</th>
//         <td>{userData.dob}</td>
//         <input type="submit"  value="Edit DOB" 
//       />
//         <input type="text"
//         name ="dob"
//         onChange={handleInputs}>
//         </input>
//       </tr>
//       <tr>
//         <th scope="col">Pincode:</th>
//         <td>{userData.pincode}</td>
//         <input type="submit"  value="Edit Pincode" 
//       />
//         <input type="text"
//         name ="pincode"
//         onChange={handleInputs}>
//         </input>
//       </tr>
//       <tr>
//         <th scope="col">Country:</th>
//         <td>{userData.country}</td>
//         <input type="submit"  value="Edit Profession" 
//       />
//         <input type="text"
//         name ="country"
//         onChange={handleInputs}>
//         </input>
//       </tr>
//       <tr>
//         <th scope="col">State:</th>
//         <td>{userData.state}</td>
//         <input type="submit"  value="Edit Profession" 
//       />
//         <input type="text"
//         name ="state"
//         onChange={handleInputs}>
//         </input>
//       </tr>
//       <tr>
//         <th scope="col">City:</th>
//         <td>{userData.city}</td>
//         <input type="submit"  value="Edit Profession" 
//       />
//         <input type="text"
//         name ="city"
//         onChange={handleInputs}>
//         </input>
//       </tr>
//       {/* <tr>
//         <th scope="row">3</th>
//       </tr> */}
//     </tbody>
//     </div>

//   </table>
//   <br/><br/>

//   </form>

//     </div> 
//     <div align="center">
//     <input type="submit"  value="Edit Details" onClick={Edit2} />
//     </div>



//   <br/><br/>
//   </>

//   )
    
  return (
	<Container>
		<Row>
			<Col></Col>
			<Col xs={8}>
			<h1 style={{'paddingTop':40, 'textAlign':'center', 'fontFamily':'Serif', 'fontSize':40}}>Edit Details</h1>
			<Form method="POST">

          	<Table striped bordered hover variant='dark'>
				<tbody>
					<tr>
						<td><Form.Label column="lg">Name</Form.Label></td>
						<td><Form.Label column="lg">{userData.name}</Form.Label></td>
						<td><Form.Control type="text" id="name" name ="name" value ={userData.name} onChange={handleInputs}/></td>
					</tr>
					<tr>
						<td><Form.Label column="lg">Email ID</Form.Label></td>
						<td><Form.Label column="lg">{userData.email}</Form.Label></td>
						<td><Form.Control type="text" id="name" name="email" value ={userData.email} onChange={handleInputs} disabled/></td>
					</tr>
					<tr>
						<td><Form.Label column="lg">Phone Number</Form.Label></td>
						<td><Form.Label column="lg">{userData.mobile}</Form.Label></td>
						<td><Form.Control type="text" name ="mobile" value ={userData.mobile} onChange={handleInputs}/></td>
					</tr>
					<tr>
						<td><Form.Label column="lg">Gender</Form.Label></td>
						<td><Form.Label column="lg">{userData.gender}</Form.Label></td>
						<td><Form.Control type="text" name ="gender" value ={userData.gender} onChange={handleInputs}/></td>
					</tr>
					<tr>
						<td><Form.Label column="lg">DOB</Form.Label></td>
						<td><Form.Label column="lg">{userData.dob}</Form.Label></td>
						<td><Form.Control type="date" name ="dob" value ={userData.dob} onChange={handleInputs}/></td>
					</tr>
					<tr>
						<td><Form.Label column="lg">City</Form.Label></td>
						<td><Form.Label column="lg">{userData.city}</Form.Label></td>
						<td><Form.Control type="text" name ="city" value ={userData.city} onChange={handleInputs}/></td>
					</tr>
					<tr>
						<td><Form.Label column="lg">State</Form.Label></td>
						<td><Form.Label column="lg">{userData.state}</Form.Label></td>
						<td><Form.Control type="text" name ="state" value ={userData.state} onChange={handleInputs}/></td>
					</tr>
					<tr>
						<td><Form.Label column="lg">Pincode</Form.Label></td>
						<td><Form.Label column="lg">{userData.pincode}</Form.Label></td>
						<td><Form.Control type="text" name ="pincode" value ={userData.pincode} onChange={handleInputs}/></td>
					</tr>
					<tr>
						<td><Form.Label column="lg">Country</Form.Label></td>
						<td><Form.Label column="lg">{userData.country}</Form.Label></td>
						<td><Form.Control type="text" name ="country" value ={userData.country} onChange={handleInputs}/></td>
					</tr>
				</tbody>
			</Table>
			</Form>
				<div className="d-grid gap-2">
					<Button variant="dark" size="lg" type="submit" value="Edit Details" onClick={Edit2}>
					Save Details
					</Button>
				</div>

			</Col>
			<Col></Col>
		</Row>
	</Container>
  )

}

export default PatientEditdetails