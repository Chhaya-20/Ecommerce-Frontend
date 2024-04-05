


import React, { useState, useEffect } from 'react';
import { getuser } from '../../reducers/SellerSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import '../../styles.css'
import '../User/Login.css'
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginStatus = useSelector((state) => state.User.status);

  useEffect(() => {
    if (loginStatus === 'idle') {
      navigate("/sellerpage");
    } else if (loginStatus === 'error') {
      setLoading(false);
      alert("Login failed");
    }
  }, [loginStatus, navigate]);

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    alert("Please Wait ! It may take some time ")  

    try {
      // Dispatch the action and wait for it to be fulfilled
      dispatch(getuser({ email, password }));
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
      alert("An error occurred while logging in.");
    }
  };

  return (
    <div className="upper">
      <div className="forms content">
        <form method="POST">
          <h1 className='text-center mb-5'>Login As Seller</h1>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input name="email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input name='password' value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="exampleInputPassword1"/>
          </div>
          <button onClick={login} type="submit" className="btn btn-primary" style={{width:"100%"}}>Login</button>
          <div className="mt-3 form-check" style={{'padding':0}}>
            Don't have an account ?<Link to="/sellersignup"> Create Account </Link>
          </div>
          <div className="mt-3 form-check" style={{'padding':0}}>
            Login as User ?<Link to="/login"> Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

