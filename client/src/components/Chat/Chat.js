import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import io from "socket.io-client";

import './Chat.css';

import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
import RoomUsers from '../RoomUsers/RoomUsers';
let socket;

const Chat = ({ location}) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const ENDPOINT = process.env.REACT_APP_API_URL;

  useEffect(() => {
    setName(name);
    setRoom(room);
    socket = io(ENDPOINT);
    socket.emit("join", { name, room }, (error) => {
      if (error) {
        setError(error);
      }
    });

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  useEffect(() => {
    socket.on("roomData", (data) => {
      setUsers([...data.users]);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };
  if (error) {
    return <Redirect to="/" />;
  } else {
    return (
      <div className="outerContainer">
        <div className="container">
          <InfoBar room={room} />
          <Messages messages={messages} name={name} />
          <Input
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
          />
          <RoomUsers users={users} joinedUserName={name} />
        </div>
      </div>
    );
  }
};

export default Chat;
