import React, { Component } from "react"
import { auth } from "../services/firebase"
import { db } from "../services/firebase"
import {
  Grid,
  List,
  ListItem,
  ListItemText,
  Fab,
  TextField,
  // Avatar,
} from "@material-ui/core"
import SendIcon from "@material-ui/icons/Send"

export default class Conversation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: auth().currentUser,
      conversation: [],
      content: "",
      readError: null,
      writeError: null,
      loadingChats: false,
      chat_code: "",
      ref: null,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.myRef = React.createRef()
  }

  handleChange(event) {
    this.setState({
      content: event.target.value,
    })
  }

  async handleSubmit(event) {
    event.preventDefault()
    this.setState({ writeError: null })
    try {
      this.state.ref.child(this.state.chat_code).push({
        content: this.state.content,
        timestamp: Date.now(),
        uid: this.state.user.uid,
      })
      this.setState({ content: "" })
    } catch (error) {
      console.log(error)
      this.setState({ writeError: error.message })
    }
  }

  formatTime(timestamp) {
    const d = new Date(timestamp)
    const time = `${d.getDate()}/${
      d.getMonth() + 1
    }/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`
    return time
  }

  async getMessges() {
    this.state.ref.off()

    this.state.ref.child(this.state.chat_code).on("value", (snapshot) => {
      let chats = []
      snapshot.forEach((snap) => {
        chats.push(snap.val())
      })
      chats.sort(function (a, b) {
        return a.timestamp - b.timestamp
      })

      this.setState({ chats })
      this.setState({ loadingChats: false })
    })
  }

  componentDidUpdate() {
    this.getMessges()
  }

  async componentDidMount() {
    this.setState({
      readError: null,
      loadingChats: true,
      chat_code: this.props.chatCode,
      ref: db.ref("conversation"),
    })

    this.getMessges()
  }

  render() {
    return (
      <>
        <List style={{ overflowY: "auto" }}>
          {/* {this.state.chats.map((chat) => {
            return (
              <>
                <ListItem
                  key={chat.timestamp}
                  align={this.state.user.uid === chat.uid ? "right" : "left"}
                >
                  <Grid container>
                    <Grid item>
                      <ListItemText
                        primary={chat.content}
                        align={
                          this.state.user.uid === chat.uid ? "right" : "left"
                        }
                      >
                        {chat.content}
                      </ListItemText>
                    </Grid>
                    <Grid item>
                      <ListItemText
                        align="right"
                        secondary={this.formatTime(chat.timestamp)}
                        align={
                          this.state.user.uid === chat.uid ? "right" : "left"
                        }
                      ></ListItemText>
                    </Grid>
                  </Grid>
                </ListItem>
              </>
            )
          })} */}
        </List>
        <Grid
          container
          style={{
            position: "fixed",
            bottom: "0",
          }}
        >
          <form onSubmit={this.handleSubmit}>
            <Grid item style={{ width: "80%" }}>
              <TextField
                id="outlined-basic-email"
                label="Digite algo"
                fullWidth
                onChange={this.handleChange}
                value={this.state.content}
              />
            </Grid>
            <Grid style={{ width: "20%" }} item align="right">
              <Fab color="primary" aria-label="add" type="submit">
                <SendIcon />
              </Fab>
            </Grid>
          </form>
        </Grid>
      </>
    )
  }
}
