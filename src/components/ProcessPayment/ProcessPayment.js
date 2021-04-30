import React from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import {CardElement} from '@stripe/react-stripe-js';
import ShowCardFrom from './ShowCardFrom';
import SplitForm from './SplitForm';

const stripePromise = loadStripe('pk_test_51IeO7vCuP3syf6hFnEWM7fxmIVc6yz3MirOcBpT3lCEJj09C9dvzmZLizvvM9JX9sy1EnuLD30CFvC6lgdoLEXGB00kYRYiHvR');
const ProcessPayment = ({handlePayment}) => {
    return (
        <Elements stripe={stripePromise}>
           <ShowCardFrom handlePayment={handlePayment}></ShowCardFrom>
        </Elements>
    );
};

export default ProcessPayment;