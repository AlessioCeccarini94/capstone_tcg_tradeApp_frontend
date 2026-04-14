import { configureStore } from "@reduxjs/toolkit"
import userReducer from "../reducers/userReducer"
import gameReducer from "../reducers/gameReducer"
import cardReducer from "../reducers/cardReducer"
import adminReducer from "../reducers/adminReducer"
import chatReducer from "../reducers/chatReducer"

const store = configureStore({
  reducer: {
    admin: adminReducer,
    user: userReducer,
    game: gameReducer,
    card: cardReducer,
    chat: chatReducer,
  },
})

export default store
