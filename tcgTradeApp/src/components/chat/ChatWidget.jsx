import { FaComments } from "react-icons/fa"
import { useSelector } from "react-redux"

const ChatWidget = ({ onClick }) => {
  const unread = useSelector((state) => state.chat.unread)

  const totalUnread = Object.values(unread).reduce((a, b) => a + b, 0)

  return (
    <div className="chat-widget" onClick={onClick}>
      <div style={{ position: "relative" }}>
        <FaComments size={30} color="#00f5ff" />

        {totalUnread > 0 && (
          <span className="chat-widget-unread">{totalUnread}</span>
        )}
      </div>
    </div>
  )
}

export default ChatWidget
