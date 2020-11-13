import React from "react"
import { AppBar, Toolbar, IconButton, Typography } from "@material-ui/core"
import AccountCircle from "@material-ui/icons/AccountCircle"

function Header() {
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
        <IconButton aria-label="profile" color="inherit">
          <AccountCircle size="large" />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default Header
