import { useState, useRef, useEffect } from "react"
import { Card, Form, Button } from "react-bootstrap"
import { createPortal } from "react-dom"
import { useSelector, useDispatch } from "react-redux"
import { Client } from "@stomp/stompjs"
import { addMessage, setActiveChat } from "../../redux/actions/chatActions"

const ChatComponent = () => {
  const dispatch = useDispatch()
  const baseURL = import.meta.env.VITE_API_URL

  const username = useSelector((state) => state.user.loggedUser?.username)
  const receiver = useSelector((state) => state.chat.activeReceiver)
  const cardName = useSelector((state) => state.chat.activeCardName)
  const chatKey = useSelector((state) => state.chat.activeChat)
  const messages = useSelector((state) => state.chat.messages[chatKey] || [])

  const [connected, setConnected] = useState(false)
  const clientRef = useRef(null)
  const [input, setInput] = useState("")

  useEffect(() => {
    if (!username) return

    const msg = cardName
      ? `Hi! I'm ${username} and I'm interested in this card: ${cardName}`
      : `Hi! I'm ${username}`

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setInput(msg)
  }, [username, receiver, cardName])
  useEffect(() => {
    if (!username || !receiver) return

    const client = new Client({
      brokerURL: `${baseURL.replace("http", "ws")}/ws`,
      reconnectDelay: 5000,
      connectHeaders: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })

    client.onConnect = () => {
      setConnected(true)

      client.subscribe(`/topic/private/${username}`, (message) => {
        const newMessage = JSON.parse(message.body)
        dispatch(addMessage(newMessage))
      })
    }

    client.activate()
    clientRef.current = client

    return () => {
      client.deactivate()
      setConnected(false)
    }
  }, [receiver, username])

  const sendMessage = () => {
    if (!input.trim() || !connected) return

    const newMessage = {
      sender: username,
      receiver: receiver,
      content: input,
      type: "MESSAGE",
    }

    dispatch(addMessage(newMessage))

    clientRef.current.publish({
      destination: "/app/chat.private",
      body: JSON.stringify(newMessage),
    })

    setInput("")
  }

  if (!chatKey || !receiver) return null

  return createPortal(
    <div className="chat-card">
      <Card className="chat-body" style={{ width: "320px" }}>
        <Card.Body className="d-flex justify-content-between">
          <span className="text-secondary">{receiver}</span>
          <Button size="sm" onClick={() => dispatch(setActiveChat(null))}>
            ✖
          </Button>
        </Card.Body>

        <Card.Body>
          <div style={{ maxHeight: 200, overflowY: "auto" }}>
            {messages.map((msg, i) => (
              <div
                className="bg-secondary text-primary p-2 rounded mb-4 ms-3"
                key={i}
                style={{
                  textAlign: msg.sender === username ? "right" : "left",
                  marginBottom: "8px",
                }}
              >
                {msg.content}
              </div>
            ))}
          </div>

          <Form
            onSubmit={(e) => {
              e.preventDefault()
              sendMessage()
              console.log("receiver", receiver)
              console.log("CARDNAME", cardName)
            }}
          >
            <div className="d-flex gap-2">
              <Form.Control
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <Button type="submit" disabled={!connected}>
                Send
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>,
    document.body,
  )
}

export default ChatComponent
