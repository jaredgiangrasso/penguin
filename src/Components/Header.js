import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

export class Header extends Component {
	render(){
		return(
			<div id="header">
				<form id="search" onSubmit={this.props.onSearchSubmit}>
					<div>
						<label id="searchLabel" htmlFor="search">
							<Link to="/">
								<img alt="" id="penguinLogo" src="https://upload.wikimedia.org/wikipedia/en/thumb/1/1c/Penguin_logo.svg/1200px-Penguin_logo.svg.png"/>
							</Link>
							<p>Search</p> 
						</label>
					</div>
					<div id="searchBar">
						<input onChange={this.props.handleChange} type="text" name="searchBar" id="searchBar" size="40"/>
						<button type="submit">Submit</button>
					</div>
				</form>
			</div>
		)
	}
}