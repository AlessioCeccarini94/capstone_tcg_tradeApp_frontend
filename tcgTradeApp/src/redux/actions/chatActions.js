export const ADD_MESSAGE = "ADD_MESSAGE"
export const SET_ACTIVE_CHAT = "SET_ACTIVE_CHAT"
export const SET_ACTIVE_CARD = "SET_ACTIVE_CARD"
export const LOAD_MESSAGES = "LOAD_MESSAGES"

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

export const loadMessages = (chatKey, messages) => ({
  type: LOAD_MESSAGES,
  payload: { chatKey, messages },
})

export const fetchMessages = (sender, receiver) => async (dispatch) => {
  const baseURL = import.meta.env.VITE_API_URL
  const token = localStorage.getItem("token")
  try {
    const res = await fetch(`${baseURL}/messages/${sender}/${receiver}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    const data = await res.json()
    const chatKey = [sender, receiver].sort().join("||")
    dispatch(loadMessages(chatKey, data))
  } catch (err) {
    console.error("Errore caricamento messaggi:", err)
  }
}
