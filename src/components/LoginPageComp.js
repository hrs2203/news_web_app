import React from 'react'

export class LoginPageComp extends React.Component {

	constructor() {
		super();
		this.state = {
			username: "default",
			email: "",
			password: ""
		}
		this.update_email = this.update_email.bind(this);
		this.update_password = this.update_password.bind(this);
		this.login_btn = this.login_btn.bind(this);
	}

	update_email(event) {
		this.setState({
			"email": event.target.value
		})
	}
	update_password(event) {
		this.setState({
			"password": event.target.value
		})
	}

	/**
	 * On login/signup, if emails dont match,
	 * delete pref as if new user is logged it.
	 */
	login_btn() {
		var newUserPref = this.props.defaultUser.userPref;
		var newUserHistory = this.props.defaultUser.userSearchHistory;
		// if (!(this.state.email === this.props.defaultUser.email)) {
		// 	Object.keys(newUserPref).forEach( k => newUserPref[k] = 0 )
		// 	newUserHistory = [];
		// }
		this.props.updateGlobal({
			"pageIndex": 2,
			"isLoggedIn": true,
			"userDetail": {
				"userName": this.state.username,
				"email": this.state.email,
				"userId": this.state.password,
				"userPref": newUserPref,
				"userSearchHistory": newUserHistory
			},
			"messageBody": {
				"messageType": 0,
				"messageBody": `Welcome ${this.state.username}`,
				"showMessage": true
			}
		})
	}

	render() {
		return (
			<div className="card p-2" >
				<form className="m-4">
					<div className="form-group m-1">
						<label>Email address</label>
						<input
							type="email"
							className="form-control"
							id="exampleInputEmail1"
							value={this.state.email}
							placeholder="Enter email"
							onChange={this.update_email}
						/>
					</div>
					<br />
					<div className="form-group m-1">
						<label>Password</label>
						<input
							type="password"
							className="form-control"
							id="exampleInputPassword1"
							value={this.state.password}
							placeholder="Password"
							onChange={this.update_password}
						/>
						<small id="passwordHelp" className="form-text text-muted">
							never share your password with anyone else.
						</small>
					</div>
					<br></br>
					<button
						type="submit"
						className="btn btn-outline-success"
						onClick={this.login_btn}
					>
						Submit
					</button>
				</form>
			</div>
		)
	}
}

export class SignupPageComp extends React.Component {

	constructor() {
		super();
		this.state = {
			username: "",
			email: "",
			password: ""
		}
		this.update_username = this.update_username.bind(this);
		this.update_email = this.update_email.bind(this);
		this.update_password = this.update_password.bind(this);
		this.signup_btn = this.signup_btn.bind(this);
	}

	update_username(event) {
		this.setState({
			"username": event.target.value
		})
	}
	update_email(event) {
		this.setState({
			"email": event.target.value
		})
	}
	update_password(event) {
		this.setState({
			"password": event.target.value
		})
	}

	signup_btn() {
		this.props.updateGlobal({
			"pageIndex": 2,
			"isLoggedIn": true,
			"userDetail": {
				"userName": this.state.username,
				"email": this.state.email,
				"userId": this.state.password,
				"userPref": this.props.defaultUser.userPref,
				"userSearchHistory": this.props.defaultUser.userSearchHistory
			},
			"messageBody": {
				"messageType": 0,
				"messageBody": `Welcome ${this.state.username}`,
				"showMessage": true
			}
		})
	}

	render() {
		return (
			<div className="card p-2" >
				<form className="m-4">
					<div className="form-group m-1">
						<label>User Name</label>
						<input type="UserName"
							className="form-control"
							id="exampleInputUserName1"
							value={this.state.username}
							placeholder="Enter User Name"
							onChange={this.update_username}
						/>
					</div>
					<br />
					<div className="form-group m-1">
						<label>Email address</label>
						<input
							type="email"
							className="form-control"
							id="exampleInputEmail1"
							value={this.state.email}
							placeholder="Enter email"
							onChange={this.update_email}
						/>
					</div>
					<br />
					<div className="form-group m-1">
						<label>Password</label>
						<input
							type="password"
							className="form-control"
							id="exampleInputPassword1"
							value={this.state.password}
							placeholder="Password"
							onChange={this.update_password}
						/>
						<small id="passwordHelp" className="form-text text-muted">
							never share your password with anyone else.
						</small>
					</div>
					<br></br>
					<button
						type="submit"
						className="btn btn-outline-success"
						onClick={this.signup_btn}
					>
						Submit
					</button>
				</form>
			</div>
		)
	}
}