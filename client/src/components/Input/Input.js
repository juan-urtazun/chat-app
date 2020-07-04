import React from "react";
import { useTranslation } from "react-i18next";

import "./Input.css";
const Input = ({ message, setMessage, sendMessage }) => {
  const { t } = useTranslation();
  return (
    <form className="form">
      <input
        type="text"
        className="input"
        placeholder={t("Type a message")}
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        onKeyPress={(event) =>
          event.key === "Enter" ? sendMessage(event) : null
        }
      />
      <button className="sendButton" onClick={(event) => sendMessage(event)}>
        {t("Send")}
      </button>
    </form>
  );
};

export default Input;
