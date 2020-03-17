import React, { Component } from "react"
import { connect } from "react-redux"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-regular-svg-icons'
import { Alert } from "reactstrap"
import PropTypes from "prop-types"
import { register } from "../store/actions/authActions"
import { clearErrors } from "../store/actions/errorActions"

class NewAccount extends Component {
	state = {
		username: "",
		password: "",
		email: "", 
		msg: null
	};

	static propTypes = {
		isAuthenticated: PropTypes.bool,
		error: PropTypes.object.isRequired,
		register: PropTypes.func.isRequired,
		clearErrors: PropTypes.func.isRequired
	}

	// TRAVERSY 11 min 17:30
	componentDidUpdate(prevProps) {
		const { error } = this.props; // state this.prop.error
		if(error !== prevProps.error) {
			// Check for register error
			if(error.id === "REGISTER_FAIL") {
				console.log(error.msg); // son dos
				this.setState({ msg: error.msg.msg })
			} else {
				this.setState({ msg: null })
			}
		}
	}


	// [e.target.name]: e.target.value
	handleInput = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	onSubmit = async (e) => {
		e.preventDefault();
		console.log("user submited: " + this.state.username + " " + this.state.password + " " +  this.state.email)
		const { username, email, password } = this.state;
		
		//Create user Obj
		const newUser = {
			username,
			email, 
			password
		};
		// Attempt to register
		await this.props.register(newUser);
		// this.props.clearErrors(); // ? yo. traversy lo pone en el modal
		console.log(this.props); // this.props.history.push("/cities"); // he perdido la referencia del router porque esta muy nested. buscar otro metodo çççç		
	}

	changeVisibility = (e) => {		
		const password = document.getElementById("password");
		const icon = document.getElementById("visibilityIcon");

		if (password.type === "password") {
			password.type = "text";
			icon.classList.add("visibilityBlue");
		} else {
			password.type = "password";
			icon.classList.remove("visibilityBlue");
		}
	}

	render() {
		console.log("new account:");
		console.log(localStorage.getItem("token"));
		
		return (
			<form onSubmit={this.onSubmit} className="formBox">
				{ this.state.msg ? <Alert color="danger">{ this.state.msg }</Alert> : null }

				<div  className="formSection">
					<input onChange={this.handleInput} type="text" name="username" id="user_name" required/>
					<label htmlFor="user_name"  className="labelBox">
						<span className="labelContent">User Name</span>
					</label>
				</div>

				<div  className="formSection">
					<input onChange={this.handleInput} type="password" name="password" id="password" required/>
					<label htmlFor="password" className="labelBox">
						<span className="labelContent">Password</span>
					</label>
					<FontAwesomeIcon onClick={this.changeVisibility} icon={faEye} className="visibilityIcon" id="visibilityIcon"/>
				</div>

				<div className="formSection">
					<input onChange={this.handleInput} type="email" name="email" id="email" required/>
					<label htmlFor="email" className="labelBox">
						<span className="labelContent">Contact Email</span>
					</label>
				</div>

				<input className="sendButton" type="submit" name="submit" value="Send"></input>
			</form>
		)
	}
}

const mapStateToProps = (state) => {
	console.log(state);
	return {
		isAuthenticated: state.auth.isAuthenticated,
		error: state.error //error reducer
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		register: (newUser) => dispatch(register(newUser)),
		clearErrors: (newUser) => dispatch(clearErrors(newUser))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(NewAccount);