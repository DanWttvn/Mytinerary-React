// getData = () => {
// 	this.setState({...this.state, isFetching: true})
// 	fetch("/cities/all")
// 		.then(response => response.json())
// 		.then(data => {
// 			console.log(data);
// 			this.setState({
// 				cities: data,
// 				filteredCities: data,
// 				isFetching: false
// 			})
// 		})
// }

import axios from "axios";

// con axios dispatch
export const getCities = () => dispatch => {
	axios.get("/cities/all")
		.then(res => {
			console.log(res.data);
			dispatch ({
				type: "GET_CITIES",
				payload: res.data
		});
	})
}


export const addCity = (id) => {
	//with thunk I return function, not obj
	return (dispatch, getState) => {
		// FALTA make async call to database
		dispatch({
			type: "ADD_CITY",
			id: id
		})
	}
};

export const filterCities = (searchTerm) => {
	return (dispatch, getState) => {
		// FALTA make async call to database
		dispatch({
			type: "FILTER_CITIES",
			payload: searchTerm
		})
	}
};

