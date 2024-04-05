
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Navbar from '../Navbar';
import { getCart ,increases , buyproduct} from '../../reducers/CartSlice';
import '../../styles.css'


function Cart() {
  const dispatch = useDispatch();
  const [items, setItems] = useState([]);
  const [price,setprice]=useState(0);
  const [loading,setloading]=useState(false);

  useEffect(() => {
    setloading(true)
    dispatch(getCart())
      .then((response) => {
        setloading(false);
        if(response.type=="cart/getCart/rejected")
        {
         
          setItems([])
        }
        else{
          if(response.payload.message=="No product in cart")
          {
            setItems([])
          }
          else{
           
            setprice(response.payload.totalprice)
            setItems(response.payload);
          }
          
        }
        
      })
      .catch((error) => {
        setloading(false);
        console.error('Error fetching products:', error);
      });
  }, [dispatch]);



  const logout = ()=>{
    localStorage.removeItem('token')
    setItems([])
  }

  



 
  const increase = (id) => {
   
    const inc = "inc"; 
    dispatch(increases({ id, inc }))
      .then((response) => {
        //setloading(true)
        dispatch(getCart())
          .then((response) => {
            setloading(false);
            if(response.type=="cart/getCart/Rejected")
            {

              alert("Failed to load cart ! ")
            }
            else{
  
              setprice(response.payload.totalprice)
              setItems(response.payload);
            }
            
          })
          .catch((error) => {
            
            console.error('Error fetching products:', error);
          });
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }
  

  const decrease = (id) => {
  
  
    const inc = "dec"; 
    dispatch(increases({ id, inc }))
      .then((response) => {
    
       
       
        dispatch(getCart())
          .then((response) => {
           
            if(response.type=="cart/getCart/Rejected")
            {
          
              alert("Failed to load cart ! ")
            }
            else{
             
              setprice(response.payload.totalprice)
              setItems(response.payload);
            }
            
          })
          .catch((error) => {
            setloading(false);
            console.error('Error fetching products:', error);
          });
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }

  const buy = (product)=>{
   
    setloading(true);
    dispatch(buyproduct(product))
    .then((response) => {
      setloading(true)
      dispatch(getCart())
        .then((response) => {
          setloading(false);
         alert("Order placed Successfully");
        
         if(response.payload.data==undefined || response.payload.data==[])
         {
         
          setItems([]);
          setprice(0)
         }
         else{
          setItems(response.payload.items);
          setprice(response.payload.totalprice)
         }
          
        })
        .catch((error) => {
          setloading(false);
          alert("An error occured while placing Order")
          console.error('Error fetching products:', error);
        });
    })
    .catch((error) => {
      setloading(false);
      console.error('Error fetching products:', error);
    });

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
      <div className='empty'>
        <img src="https://hsnbazar.com/images/empty-cart.png" alt=""  />
      </div>
      
    ) : (
      <>
        <h3 style={{"color":"rgba(128, 0, 128, 0.68)"}} className="text-center">Your Products</h3>
        <div className="p d-flex" style={{"backgroundColor":"white"}}>
          {items.map((product) => (
            <div key={product._id} className="c" style={{"boxShadow":"rgba(128, 0, 128, 0.68) 0px 5px 15px"}}>
              <img src={product.item.image} alt="..." />
              <h5 className="text-center">{product.item.name}</h5>
              <p className="text-center">{product.item.description}</p>
              <p className="text-center"><b>Quantity:</b> {product.quantity}</p>
              <p className="text-center"><b>Price:</b> {product.price}</p>
              <div className='d-flex'>
                <button  style={{"backgroundColor": "rgba(128, 0, 128, 0.68)", border:"none"}} onClick={() => { increase(product.item.id1) }} className="btn btn-primary mx-auto d-block">+</button>
                <button  style={{"backgroundColor": "rgba(128, 0, 128, 0.68)", border:"none"}} onClick={() => { decrease(product.item.id1) }} className="btn btn-primary mx-auto d-block">-</button>
              </div>
              <div className="button-container d-flex">
                <button  style={{"backgroundColor": "rgba(128, 0, 128, 0.68)", border:"none"}} onClick={() => { buy(product) }} className="btn btn-primary mx-auto d-block">Buy Now</button>
              </div>
            </div>
          ))}
        </div>
        
      </>
    )}
  </>
);
}

export default Cart;
