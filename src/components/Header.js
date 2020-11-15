import React from "react"
import { AppBar, Toolbar, Button, Typography } from "@material-ui/core"
import { singout } from "../helpers/db"

function Header() {
  function handleSubmit(event) {
    event.preventDefault()
    singout()
  }

  return (
    <AppBar
      position="static"
      style={{ position: "absolute", marginBottom: "50px" }}
    >
      <Toolbar
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h5" color="inherit" aria-label="menu">
          Xhat
        </Typography>
        <form onSubmit={handleSubmit}>
          <Button variant="contained" type="submit">
            Sair
          </Button>
        </form>
      </Toolbar>
    </AppBar>
  )
}

export default Header
