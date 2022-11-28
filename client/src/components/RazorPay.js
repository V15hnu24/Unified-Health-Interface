import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useContext} from 'react'
import { userContext } from "../App";
import { ChakraProvider } from '@chakra-ui/react'
import {Box, Stack} from '@chakra-ui/react'
import Card from './Card.jsx'
// const Razorpay = require('razorpay');

const RazorPay_ =() =>{

    const checkoutHandler =async(amount)=>{
        

        const res2=await fetch('/getkey', {
            method:"GET",
            headers:{
                "Content-Type" : "application/json"
             },
             credentials:"include",
            });
        const data2 = await res2.json();
        
        let key = data2["key"];
        // console.log(key);
        const res=await fetch('/checkout', {
            method:"POST",
            headers:{
                "Content-Type" : "application/json"
             },
            body:JSON.stringify({
                amount,
             })
            });
           
           const data = await res.json();
        //    console.log(data);
           let id = data["order"]["id"];
           let amount2 = data["order"]["amount"];
        
           if(res.status==422 || !data)
           {
                window.alert("Invalid Registration");
                // console.log("Invalid Registration");
           }
        //    else{
        //     window.alert("Registartion Successful");
        //     console.log("Successful Registration");
        //    // alert("Hello");
        //     navigate("/PatientUploadDocuments");
        //     }
        // console.log(data);
        const options = {
            key:key, // Enter the Key ID generated from the Dashboard
            amount:amount2, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: "INR",
            name: "Aditya Peer",
            description: "Test Transaction",
            image: "https://example.com/your_logo",
            order_id: id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            callback_url: "http://localhost:5000/paymentVerification",
            prefill: {
                name: "Gaurav Kumar",
                email: "gaurav.kumar@example.com",
                contact: "9999999999"
            },
            notes: {
                "address": "Razorpay Corporate Office"
            },
            theme: {
                "color": "#3399cc"
            }
        };
        const razor = new window.Razorpay(options);
        razor.open();
    }

  return(   
    <>

    <br/><br/>
    {/* <div className="form-group form-button" align="center">
        <button onClick={makePayment}>PAY USING PAYTM</button>
    </div> */}
    <Box>
        {/* <Stack h={"100vh"}alignItems="center" justifyContent="center" direction={["column","row"]}>
            <Card amount ={500} img={"https://5.imimg.com/data5/KD/BS/MY-5337377/paracetamol-tablets-500x500.jpg"} checkoutHandler={checkoutHandler}/>
            <Card amount ={300} img={"https://4.imimg.com/data4/CC/XM/MY-4092588/vitamin-tablet-500x500.jpg"} checkoutHandler={checkoutHandler}/>
        </Stack> */}
        <Stack h={"100vh"}direction={["column","row"]}>
            <Card amount ={500} img={"https://5.imimg.com/data5/KD/BS/MY-5337377/paracetamol-tablets-500x500.jpg"} checkoutHandler={checkoutHandler}/>
            <Card amount ={300} img={"https://4.imimg.com/data4/CC/XM/MY-4092588/vitamin-tablet-500x500.jpg"} checkoutHandler={checkoutHandler}/>
        </Stack>
    </Box>
    
    </>
  )
}

export default RazorPay_