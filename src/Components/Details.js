import React, { Component } from 'react'; 
import './Details.css';

const WORK_BASE = "https://reststop.randomhouse.com/resources/titles/";


export class Details extends Component {

	getCurrentBookInfo() {
		return this.props.bookList.filter(book =>
			(book.isbn === this.props.match.params.bookISBN)
		);
	}

	reformatDate(){
		const year = this.getCurrentBookInfo()[0].saleDate.substring(0, 4);
		var month = this.getCurrentBookInfo()[0].saleDate.substring(5, 7);
		switch(month) {
			case '01':
				month = "January";
				break;
			case '02':
				month = "February";
				break;
			case '03':
				month = "March";
				break;
			case '04':
				month = "April";
				break;
			case '05':
				month = "May";
				break;
			case '06':
				month = "June";
				break;
			case '07':
				month = "July";
				break;
			case '08':
				month = "August";
				break;
			case '09':
				month = "September";
				break;
			case '10':
				month = "October";
				break;
			case '11':
				month = "November";
				break;
			case '12':
				month = "December";
				break;
		}
		var day = this.getCurrentBookInfo()[0].saleDate.substring(8, 10);

		return month + " " + day + ", " + year;

		//alternative ISO format
		// return this.getCurrentBookInfo()[0].saleDate.substring(0, 10);
	}

	render() {

		return (
			<div className='details'>
				<img className="test" src={`${WORK_BASE}${this.props.match.params.bookISBN}`}/>
	            <p id="Title"><strong>Title:</strong> {this.getCurrentBookInfo()[0].title}</p>
	            <p id="Author"><strong>Author:</strong> {this.getCurrentBookInfo()[0].author}</p>
	            <p id="ISBN"><strong>ISBN:</strong> {this.props.match.params.bookISBN}</p>
	            <p id="workID"><strong>Work ID:</strong> {this.getCurrentBookInfo()[0].workID}</p>
	            <p id="saleDate"><strong>On Sale Date:</strong> {this.reformatDate()}</p>
			</div>
		)
	}
}