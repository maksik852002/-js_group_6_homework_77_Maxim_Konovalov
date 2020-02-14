import React, { Component } from "react";

import { connect } from "react-redux";
import {
  getMessages,
  sendMessages,
  closeModal,
  getMessageById
} from "../store/actions";
import SendMessageForm from "../components/SendMessageForm/SendMessageForm";
import Messages from "../components/Messages/Messages";
import Spinner from "../components/UI/Spinner/Spinner";
import Modal from "../components/UI/Modal/Modal";

import "./Chat.css";
import ImageViewer from "../components/ImageViewer/ImageViewer";

let interval = null;

class Chat extends Component {
  componentDidMount() {
    interval = setInterval(
      () => this.props.getMessages(this.props.datetime, this.props.messages),
      2000
    );
  }

  componentDidUpdate(prevProps) {
    this.props.datetime !== prevProps.datetime &&
      setTimeout(() => this.scrollToBottom(), 1200);
    this.props.open !== prevProps.open && this.scrollToBottom();
  }

  componentWillUnmount() {
    clearInterval(interval);
  }

  scrollToBottom = () => {
    this.el.scrollIntoView({ block: "end", behavior: "smooth" });
  };

  render = () => {
    const {
      messages,
      loading,
      error,
      show,
      open,
      sendMessages,
      closeModal,
      message,
      getMessageById,
      imageViewer
    } = this.props;
    let addClass = "messageWrap";
    open && (addClass += " emoji-open");
    return (
      <div className="backWrap">
        {imageViewer && <ImageViewer message={message} close={closeModal} />}
        {error && <Modal show={show} close={closeModal} error={error} />}
        {loading ? (
          <Spinner />
        ) : (
          <div className="wrap">
            <div className={addClass}>
              {messages.map(el => (
                <Messages
                  key={el.id}
                  author={el.author}
                  date={el.datetime}
                  message={el.message}
                  image={el.image}
                  click={() => getMessageById(el.id)}
                />
              ))}
              <div
                ref={el => {
                  this.el = el;
                }}
              />
            </div>
            <div className="formWrap">
              <SendMessageForm onSubmit={sendMessages} />
            </div>
          </div>
        )}
      </div>
    );
  };
}

const mapStateToProps = state => ({
  messages: state.messages,
  datetime: state.datetime,
  loading: state.loading,
  error: state.error,
  show: state.show,
  open: state.open,
  message: state.message,
  imageViewer: state.imageViewer
});

const mapDispatchToProps = dispatch => ({
  getMessages: (date, data) => dispatch(getMessages(date, data)),
  sendMessages: data => dispatch(sendMessages(data)),
  closeModal: () => dispatch(closeModal()),
  getMessageById: id => dispatch(getMessageById(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
