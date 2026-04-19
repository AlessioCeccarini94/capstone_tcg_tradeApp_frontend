export const SET_ACTIVE_CHAT = "SET_ACTIVE_CHAT"
export const ADD_MESSAGE = "ADD_MESSAGE"
export const SET_ACTIVE_CARD = "SET_ACTIVE_CARD"

export const buildChatKey = (user1, user2) => [user1, user2].sort().join("||")

const initialState = {
  conversations: [],
  messages: {},
  unread: {},
  activeChat: null,
  activeReceiver: null,
  activeCardName: null,
  activeCard: null,
}

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MESSAGE: {
      const { message } = action.payload
      const chatKey = buildChatKey(message.sender, message.receiver)
      const existing = state.messages[chatKey] ?? []
      const isDuplicate = existing.some(
        (m) =>
          m.sender === message.sender &&
          m.content === message.content &&
          m.type === message.type,
      )
      if (isDuplicate) return state

      return {
        ...state,
        conversations: state.conversations.includes(chatKey)
          ? state.conversations
          : [...state.conversations, chatKey],
        messages: {
          ...state.messages,
          [chatKey]: [...existing, message],
        },
        unread:
          state.activeChat === chatKey
            ? state.unread
            : {
                ...state.unread,
                [chatKey]: (state.unread[chatKey] || 0) + 1,
              },
      }
    }

    case SET_ACTIVE_CHAT: {
      const { chatKey, receiver, cardName } = action.payload || {}
      return {
        ...state,
        activeChat: chatKey ?? null,
        activeReceiver: receiver ?? null,
        activeCardName: cardName ?? null,
        unread: chatKey ? { ...state.unread, [chatKey]: 0 } : state.unread,
      }
    }

    case SET_ACTIVE_CARD:
      return {
        ...state,
        activeCard: action.payload,
      }

    default:
      return state
  }
}

export default chatReducer
