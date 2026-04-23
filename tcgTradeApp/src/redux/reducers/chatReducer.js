export const SET_ACTIVE_CHAT = "SET_ACTIVE_CHAT"
export const ADD_MESSAGE = "ADD_MESSAGE"
export const SET_ACTIVE_CARD = "SET_ACTIVE_CARD"
export const LOAD_MESSAGES = "LOAD_MESSAGES"
export const LOAD_CONVERSATIONS = "LOAD_CONVERSATIONS"
export const DELETE_CONVERSATION = "DELETE_CONVERSATION"

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
          m.receiver === message.receiver &&
          m.message === message.message &&
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

    case LOAD_MESSAGES: {
      const { chatKey, messages } = action.payload

      return {
        ...state,
        conversations: state.conversations.includes(chatKey)
          ? state.conversations
          : [...state.conversations, chatKey],
        messages: {
          ...state.messages,
          [chatKey]: messages,
        },
      }
    }

    case LOAD_CONVERSATIONS: {
      const { conversations } = action.payload
      const chatKeys = conversations.map((conversation) => conversation.chatKey)

      return {
        ...state,
        conversations: chatKeys,
      }
    }

    case DELETE_CONVERSATION: {
      const { chatKey } = action.payload
      const updatedMessages = { ...state.messages }
      const updatedUnread = { ...state.unread }

      delete updatedMessages[chatKey]
      delete updatedUnread[chatKey]

      return {
        ...state,
        conversations: state.conversations.filter((key) => key !== chatKey),
        messages: updatedMessages,
        unread: updatedUnread,
        activeChat: state.activeChat === chatKey ? null : state.activeChat,
        activeReceiver:
          state.activeChat === chatKey ? null : state.activeReceiver,
        activeCardName:
          state.activeChat === chatKey ? null : state.activeCardName,
      }
    }

    default:
      return state
  }
}

export default chatReducer
