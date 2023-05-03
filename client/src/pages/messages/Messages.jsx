import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Messages.scss";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import moment from "moment";

const Messages = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const queryClient = useQueryClient()

  const { isLoading, error, data } = useQuery({
    queryKey: ["conversations"],
    queryFn: () =>
     newRequest.get(`/conversations`).then((res)=>{
      console.log('conversation', res.data);
      return res.data;
     }),
  });

  const [user, setUser] = useState();

  useQuery({
    queryKey: ["users"],
    queryFn: () =>
      Promise.all(
        data.map((c) => {
          console.log('c-----', c)
          newRequest.get(`/users/${currentUser.isSeller ? c.buyerId : c.sellerId}`)
            .then((res) => {
              // const users = responses.map((r) => r.data);
              setUser(res.data);
            })}
        )
      ),
    enabled: !!data,
  });

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.put(`/conversations/${id}`);
    },
    onSuccess:()=>{
      queryClient.invalidateQueries(["conversations"])
    }
  });

  const handleRead = (id) => {
    mutation.mutate(id);
  }

  return (
    <div className="messages">
      {isLoading ? "loading" : error ? "error" : 
      <div className="container">
        <div className="title">
          <h1>Messages</h1>
        </div>
        <table>
          <tbody>
          <tr>
            <th>{currentUser.isSeller ? "Buyer" : "Seller"}</th>
            <th>Last Message</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
          {data.map((c, index)=>(
          <tr className={((currentUser.isSeller && !c.readBySeller) || 
            (!currentUser.isSeller && !c.readByBuyer)) && "active"} key={c.id}>
            <td>{user?.username}</td>
            <td>
              <Link to={`/message/${c.id}`} className="link">
                {c?.lastMessage?.substring(0, 100)}...
              </Link>
            </td>
            <td>{moment(c.updatedAt).fromNow()}</td>
            <td>
              {((currentUser.isSeller && !c.readBySeller) || 
              (!currentUser.isSeller && !c.readByBuyer)) && ( 
              <button onClick={()=>handleRead(c.id)}>Mark as Read</button>
              )}
              <Link to={`/message/${c.id}`} className="link"><button>View</button></Link>
            </td>
          </tr>
          ))}
          </tbody>
        </table>
      </div>}
    </div>
  );
};

export default Messages;
