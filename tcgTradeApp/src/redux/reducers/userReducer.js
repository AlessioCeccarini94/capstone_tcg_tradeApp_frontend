import {
  ADD_USER,
  LOG_USER,
  SET_USER,
  LOGOUT_USER,
} from "../actions/userActions"

const initialState = {
  users: null,
  loading: false,
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        users: action.payload,
      }
    case LOG_USER:
      return {
        ...state,
        users: action.payload,
      }
    case ADD_USER:
      return {
        ...state,
        users: action.payload,
      }
    case LOGOUT_USER:
      return {
        ...state,
        users: null,
      }

    default:
      return state
  }
}
export default userReducer
