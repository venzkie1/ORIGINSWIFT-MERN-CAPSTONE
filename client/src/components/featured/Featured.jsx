import React, { useState } from "react";
import "./Featured.scss";
import { useNavigate } from "react-router-dom";

function Featured() {
  const [input, setInput] = useState();
  const navigate = useNavigate();

  const handleSubmit = ()=>{
    navigate(`/gigs?search=${input}`);
  }
  return (
    <div className="featured">
      <div className="container">
        <div className="left">
          <h1>
            Find the perfect <span>freelance</span> services for your business
          </h1>
          <div className="search">
            <div className="searchInput">
              <img src="./img/search.png" alt="" />
              <input type="text" placeholder='e.g"Web Design"' onChange={e=>setInput(e.target.value)} />
            </div>
            <button onClick={handleSubmit}>Search</button>
          </div>
          <div className="popular">
            <span>Popular:</span>
            <button>Web Design</button>
            <button>Virtual Assistant</button>
            <button>Logo Design</button>
          </div>
        </div>
        <div className="right">
          <img src="./img/bg.png" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Featured;
