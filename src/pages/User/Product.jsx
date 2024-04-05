
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct,fetchproducts} from "../../reducers/Product";
import {addcart,AddWishlist} from '../../reducers/CartSlice'
import { useNavigate , useLocation } from "react-router-dom";
import Navbar from "../Navbar";



import '../../styles.css'
// import '../User/Login.css'

function Product() {
    const location = useLocation();
   

  const dispatch = useDispatch();
  const history = useNavigate();
  const[loading,setloading]=useState(false);
  const [items, setItems] = useState([]);

  const logout = ()=>{
    localStorage.removeItem('token')
  }
    

  
  
  const products = useSelector((state) => state.Product.data);
  const token = localStorage.getItem('token');
 

  const cart = (product) => {
   
   setloading(true)
    dispatch(addcart(product))
      .then((response) => {
        console.log("ndn")
       setloading(false)
        if(response.type==='cart/addCart/rejected')
        {
          alert("Please First Login ");
        }
        else{
            setloading(false)
          alert("Successfully Added To Cart");
        }
        
      })
      .catch((error) => {
        setloading(false)
        console.log(error);
        if (error.message === "Failed to add item to cart") {
          alert("Failed to add item to cart. Please try again later.");
        } else {
          alert("Please First Login ");
        }
      });
  };

  const wishlist = (product)=>{
    setloading(true)
    dispatch(AddWishlist(product))
      .then((response) => {
        setloading(false)
console.log(response)
        if(response.type==='cart/addwishlist/rejected')
        {
          alert("Enable to Add , try again later");
        }
        else{
          alert(response.payload.data);
        }
        
      })
      .catch((error) => {
        setloading(false)

        if (error.message === "Failed to add item to Wishlist") {
          alert("Failed to add item to cart. Please try again later.");
        } else {
          alert("Please First Login ");
        }
      });

  }
  const { category } = location.state;
  useEffect(()=>{
    

  
        setloading(true)
        dispatch(fetchproducts(category))
        .then((response) => {
          console.log(response.payload);
          setloading(false);
        
          if(response.type==='cart/product/rejected')
          {
            alert("Some error occured ");
          }
          else{
          
            setItems(response.payload);
            setItems(response.payload)
          }
          
        })
        .catch((error) => {
          setloading(false)
          console.log(error);
         alert("Some error occured..")
        });
    
    
    
      

  },[])
  
  

  return (
    <>
     <Navbar logout={logout}/>
      {loading ? (
      <div style={{ height: "100vh", width: "100vw", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <img style={{ height: "10vh" }} src="https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca.gif" alt="" />
        {/* <p>Loading....</p> */}
      </div>
    ) : items === undefined || items.length==0 ? (
      <div className='empty'>
        <img src="https://evgracias.com/images/no-products.jpg" alt=""  />
      </div>
      
    ) : (
      <>

        <h3 style={{"color":"rgba(128, 0, 128, 0.68)"}} className="text-center">{category} Products</h3>
        <div className="p d-flex" style={{"backgroundColor":"white"}}>
          {items.map((product,i) => (
            <div key={i } style={{"boxShadow":"rgba(128, 0, 128, 0.68) 0px 5px 15px"}} className="c">
              <img src={product.image} alt="..." />
              <h5 className="text-center">{product.name}</h5>
              <p className="text-center">{product.description}</p>
              <p className="text-center"><b>Price:</b> {product.price}</p>
              <div className='d-flex'>
                <button style={{"backgroundColor": "rgba(128, 0, 128, 0.68)", border:"none"}} onClick={() => { cart(product) }} className="btn btn-primary mx-auto d-block">Add To Cart</button>
                <button  style={{"backgroundColor": "rgba(128, 0, 128, 0.68)" ,border:"none"}} onClick={() => { wishlist(product) }} className="btn btn-primary mx-auto d-block">WishList</button>
              </div>
             
            </div>
          ))}
        </div>
        
      </>
    )}


    </>
  );
}

export default Product;
