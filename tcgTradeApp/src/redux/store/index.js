import { configureStore } from "@reduxjs/toolkit"
import userReducer from "../reducers/userReducer"
import gameReducer from "../reducers/gameReducer"
import cardReducer from "../reducers/cardReducer"

const store = configureStore({
  reducer: {
    user: userReducer,
    game: gameReducer,
    card: cardReducer,
  },
})

export default store
