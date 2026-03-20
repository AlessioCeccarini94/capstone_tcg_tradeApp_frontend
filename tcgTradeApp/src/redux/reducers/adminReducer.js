export const GET_CAROUSEL = "GET_CAROUSEL"
export const GET_ALL_USERS = "GET_USERS"
export const DELETE_USER = "DELETE_USER"
export const EDIT_USER = "EDIT_USER"
const initialState = {
  carousel: [],
  users: [],
  loading: false,
}

export const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CAROUSEL:
      return {
        ...state,
        carousel: action.payload,
      }
    case GET_ALL_USERS:
      return {
        ...state,
        users: action.payload,
      }
    case EDIT_USER:
      return {
        ...state,
        users: state.users.map((user) =>
          user.userId === action.payload.userId ? action.payload : user,
        ),
      }
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user.userId !== action.payload),
      }
    default:
      return state
  }
}

export default adminReducer
