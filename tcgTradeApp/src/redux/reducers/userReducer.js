import { ADD_USER, LOG_USER } from "../actions/userActions"

const initialState = {
  users: {},
  loading: false,
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return {
        ...state,
        users: [...state.users, action.payload],
      }
    case LOG_USER:
      return {
        ...state,
        users: [...state.users, action.payload],
      }
    default:
      return state
  }
}

export default userReducer
