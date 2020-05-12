import React, { Component } from "react"
// import {NavLink} from "react-router-dom"
import Logo from "../UI_Components/Logo"
import Navbar from "../UI_Components/Navbar"
import Searchbar from "../UI_Components/Searchbar"
import Cities from "../display_Components/Cities"
import AddItineraryModal from "../display_Components/AddItineraryModal"
import { connect } from "react-redux"
// import { getCities, filterCities } from "../../store/actions/city"


class ItinerariesP extends Component {

	componentDidMount () {
		this.props.getCities()
	}

	filterWithSearchTerm = (searchTerm) => {
		this.props.filterCities(searchTerm);
	}

	render() {

		return (
			<div id="ItinerariesP" className="container">
				<Logo/>
				<p className="titlesT mainTitle">Where are you going?</p>
				<Searchbar getSearchTerm={this.filterWithSearchTerm} />
				<Cities cities={this.props.cities} />	
				<AddItineraryModal /> 
				<Navbar/>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	// console.log(state);
	return {
		cities: state.cities.cities //state. el reducer que quiero. la var que quiero
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		// now i can call this function with props.addCity
		getCities: (cities) => dispatch(getCities(cities)),
		filterCities: (searchTerm) => dispatch(filterCities(searchTerm))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ItinerariesP);