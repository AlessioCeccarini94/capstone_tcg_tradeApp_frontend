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
    setInput(msg)
  }, [username, receiver, cardName])

  useEffect(() => {
    if (!username || !receiver) return

    const token = localStorage.getItem("token")
    const client = new Client({
      brokerURL: `${baseURL.replace("http", "ws")}/ws`,
      reconnectDelay: 5000,
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      debug: (str) => console.log("STOMP:", str),
    })

    client.onConnect = () => {
      console.log("WebSocket connesso come:", username)
      setConnected(true)

      client.subscribe("/user/queue/messages", (msg) => {
        const message = JSON.parse(msg.body)
        console.log("Messaggio ricevuto:", message)
        if (
          (message.sender === username && message.receiver === receiver) ||
          (message.sender === receiver && message.receiver === username)
        ) {
          dispatch(addMessage(message))
        }
      })
    }

    client.onStompError = (frame) => console.error("STOMP ERROR:", frame)
    client.onWebSocketError = (err) => console.error("WS ERROR:", err)

    client.activate()
    clientRef.current = client

    return () => {
      client.deactivate()
      setConnected(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [receiver, username])

  const sendMessage = () => {
    if (!input.trim() || !connected) return
    const newMessage = {
      sender: username,
      receiver,
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
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 9999999,
      }}
    >
      <Card className="shadow bg-tertiary" style={{ width: "320px" }}>
        <Card.Body className="d-flex justify-content-between align-items-center pb-2">
          <span>{receiver}</span>
          <Button size="sm" onClick={() => dispatch(setActiveChat(null))}>
            ✖
          </Button>
        </Card.Body>

        <Card.Body>
          <div
            style={{
              maxHeight: "200px",
              overflowY: "auto",
              marginBottom: "10px",
            }}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  textAlign: msg.sender === username ? "right" : "left",
                }}
              >
                <span className="chat-body">{msg.content}</span>
              </div>
            ))}
          </div>

          <Form
            onSubmit={(e) => {
              e.preventDefault()
              sendMessage()
            }}
          >
            <div className="d-flex gap-2">
              <Form.Control
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <Button type="submit" disabled={!connected}>
                Invia
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
