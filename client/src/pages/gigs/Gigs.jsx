import React, { useEffect, useRef, useState } from "react";
import "./Gigs.scss";
import GigCard from "../../components/gigCard/GigCard";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useLocation } from "react-router-dom";

function Gigs() {
  const [sort, setSort] = useState("sales");
  const [open, setOpen] = useState(false);
  const minRef = useRef();
  const maxRef = useRef();

  const {search} = useLocation();
  console.log(search);

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["gigs"],
    queryFn: () =>
     newRequest
     .get(`/gigs?min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sort}`)
     .then((res)=>{
      console.log(res.data);
      return res.data;
     }),
  });
  

  console.log(data)

  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };

  useEffect(() =>{
    refetch();
  }, [sort]);

  const apply = ()=>{
   refetch()
  }

  return (
    <div className="gigs">
      <div className="container">
        <span className="breadcrumbs">Origin Swift {">"} Graphics & Design {">"}</span>
        <h1>AI Artists</h1>
        <p>
          Explore the boundaries of art and technology with Origin Swift's AI artists
        </p>
        <div className="menu">
          <div className="left">
            <span>Budget</span>
            <input ref={minRef} type="number" placeholder="min" />
            <input ref={maxRef} type="number" placeholder="max" />
            <button onClick={apply}>Apply</button>
          </div>
          <div className="right">
            <span className="sortBy">Sort by</span>
            <span className="sortType">
              {sort === "sales" ? "Best Selling" : "Newest"}
            </span>
            <img src="./img/down.png" alt="" onClick={() => setOpen(!open)} />
            {open && (
              <div className="rightMenu">
                {sort === "sales" ? (
                  <span onClick={() => reSort("createdAt")}>Newest</span>
                ) : (
                  <span onClick={() => reSort("sales")}>Best Selling</span>
                  )}
                  <span onClick={() => reSort("sales")}>Popular</span>
              </div>
            )}
          </div>
        </div>
        <div className="cards">
          {isLoading 
          ? "loading" 
          : error 
          ? "Something went wrong!" 
          : data.map((gig) => 
            <GigCard key={gig._id} item={gig} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Gigs;
