import React, { Component } from "react"
import { signin, signInWithGoogle, signInWithGitHub } from "../helpers/auth"
import {
  Container,
  Button,
  TextField,
  CssBaseline,
  Typography,
  Box,
  Grid,
} from "@material-ui/core"
import { Link } from "react-router-dom"

export default class Login extends Component {
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
      await signin(this.state.email, this.state.password)
    } catch (error) {
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
      this.setState({ error: error.message })
    }
  }

  render() {
    return (
      <Container
        className="container-login"
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
            className="login"
            style={{
              height: "85%",
            }}
            direction="column"
            justify="center"
            alignItems="center"
          >
            <form
              autoComplete="off"
              onSubmit={this.handleSubmit}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <h1>
                Bem vindo ao
                <Link className="" to="/">
                  {" "}
                  Xhat
                </Link>
              </h1>
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
              <div className="form-group">
                {this.state.error ? (
                  <p className="text-danger">{this.state.error}</p>
                ) : null}
                <button className="btn btn-primary px-5" type="submit">
                  Login
                </button>
              </div>
              <p>
                Você também pode fazer login com qualquer um desses serviços
              </p>
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                }}
              >
                <Button
                  className="mr-2"
                  variant="contained"
                  color="secondary"
                  onClick={this.googleSignIn}
                >
                  Sign in with Google
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.githubSignIn}
                >
                  Sign in with GitHub
                </Button>
              </Box>
              <hr />
              <p>
                Não tem uma conta? <Link to="/signup">Cadastre-se</Link>
              </p>
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
        </Grid>{" "}
      </Container>
    )
  }
}
