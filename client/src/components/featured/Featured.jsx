import React, { useState } from "react";
import "./Featured.scss";
import { useNavigate } from "react-router-dom";

function Featured() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    const trimmedInput = input.trim();
    if (trimmedInput !== "") {
      navigate(`/gigs?search=${trimmedInput}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="featured">
      <div className="container">
        <div className="left">
          <h1>
            Find the right <span>freelance</span> services for your business
          </h1>
          <div className="search">
            <div className="searchInput">
              <img src="./img/search.png" alt="" />
              <input
                type="text"
                placeholder='e.g "Web Design"'
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                required
                onInvalid={(e) =>
                  e.target.setCustomValidity(
                    "Please input a valid keyword before submitting!"
                  )
                }
              />
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
