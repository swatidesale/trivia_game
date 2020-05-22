import React, { Component } from 'react'
import { Card, CardActions, Button } from '@material-ui/core'

export default class Score extends Component {
  render() {
    const { score, total, restartGame } = this.props

    return(
      <Card className="card">
        <header className="card-header">
          <h1>Congratulatons..!</h1>
        </header>
        <CardActions className="container">
          <p>You have completed the quiz.<br></br>
          Your score is { score } out of { total }</p>
          <Button className="start-game" variant="contained" color="primary"
            onClick={ restartGame }
          >
            Restart Game
          </Button>
        </CardActions>
      </Card>
    ) 
  }
}