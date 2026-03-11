export const ADD_CARD_LIST = "ADD_CARD_LIST"
export const GET_COLLECTION = "GET_COLLECTION"
export const ADD_CARD_FROM_ID = "ADD_CARD_FROM_ID"
export const REMOVE_CARD_FROM_ID = "REMOVE_CARD_FROM_ID"
export const SEARCH_CARD = "SEARCH_CARD"
export const CARDS_BY_EXPANSION = "CARDS_BY_EXPANSION"

const initialState = {
  cards: [],
  collection: [],
  loading: false,
}

export const cardReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CARD_LIST:
      return {
        ...state,
        cards: action.payload,
      }
    case GET_COLLECTION:
      return {
        ...state,
        collection: action.payload,
      }
    case ADD_CARD_FROM_ID:
      return {
        ...state,
        collection: [...state.collection, action.payload],
      }
    case REMOVE_CARD_FROM_ID:
      return {
        ...state,
        collection: state.collection.filter(
          (item) => item.card.blueprintId !== action.payload,
        ),
      }
    case SEARCH_CARD:
      return {
        ...state,
        cards: action.payload,
      }
    case CARDS_BY_EXPANSION:
      return {
        ...state,
        cards: action.payload,
      }
    default:
      return state
  }
}

export default cardReducer
