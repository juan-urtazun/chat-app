import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import queryString from "query-string";

import "./Join.css";

const enterHandler = (setValue, next, action = "focus") => {
  return (event) => {
    if (event.key === "Enter") {
      setValue(event.target.value);
      if (next) {
        next.current[action]();
      }
    }
  };
};

const setValueFromEvent = (setValue) => (event) => setValue(event.target.value);

const Join = ({location}) => {
  const { t } = useTranslation();
  const { room } = queryString.parse(location.search);
  const [name, setName] = useState("");
  const [roomName, setRoomName] = useState("");
  const roomInput = useRef(null);
  const submitBtn = useRef(null);
  const preventsSingIn = !name || !(roomName || room);
  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading"> {t("join")}</h1>
        <div>
          <input
            type="text"
            className="joinInput"
            placeholder={t("Name")}
            onChange={setValueFromEvent(setName)}
            onKeyPress={enterHandler(setName, roomInput)}
          />
        </div>
        <div>
          <input
            type="text"
            className="joinInput mt-20"
            placeholder={
              room ? t("Join to the room name", { room }) : t("Room name")
            }
            ref={roomInput}
            onChange={setValueFromEvent(setRoomName)}
            onKeyPress={enterHandler(setRoomName, submitBtn, "click")}
          />
        </div>
        <Link
          ref={submitBtn}
          to={`/chat?name=${name}&room=${roomName || room}`}
          onClick={(event) => (preventsSingIn ? event.preventDefault() : null)}
        >
          <button className="button mt-20" type="submit">
            {t("Sing In")}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Join;
