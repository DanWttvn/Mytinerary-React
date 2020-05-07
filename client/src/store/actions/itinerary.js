import axios from "axios";
import { GET_ITINERARIES, ITINERARY_ERROR, UPDATE_LIKES, UPDATE_ITINERARY, DELETE_ITINERARY, ADD_ITINERARY, GET_ITINERARY, ADD_COMMENT, REMOVE_COMMENT, CLEAR_ITINERARIES, CLEAR_ITINERARY } from "./types"
import { setAlert } from "./alert"
// import {tokenConfig} from "./authActions"


// Get all itineraries
export const getItineraries = () => dispatch => {
	dispatch({ type: CLEAR_ITINERARIES })
	axios.get("/api/itineraries")
		.then(res => {
			dispatch ({
				type: GET_ITINERARIES,
				payload: res.data
			})
		})
		.catch(err => {
			dispatch({
				type: ITINERARY_ERROR,
				payload: { msg: err.response.statusText, status: err.response.status }
			})
		})
}


// Get itineraries by city
export const getItinerariesByCity = city => dispatch => {
	dispatch({ type: CLEAR_ITINERARIES })
	axios.get(`/api/itineraries/city/${city}`)
		.then(res => {
			dispatch ({
				type: GET_ITINERARIES,
				payload: res.data
			})
		})
		.catch(err => {
			dispatch({
				type: ITINERARY_ERROR,
				payload: { msg: err.response.statusText, status: err.response.status }
			})
		})
}


// Get city by id
export const getItinerary = id => dispatch => {
	dispatch({ type: CLEAR_ITINERARY })
	axios.get(`/api/itineraries/${id}`) 
		.then(res => {
			dispatch ({
				type: GET_ITINERARY, 
				payload: res.data
			})
		})
		.catch(err => {
			dispatch({
				type: ITINERARY_ERROR,
				payload: { msg: err.response.statusText, status: err.response.status }
			})
		})
}


// Get favorites
export const getFavorites = () => dispatch => {
	dispatch({ type: CLEAR_ITINERARIES })
	axios.get(`/api/users/favorites/f`) 
		.then(res => {
			dispatch ({
				type: GET_ITINERARIES, 
				payload: res.data
			})
		})
		.catch(err => {
			dispatch({
				type: ITINERARY_ERROR,
				payload: { msg: err.response.statusText, status: err.response.status }
			})
		})
}


// Add itinerary
export const addItinerary = formData => dispatch => {
	//! por ser foto ?
	const config = {
		headers: {
			"Content-type" : "multipart/form-data"
		}
	}

	axios.post("/api/itineraries", formData, config)
		.then(res => {
			dispatch({
				type: ADD_ITINERARY,
				payload: res.data
			});
			dispatch(setAlert("Itinerary Created", "success"));
		})
		.catch(err => {
			dispatch({
				type: ITINERARY_ERROR,
				payload: { msg: err.response.statusText, status: err.response.status }
			})
		})
}


// Delete itinerary
export const deleteItinerary = id => dispatch => { 
	axios.delete(`/api/itineraries/${id}`)
		.then(res => {
			dispatch({
				type: DELETE_ITINERARY,
				payload: id
			});
			dispatch(setAlert("Itinerary Removed", "success"));
			// ! history push si estou dentro del itinerary?
		})
		.catch(err => {
			dispatch({
				type: ITINERARY_ERROR,
				payload: { msg: err.response.statusText, status: err.response.status }
			})
		})
}


// Update likes
export const updateLikes = id => dispatch => {
	axios.put(`/api/itineraries/favorites/${id}`)
		dispatch({
			type: UPDATE_LIKES,
			payload: { id, likes: res.data }
		})
		.catch(err => {
			dispatch({
				type: ITINERARY_ERROR,
				payload: { msg: err.response.statusText, status: err.response.status }
			})
		})
}


// Add comment
export const addComment = (itin_id, formData) => dispatch => {
	const config = {
		headers: {
			"Content-type": "application/json"
		}
	}
	
	axios.post(`api/itineraries/comment/${itin_id}`, formData, config)
		.then(res => {
			dispatch({
				type: ADD_COMMENT,
				payload: res.data // all comments array
			})
		})
		.catch(err => {
			dispatch({
				type: ITINERARY_ERROR,
				payload: { msg: err.response.statusText, status: err.response.status }
			})
		})
}


// Delete comment
export const deleteComment = (itin_id, comment_id) => dispatch => {
	axios.delete(`api/itineraries/comment/${itin_id}/${comment_id}`)
		.then(res => {
			dispatch({
				type: REMOVE_COMMENT,
				payload: comment_id
			});
			dispatch(setAlert("Comment Removed", "success"));
		})
		.catch(err => {
			dispatch({
				type: ITINERARY_ERROR,
				payload: { msg: err.response.statusText, status: err.response.status }
			})
		})
}


// Add Activity
export const addActivity = (itin_id, formData) => dispatch => {
	const config = {
		headers: {
			"Content-type": "application/json"
		}
	}

	axios.post(`/api/itineraries/activity/${itin_id}`, formData, config)
		then(res => {
			dispatch({
				type: UPDATE_ITINERARY,
				payload: res.data
			});
			dispatch(setAlert("Activity added", "success"));
			// history.push(`/itineraries/${itin_id}`) no porque va a ser un modal
		})
		.catch(err => {
			const errors = err.response.data.errors; 
			if(errors) {
				errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
			}
			dispatch({
				type: ITINERARY_ERROR,
				payload: { msg: err.response.statusText, status: err.response.status }
			});
		})

}


// Delete activity
export const deleteActivity = (itin_id, activity_id) => dispatch => {
	axios.delete(`/api/itineraries/activity/${itin_id}/${activity_id}`)
		.then(res => {
			dispatch({
				type: UPDATE_ITINERARY,
				payload: { id, likes: res.data } //itinerary updated
			})
			dispatch(setAlert("Activity Removed", "success"))
		})
		.catch(err => {
			dispatch({
				type: ITINERARY_ERROR,
				payload: { msg: err.response.statusText, status: err.response.status }
			})
		})
}