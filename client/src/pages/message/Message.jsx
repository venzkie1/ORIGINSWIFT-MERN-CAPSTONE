import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./Message.scss";

const Message = () => {
  const { id } = useParams();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const queryClient = useQueryClient();

  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState([]);

  const { isLoading, error, data } = useQuery({
    queryKey: ["messages", "users"],
    queryFn: () =>
      newRequest.get(`/messages/${id}`).then((res) => {
        setUsers(res.data.users);
        return res.data.messages;
      }),
  });


  const messagesRef = useRef(null);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [data]);


  const mutation = useMutation({
    mutationFn: (message) => {
      return newRequest.post(`/messages`, message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["messages", "users"]);
    },
  });

  const handleSubmit = (e) => {
    // console.log("handleSubmit called", message);
    e.preventDefault();
    mutation.mutate({
      conversationId: id,
      desc: message,
      seenAt: Date.now(),
    });
    setMessage('');
  };

  const handleKeyDown = (e) => {
    // console.log("handleKeyPress called upon typing"); 
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      // console.log("handleKeyPress called upon pressing enter"); 
      mutation.mutate({
        conversationId: id,
        desc: message,
        seenAt: Date.now(),
      });
      setMessage('');
    }
  };
  
  
  return (
    <div className="message">
      <div className="container">
        <span className="breadcrumbs">
          <Link to="/messages">Messages</Link> {">"} {"<"}
        </span>
        {isLoading ? (
          "loading"
        ) : error ? (
          "error"
        ) : (
          <div className="messages" ref={messagesRef}>
            {data.map((m) => (
              <div key={m._id}>
                <div>
                  {users.find(
                    (user) =>
                      user._id === m.userId &&
                      user._id !== currentUser._id
                  )?.username}
                </div>
                <div
                  className={
                    m.userId === currentUser._id ? "owner item" : "item"
                  }
                >
                  <img
                    src={
                      m.userId === currentUser._id
                        ? currentUser.img || "/img/noavatar.jpg"
                        : users.find((user) => user._id === m.userId)?.img ||
                          "/img/noavatar.jpg"
                    }
                  />
                  <p>{m.desc}</p>
                  {m.seenAt && m.userId === currentUser._id &&  (
                    <span className="seen-by">
                      Seen by{" "}
                      {users.find(
                    (user) =>
                      user._id !== currentUser._id
                  )?.username}{" "}
                      at {new Date(m.seenAt).toLocaleString()}
                    </span>
                  )}

                </div>
              </div>
            ))}
          </div>
        )}
        <hr />
        <form className="write" >
          <textarea type="text" placeholder="write a message" value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={handleKeyDown}/>
          <button type="submit" onClick={handleSubmit}>Send</button>
        </form>
      </div>
    </div>
  );
};

export default Message;
