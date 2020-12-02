import React from "react";
import './PopupStyle.css';

    
const PopupEmail = props =>
{
    return (
        <div className="popup-box">
          <div className="box"id = "popupbox">
            {props.content}
          </div>
        </div>
      );
}

export default PopupEmail;
