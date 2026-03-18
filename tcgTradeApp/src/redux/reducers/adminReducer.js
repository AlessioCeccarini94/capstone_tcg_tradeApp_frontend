export const GET_CAROUSEL = "GET_CAROUSEL"
export const GET_ALL_USERS = "GET_USERS"
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

    default:
      return state
  }
}

export default adminReducer
