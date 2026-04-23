export const ADD_MESSAGE = "ADD_MESSAGE"
export const SET_ACTIVE_CHAT = "SET_ACTIVE_CHAT"
export const SET_ACTIVE_CARD = "SET_ACTIVE_CARD"
export const LOAD_MESSAGES = "LOAD_MESSAGES"
export const LOAD_CONVERSATIONS = "LOAD_CONVERSATIONS"
export const DELETE_CONVERSATION = "DELETE_CONVERSATION"

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

export const loadConversations = (conversations) => ({
  type: LOAD_CONVERSATIONS,
  payload: { conversations },
})

export const removeConversation = (chatKey) => ({
  type: DELETE_CONVERSATION,
  payload: { chatKey },
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

export const fetchConversations = (username) => async (dispatch) => {
  const baseURL = import.meta.env.VITE_API_URL
  const token = localStorage.getItem("token")

  try {
    const res = await fetch(`${baseURL}/messages/conversations/${username}`, {
      headers: { Authorization: `Bearer ${token}` },
    })

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`)
    }

    const data = await res.json()
    dispatch(loadConversations(data))
  } catch (err) {
    console.error("Errore caricamento conversazioni:", err)
  }
}

export const deleteConversation =
  (username, otherUsername) => async (dispatch) => {
    const baseURL = import.meta.env.VITE_API_URL
    const token = localStorage.getItem("token")
    const chatKey = [username, otherUsername].sort().join("||")

    try {
      const res = await fetch(
        `${baseURL}/messages/${username}/${otherUsername}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        },
      )

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`)
      }

      dispatch(removeConversation(chatKey))
    } catch (err) {
      console.error("Errore eliminazione conversazione:", err)
    }
  }
