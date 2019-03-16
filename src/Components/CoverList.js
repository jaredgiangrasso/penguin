import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './CoverList.css';
import Tilt from 'react-tilt';

const WORK_BASE = "https://reststop.randomhouse.com/resources/titles/";

export class CoverList extends Component {
  constructor(props){
    super(props);

    this.state = {
      active: false,
    }
  }


  componentDidUpdate(prevProps, prevState) {
    if(prevProps.searchTerm !== this.props.searchTerm) {
      this.props.fetchCoverList(this.props.searchTerm);
    }
  }

  componentDidMount() {
    this.props.fetchCoverList(this.props.searchTerm);
  }

  toggleCurrentState() {
    const currentState = this.state.active;
    this.setState({ active: !currentState });
  }

  render() {
    const { bookList } = this.props;
    {if(!bookList[0]){
      return(<div id='error'>This page works best in Chrome. If you're seeing this, please switch browsers. If you're already in Chrome, our data's missing - please try again soon!</div>)
    } else {
    return (
      <div className='coverDisplay'>
        {bookList.map(book => {
          {const bookUrl = WORK_BASE + book.isbn;
          return (
            <Link to={`/details/${book.isbn}`} >
              <Tilt key={book.isbn} options={{ max: 10, scale: 1 }}> 
                <div>
                  <img alt="" className='book' src={bookUrl}></img>
                  <p className='title'>{book.title}</p>
                </div>
              </Tilt>
            </Link>
          )}
        })}  
      </div>
    )}}
  }
}