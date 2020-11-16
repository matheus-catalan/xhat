import React, { Component } from "react"
import { signup, signInWithGoogle, signInWithGitHub } from "../helpers/auth"
import {
  Container,
  Button,
  TextField,
  Avatar,
  CssBaseline,
  Typography,
  Box,
  Link,
  Grid,
  MenuItem,
} from "@material-ui/core"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import axios from "axios"

export default class SignUp extends Component {
  constructor() {
    super()
    this.state = {
      error: null,
      email: "",
      password: "",
      states: [0],
      cities: [0],
      userState: "",
      userCity: "",
      loadCities: true,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.googleSignIn = this.googleSignIn.bind(this)
    this.githubSignIn = this.githubSignIn.bind(this)
    this.handleChangeState = this.handleChangeState.bind(this)
  }

  async componentDidMount() {
    await axios
      .get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/`)
      .then((res) => {
        this.setState({ states: res.data })
      })
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
      await signup(this.state.email, this.state.password, this.state.userCity)
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

  async handleChangeState(event) {
    let state_code = event.target.value
    this.setState({ userState: state_code })

    await axios
      .get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state_code}/distritos`
      )
      .then((res) => {
        this.setState({ cities: res.data, loadCities: false })
      })
  }

  async handleChangecity(event) {
    this.setState({ userCity: event.target.value })
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
              <TextField
                id="standard-select-currency"
                select
                fullWidth
                value={this.state.state}
                onChange={this.handleChangeState}
                helperText="Selecione o seu estado"
              >
                {this.state.states.map((state, key) => (
                  <MenuItem
                    key={state.id !== undefined ? key : 0}
                    value={state.id !== undefined ? state.id : 0}
                  >
                    {state.nome ? state.nome : ""}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="standard-select-currency"
                select
                fullWidth
                required
                name="userCity"
                hidden={this.state.loadCities ? true : false}
                value={this.state.city}
                onChange={this.handleChange}
                helperText="Selecione a sua cidade"
              >
                {this.state.cities.map((city, key) => (
                  <MenuItem
                    key={city.id !== undefined ? key : 0}
                    value={city.id !== undefined ? city.id : 0}
                  >
                    {city.nome ? city.nome : ""}
                  </MenuItem>
                ))}
              </TextField>
              <Button
                type="submit"
                fullWidth
                required
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
