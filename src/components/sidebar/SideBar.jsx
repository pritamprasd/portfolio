import React from "react";
import "./SideBar.scss";
import dp from "../../image/dp.jpg";
import BasicInfo from "./basicinfo/BasicInfo";
import ContentLinks from "./contentlinks/ContentLinks";
import SocialLinks from "./links/SocialLinks";

function SideBar(props) {
  return (
    <div className="side-bar">
      <div />
      <div>
        <img src={dp} className="dp" alt="Profile DP" />
      </div>
      <BasicInfo />
      <ContentLinks />
      <div />
      <SocialLinks />
    </div>
  );
}

export default SideBar;
