import React, { Component } from "react"
import { connect } from "react-redux"
import {
	Modal, 
	// Button,
	// ModalHeader,
	// ModalBody,
	// Form,
	// FormGroup,
	// Label,
	// Input
} from "reactstrap";
import { addCity } from "../store/actions/cityActions"



class AddItineraryModal extends Component {
	state = {
		isOpen: false,
		newCity: "",
		newCityCountry: "",
	}

	toggle = () => {
		this.setState({
			isOpen: !this.state.isOpen
		})
	}

	handleAddCityChange = (e) => {
		this.setState({
			[e.target.id]: e.target.value //id es newCity y newCityCountry, perfect para varios campos
		})
	}

	onSubmit = (e) => {
		e.preventDefault();
		// this.props.getNewCity(this.state) NO

		const newItin = {
			// name: this.state.name title? copiar datos
		}
		// this.props.addNewItinerary(newItin)
	}
	
	
	render() {
		const { isAuthenticated } = this.props.auth

		return (
			<div id="newItineraryModal">
				<div className="addNewBox">
					<button className="addNewBtn" onClick={this.toggle}>+</button>
					<span>Add new itinerary</span>
				</div>
	
				<Modal isOpen={this.state.isOpen} toggle={this.toggle}>
					{ isAuthenticated ? (
						<form id="addCityForm" onSubmit={this.onSubmit}>
							<span className="Add a new city"></span>
							<div className="input">
								<label htmlFor="newCity"></label>
								<input type="text" id="newCity" onChange={this.handleAddCityChange} />
								<input type="text" id="newCityCountry" onChange={this.handleAddCityChange} />
								{/* <button>Add City</button> */}
								<input type="submit" id="submitItinBtn" />
							</div>
						</form>
					) : (
						<div>
							<p>Sign in to add new itineraries</p>
							<button><a href="/profile"></a></button>
						</div>
					)}
				</Modal>
			
			</div>
		)	
	}
}

const mapStateToProps = (state) => {
	// console.log(state);
	return {
		auth: state.auth //state. el reducer que quiero. la var que quiero
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		//get the action function imported
		addCity: (newCity) => dispatch(addCity(newCity))
		// now i can call this function with props.addCity
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(AddItineraryModal);