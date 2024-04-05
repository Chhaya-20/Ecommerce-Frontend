

import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Navbar from '../Navbar1';
import { getsellerproduct, deleteproduct, editproduct } from '../../reducers/SellerSlice';
import { getCart, increases, buyproduct } from '../../reducers/CartSlice';
import '../../styles.css'




function Sellerpage() {
  const dispatch = useDispatch();
  const [items, setItems] = useState([]);
  const [price, setprice] = useState(0);
  const [loading, setloading] = useState(false);
  const [ed,seted] = useState(false); // State for controlling modal visibility
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedProductCategory, setSelectedProductCategory] = useState(null);

  useEffect(() => {
    setloading(true)
    dispatch(getsellerproduct())
      .then((response) => {
        setloading(false);
        if (response.payload.message == "No products Available") {
          setItems([])
        } else {
          setItems(response.payload)
        }
      })
      .catch((error) => {
        setloading(false);
        console.error('Error fetching products:', error);
      });
  }, [dispatch]);

  

  const edits = (product) => {
    const name = prompt("Enter New Name",product.name)
    const description = prompt("Enter New Description",product.description)
    const image = prompt("Enter image link",product.image);
    const price = prompt("Enter new price");

    dispatch(editproduct({ name, description, image, price, id: product._id, category: product.category }))
    .then((response) => {
      setloading(false);
      dispatch(getsellerproduct())
        .then((response) => {
          setloading(false);
          if (response.payload.message == "No products Available") {
            setItems([])
          } else {
            setItems(response.payload)
          }
        })
        .catch((error) => {
          setloading(false);
          console.error('Error fetching products:', error);
        });
    })
    .catch((error) => {
      setloading(false);
      console.error('Error fetching products:', error);
    });





    

    
  }

  const deletes = (id, category) => {
    setloading(true)
    dispatch(deleteproduct({ id, category }))
      .then((response) => {
        setloading(false);
        dispatch(getsellerproduct())
          .then((response) => {
            setloading(false);
            if (response.payload.message == "No products Available") {
              setItems([])
            } else {
              setItems(response.payload)
            }
          })
          .catch((error) => {
            setloading(false);
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
      <Navbar />
    
      {loading ? (
        <div style={{ height: "100vh", width: "100vw", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <img style={{ height: "10vh" }} src="https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca.gif" alt="" />
          {/* <p>Loading....</p> */}
        </div>
      ) : items.length === 0  || items==undefined ? (
        <div className='empty'>
          <img src="https://www.dzor.in/static/media/no.7425bfa271cc0ec6dbaf.png" alt="" />
          <p><a href="/addproduct">Add Products</a></p>
        </div>
      ) : (
        <>
          <h3 style={{"color":"rgba(128, 0, 128, 0.68)"}} className="text-center">Your Products</h3>
          <div className="p d-flex" style={{"backgroundColor":"white"}}>
            {items.map((product) => (
                        <div key={product._id} className="c" style={{"boxShadow":"rgba(128, 0, 128, 0.68) 0px 5px 15px"}}>

                <img src={product.image} alt="..." />
                <h5 className="text-center">{product.name}</h5>
                <p className="text-center">{product.description}</p>
                <p className="text-center"><b>Price:</b> {product.price} Rs</p>
                <p className="text-center"><b>Category:</b> {product.category}</p>
                <div className='d-flex'>
                  <button  style={{"backgroundColor": "rgba(128, 0, 128, 0.68)", border:"none"}} onClick={() => { edits(product) }} className="btn btn-primary mx-auto d-block">Edit</button>
                  <button  style={{"backgroundColor": "rgba(128, 0, 128, 0.68)", border:"none"}} onClick={() => { deletes(product._id, product.category) }} className="btn btn-primary mx-auto d-block">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default Sellerpage;

