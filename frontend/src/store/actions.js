import axios from "../axiosApi";

export const GET_MESSAGES_SUCCSESS = "GET_MESSAGES_SUCCSESS";
export const GET_MESSAGES_FAILURE = "GET_MESSAGES_FAILURE";
export const GET_MESSAGE_BY_ID_SUCCSESS = "GET_MESSAGE_BY_ID_SUCCSESS";
export const GET_MESSAGE_BY_ID_FAILURE = "GET_MESSAGE_BY_ID_FAILURE";
export const SEND_MESSAGES_SUCCESS = "SEND_MESSAGES_SUCCESS";
export const SEND_MESSAGES_FAILURE = "SEND_MESSAGES_FAILURE";
export const CLOSE_MODAL = "CLOSE_MODAL";
export const OPEN_EMOJI = "OPEN_EMOJI";

export const getMessagesSuccess = (datetime, data) => ({
  type: GET_MESSAGES_SUCCSESS,
  datetime,
  data
});
export const getMessagesFailure = error => ({
  type: GET_MESSAGES_FAILURE,
  error
});

export const getMessageByIdSuccess = data => ({
  type: GET_MESSAGE_BY_ID_SUCCSESS,
  data
});
export const getMessageByIdFailure = error => ({
  type: GET_MESSAGE_BY_ID_FAILURE,
  error
});

export const sendMessagesSuccess = () => ({ type: SEND_MESSAGES_SUCCESS });
export const sendMessagesFailure = error => ({
  type: SEND_MESSAGES_FAILURE,
  error
});
export const closeModal = () => ({ type: CLOSE_MODAL });
export const openEmoji = () => ({ type: OPEN_EMOJI });

export const getMessages = (datetime, data) => {
  return async dispatch => {
    try {
      const response = await axios.get(`/messages${datetime}`);
      response.data.length !== 0 &&
        (datetime = `?datetime=${
          response.data[response.data.length - 1].datetime
        }`);
      if (data.length === 0) {
        data = response.data;
      } else {
        response.data.map(message => data.push(message));
      }
      dispatch(getMessagesSuccess(datetime, data));
    } catch (e) {
      dispatch(getMessagesFailure(e));
    }
  };
};

export const getMessageById = id => {
  return async dispatch => {
    try {
      const response = await axios.get(`/messages/${id}`);
      dispatch(getMessageByIdSuccess(response.data));
    } catch (e) {
      dispatch(getMessageByIdFailure(e));
    }
  };
};

export const sendMessages = data => {
  return async dispatch => {
    try {
      await axios.post("/messages", data);
      dispatch(sendMessagesSuccess());
    } catch (e) {
      dispatch(sendMessagesFailure(e));
    }
  };
};
