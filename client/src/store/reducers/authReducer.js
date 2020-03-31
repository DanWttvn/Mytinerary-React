import { USER_LOADED, USER_LOADING, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, REGISTER_SUCCESS, REGISTER_FAIL } from "../actions/types"

const initState = {
	token: localStorage.getItem("token"), 
	isAuthenticated: null,
	isLoading: false,
	user: null
}

const authReducer = (state = initState, action) => {
	switch (action.type) {
		// -- TRAVERSY
		case USER_LOADING:
			return {
				...state, 
				isLoading: true
			};

		case "USER_SM_LOADING":
			console.log("action.payload en user_sm_oading:", action.payload);
			
			localStorage.setItem("token", action.payload);
			return {
				...state, 
				isLoading: true,
				token: action.payload
			};

		case USER_LOADED: //runs in every request
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				user: action.payload
			}

		case LOGIN_SUCCESS:
		case REGISTER_SUCCESS: //lo mmismo en los dos casos
			localStorage.setItem("token", action.payload.token);
			return {
				...state,
				...action.payload, //incluye user y token
				isAuthenticated: true,
				isLoading: false,
			}
		
		case LOGIN_FAIL:
		case REGISTER_FAIL:
			localStorage.removeItem("token");
			return {
				...state,
				token: null,
				user: null,
				isAuthenticated: false,
				isLoading: false
			}
		
		case AUTH_ERROR:
			localStorage.removeItem("token");
			return {
				...state,
				token: null,
				user: null,
				isAuthenticated: false,
				isLoading: false
			}

		case LOGOUT_SUCCESS:
			localStorage.removeItem("token");
			return {
				...state,
				token: null,
				user: null,
				isAuthenticated: false,
				isLoading: false
			}

		case "UPDATE_ITINERARIES": 
			// console.log("modifyinf favs", action.payload);
			return {
				...state,
				user: action.payload
			}
			

		default:
			return state;
	}
	// return state
}

export default authReducer;
