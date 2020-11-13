import React, { Component } from "react"

import {
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  IconButton,
  Divider,
  Grid,
  ListItemIcon,
  Avatar,
  Dialog,
  TextField,
  Button,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core"
import AddCircleIcon from "@material-ui/icons/AddCircle"
import { auth } from "../services/firebase"
import { addUserInChat, storeChat } from "../helpers/db"
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer"
import LibraryAddIcon from "@material-ui/icons/LibraryAdd"

export default class ListChats extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      open2: false,
      chat_id: "",
      user: auth().currentUser,
      chats: [],
      loadingChats: false,
      chat_name: "",
      chat_code: "",
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleChange2 = this.handleChange2.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSubmit2 = this.handleSubmit2.bind(this)
  }

  handleChange(event) {
    this.setState({
      chat_id: event.target.value,
    })
  }

  handleChange2(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  async handleSubmit(event) {
    event.preventDefault()

    addUserInChat(this.state.user.uid, this.state.chat_id)
    this.setState({
      open: false,
    })
  }

  async handleSubmit2(event) {
    event.preventDefault()

    storeChat(this.state.chat_name, this.state.chat_code, this.state.user.uid)
    this.setState({
      open2: false,
    })
  }

  handleOpen = () => {
    this.setState({
      open: true,
    })
  }

  handleOpen2 = () => {
    this.setState({
      open2: true,
    })
  }

  handleClose = () => {
    this.setState({
      open: false,
    })
  }

  handleClose2 = () => {
    this.setState({
      open2: false,
    })
  }

  render() {
    return (
      <>
        <Grid item className="borderRight500">
          <List style={{ overflowY: "auto" }}>
            <ListItem key="RemySharp">
              <ListItemIcon>
                <Avatar
                  alt="Remy Sharp"
                  src="https://material-ui.com/static/images/avatar/1.jpg"
                />
              </ListItemIcon>
              <ListItemText
                primary={this.props.user.displayName}
              ></ListItemText>
            </ListItem>
            <ListItem>
              <IconButton
                color="primary"
                component="span"
                onClick={this.handleOpen}
              >
                <AddCircleIcon />
                <Dialog
                  open={this.state.open}
                  onClose={this.handleClose}
                  aria-labelledby="form-dialog-title"
                >
                  <form onSubmit={this.handleSubmit}>
                    <DialogContent>
                      <DialogContentText>Adicionar chat</DialogContentText>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="chat_id"
                        name="chat_id"
                        label="Código do chat"
                        type="text"
                        fullWidth
                        onChange={this.handleChange}
                        value={this.state.chat_id}
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button color="primary" type="submit">
                        Enviar
                      </Button>
                    </DialogActions>
                  </form>
                </Dialog>
              </IconButton>
              <IconButton
                color="primary"
                component="span"
                onClick={this.handleOpen2}
              >
                <LibraryAddIcon />
                <Dialog
                  open={this.state.open2}
                  onClose={this.handleClose2}
                  aria-labelledby="form-dialog-title"
                >
                  <form onSubmit={this.handleSubmit2}>
                    <DialogContent>
                      <DialogContentText>Criar chat</DialogContentText>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="chat_name"
                        name="chat_name"
                        label="Nome do chat"
                        type="text"
                        fullWidth
                        onChange={this.handleChange2}
                        value={this.state.chat_name}
                      />
                      <TextField
                        autoFocus
                        margin="dense"
                        id="chat_code"
                        name="chat_code"
                        label="codigo do chat"
                        type="text"
                        fullWidth
                        onChange={this.handleChange2}
                        value={this.state.code_chat}
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button color="primary" type="submit">
                        Enviar
                      </Button>
                    </DialogActions>
                  </form>
                </Dialog>
              </IconButton>
            </ListItem>
          </List>
          <Divider />
          <List
            style={{
              maxHeight: "100%",
              overflowY: "scroll",
            }}
          >
            <ListSubheader>Menssagens</ListSubheader>
            {this.props.chats.map((chat) => {
              return (
                <ListItem
                  button
                  key={`${chat.code}`}
                  onClick={() => this.props.openConversation(chat.code)}
                >
                  <ListItemIcon>
                    <Avatar>
                      <QuestionAnswerIcon />
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText
                    primary={chat.name}
                    secondary={`cod.: ${chat.code}`}
                  ></ListItemText>
                </ListItem>
              )
            })}
          </List>
        </Grid>
      </>
    )
  }
}
