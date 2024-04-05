
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Navbar from '../Navbar';
import { getCart ,increases , getOrder } from '../../reducers/CartSlice';
import '../../styles.css'


function Cart() {
  const dispatch = useDispatch();
  const [items, setItems] = useState([]);
  const [price,setprice]=useState(0);
  const [loading,setloading]=useState(false)

  useEffect(() => {
    setloading(true)
    dispatch(getOrder())
      .then((response) => {
        setloading(false)
       
        if(response.payload.data==undefined || response.payload.data==[])
        {
          setItems([])
        }
        else{
          setItems(response.payload.data);  
        }
        
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
      ) : items === undefined || items.length==0  ? (
        <div className='empty my-3'>
          <img style={{"height":"70%"}} src="https://rsrc.easyeat.ai/mweb/no-orders2.webp" alt=""  />
          <p>No Order Yet </p>
        </div>
        
      ) :  (
        <>
          <h1 className="text-center">Your Orders</h1>
          <div className="p d-flex">
          {items.map((product) => {
  
  return (
    <div key={product.item.id1} className="c" style={{ "width": "18rem" }}>
      
      <img src={product.item.image}  alt="..." />
      
        <h5 className=" text-center">{product.item.name}</h5>
        <p className=" text-center">{product.item.description}</p>
        <p className=" text-center"><b>Price : </b>{product.item.price}</p>
        <p className=" text-center"><b>Quantity : </b>{product.quantity}</p>
        
       
     
    </div>
  );
})}
          </div>

         
        </>
      )}
    </>
  );

  // return (
  //   <>
  //     <Navbar />
  //     {loading ? (
  //       <div style={{ height: "100vh", width: "100vw", display: "flex", justifyContent: "center", alignItems: "center" }}>
  //         <img style={{ height: "10vh" }} src="https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca.gif" alt="" />
  //         {/* <p>Loading....</p> */}
  //       </div>
  //     ) : items.length === 0 ? (
  //       <div className='empty'>
  //         <img src="https://hsnbazar.com/images/empty-cart.png" alt=""  />
  //       </div>
        
  //     ) : (
  //       <>
  //         <h1 className="text-center">All Products</h1>
  //         <div className="p d-flex">
  //           {items.map((product) => (
  //             <div key={product._id} className="c">
  //               <img src={product.image} alt="..." />
  //               <h5 className="text-center">{product.title}</h5>
  //               <p className="text-center">{product.description}</p>
  //               <p className="text-center"><b>Quantity:</b> {product.quantity}</p>
  //               <p className="text-center"><b>Price:</b> {product.price}</p>
  //               <div className='d-flex'>
  //                 <button onClick={() => { increase(product._id) }} className="btn btn-primary mx-auto d-block">+</button>
  //                 <button onClick={() => { decrease(product._id) }} className="btn btn-primary mx-auto d-block">-</button>
  //               </div>
  //               <div className="button-container d-flex">
  //                 <button onClick={() => { buy(product._id) }} className="btn btn-primary mx-auto d-block">Buy Now</button>
  //               </div>
  //             </div>
  //           ))}
  //         </div>
  //         <ColoredLine color="black" />
  //         <div style={{ "display": "flex", "flexDirection": "column", "marginTop": "60px" }}>
  //           <p className='d-flex d-block m-auto'><h4>TotalPrice: </h4><h6>{price}</h6></p>
  //           <button className='btn btn-primary d-block m-auto'>Place Order</button>
  //         </div>
  //       </>
  //     )}
  //   </>
  // );
}

export default Cart;
