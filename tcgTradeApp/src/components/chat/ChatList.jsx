import { useEffect } from "react"
import { Button, Card } from "react-bootstrap"
import { FaRegTrashAlt } from "react-icons/fa"
import { useSelector, useDispatch } from "react-redux"
import {
  setActiveChat,
  fetchConversations,
  deleteConversation,
} from "../../redux/actions/chatActions"

const ChatList = () => {
  const dispatch = useDispatch()
  const conversations = useSelector((state) => state.chat.conversations)
  const unread = useSelector((state) => state.chat.unread)
  const currentUser = useSelector((state) => state.user.loggedUser?.username)

  useEffect(() => {
    if (!currentUser) return
    dispatch(fetchConversations(currentUser))
  }, [currentUser, dispatch])

  const getOtherUser = (chatKey) => {
    const [user1, user2] = chatKey.split("||")
    return user1 === currentUser ? user2 : user1
  }

  const handleDelete = (event, chatKey) => {
    event.stopPropagation()

    const otherUser = getOtherUser(chatKey)
    dispatch(deleteConversation(currentUser, otherUser))
  }

  return (
    <Card className="chat-card bg-primary text-secondary border-1 border-secondary">
      <Card.Body className="bg-primary text-secondary">
        <strong>Chats</strong>

        {conversations.length === 0 && (
          <p className="text-secondary mt-2" style={{ fontSize: "0.85rem" }}>
            Nessuna conversazione ancora.
          </p>
        )}

        {conversations.map((chatKey) => {
          const otherUser = getOtherUser(chatKey)
          return (
            <div
              className="chat-list-item d-flex justify-content-between align-items-center gap-2"
              key={chatKey}
              onClick={() => dispatch(setActiveChat(chatKey, otherUser))}
              style={{ cursor: "pointer" }}
            >
              <div>
                <span>{otherUser}</span>
                {unread[chatKey] > 0 && (
                  <span className="unread-count ms-2">{unread[chatKey]}</span>
                )}
              </div>

              <Button
                variant="outline-danger"
                size="sm"
                onClick={(event) => handleDelete(event, chatKey)}
              >
                <FaRegTrashAlt />
              </Button>
            </div>
          )
        })}
      </Card.Body>
    </Card>
  )
}

export default ChatList
