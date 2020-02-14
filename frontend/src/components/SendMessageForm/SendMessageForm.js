import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { openEmoji } from "../../store/actions";
import Button from "../UI/Button/Button";
import Picker from "emoji-picker-react";
import { MdSend, MdAttachFile } from "react-icons/md";
import { FaRegSmile } from "react-icons/fa";
import "./SendMessageForm.css";

class SendMessageForm extends Component {
  state = {
    message: "",
    author: "",
    image: ""
  };

  submitFormHandler = e => {
    e.preventDefault();
    const data = { ...this.state };
    data.image.length === 0 && delete data.image;
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      formData.append(key, this.state[key]);
    });
    this.props.onSubmit(formData);
    this.setState({ message: "", image: "" });
  };

  inputChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  fileChangeHandler = event => {
    this.setState({ [event.target.name]: event.target.files[0] });
  };

  emojiHandler = (e, emoji) => {
    this.setState({ message: this.state.message + emoji.emoji });
  };

  render() {
    const { open } = this.props;
    const { author, message } = this.state;
    let addclass = "Picker";
    open && (addclass += " d-block");
    return (
      <Fragment>
        <div className={addclass}>
          <Picker onEmojiClick={this.emojiHandler} />
        </div>
        <form onSubmit={this.submitFormHandler}>
          <div className="input-group align-items-center">
            <div className="mr-2 icons">
              <Button
                type="button"
                addClass="close"
                label={
                  <FaRegSmile style={{ fontSize: "40px", opacity: "0.5" }} />
                }
                click={this.props.openEmoji}
              />
              <Button
                type="button"
                addClass="close"
                label={
                  <span>
                    <MdAttachFile
                      style={{
                        fontSize: "40px",
                        opacity: "0.5",
                        position: "relative"
                      }}
                    />
                    <input
                      onChange={this.fileChangeHandler}
                      type="file"
                      name="image"
                      style={{
                        width: "40px",
                        height: "70px",
                        position: "absolute",
                        top: "-25px",
                        left: 0,
                        opacity: 0,
                        cursor: "pointer"
                      }}
                    />
                  </span>
                }
              />
            </div>
            <input
              onChange={this.inputChangeHandler}
              type="text"
              name="author"
              className="form-control col-4 col-md-2 text-center"
              style={{
                borderRadius: "1.25em",
                borderTopRightRadius: "0",
                borderBottomRightRadius: "0",
                height: "45px"
              }}
              value={author}
              placeholder="Author"
            />
            <input
              onChange={this.inputChangeHandler}
              type="text"
              name="message"
              className="form-control col-8 col-md-10"
              style={{
                borderRadius: "1.25em",
                borderTopLeftRadius: "0",
                borderBottomLeftRadius: "0",
                height: "45px"
              }}
              value={message}
              placeholder=" Message"
              required
            />
            <div className="mx-2 send">
              <Button
                type="submit"
                addClass="close"
                label={<MdSend style={{ fontSize: "40px", opacity: "0.5" }} />}
              />
            </div>
          </div>
        </form>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  open: state.open
});

const mapDispatchToProps = dispatch => ({
  openEmoji: () => dispatch(openEmoji())
});

export default connect(mapStateToProps, mapDispatchToProps)(SendMessageForm);
