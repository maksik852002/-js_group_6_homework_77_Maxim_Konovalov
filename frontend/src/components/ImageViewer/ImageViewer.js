import React from "react";
import moment from "moment";
import "moment/locale/ru";
import { apiURL } from "../../constants";
import Button from "../UI/Button/Button";
import { IoMdDownload, IoMdClose } from "react-icons/io";
import "./ImageViewer.css";

const ImageViewer = props => {
  const path = apiURL + "/uploads/" + props.message.image;
  moment.locale("ru");
  const date = moment(props.message.datetime).calendar();
  return (
    <div className="Modal">
      <div>
        <div className="Modal-content">
          <div className="Modal-header">
            <div className="col-8">
              <strong className="d-block">{props.message.author}</strong>
              <small style={{ opacity: "0.6" }}>{date}</small>
            </div>
            <div className="d-flex align-items-center col-4 justify-content-end">
              <div className="btn-wrap">
                <a className="close" href={path} download>
                  <IoMdDownload width="40px" height="40px" fontSize="40px" />
                </a>
              </div>
              <div className="btn-wrap">
                <Button
                  addClass="close"
                  label={
                    <IoMdClose width="40px" height="40px" fontSize="40px" />
                  }
                  click={props.close}
                />
              </div>
            </div>
          </div>
          <div className="modal-body">
            <div className="image-wrap col-lg-10">
              <img alt="user-img" className="img-fluid" src={path} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageViewer;
