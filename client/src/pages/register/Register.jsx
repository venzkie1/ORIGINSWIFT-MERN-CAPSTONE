import React, { useState } from 'react';
import upload from '../../utils/upload';
import './Register.scss';
import newRequest from '../../utils/newRequest';
import { useNavigate } from 'react-router-dom';

function Register(state) {
  const [file, setFile] = useState(null);
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    img: '',
    country: '',
    isSeller: false,
    desc: '',
    phone: '',
  });

  const [error, setError] = useState({
    username: '',
    email: '',
    phone: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "username" && name !== error.username ) {
      setError({
        username: '',
        email: '',
        phone: ''
      })
    }

    if (name === "email" && name !== error.email ) {
      setError({
        username: '',
        email: '',
        phone: ''
      })
    }

      if (name === "phone" && name !== error.phone ) {
      setError({
        username: '',
        email: '',
        phone: ''
      })
    }

    setUser((prev) => {
      return { ...prev, [name] : name === "username" ? value.trim().charAt(0).toUpperCase() + value.trim().slice(1) : value };
    });
  };
  

  const handleSeller = (e) => {
    setUser((prev) => {
      return { ...prev, isSeller: e.target.checked };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = await upload(file);
    try {
      await newRequest.post('/auth/register', {
        ...user,
        img: url,
      });
      navigate('/login');
    } catch (err) {
      console.log(err.response.data);
      setError({...error, ...err.response.data});
    }
  };

  
  return (
      <div className="register">
        <form onSubmit={handleSubmit}>
          <div className="left">
            <h1>Create a New Account</h1>
            <label htmlFor="">Username</label>
            <input
              name="username"
              type="text"
              placeholder="JohnSins"
              onChange={handleChange}
              required
              onInvalid={(e) =>
                e.target.setCustomValidity("Username is required")
                
              }
              onInput={(e) => 
                e.target.setCustomValidity("")}
                style= {{ borderColor: error.username !== '' ? 'red' : 'gray' }}
            />
              {error.username && <div className="error">{error.username}</div>}
              {/* conditional rendering for error message */}

            <label htmlFor="">Email</label>
            <input
              name="email"
              type="email"
              placeholder="email@example.com"
              onChange={handleChange}
              required
              onInvalid={(e) => {
                if (!e.target.validity.valid){
                  e.target.setCustomValidity("Please enter a valid email address!");
                }
              }}
              onInput={(e) => 
                e.target.setCustomValidity('')}
                style={{ borderColor: error.email !== '' ? 'red' : 'gray'}}
            />
              {error.email && <div className="error">{error.email}</div>} 
              {/* conditional rendering for error message */}

            <label htmlFor="">Password</label>
            <input name="password" type="password" onChange={handleChange}
            placeholder='*********************' 
            required
            onInvalid={(e) =>
              e.target.setCustomValidity("Password is required")
              
            }
            onInput={(e) => 
              e.target.setCustomValidity("")}
            />
            <label htmlFor="">Profile Picture</label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label htmlFor="">Country </label>
            <input
              name="country"
              type="text"
              placeholder="Philippines"
              onChange={handleChange}
              required
              onInvalid={(e) =>
                e.target.setCustomValidity("Country is required")
                
              }
              onInput={(e) => 
                e.target.setCustomValidity("")}
            />
            <button type="submit">Register</button>
          </div>
          <div className="right">
            <h1>I want to become a seller</h1>
            <div className="toggle">
              <label htmlFor="">Activate the seller account</label>
              <label className="switch">
                <input type="checkbox" onChange={handleSeller} />
                <span className="slider round"></span>
              </label>
            </div>
            <label htmlFor="">Phone Number</label>
            <input
              name="phone"
              type="text"
              placeholder="+63"
              onChange={handleChange}
              required={false}
              onInvalid={(e) => 
              e.target.setCustomValidity("Please input a phone number!")
            }
            onInput={(e) =>
              e.target.setCustomValidity("")}
              style={{ borderColor: error.phone !== '' ? 'red' : 'gray'}}
            />
            {error.phone && <div classname="error">{error.phone}</div>}
            <label htmlFor="">Description</label>
            <textarea
              placeholder="A short description of yourself"
              name="desc"
              id=""
              cols="30"
              rows="10"
              onChange={handleChange}
            ></textarea>
          </div>
        </form>
      </div>
  );
}

export default Register;
