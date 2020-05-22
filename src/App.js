import React, { Component } from 'react'
import { Card, CardActions, Button } from '@material-ui/core'

import Quiz from './components/Quiz'
import { getQuizData } from './api/triviaQuestions'
import './App.css'

class App extends Component {
  constructor(props) {
		super(props)
		this.state = {
      isStart: false,
      quizData: [],
    }
    this.handleStartGame = this.handleStartGame.bind(this)
    this.handleRestartGame = this.handleRestartGame.bind(this)
  }
  
  componentDidMount() {
    getQuizData()
      .then(quizData => {
        this.setState({ quizData: quizData.results })
      })
  }

  handleStartGame() {
    this.setState({ isStart: true })
  }

  handleRestartGame() {
    this.setState({ isStart: true })
    getQuizData()
    .then(quizData => {
      this.setState({ quizData: quizData.results })
    })
  }

  render() {
    const { isStart, quizData } = this.state
    
    return(
      <div>
        { !isStart && (<Card className="card">
          <header className="card-header">
            <h1>Trivia Game</h1>
          </header>
          <CardActions className="container">
            <Button className="start-game" variant="contained" color="primary"
              onClick={ this.handleStartGame }
            >
              Start Game
            </Button>
          </CardActions>
        </Card>)}

        { isStart && (<Quiz 
          quizData={ quizData } 
          total={ quizData.length }
          onRestart={ this.handleRestartGame }
          handleUpdateQuestion={ this.handleUpdateQuestion }
          />) 
        }
      </div>
    )
  }
}

export default App
