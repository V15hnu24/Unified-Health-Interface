import React, { useState, useEffect } from "react";
import "../styles/cart.css";
import RazorPay_ from "./RazorPay";

const Cart = ({ cart, setCart, handleChange }) => {
  const [price, setPrice] = useState(0);
  const[userData, setUserData] = useState('');

  const handleRemove = (id) => {
    const arr = cart.filter((item) => item.id !== id);
    setCart(arr);
    handlePrice();
  };

  const handlePrice = () => {
    let ans = 0;
    cart.map((item) => (ans += item.amount * item.price));
    setPrice(ans);
  };
const getPatientDetail= () =>{
    const id = window.localStorage.getItem('id');

    var fetch_url = "/patient/" + id
    console.log(fetch_url)
    fetch(fetch_url, {
      method: "GET",
      headers:{
        // Accept:"application/json",
        "Content-Type":"application/json"
      },
    })
    .then(res => {

      if (res.status === 200) {
        res.json()
        .then( (data) => {
          setUserData( {...userData, name: data.tempPatient.name, email:data.tempPatient.email});
          //setShow(true);
          dispatch({type:"USER", payload:true});
        })
      } else {
        const error = new Error(res.error);
        throw error;
      }

    })
  }

  const checkoutHandler =async(amount)=>{
        

    const res2=await fetch('/razorpay/getkey', {
        method:"GET",
        headers:{
            "Content-Type" : "application/json"
         },
         credentials:"include",
        });
    const data2 = await res2.json();
    
    let key = data2["key"];
    // console.log(key);
    const res=await fetch('/razorpay/checkout', {
        method:"POST",
        headers:{
            "Content-Type" : "application/json"
         },
        body:JSON.stringify({
            amount,
         })
        });
       
       const data = await res.json();
      //  console.log(data);
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
        name: userData.name,
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        callback_url: "http://localhost:5000/razorpay/paymentVerification",
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

  useEffect(() => {
    handlePrice();
    getPatientDetail();
  });

  return (
    <article>
      {cart.map((item) => (
        <div className="cart_box" key={item.id}>
          <div className="cart_img">
            <img src={item.img} alt="" />
            <p>{item.title}</p>
          </div>
          <div>
            <button onClick={() => handleChange(item, 1)}>+</button>
            <button>{item.amount}</button>
            <button onClick={() => handleChange(item, -1)}>-</button>
          </div>
          <div>
            <span>{item.price}</span>
            <button onClick={() => handleRemove(item.id)}>Remove</button>
          </div>
        </div>
      ))}
      <div className="total">
        <span>Total Price of your Cart</span>
        <span>Rs - {price}</span>
      </div>
      <br></br>
      <div align="right">
       <input type="submit"  value="Proceed to Pay" onClick={()=>checkoutHandler(price)}  />
        </div>
    </article>
  );
};

export default Cart;
