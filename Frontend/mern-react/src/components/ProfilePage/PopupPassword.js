import React from "react";
import './PopupStyle.css';

    
const PopupPassword = props =>
{
    return (
        <div className="popup-box">
          <div className="box" id = "popupbox2">
            {props.content}
          </div>
        </div>
      );
}

export default PopupPassword;
