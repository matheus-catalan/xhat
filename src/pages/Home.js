import React, { Component } from "react"
import {
  Button,
  Container,
  Grid,
  Box,
  Typography,
  Link,
} from "@material-ui/core"

export default class HomePage extends Component {
  render() {
    return (
      <Container
        className="container-home"
        style={{
          height: "100vh",
          margin: "0px",
        }}
        xs={12}
      >
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
            className="home"
            style={{ height: "85%" }}
            direction="column"
            justify="center"
            alignItems="center"
          >
            <h1 className="display-4">Bem vindo ao Xhat</h1>
            <p className="lead" style={{ marginTop: "10px" }}>
              Um ótimo lugar para compartilhar suas idéias com amigos
            </p>
            <div style={{ flexDirection: "row", marginTop: "50px" }}>
              <Button
                className="mr-4"
                variant="contained"
                color="primary"
                href="/signup"
              >
                Cadastrar-se
              </Button>
              <Button href="/login">Login com email</Button>
            </div>
          </Grid>
          <Grid
            container
            item
            style={{ height: "15%" }}
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Box mt={8} b={0}>
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
