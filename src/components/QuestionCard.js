import React, { Component } from 'react'
import { CardActions, Button } from '@material-ui/core';

export default class QuestionCard extends Component {
  render() {
    const { 
      index, total, answers, level, question, duration, onAnswerSelection, correctAnswer 
    } = this.props

    return(
      <div id="answers">
        <header className="card-header">
          <h4> Round { index + 1 }/{ total }</h4>
          <span>{ level } | { duration }</span>
          <p>{ question }</p>
        </header>
        <CardActions className="container">
          {
            (answers.sort()).map((answer, i) => {
              return (
                <Button variant="contained" color="primary" key={i} onClick={onAnswerSelection(answer, correctAnswer)}>
                  {answer}
                </Button>
              )
            })
          }
        </CardActions>
      </div>
    )
  }
}