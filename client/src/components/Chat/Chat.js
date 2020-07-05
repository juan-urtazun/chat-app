import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import io from "socket.io-client";
import { useTranslation } from "react-i18next";
import ReactEmoji from "react-emoji";

import "./Chat.css";

import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";
import RoomUsers from "../RoomUsers/RoomUsers";
import Spinner from "../Spinner/Spinner";
let socket;
const HOST_NAME = process.env.REACT_APP_SHARE_ROOM;
const Chat = ({ room, name }) => {
  const shareLink = `${HOST_NAME}/${room}`;
  const { t } = useTranslation();
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  //TODO: Handle error. ej: redirect to an ErrorComponent
  const [error, setError] = useState(null);
  const ENDPOINT = process.env.REACT_APP_API_URL;
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("join", { name, room }, (error) => {
      if (error) {
        setError(error);
      }
      setIsLoading(false);
    });
    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [ENDPOINT, room, name]);

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
    setIsLoading(true);
    if (message) {
      socket.emit("sendMessage", message, () => {
        setIsLoading(false);
        setMessage("");
      });
    }
  };
  if (error) {
    return <Redirect to="/" />;
  } else {
    return (
      <div className="outerContainer">
        <div className="container">
          <InfoBar room={room} isLoading={isLoading} />
          <Messages messages={messages} name={name} />
          <Input
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
          />
          <div className="room-info-wrapper">
            <p className="border-bottom p-b-5">{t("Connected users")}</p>
            <RoomUsers users={users} joinedUserName={name} />
            <div className="share-wrapper">
              <span>{t("share link")}</span> {ReactEmoji.emojify(":)")}
              <span className="share"> {shareLink} </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Chat;
