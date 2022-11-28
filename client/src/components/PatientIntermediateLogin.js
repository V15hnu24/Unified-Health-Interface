import react from 'react';
import {useContext,useState} from 'react'
import {useFormAction, useNavigate} from 'react-router-dom'
import { Viewer } from '@react-pdf-viewer/core'; // install this library
// Plugins
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'; // install this library
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
// Worker
import { Worker } from '@react-pdf-viewer/core'; // install this library

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

    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    
    // For onChange Events
    const [pdfFile, setPdfFile] = useState();
    const [pdfFileError, setPdfFileError] = useState(false);

    

    // For SubmitEvent1
    const[viewPdf1,setViewPdf1] =useState(null);

    // For SubmitEvent2
    const[viewPdf2,setViewPdf2] =useState(null);

    // onChange Event
    const fileType =['application/pdf'];
    const handlePdfFileChange1=(e)=>{
        let selectedFile = e.target.files[0];
        // console.log(selectedFile);
        if(selectedFile){
          if(selectedFile  && fileType.includes(selectedFile.type)){
            
            let reader =new FileReader();
            reader.readAsDataURL(selectedFile);
            reader.onloadend =(e)=>{
              setPdfFile(e.target.result);
              setPdfFileError('');
            }
          }
          else{
            setPdfFile(null);
            setPdfFileError("Please select valid pdf file");
          }

        }
        else{
          window.alert('Select Your File.');
          // console.log('Select Your File.');
        }
    }

    const handlePdfFileChange2=(e)=>{
      let selectedFile = e.target.files[0];
      if(selectedFile){
        if(selectedFile  && fileType.includes(selectedFile.type)){
          
          let reader =new FileReader();
          reader.readAsDataURL(selectedFile);
          reader.onloadend =(e)=>{
            setPdfFile(e.target.result);
            setPdfFileError('');
          }
        }
        else{
          setPdfFile(null);
          setPdfFileError("Please select valid pdf file");
        }

      }
      else{
        window.alert('Select Your File.');
        // console.log('Select Your File.');
      }
  }
    //form Submit

    const handlePdfFileSubmit1 =(e)=>{
      e.preventDefault();

      if(pdfFile!=null)
      {
        setViewPdf1(pdfFile);
        // console.log(pdfFile);

      }
      else{
        setViewPdf1(null);
      }
    }
    const dataURLtoFile = (dataurl, filename) => {
      const arr = dataurl.split(',')
      const mime = arr[0].match(/:(.*?);/)[1]
      const bstr = atob(arr[1])
      let n = bstr.length
      const u8arr = new Uint8Array(n)
      while (n) {
        u8arr[n - 1] = bstr.charCodeAt(n - 1)
        n -= 1 // to make eslint happy
      }
      return new File([u8arr], filename, { type: mime })
    }
    const onSubmitFile1=async()=>{
      const formData = new FormData();
      // console.log(pdfFile);
      const base64PdfFile = dataURLtoFile(pdfFile);
      formData.append('application/pdf',base64PdfFile,base64PdfFile.name);
      // console.log(Object.fromEntries(formData.entries()))

      const res =await fetch('/PostPdfFiletoAdmin', 
        {
            method:"POST",
            // headers: { 'Content-Type': 'multipart/form-data' },
            headers:{'Content-Type':"application/json"},
            // body: formData
            body:JSON.stringify({
                     pdfFile
                   })
        });
        const data = res.json();
        // console.log(data);
        if(res.status==400 || !data){
          window.alert("Invalid");
        }
        else{
            // dispatch({type:"USER", payload:true});
            window.alert("The files have been sent to Admin For verification");
            navigate("/");
        }
    }

    const handlePdfFileSubmit2 =(e)=>{
      e.preventDefault();

      if(pdfFile!=null)
      {
        setViewPdf2(pdfFile);
        // console.log(pdfFile);

      }
      else{
        setViewPdf2(null);
      }
    }

    // const changeHandler =(event)=>{
    //   setSelectedFile(event.target.files[0]);
    //   // setisSelected(true);
    // }
    // const handleSubmission=(data)=>{

    //     // let files =e.target.files;
    //     // console.warn("data file",files);
    //     // let reader =new FileReader();
    //     // reader.readAsDataURL(files[0]);
    //     // reader.onload =(e)=>{
    //     //   console.warn("img data",e.target.result);
    //     console.log(data);
    //     }
       

    
  return(   
    <>
    <h1 align="center">Upload Files for Verification</h1>
    <div className='container'>
      <br></br>
      <form className='form-group' onSubmit={handlePdfFileSubmit1}>
      <input type="file" className='form-control'
       required onChange={handlePdfFileChange1}
      />
      {pdfFileError&&<div className='error-msg'>{pdfFileError}</div>}
      <br></br>
      <button align="center" type="submit" className='btn btn-success btn-lg'>
        UPLOAD
      </button>
      </form>
    </div>
    <br></br>
    <h4  align="center">VIEW PDF</h4>
    <div className='pdf-container'>
    {/* Show Pdf Conditionally (If we have one)*/}
    {viewPdf1&&<><Worker workerUrl="https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js">
          <Viewer fileUrl={viewPdf1}
            plugins={[defaultLayoutPluginInstance]} />
      </Worker></>}

      {/* if we dont have pdf or viewPdf state is null */}
      {!viewPdf1&&<>No pdf file selected</>}
    </div>
    <br></br>
    <div align="center">
    <button onClick={onSubmitFile1} className='button'>SENT ADMIN FILE 1 FOR VERIFICATION</button>
    <br></br>
    </div>
    <br></br>


     {/* For Second Document */}
    <div className='container'>
      <br></br>
      <form className='form-group' onSubmit={handlePdfFileSubmit2}>
      <input type="file" className='form-control'
       required onChange={handlePdfFileChange2}
      />
      {pdfFileError&&<div className='error-msg'>{pdfFileError}</div>}
      <br></br>
      <button align="center" type="submit" className='btn btn-success btn-lg'>
        UPLOAD
      </button>
      </form>
    </div>
    <br></br>
    <h4  align="center">VIEW PDF</h4>
    <div className='pdf-container'>
    {/* Show Pdf Conditionally (If we have one)*/}
    {viewPdf2&&<><Worker workerUrl="https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js">
          <Viewer fileUrl={viewPdf2}
            plugins={[defaultLayoutPluginInstance]} />
      </Worker></>}

      {/* if we dont have pdf or viewPdf state is null */}
      {!viewPdf2&&<>No pdf file selected</>}
    </div>
    <br></br>
    <div align="center">
    <button align="center" className='button'>SENT ADMIN  FILE 2 FOR VERIFICATION</button>
    <br></br>
    </div>
    <br></br>
    {/* <input type="file" name="file" onChange={changeHandler} />
    <div>
    <button onClick={handleSubmission}>Submit</button>
    </div> */}
    </>
  )
}

export default PatientIntermediateLogin