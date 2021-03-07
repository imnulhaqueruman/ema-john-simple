import React from 'react';
import './Cart.css';

const Cart = (props) => {
    const cart = props.cart;
    console.log(cart);
    let total = 0;
    for(let i = 0; i<cart.length; i++){
        const product = cart[i];
        total = total + product.price * product.quantity;
        
    }
    let shipping = 0;
    if(total>35){
        shipping = 0;
    }
    else if(total>15){
        shipping = 4.99;
    }
    else if(total>0){
        shipping = 12.99;
    }
    const tax = (total * 0.1);
    const formatNumber = (num) =>{
        const precision = num.toFixed(2);
        return Number(precision);
    }
    return (
        <div className="cart">
            <h2>Order summary</h2>
            <h3>Items ordered:{cart.length}</h3>
            <p><small>Product Price:{formatNumber(total)}</small></p>
            <p><small>Shipping:{shipping}</small></p>
            <p><small>Tax:{formatNumber(tax)}</small></p>
            <p>Total:{formatNumber(total + shipping + tax)}</p>
            {
                props.children
            }
        </div>
    );
};

export default Cart;