import React from "react";
import './PopupStyle.css';

    
const PopupEmail = props =>
{
    return (
        <div className="popup-box">
          <div className="box">
            {props.content}
          </div>
        </div>
      );
}

export default PopupEmail;
