import {
  GET_MESSAGES_SUCCSESS,
  GET_MESSAGES_FAILURE,
  SEND_MESSAGES_SUCCESS,
  SEND_MESSAGES_FAILURE,
  CLOSE_MODAL,
  OPEN_EMOJI,
  GET_MESSAGE_BY_ID_SUCCSESS,
  GET_MESSAGE_BY_ID_FAILURE
} from "../store/actions";

const initialState = {
  messages: [],
  datetime: "",
  loading: true,
  error: "",
  show: false,
  open: false,
  message: {},
  imageViewer: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_EMOJI:
      return { ...state, open: !state.open };
    case CLOSE_MODAL:
      return {
        ...state,
        show: false,
        loading: false,
        error: "",
        imageViewer: false
      };
    case GET_MESSAGES_SUCCSESS:
      return {
        ...state,
        messages: action.data,
        datetime: action.datetime,
        loading: false
      };
    case GET_MESSAGES_FAILURE:
      return { ...state, error: action.error, show: true, loading: false };
    case GET_MESSAGE_BY_ID_SUCCSESS:
      return {
        ...state,
        message: action.data,
        imageViewer: true
      };
    case GET_MESSAGE_BY_ID_FAILURE:
      return { ...state, error: action.error, show: true };
    case SEND_MESSAGES_SUCCESS:
      return { ...state, open: false };
    case SEND_MESSAGES_FAILURE:
      return { ...state, error: action.error, show: true };
    default:
      return state;
  }
};

export default reducer;
