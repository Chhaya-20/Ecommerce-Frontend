import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import '../styles.css';

function Home() {
  const history = useNavigate();
  const [hoveredButton, setHoveredButton] = useState(null);

  const fetchProduct = (cat) => {
    history("/products", { state: { category: cat } });
  };

  return (
    <>
      <Navbar />
     
      <div className="alls" style={{"marginTop":"19PX"}}>
        <button
        style={{
          border:"none",
          borderRadius:"20px"
        }}
          onClick={() => fetchProduct("Electronic")}
          onMouseEnter={() => setHoveredButton("Electronic")}
          onMouseLeave={() => setHoveredButton(null)}
          className={hoveredButton === "Electronic" ? "hovered" : ""}
        >
           <div className="card" style={{width: '18rem'}}>
            <img
              style={{"height":"200px"}}
              src="https://www.shutterstock.com/image-illustration/3d-render-home-appliances-collection-260nw-1668941440.jpg"
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h1 style={{"color":"rgb(128 0 128)"}} className="card-text">Electronics</h1>
            </div>
          </div>
        </button>

        <button
        style={{
          border:"none",
          borderRadius:"20px"
        }}
          onClick={() => fetchProduct("Food")}
          onMouseEnter={() => setHoveredButton("Food")}
          onMouseLeave={() => setHoveredButton(null)}
          className={hoveredButton === "Food" ? "hovered" : ""}
        >
             <div className="card" style={{width: '18rem'}}>
            <img
              style={{"height":"200px"}}
              src="https://media.istockphoto.com/id/146807105/photo/food-pyramid-pie-chart.jpg?s=612x612&w=0&k=20&c=SX0hFBaED3Wwi0G2pLfhsYN1GRjlyK8wzqHf-qUyJOk="
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h1 style={{"color":"rgb(128 0 128)"}} className="card-text">Foods</h1>
            </div>
          </div>
        </button>

        <button
        style={{
          border:"none",
          borderRadius:"20px"
        }}
          onClick={() => fetchProduct("Clothes")}
          onMouseEnter={() => setHoveredButton("Clothes")}
          onMouseLeave={() => setHoveredButton(null)}
          className={hoveredButton === "Clothes" ? "hovered" : ""}
        >
              <div className="card" style={{width: '18rem', margin:'0px'}}>           <img
                style={{"height":"200px"}}
              src="https://www.shutterstock.com/image-photo/beautiful-colorful-clothes-flying-isolatedwomens-600nw-2257875171.jpg"
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h1 style={{"color":"rgb(128 0 128)"}}  className="card-text">Clothes</h1>
            </div>
          </div>
        </button>

        <button
        style={{
          border:"none",
          borderRadius:"20px"
        }}
          onClick={() => fetchProduct("Toys")}
          onMouseEnter={() => setHoveredButton("Toys")}
          onMouseLeave={() => setHoveredButton(null)}
          className={hoveredButton === "Toys" ? "hovered" : ""}
        >
            <div className="card" style={{width: '18rem', margin:'0px'}}>
            <img
              style={{"height":"200px"}}
              src="https://media.istockphoto.com/id/687165852/photo/toys.jpg?s=612x612&w=0&k=20&c=_BdsQLnut3pVc3RYgodD3Xiy7gCCM3K8HX3GdODLRt0="
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h1 style={{"color":"rgb(128 0 128)"}} className="card-text">Toys</h1>
            </div>
          </div>
        </button>

        <button
        style={{
          border:"none",
          borderRadius:"20px"
        }}
          onClick={() => fetchProduct("Beauty")}
          onMouseEnter={() => setHoveredButton("Beauty")}
          onMouseLeave={() => setHoveredButton(null)}
          className={hoveredButton === "Beauty" ? "hovered" : ""}
        >
            <div className="card" style={{width: '18rem'}}>
            <img
              style={{"height":"200px"}}
              src="https://w0.peakpx.com/wallpaper/725/73/HD-wallpaper-beauty-girl-model-makeup-hand-face-lips-earring.jpg"
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h1 style={{"color":"rgb(128 0 128)"}} className="card-text">Beauty</h1>
            </div>
          </div>
        </button>

        <button
        style={{
          border:"none",
          borderRadius:"20px"
        }}
          onClick={() => fetchProduct("Shoes")}
          onMouseEnter={() => setHoveredButton("Shoes")}
          onMouseLeave={() => setHoveredButton(null)}
          className={hoveredButton === "Shoes" ? "hovered" : ""}
        >
            <div className="card" style={{width: '18rem'}}>
            <img
              style={{"height":"200px"}}
              src="https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-260nw-92008067.jpg"
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h1 style={{"color":"rgb(128 0 128)"}}className="card-text">Shoes</h1>
            </div>
          </div>
        </button>

        <button
        style={{
          border:"none",
          borderRadius:"20px"
        }}
          onClick={() => fetchProduct("Books")}
          onMouseEnter={() => setHoveredButton("Books")}
          onMouseLeave={() => setHoveredButton(null)}
          className={hoveredButton === "Books" ? "hovered" : ""}
        >
           <div className="card" style={{width: '18rem'}}>
            <img
            style={{"height":"200px"}}
              src="https://images7.alphacoders.com/132/1326369.png"
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h1  style={{"color":"rgb(128 0 128)"}} className="card-text">Books</h1>
            </div>
          </div>
        </button>
      </div>
    </>
  );
}

export default Home;
