import React, { Component } from "react"
import Footer from "../components/Footer"
import Button from "@material-ui/core/Button"

export default class HomePage extends Component {
  render() {
    return (
      <div className="home">
        <section>
          <div className="jumbotron jumbotron-fluid py-5">
            <div className="container text-center py-5 mt-5">
              <h1 className="display-4">Bem vindo ao Xhat</h1>
              <p className="lead">
                Um ótimo lugar para compartilhar suas idéias com amigos
              </p>
              <div className="mt-4 btn-home">
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
            </div>
          </div>
        </section>
        {/* <Footer></Footer> */}
      </div>
    )
  }
}
