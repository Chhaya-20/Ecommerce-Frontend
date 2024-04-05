
import React, { useState, useEffect } from 'react';
import { getuser } from '../../reducers/UserSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import '../../styles.css'
import './Login.css'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginStatus = useSelector((state) => state.User.status);

  useEffect(() => {
   
    if (loginStatus === 'idle') {
      setLoading(true);
     
      navigate("/");
      setLoading(false);
    } else if (loginStatus === 'error') {
      setLoading(false);
      alert("Login failed");
    }
  }, [loginStatus, navigate]);

  const login = async (e) => {
    e.preventDefault();
   
    alert("Please Wait ! It may take some time ")  
    setLoading(true);   

    try {
    
 dispatch(getuser({ email, password }));

      // setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
      alert("An error occurred while logging in.");
    }
  };

  return (
    <div>
      {loading ? (
        <div style={{ height: "100vh", width: "100vw", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <img style={{ height: "10vh" }} src="https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca.gif" alt="" />
          {/* <p>Loading....</p> */}
        </div>
      ) : (
        <div className="upper">
          <div className="forms content">
            <form method="POST">
              <h1 className='text-center mb-5'>Login To Account</h1>
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
                Don't have an account ?<Link to="/signup"> Create Account </Link>
              </div>
              <div className="mt-3 form-check" style={{'padding':0}}>
                Login as Selller ?<Link to="/seller"> Click Here </Link>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
  
}

export default Login;

