import { ADD_USER, LOG_USER, SET_USER } from "../actions/userActions"

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
    default:
      return state
  }
}
export default userReducer
