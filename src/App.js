import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

const KEYWORD_BASE = "https://reststop.randomhouse.com/resources/works/?start=0&max=2&search=dog";
const WORK_BASE = "https://reststop.randomhouse.com/resources/titles/"
// const PARAM_AUTHOR = "authors?firstName=John"; //temp test link

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bookList: [],
      bookCover: '',
    };
  }

  componentDidMount() {
    // axios(`${KEYWORD_BASE}`)
    //   .then(res => {
    //     var newBookList = res.data.work.map(work => {
    //       var newBook = Array.from(work.titles.isbn);
    //       return newBook.map(isbn => {
    //         return {
    //           title: work.titleweb,
    //           isbn: isbn['$'],
    //         };
    //       })
    //     });
    //     newBookList = newBookList.flat();
    //     const newState = Object.assign({}, this.state, {
    //       bookList: newBookList,
    //     });
    //     this.setState(newState);
    //   })


    axios(`${WORK_BASE}${9780307490803}`, {
      headers: {
        'Content-type': 'image',
      }
    })
    .then(res => {
      const newCover = {cover: res.data};
      const newState = Object.assign({}, this.state, {
        bookCover: newCover,
      });
      this.setState(newState);
    })

      .catch(err => {
        console.log(err);
      })
  }

  render() {
    return (
      <div className="App">
        <Covers bookList={ this.state.bookList } bookCover={ this.state.bookCover } />
      </div>
    );
  }
}

const Covers = ({ bookList, bookCover }) =>
  <div>
    {bookList.map(book => 
      <div key={book.isbn}>
        <h1><a>{book.title}</a></h1>
        <p>{book.isbn}</p>
        <img src='{ }'></img>
      </div>
    )}  
  </div>



export default App;