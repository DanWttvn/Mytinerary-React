import React, { Component } from "react"
import { connect } from "react-redux"
import { createUser } from "../store/actions/userActions"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-regular-svg-icons'

class NewAccount extends Component {
	state = {
		username: "",
		password: "",
		email: ""
	}

	// [e.target.name]: e.target.value
	handleInput = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	onSubmit = (e) => {
		e.preventDefault();
		console.log("user submited: " + this.state.username + " " + this.state.password + " " +  this.state.email)
		this.props.createUser(this.state);
		// this.props.history.push("/some/Path");
		// console.log(this.props);
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
		return (
			<form onSubmit={this.onSubmit} className="formBox">
				{/*  method="post"  ??? */}

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
					<input onChange={this.handleInput} type="email" name="email" id="email" required />
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
		user: state.users.user
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		createUser: (newUser) => dispatch(createUser(newUser))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(NewAccount);