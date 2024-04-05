
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Navbar from '../Navbar';
import {getwishlist,removeWish} from '../../reducers/CartSlice';
import '../../styles.css'
import '../User/Login.css'

function WishList() {
  const dispatch = useDispatch();
  const [items, setItems] = useState([]);
 
  const [loading,setloading]=useState(false);

  useEffect(() => {
    setloading(true)
    dispatch(getwishlist())
      .then((response) => {
        setloading(false);
        setItems(response.payload.data);
      })
      .catch((error) => {
        setloading(false);
        console.error('Error fetching products:', error);
      });
  }, [dispatch]);


  const remove = (id)=>{
    dispatch(removeWish(id))
    .then((response)=>{
      setloading(true)
    dispatch(getwishlist())
      .then((response) => {
        setloading(false);
       
        if(response.payload.data==undefined || response.payload.data==[])
        {
        
         setItems([]);
       
        }
        else{
          setItems(response.payload.data);
        }
       
        
      })
      .catch((error) => {
        setloading(false);
        console.error('Error fetching products:', error);
      });

    }) .catch((error) => {
      setloading(false);
      console.error('Error fetching products:', error);
    });
  }


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
    ) : items === undefined || items.length==0 ? (
      <div className='empty'>
        <img src="https://www.beatsmed.com/static/images/empty-wishlist.png" alt=""  />
      </div>
      
    ) : (
      <>
        <h3 style={{"color":"rgba(128, 0, 128, 0.68)"}}  className="text-center">WishList Products</h3>
        <div className="p d-flex" style={{"backgroundColor":"white"}}>
          {items.map((product) => (
            <div key={product._id} className="c" style={{"boxShadow":"rgba(128, 0, 128, 0.68) 0px 5px 15px"}}>
            <img src={product.image} alt="..." />
              <h5 className="text-center">{product.title}</h5>
              <p className="text-center">{product.description}</p>
              <p className="text-center"><b>Price:</b> {product.price}</p>
             
              <div className="button-container d-flex">
                <button  style={{"backgroundColor": "rgba(128, 0, 128, 0.68)", border:"none"}} onClick={() => { remove(product.id1) }} className="btn btn-primary mx-auto d-block">Remove</button>
              </div>
            </div>
          ))}
        </div>
        
      </>
    )}
  </>
);
}

export default WishList;
