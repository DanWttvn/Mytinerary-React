import React, { Component, Fragment } from 'react'
import { connect } from "react-redux"
import { addComment } from "../../store/actions/itinerary"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'


class ActivitiesP extends Component {
	state = {
		content: ""
	}

	submitComment = (e) => {
		e.preventDefault();
		const content = this.state.content;
		const itin_id = this.props.itin_id; //from parent
		this.props.addComment(itin_id, content);
		// clear input form
		document.getElementById("new-comment-form").reset();
	}

	handleInput = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	// auto-expand comment area
	autosize = (e) => {
		const textArea = document.getElementById("add-comment-input");
		setTimeout(function(){
			textArea.style.cssText = 'height:2.75em'; // con esto se vuelve a hacer mas pequeño
			textArea.style.cssText = 'height:' + textArea.scrollHeight + 'px';
		}, 0);
	}

	render () {
		return (
			<Fragment>
					<p className="title-section">Comments</p>

					{ this.props.isAuthenticated ? (
						<form onSubmit={this.submitComment} id="new-comment-form" className="add-comment-box">
							<textarea className="add-comment-input" id="add-comment-input" type="text" onChange={this.handleInput} onKeyDown={this.autosize} name="content" placeholder="Add comment..." required />
							{/* <input className="send-comment-btn" type="submit" name="submit" value=">" /> */}
							<button className="send-comment-btn" type="submit" name="submit" ><FontAwesomeIcon icon={faChevronRight}/></button>
						</form>
					):(
						<div className="mb-small">
							<p>Sign in to add comments</p>
							<a href="/sign_in"><button className="btn-inside">Sign in</button></a>
						</div>	
					)}
			</Fragment>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		itineraries: state.itineraries,
		isAuthenticated: state.auth.isAuthenticated
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		addComment: (itin_id, content) => dispatch(addComment(itin_id, content))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivitiesP);