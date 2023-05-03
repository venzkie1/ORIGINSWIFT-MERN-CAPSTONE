import React, { useState, useEffect } from 'react'
import "./Pay.scss";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import newRequest from "../../utils/newRequest";
import { useParams } from "react-router-dom";
import CheckoutForm from '../../components/checkoutForm/CheckoutForm';

const stripePromise = loadStripe("pk_test_51MwSm0Df0sjfq46ugKHU2c65oobHAJgl27K6bwsv85fn79sZ4toDtReN5VocEUKs6tsEyBdjTN4UxEMneV5zxD9s00cF5aiHnq");


const Pay = () => {
    const [clientSecret, setClientSecret] = useState("");

    const {id} = useParams()

    useEffect(()=>{
        const makeRequest = async ()=>{
            try{
                const res = await newRequest.post(`/orders/create-payment-intent/${id}`);

                setClientSecret(res.data.clientSecret);

            }catch(err){
                console.log(err);
            }
        };
        makeRequest();
    },[]);

    const appearance = {
        theme: 'flat',
      };
      const options = {
        clientSecret,
        appearance,
      };

  return (

    <div className='pay'>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  )
}

export default Pay
