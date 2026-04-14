import {
  ADD_USER,
  LOG_USER,
  SET_USER,
  LOGOUT_USER,
  SET_POFILE_USER,
  GET_USER,
} from "../actions/userActions"

const initialState = {
  loggedUser: null,
  profileUser: null,
  loading: false,
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        loggedUser: action.payload,
      }
    case SET_USER:
      return {
        ...state,
        users: action.payload,
      }
    case LOG_USER:
      return {
        ...state,
        loggedUser: action.payload,
      }

    case SET_POFILE_USER:
      return {
        ...state,
        profileUser: action.payload,
      }
    case ADD_USER:
      return {
        ...state,
        users: action.payload,
      }
    case LOGOUT_USER:
      return {
        ...state,
        loggedUser: null,
        profileUser: null,
      }

    default:
      return state
  }
}
export default userReducer
