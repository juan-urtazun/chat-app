import React from "react";
import "./InfoBar.css";
import closeIcon from "../../icons/closeIcon.png";
import onlineIcon from "../../icons/onlineIcon.png";

import Spinner from "../Spinner/Spinner";
const InfoBar = ({ room, isLoading }) => (
  <div className="infoBar">
    <div className="leftInnerContainer">
      <img src={onlineIcon} alt="online" className="onlineIcon" />
      <h3> {room} </h3>
    </div>
    {isLoading ? <Spinner /> : null}
    <div className="rightInnerContainer">
      <a href="/">
        <img src={closeIcon} alt="close" />
      </a>
    </div>
  </div>
);

export default InfoBar;
