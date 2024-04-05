
import React, { useState, useEffect } from 'react';
import { getuser } from '../../reducers/UserSlice';
import {addproduct} from '../../reducers/SellerSlice'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../Navbar1';
import '../../styles.css'
import '../User/Login.css'

const Login = () => {
  const [name, setname] = useState("");
  const [desc, setdesc] = useState("");
  const[price,setprice]=useState();
  const[image,setimage] = useState("");
 
  const [selectedItem, setSelectedItem] = useState("Category");
  const [loading, setLoading] = useState(false); 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginStatus = useSelector((state) => state.User.status);


  
  
  function handleItemClick(item) {

    setSelectedItem(item);
    // Add your logic to handle the selected item here
  }
  const addproducts = (e) => {
    e.preventDefault();
    setLoading(true)
    dispatch(addproduct({  name, price, image, desc, selectedItem  }))
      .then((response) => {
       setLoading(false)
        if(response.type==='seller/addproduct/rejected')
        {
          alert("Some error occured while adding product ! ");
        }
        else{
          alert("Successfully Added");
          navigate("/sellerpage")
        }
        
      })
      .catch((error) => {
        setLoading(false)
        if (error.message === "Failed to add product") {
          alert("Failed to add product. Please try again later.");
        } else {
          alert("Please First Login ");
        }
      });
  };
 

  return (
    <>
    <Navbar/>
    <div className="uppers" style={{"background":"white"}}>
      <div style={{"boxShadow":"rgba(128, 0, 128, 0.68) 0px 5px 15px"}} className="forms content">
        <form method="POST">
          <h3 style={{"color":"rgba(128, 0, 128, 0.68)"}} className='text-center mb-5'>Add Product</h3>
          <div className="mb-3">
            <label style={{"color":"rgba(128, 0, 128, 0.68)"}} htmlFor="p" className="form-label"><b>Name of Product</b></label>
            <input name="name" value={name} onChange={(e) => setname(e.target.value)} type="text" className="form-control" id="p" />
          </div>
          <div className="mb-3">
            <label style={{"color":"rgba(128, 0, 128, 0.68)"}} htmlFor="p" className="form-label"><b>Description</b></label>
            <input name="description" value={desc} onChange={(e) => setdesc(e.target.value)} type="text" className="form-control" id="d" />
          </div>
 




<div className="dropdown-center" style={{ width: '400px' }}> {/* Adjust width as needed */}
  <button   style={{"color":"rgba(128, 0, 128, 0.68)" , width:"400px" }}  className="drop btn  dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    <b>{selectedItem}</b>
  </button>
  <ul className="dropdown-menu" style={{ width: '100%' }}> {/* Set width */}
    <li onClick={() => handleItemClick('Electronic')}>Electronic</li>
    <li onClick={() => handleItemClick('Clothes')}>Clothes</li>
    <li onClick={() => handleItemClick('Shoes')}>Shoes</li>
    <li onClick={() => handleItemClick('Food')}>Food</li>
    <li onClick={() => handleItemClick('Beauty')}>Beauty</li>
    <li onClick={() => handleItemClick('Toys')}>Toys</li>
    <li onClick={() => handleItemClick('Books')}>Books</li>
  </ul>
</div>




















<div className="mb-3 mt-3">
            <label  style={{"color":"rgba(128, 0, 128, 0.68)"}} htmlFor="p" className="form-label"><b>Enter Image Link</b></label>
            <input name="image" value={image} onChange={(e) => setimage(e.target.value)} type="text" className="form-control" id="d" />
          </div>
          <div className="mb-3 ">
            <label  style={{"color":"rgba(128, 0, 128, 0.68)"}} htmlFor="p" className="form-label"><b>Enter Price (Don't enter any special character , @..)</b></label>
            <input name="price" value={price} onChange={(e) => setprice(e.target.value)} type="text" className="form-control" id="d" />
          </div>

          {/* <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input name='password' value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="exampleInputPassword1"/>
          </div> */}
          <button  style={{"backgroundColor": "rgba(128, 0, 128, 0.68)", border:"none"}} onClick={addproducts} className='btn btn-primary d-block m-auto'>Add Product</button>
        </form>
      </div>
    </div>
    </>
  );
}

export default Login;

