import React, { Component } from "react"
import { signup, signInWithGoogle, signInWithGitHub } from "../helpers/auth"
import {
  Container,
  Button,
  TextField,
  Avatar,
  CssBaseline,
  Typography,
  Checkbox,
  FormControlLabel,
  Box,
  Link,
  Grid,
} from "@material-ui/core"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"

export default class SignUp extends Component {
  constructor() {
    super()
    this.state = {
      error: null,
      email: "",
      password: "",
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.googleSignIn = this.googleSignIn.bind(this)
    this.githubSignIn = this.githubSignIn.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  async handleSubmit(event) {
    event.preventDefault()
    this.setState({ error: "" })
    try {
      await signup(this.state.email, this.state.password)
    } catch (error) {
      if (error.message === "The email address is badly formatted.")
        this.setState({ error: error.message })
    }
  }

  async googleSignIn() {
    try {
      await signInWithGoogle()
    } catch (error) {
      this.setState({ error: error.message })
    }
  }

  async githubSignIn() {
    try {
      await signInWithGitHub()
    } catch (error) {
      console.log(error)
      this.setState({ error: error.message })
    }
  }

  render() {
    return (
      <Container
        className="container-signup"
        style={{
          height: "100vh",
          margin: "0px",
        }}
        xs={12}
        component="main"
        maxWidth="xs"
      >
        <CssBaseline />
        <Grid
          style={{ height: "100%" }}
          container
          direction="column"
          justify="center"
          alignItems="center"
        >
          <Grid
            container
            item
            className="signup"
            style={{ height: "85%" }}
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Avatar className="avatar">
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Cadastrar-se
            </Typography>
            <form className="form" onSubmit={this.handleSubmit} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={this.handleChange}
                value={this.state.email}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Senha"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={this.handleChange}
                value={this.state.password}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Lembra senha ?"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className="submit"
              >
                Salvar
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/login" variant="body2">
                    Ja tem uma conta ?
                  </Link>
                </Grid>
              </Grid>
            </form>
          </Grid>
          <Grid
            container
            item
            style={{ height: "15%" }}
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Box mt={8}>
              <Typography variant="body2" color="textSecondary" align="center">
                {"Copyright © "}
                <Link
                  color="inherit"
                  href="https://compassionate-blackwell-571090.netlify.app/"
                >
                  Xhat
                </Link>{" "}
                {new Date().getFullYear()}
                {"."}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    )
  }
}
