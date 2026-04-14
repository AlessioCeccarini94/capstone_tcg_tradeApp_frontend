export const ADD_MESSAGE = "ADD_MESSAGE"
export const SET_ACTIVE_CHAT = "SET_ACTIVE_CHAT"
export const SET_ACTIVE_CARD = "SET_ACTIVE_CARD"

export const addMessage = (message) => ({
  type: ADD_MESSAGE,
  payload: { message },
})

export const setActiveChat = (chatKey, receiver = null, cardName = null) => ({
  type: SET_ACTIVE_CHAT,
  payload: {
    chatKey,
    receiver,
    cardName,
  },
})

export const setActiveCard = (card) => ({
  type: SET_ACTIVE_CARD,
  payload: card,
})
