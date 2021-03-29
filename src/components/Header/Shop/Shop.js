import React, { useEffect, useState } from 'react';
import { addToDatabaseCart, getDatabaseCart } from '../../../utilities/databaseManager';
import Cart from '../../Cart/Cart';
import Product from '../Product/Product';
import { Link } from 'react-router-dom';
import './Shop.css';

const Shop = () => {
    //const first10 = fakeData.slice(0,15);
    const [products,setProducts] = useState([]);
    const[cart,setCart] = useState([]);
    
    useEffect(() =>{
        fetch('http://localhost:5000/products')
        .then(res => res.json())
        .then(data => setProducts(data))
    },[products])




    useEffect(() =>{
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        fetch('http://localhost:5000/productByKeys',{
             method:'POST',
             headers:{
                'Content-Type': 'application/json',
             },
             body:JSON.stringify(productKeys)

         })
         .then(res => res.json())
         .then(data => setCart(data))
        
    },[products]);
    const handleAddProduct =(product) =>{
        const toBeAdded = product.key;
        const sameProduct = cart.find(pd => pd.key===toBeAdded);
        let count = 1;
        let newCart;
        if(sameProduct){
            const count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAdded)
            newCart = [...others, sameProduct];
        }
        else{
            product.quantity = 1;
            newCart = [...cart,product];
        }
        //console.log('product added',product);
       
        setCart(newCart);
       
        addToDatabaseCart(product.key, count)
    }

    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    products.map(pd => <Product
                        key={pd.key} 
                        showAddToCart ={true}
                        handleAddProduct={handleAddProduct}
                        product={pd}></Product>) 
                }
                
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                <Link to="/review">
                <button className='main-button'>Review order</button>
                </Link>
                </Cart>
            </div>
           
        </div>
    );
};

export default Shop;