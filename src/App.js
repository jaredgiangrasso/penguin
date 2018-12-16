import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

const PATH_BASE = "https://reststop.randomhouse.com/resources/works/?start=0&max=10&search=dog";
// const PARAM_AUTHOR = "authors?firstName=John"; //temp test link

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isbnList: {
        title: [],
        isbn: [],
      },
    };
  }

  componentDidMount() {
    axios(`${PATH_BASE}`)
      .then(res => {
        const newIsbnList = res.data.work.map(work => {
          console.log(work);
          var newIsbn = Array.from(work.titles.isbn);
          return newIsbn.map(isbn => {
            return {
              title: work.titleweb,
              isbn: isbn['$'],
            };
          })
        });

        // const flatIsbnList = newIsbnList.flat();
        const newState = Object.assign(this.state, {
          title: newIsbnList,
        });

        this.setState({ newState }, console.log(this.state));

      })

      .catch(err => {
        console.log(err);
      })
  }

  render() {
    return (
      <div className="App">
        <Covers isbnList={ this.state.isbnList } />
      </div>
    );
  }
}

const Covers = props =>
<div>
  <h1>{props[0]}</h1>
</div>



export default App;