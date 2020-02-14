import React from "react";
import moment from "moment";
import "moment/locale/ru";
import { apiURL } from "../../constants";
import "./Messages.css";

const Messages = ({ author, date, message, image, click }) => {
  const path = apiURL + "/uploads/" + image;
  moment.locale("ru");
  date = moment(date).calendar();
  return (
    <div className="col-12 col-sm-10 col-md-8 col-lg-6 mx-auto">
      <div className="Toast">
        <div className="toast-header">
          <strong className="mr-auto">{author}</strong>
          <small>{date.toLocaleString()}</small>
        </div>
        <div className="toast-body d-flex flex-column">
          {image && (
            <img
              onClick={click}
              alt={`user-img-${image}`}
              width="100%"
              height="100%"
              src={path}
              style={{
                borderRadius: ".25rem",
                paddingBottom: "10px",
                cursor: "zoom-in"
              }}
            />
          )}
          <span className="w-100">{message}</span>
        </div>
      </div>
    </div>
  );
};

export default Messages;
