import React, { Component } from 'react'
import { Card } from '@material-ui/core'
import QuestionCard from './QuestionCard'
import Score from './Score'

import './Quiz.css'

class Quiz extends Component {
  constructor(props) {
		super(props)
		this.state = {
      index: 0,
      score: 0,
      seconds: 0,
      duration: 10,
      level: 'easy',
    }
    this.handleAnswerSelection = this.handleAnswerSelection.bind(this)
    this.handleRestart = this.handleRestart.bind(this)
    this.tick = this.tick.bind(this)
  }

  pushData(index) {
    const { quizData, total } = this.props    
    this.interval = setInterval(() => this.tick(), 1000)

    if(index < total) {
      this.setState({
        question: quizData[index].question,
        answers: [quizData[index].correct_answer, quizData[index].incorrect_answers[0], quizData[index].incorrect_answers[1], quizData[index].incorrect_answers[2] ],
        correct: quizData[index].correct_answer,
        level: quizData[index].difficulty,
        seconds: 0,
      })
    }
  }

  componentWillMount() {
    const { index } = this.state
    this.pushData(index)
  }

  handleAnswerSelection(answer, correctAnswer) {
    return () => {
      let isRight = false
      if (answer === correctAnswer) {
        isRight = true
        this.setState({ score: this.state.score + 1 })
      } 

      console.log("your selected answer is :-> ", isRight)
      if(!isRight) 
        console.log("correct answer is :-> ", correctAnswer)

      clearInterval(this.interval)
      this.setState({ index: this.state.index + 1 })
      this.pushData(this.state.index + 1)
    }
  }

  handleRestart() {
    const { onRestart } = this.props
    this.setState({
      index: 0,
      score: 0,
      seconds: 0,
    })
    onRestart()
  }

  tick() {
    const { total } = this.props
    const { index , duration} = this.state

    if(index < total) {
      if (this.state.seconds === duration ) {
        clearInterval(this.interval)
        this.setState({ index: this.state.index + 1 })
        this.pushData(this.state.index + 1)
      } else {
        this.setState((prevState) => ({
          seconds: prevState.seconds + 1
        }))
      }
    } 
  }

  render() {
    const { total, quizData } = this.props
    const { 
      index, question, answers, correct, level, duration, seconds, score,
    } = this.state

    const timeLeft = duration - seconds

    return(
      <div>
      {
        quizData &&  index < total ? (<Card className="card">
          <QuestionCard 
            index={ index }
            total={ total }
            level={ level }
            question={ question }
            duration={ timeLeft }
            answers={answers} 
            correctAnswer={correct} 
            onAnswerSelection={this.handleAnswerSelection}
          />       
        </Card>) : ' '
      }
      {
        quizData && index === total ? (
          <Score 
            score={ score } 
            total={ total }
            restartGame={ this.handleRestart } />
        ) : ''
      }
    </div>
    )
  }
}
export default Quiz