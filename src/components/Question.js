import React from 'react';
import { AnswerButton } from './';
import { decodeHTML, randomizeArray } from '../lib';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      guessed: false,
      guess: '',
    };

    // convert all answers into a single array, and randomize the array
    this.answers = randomizeArray([
        ...props.question.incorrect_answers,
      props.question.correct_answer,
    ]);
  }

  handleGuess = (answer) => {
    // set guessed to true, and set guess to the selected answer
    this.setState({ guessed: true, guess: answer });
  };

  render() {
  const { guessed, guess } = this.state;
  const { question } = this.props;

  return (
    <div className='card p-2 mb-4'>
        <h3 className='fw-lighter fs-5 mb-4'>{this.props.question.category}</h3>
        <h4 className='fw-light fs-5 mb-4'>
          {decodeHTML(this.props.question.question)}
      </h4>

      <div>
        {this.answers.map((answer) => (
          <AnswerButton
            key={answer}
            answer={answer}
            handleGuess={this.handleGuess}
          />
        ))}
      </div>

      {guessed && (
        <div className='mt-4'>
          {guess === question.correct_answer ? (
            <p className='text-success'>Correct!</p>
          ) : (
            <p className='text-danger'>Incorrect!</p>
          )}
        </div>
      )}
    </div>
  );
}

}

export { Question };
