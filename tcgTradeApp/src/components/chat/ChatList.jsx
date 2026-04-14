import { Card } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { setActiveChat } from "../../redux/actions/chatActions"

const ChatList = () => {
  const dispatch = useDispatch()
  const conversations = useSelector((state) => state.chat.conversations)
  const unread = useSelector((state) => state.chat.unread)
  const currentUser = useSelector((state) => state.user.loggedUser?.username)
  const getOtherUser = (chatKey) => {
    const [user1, user2] = chatKey.split("||")
    return user1 === currentUser ? user2 : user1
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
              className="chat-list-item"
              key={chatKey}
              onClick={() => dispatch(setActiveChat(chatKey, otherUser))}
            >
              <span>{otherUser}</span>
              {unread[chatKey] > 0 && (
                <span className="unread-count">{unread[chatKey]}</span>
              )}
            </div>
          )
        })}
      </Card.Body>
    </Card>
  )
}

export default ChatList
