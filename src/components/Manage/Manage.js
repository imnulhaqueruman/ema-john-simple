import React from 'react';
const Manage = () => {
    const handleAddProduct = () =>{
        const product={}
         fetch('https://evening-forest-68265.herokuapp.com/addProducts',{
             method:'POST',
             headers:{
                'Content-Type': 'application/json',
             },
             body:JSON.stringify(product)
         })

    }
    return (
        <div>
            <form action="">
                <p><span>Name:</span><input type="text"/></p>
                <p><span>Price:</span><input type="text"/></p>
                <p><span>Quantity</span><input type="text"/></p>
                <p><span>Product Image</span><input type="file"/></p>
            
               <button onClick={handleAddProduct}>AddProduct</button>
            </form>
           
        </div>
    );
};

export default Manage;