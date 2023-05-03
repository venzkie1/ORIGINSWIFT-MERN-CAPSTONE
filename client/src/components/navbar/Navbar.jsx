import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./Navbar.scss";

function Navbar() {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);

  const { pathname } = useLocation();

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);


  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const navigate = useNavigate();

  const handleLogout = async () =>{
    try {
      await newRequest.post("/auth/logout");
      localStorage.setItem("currentUser", null);
      navigate("/");
    }catch (err){
      console.log(err);
    }
  };

  return (
    <div 
    className={active || pathname !== "/" ? "navbar active" : "navbar"}>
      <div className="container">
        <div className="logo">
          <Link className="link" to="/">
            <span className="text">Origin Swift</span>
          </Link>
        </div>
        <div className="links">
          <Link className="link" to="/gigs?cat=design">
            <span>Browse Freelancer Projects</span>
          </Link>
          <div class="dropdown">
            <button class="dropbtn">Language</button>
            <div class="dropdown-content">
              <a href="#">English</a>
              <a href="#">Filipino</a>
              <a href="#">French</a>
              <a href="#">German</a>
              <a href="#">Italian</a>
            </div>
          </div>

          {!currentUser?.isSeller && <span>Become a Seller</span>}
          {currentUser ? (
            <div className="user" onClick={()=>setOpen(!open)}>
              <img
                src={currentUser.img || "/img/noavatar.jpg"}
                alt=""
              />
              <span>{currentUser?.username}</span>
              {open && ( 
              <div className="options">
                {currentUser.isSeller && (
                  <>
                    <Link className="link" to="/mygigs">
                      Gigs
                    </Link>
                    <Link className="link" to="/add">
                      Add New Gig
                    </Link>
                  </>
                )}
                <Link className="link" to="/orders">
                  Orders
                </Link>
                <Link className="link" to="/messages">
                  Messages
                </Link>
                <Link className="link" onClick={handleLogout}>
                  Logout
                </Link>
              </div>
              )}
            </div>
          ) : (
            <>
              <Link className="link" to="/login">Sign in</Link>
              <Link className="link" to="/register">
                <button id="join">Join</button>
              </Link>
            </>
          )}
        </div>
      </div>
      {(active || pathname !== "/") && (
        <>
          <hr />
          <div className="menu">
            <Link className="link menuLink" to="/">
              AI Services
            </Link>
            <Link className="link menuLink" to="/">
              Online Tutor
            </Link>
            <Link className="link menuLink" to="/">
              Mobile App Development
            </Link>
            <Link className="link menuLink" to="/">
              Web Development
            </Link>
            <Link className="link menuLink" to="/">
              Digital Marketing
            </Link>
            <Link className="link menuLink" to="/">
              Music & Audio
            </Link>
            <Link className="link menuLink" to="/">
              Programming & Tech
            </Link>
            <Link className="link menuLink" to="/">
              Business
            </Link>
            <Link className="link menuLink" to="/">
              Branding
            </Link>
          </div>
          <hr />
        </>
      )}
    </div>
  );
}

export default Navbar;
