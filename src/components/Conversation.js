import React, { useState, useEffect } from "react"
import { auth, db } from "../services/firebase"

import { List, ListItem, ListItemText, TextField } from "@material-ui/core"

export default function Conversation(props) {
  const [user, setUser] = useState(auth().currentUser)
  const [conversation, setConversation] = useState([])
  const [content, setContent] = useState("")
  const [chat_code, setChatCode] = useState("")

  function handleChange(event) {
    event.preventDefault()

    setContent(event.target.value)
  }

  async function handleSubmit(event) {
    event.preventDefault()
    db.ref("conversation").child(chat_code).push({
      content: content,
      timestamp: Date.now(),
      uid: user.uid,
    })
    setContent("")
  }

  function formatTime(timestamp) {
    const d = new Date(timestamp)
    const time = `${d.getDate()}/${
      d.getMonth() + 1
    }/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`
    return time
  }

  useEffect(() => {
    setChatCode(props.chatCode)
  }, [props.chatCode])

  useEffect(() => {
    if (chat_code !== "") {
      db.ref("conversation").child(chat_code).off()
      db.ref("conversation")
        .child(chat_code)
        .on("value", (snapshot) => {
          let chats = []
          snapshot.forEach((snap) => {
            chats.push(snap.val())
          })
          chats.sort(function (a, b) {
            return a.timestamp - b.timestamp
          })
          setConversation(chats)
        })
    }
  }, [chat_code])

  useEffect(() => {
    setUser(auth().currentUser)
  }, [])

  return (
    <>
      <List
        style={{
          width: "100%",
          marginTop: "40px",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          overflow: "auto",
          paddingLeft: "30px",
          paddingRight: "30px",
          marginBottom: "110px",
        }}
      >
        {conversation.map((chat) => {
          return (
            <div
              style={{ width: "100%", display: "flex" }}
              className={user.uid === chat.uid ? "right" : "left"}
            >
              <ListItem
                key={chat.timestamp}
                className={
                  user.uid === chat.uid ? "bubble right" : "bubble left"
                }
              >
                <ListItemText primary={chat.content}></ListItemText>
                <ListItemText
                  secondary={`${formatTime(chat.timestamp)}`}
                ></ListItemText>
              </ListItem>
            </div>
          )
        })}
      </List>
      <form
        onSubmit={handleSubmit}
        style={{
          position: "fixed",
          bottom: "0",
          width: "100%",
          maxWidth: "inherit",
          paddingLeft: "5px",
          paddingRight: "5px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#fcfcfc",
          marginBottom: "5px",
        }}
      >
        <TextField
          style={{ width: "inherit" }}
          variant="outlined"
          label="Digite algo"
          onChange={handleChange}
          value={content}
        />
      </form>
    </>
  )
}
