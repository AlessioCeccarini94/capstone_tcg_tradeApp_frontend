import { ADD_GAME_LIST } from "../actions/gameActions"
import { ADD_CARD_LIST } from "../actions/cardsAction"

const initialState = {
  games: [],
  cards: [],
  loading: false,
}

export const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_GAME_LIST:
      return {
        ...state,
        games: action.payload,
      }
    case ADD_CARD_LIST:
      return {
        ...state,
        cards: action.payload,
      }
    default:
      return state
  }
}

export default gameReducer
