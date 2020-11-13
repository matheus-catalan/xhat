import React, { Component, useEffect } from "react"
import Header from "../components/Header"
import Conversation from "../components/Conversation"
import ListChats from "../components/ListChats"
import { db, auth } from "../services/firebase"
import { Grid } from "@material-ui/core"

export default class Chat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      chats: [],
      user: auth().currentUser,
      readError: "",
      loadingChats: false,
      chatCode: "",
    }
    this.handleChatCode = this.handleChatCode.bind(this)
  }

  async componentDidMount() {
    this.setState({ loadingChats: true })

    try {
      let chat_user = []
      let chats = []

      db.ref("chat_user")
        .child(`${this.state.user.uid}`)
        .child("chat_code")
        .on("value", (snapshot) => {
          snapshot.forEach((snap) => {
            if (chat_user.indexOf(snap.val()) < 0) {
              chat_user.push(snap.val())
            }
          })

          let data = []
          chat_user.forEach(async (element) => {
            db.ref("chats")
              .child(element)
              .on("value", (snapshot) => {
                snapshot.forEach((snap) => {
                  data.push({
                    name: snap.val(),
                    code: element,
                  })
                })
                this.setState({ chats: data })
              })
          })

          return
        })
    } catch (error) {
      this.setState({ readError: error.message })
    }
  }

  componentDidUpdate() {
    // this.openConversation()
  }

  async handleChatCode(chat_code) {
    this.setState({
      chatCode: chat_code,
    })
  }

  render() {
    return (
      <div style={{ maxHeight: "100vh", height: "100%" }}>
        <Header />
        <Grid container style={{ maxHeight: "100vh", height: "100%" }}>
          <Grid
            style={{
              borderRight: "1px solid #e0e0e0",
              maxHeight: "100vh",
              overflow: "auto",
              marginTop: "50px",
            }}
          >
            <ListChats
              chats={this.state.chats}
              user={this.state.user}
              openConversation={this.handleChatCode}
            ></ListChats>
          </Grid>
          <Grid
            style={{
              paddingLeft: "30px",
              paddingRight: "30px",
              maxHeight: "100vh",
              overflow: "auto",
              marginTop: "50px",
            }}
          >
            <Conversation chatCode={this.state.chatCode}></Conversation>
          </Grid>
        </Grid>
      </div>
    )
  }
}
