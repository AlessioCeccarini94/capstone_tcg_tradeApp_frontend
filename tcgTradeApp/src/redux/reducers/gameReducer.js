import { ADD_GAME_LIST } from "../actions/gameActions"

const initialState = {
  games: [],
}

export const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_GAME_LIST:
      return {
        ...state,
        games: action.payload,
      }
    default:
      return state
  }
}

export default gameReducer
