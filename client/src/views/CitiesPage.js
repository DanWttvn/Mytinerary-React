import React, { Component } from "react"
// import {NavLink} from "react-router-dom"
import Logo from "../components/Logo"
import Navbar from "../components/Navbar"
import Searchbar from "../components/Searchbar"
import Cities from "../components/Cities"

import { connect } from "react-redux"
import { addCity, getCities, filterCities } from "../store/actions/cityActions"


class CitiesPage extends Component {
	state = {
		newCity: "",
		newCityCountry: ""
	}

	componentDidMount () {
		this.props.getCities()
		// console.log(this.state.cities)
	}

	// filterCities = (searchTerm) => {
	// 	let filteredCities = this.state.cities;
	// 	filteredCities = filteredCities.filter((city) => city.name.toLowerCase().startsWith(searchTerm));
	// 	this.setState({
	// 		filteredCities
	// 	})

	// 	console.log(this.state.filteredCities);
	// }

	handleAddCityChange = (e) => {
		this.setState({
			[e.target.id]: e.target.value //id es newCity y newCityCountry, perfect para varios campos
		})
	}

	handleAddCitySubmit = (e) => {
		e.preventDefault();
		this.props.addCity(this.state)
	}

	render() {
		console.log(this.props.cities);

		return (
			<div id="CitiesPage" className="container">
				<Logo/>
				<h3>Where are you going?</h3>
				<form onSubmit={this.handleAddCitySubmit}>
					<span className="Add a new city"></span>
					<div className="input">
						<label htmlFor="newCity"></label>
						<input type="text" id="newCity" onChange={this.handleAddCityChange} />
						<input type="text" id="newCityCountry" onChange={this.handleAddCityChange} />
						<button>Add City</button>
					</div>
				</form>
				<Searchbar searchCity={this.props.filterCities} />
				{/* <Searchbar searchCity={this.props.cities} /> */}
				<Cities cities={this.props.cities} />	
				<Navbar/>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	console.log(state);
	return {
		cities: state.cities.cities //state. el reducer que quiero. la var que quiero
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		//get the action function imported
		addCity: (newCity) => dispatch(addCity(newCity)),
		// now i can call this function with props.addCity
		getCities: (cities) => dispatch(getCities(cities)),

		filterCities: (cities) => dispatch(filterCities(cities))	//çççç

	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CitiesPage);