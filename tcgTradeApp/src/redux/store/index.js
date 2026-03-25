import { configureStore } from "@reduxjs/toolkit"
import userReducer from "../reducers/userReducer"
import gameReducer from "../reducers/gameReducer"
import cardReducer from "../reducers/cardReducer"
import adminReducer from "../reducers/adminReducer"

const store = configureStore({
  reducer: {
    admin: adminReducer,
    user: userReducer,
    game: gameReducer,
    card: cardReducer,
  },
})

export default store
