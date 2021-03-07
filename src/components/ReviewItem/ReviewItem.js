import React from 'react';
import './ReviewItem.css';
const ReviewItem = (props) => {
    console.log(props);
    const {name,quantity,img,key,price} = props.product;
    return (
            <div className='product review'> 
                <div>
                  <img src={img} alt="" />
                </div>
                <div>
                    <h1 className='product-name'> {name} </h1>
                    <p>Quantity:{quantity}</p>
                    <p><small>${price}</small></p>
                    <button className="main-button" onClick={() => props.removeProduct(key)}>Remove</button>
                </div>
 
            </div>
    
       
    );
};

export default ReviewItem;