
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Navbar from '../Navbar1';
import {  getSellerOrder } from '../../reducers/SellerSlice';
import '../../styles.css'
// import '../User/Login.css'

function SellerOrder() {
  const dispatch = useDispatch();
  const [items, setItems] = useState([]);
  const [price,setprice]=useState(0);
  const [loading,setloading]=useState(false)

  useEffect(() => {
    setloading(true)
    dispatch(getSellerOrder())
      .then((response) => {
        setloading(false)
    
        setItems(response.payload);
      })
      .catch((error) => {
        setloading(false)
        console.error('Error fetching products:', error);
      });
  }, [dispatch]);

  const logout = ()=>{
    localStorage.removeItem('token')
    setItems([])
  }


  
  

  return (
    <>
     <Navbar logout={logout} />
      {loading ? (
        <div style={{ height: "100vh", width: "100vw", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <img style={{ height: "10vh" }} src="https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca.gif" alt="" />
          {/* <p>Loading....</p> */}
        </div>
      ) : items.length==0 ? (
        <div className='empty my-3'>
          <img style={{"height":"70%"}} src="https://rsrc.easyeat.ai/mweb/no-orders2.webp" alt=""  />
          <p>No Order Yet </p>
        </div>
        
      ) :  (
        <>
          <h3 style={{"color":"rgba(128, 0, 128, 0.68)" , "marginTop":"10px"}} className="text-center">Your Orders</h3>
          <div className="p d-flex" style={{"backgroundColor":"white"}}>
          {items.map((product) => {
  
  return (
    <div key={product.item.id1} className="c" style={{"boxShadow":"rgba(128, 0, 128, 0.68) 0px 5px 15px"}}>

      
      <img src={product.item.image}  alt="..." />
      
        <h5 className=" text-center">{product.item.name}</h5>
        <p className=" text-center">{product.item.description}</p>
        <p className=" text-center"><b>Price : </b>{product.item.price}</p>
        <p className=" text-center"><b>Quantity : </b>{product.quantity}</p>
        <p className=" text-center"><b>Placed On  : </b>{product.date}</p>
       
        
       
     
    </div>
  );
})}
          </div>

         
        </>
      )}
    </>
  );

 
 
  
}

export default SellerOrder;
