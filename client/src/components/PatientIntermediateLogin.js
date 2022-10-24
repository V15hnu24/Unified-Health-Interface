import react from 'react';
import {useContext} from 'react'
import {useFormAction, useNavigate} from 'react-router-dom'
const PatientIntermediateLogin =() =>{

    // const {state,dispatch} = useContext(userContext);
    // console.log(state);

    let navigate =useNavigate();
  

    
    // const [email, setEmail] =useState('');
    // const [password, setPassword] = useState('');

    // const loginUser =async (e) =>{
    //     e.preventDefault();

    //     const res =await fetch('/signin', 
    //     {
    //         method:"POST",
    //         headers:{
    //         "Content-Type" : "application/json"
    //      },
    //     body:JSON.stringify({
    //        email,password
    //      })
       
    //     });

    //     const data =res.json();

    //     if(res.status==400 || !data){
    //         window.alert("Invalid Credentials");
    //     }
    //     else{
    //         dispatch({type:"USER", payload:true});
    //         window.alert("Login Sucessful");
    //         navigate("/");
    //     }
    
    const {register, handleSubmit} = useForm()

    const onSubmit=(data)=>{

        // let files =e.target.files;
        // console.warn("data file",files);
        // let reader =new FileReader();
        // reader.readAsDataURL(files[0]);
        // reader.onload =(e)=>{
        //   console.warn("img data",e.target.result);
        console.log(data);
        }
       

    
  return(   
    <>
    <div>
    <h1>Upload Files for Verification</h1>
    <form onSubmit={handleSubmit(onSubmit)}>
    <input  ref ={register} type="file" name="file"   />
    <button>Submit</button>
    </form>
    </div>

    </>
  )
}

export default PatientIntermediateLogin