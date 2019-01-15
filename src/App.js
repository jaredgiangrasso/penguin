import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import {CoverList} from './Components/CoverList.js';
import {Header} from './Components/Header.js';
import {Sidebar} from './Components/Sidebar.js';
import {Details} from './Components/Details.js';
import {Modal} from './Components/Modal.js';
import './App.css';

const DEFAULT_QUERY = "dog";
const KEYWORD_BASE = "https://reststop.randomhouse.com/resources/works/?start=0&max=20&search=";
// const WORK_BASE = "https://reststop.randomhouse.com/resources/titles/";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchKey: '',
      searchTerm: DEFAULT_QUERY,
      bookList: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.fetchCoverList = this.fetchCoverList.bind(this);
  }

  fetchCoverList(searchTerm) {
    //Search by term and compile ISBN list
    axios(`${KEYWORD_BASE}${searchTerm}`)
      .then(res => {
        var isbnList = res.data.work.map(work => {
          if (work.titles.isbn[0]) {
            const isbnArray = Object.values(work.titles.isbn[0]);
            return {
              title: work.titleweb.toLowerCase(),
              author: work.authorweb.toLowerCase(),
              isbn: isbnArray[1],
              saleDate: work.onsaledate,
              workID: work.workid,
            };  
          }
          return {
            title: work.titleweb.toLowerCase(),
            author: work.authorweb.toLowerCase(),
            isbn: work.titles.isbn['$'],
            saleDate: work.onsaledate,
            workID: work.workid,
          };
        });

        var newBookList = isbnList;
        this.setState({bookList: newBookList});
      })

      .catch(err => {
        console.log(err);
      })
  }

  handleChange(event) {
    this.setState({searchKey: event.target.value});
  }

  onSearchSubmit(event) {
    const { searchKey } = this.state;
    this.setState({searchTerm: searchKey});

    event.preventDefault();
  }

  render() {
    return (
      <Router>
        <div className='App'>
          <div className='grid'>
            <Header handleChange={this.handleChange} onSearchSubmit={this.onSearchSubmit}/>
            <Sidebar bookList={this.state.bookList} />
            <Route render={({location}) => (
              <TransitionGroup>
                <CSSTransition
                  key={location.key}
                  timeout={300}
                  classNames="trans"
                >
                  <Switch location={location}>
                    <Route 
                      exact={true}
                      path="/" 
                      render={(searchTerm, fetchCoverList, bookList) => <CoverList searchTerm={this.state.searchTerm} fetchCoverList={this.fetchCoverList} bookList={this.state.bookList}/>}
                    />
                    <Route 
                      path="/details/:bookISBN" 
                      render={(props) => <Details {...props} bookList={this.state.bookList}/>}
                    />
                  </Switch>
                </CSSTransition>
              </TransitionGroup>
            )}/>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;