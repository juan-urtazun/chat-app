import React from "react";
import { Redirect, useLocation } from "react-router-dom";
import queryString from "query-string";

import  Chat  from "../Chat/Chat";

const ChatRoom = () => {
  const location = useLocation();
  const { name, room } = queryString.parse(location.search);
  const redirectTo = room ? `/?room=${room}` : '/';
  return (name && room) ? <Chat name={name} room={room} /> : <Redirect to={redirectTo} />;
}

export default ChatRoom;