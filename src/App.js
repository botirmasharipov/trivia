import React, { Component } from 'react';
import { Question } from "./components";
import { categories } from "./lib/categories";

const TRIVIA_API = `https://opentdb.com/api.php?amount=1&category={categoryId}&difficulty=easy`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: null,
      selectedCategory: null // Add a state to track the selected category
    };
  }

  componentDidMount() {
    this.fetchTrivia();
  }

  fetchTrivia = () => {
    const { selectedCategory } = this.state;

    if (selectedCategory) {
      const categoryId = selectedCategory.id;
      const url = TRIVIA_API.replace('{categoryId}', categoryId);

      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          const questions = data.results;
          this.setState({ questions });
        });
    }
  };

  handleCategoryChange = (event) => {
    const categoryId = parseInt(event.target.value);
    const selectedCategory = categories.find(category => category.id === categoryId);
    this.setState({ selectedCategory }, this.fetchTrivia);
  };

  render() {
    const { questions, selectedCategory } = this.state;

    return (
      <div className='container l:w-50 p-5'>
        <h1 className='display-1'>Trivia</h1>
        <h2 className='fw-lighter fs-5 mb-4'>
          (we couldn&lsquo;t think of a better name,{' '}
          <span className='fw-bolder'>sorry</span>)
        </h2>
        <hr />

        <div className="mb-4">
          <label htmlFor="categorySelect" className="form-label">Select a category:</label>
          <select
            id="categorySelect"
            className="form-select"
            onChange={this.handleCategoryChange}
            value={selectedCategory ? selectedCategory.id : ''}
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.value}</option>
            ))}
          </select>
        </div>

        <div>
          {questions ? (
            questions.map((question, index) => (
              <Question key={index} question={question} />
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    );
  }
}

export { App };
