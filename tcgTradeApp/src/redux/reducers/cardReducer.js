export const ADD_CARD_LIST = "ADD_CARD_LIST"
export const GET_COLLECTION = "GET_COLLECTION"
export const ADD_CARD_FROM_ID = "ADD_CARD_FROM_ID"
export const ADD_FAVORITES = "ADD_FAVORITES"
export const REMOVE_CARD_FROM_ID = "REMOVE_CARD_FROM_ID"
export const SEARCH_CARD = "SEARCH_CARD"
export const CARDS_BY_EXPANSION = "CARDS_BY_EXPANSION"
export const SET_CARDS = "SET_CARDS"
export const SET_TOP_CARDS = "SET_TOP_CARDS"
export const SET_LOADING = "SET_LOADING"
export const REMOVE_FAVORITE = "REMOVE_FAVORITE"
export const GET_FAVORITES = "GET_FAVORITES"
export const GET_USER_COLLECTION = "GET_USER_COLLECTION"

const initialState = {
  cardsByGame: [],
  topCards: [],
  collection: [],
  favorites: [],
  loading: false,
}

export const cardReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CARD_LIST:
      return {
        ...state,
        cardsByGame: action.payload,
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
    case GET_FAVORITES:
      return {
        ...state,
        favorites: action.payload,
      }
    case ADD_FAVORITES:
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      }
    case REMOVE_CARD_FROM_ID:
      return {
        ...state,
        collection: state.collection.filter(
          (item) => item.card.blueprintId !== action.payload,
        ),
      }
    case REMOVE_FAVORITE:
      return {
        ...state,
        favorites: state.favorites.filter(
          (item) => item.card.blueprintId !== action.payload,
        ),
      }
    case SEARCH_CARD:
      return {
        ...state,
        cardsByGame: action.payload,
      }
    case CARDS_BY_EXPANSION:
      return {
        ...state,
        cardsByGame: action.payload,
      }
    case GET_USER_COLLECTION:
      return {
        ...state,
        collection: action.payload,
      }
    case SET_CARDS:
      return {
        ...state,
        cardsByGame: action.payload,
        loading: false,
      }
    case SET_TOP_CARDS:
      return {
        ...state,
        topCards: action.payload,
        loading: false,
      }
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      }
    default:
      return state
  }
}

export default cardReducer
