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
		console.log("login btn");

		const requestOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: this.state.email,
				password: this.state.password
			})
		};

		fetch("http://127.0.0.1:8000/api/user/auth/login", requestOptions)
			.then(async (resp) => {
				const data = await resp.json();
				if (data.data.status === true) {
					this.props.updateGlobal({
						"messageBody": {
							"messageType": 0,
							"messageBody": `${data.data.message}, Getting User Details`,
							"showMessage": true
						}
					})

					fetch(
						`http://127.0.0.1:8000/api/user?userEmail=${this.state.email}`
					).then(resp => resp.json())
						.then(data => {

							var userHistory = data.data.user_detail.user_visit_history;
							userHistory = userHistory.map(
								item => Object({
									title: item["news_title"],
									searchClass: item["news_category"],
									searchTime: item["news_time"],
									searchUrl: item["news_link"],
								})
							)
							var userPreference = {
								"ent": 0,
								"gov": 0,
								"othe": 0,
								"tech": 0,
							}
							userHistory.forEach(element => {
								userPreference[element["searchClass"]] = userPreference[element["searchClass"]] + 1
							});

							console.log(userPreference);

							this.props.updateGlobal({
								"pageIndex": 2,
								"isLoggedIn": true,
								"userDetail": {
									"userName": data.data.user.user_name,
									"email": data.data.user.email,
									"userId": data.data.user._id,
									"userPref": userPreference,
									"userSearchHistory": userHistory
								},
								"messageBody": {
									"messageType": 0,
									"messageBody": `Welcome ${data.data.user.user_name}`,
									"showMessage": true
								}
							})
						})
						.catch(err => { console.log(err) })

				} else {
					this.props.updateGlobal({
						"messageBody": {
							"messageType": 1,
							"messageBody": data.data.message,
							"showMessage": true
						}
					})
				}
			})
			.catch(err => console.log(err))

	}

	render() {
		return (
			<div className="card p-2" >
				<div className="m-4">
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
						type=""
						className="btn btn-outline-success"
						onClick={this.login_btn}
					>
						Login
					</button>
				</div>
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

		console.log("Signup btn");

		const requestOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username: this.state.username,
				email: this.state.email,
				password: this.state.password
			})
		};
		fetch("http://127.0.0.1:8000/api/user/auth/registration",
			requestOptions).then(resp => resp.json())
			.then(respData => {

				var userHistory = respData.data.user_detail.user_visit_history;
				userHistory = userHistory.map(
					item => Object({
						title: item["news_title"],
						searchClass: item["news_category"],
						searchTime: item["news_time"],
						searchUrl: item["news_link"],
					})
				)
				var userPreference = {
					"ent": 0,
					"gov": 0,
					"othe": 0,
					"tech": 0,
				}
				userHistory.forEach(element => {
					userPreference[element["searchClass"]] = userPreference[element["searchClass"]] + 1
				});

				console.log(userPreference);

				this.props.updateGlobal({
					"pageIndex": 2,
					"isLoggedIn": true,
					"userDetail": {
						"userName": respData.data.user.user_name,
						"email": respData.data.user.email,
						"userId": respData.data.user._id,
						"userPref": userPreference,
						"userSearchHistory": userHistory
					},
					"messageBody": {
						"messageType": 0,
						"messageBody": `Welcome ${respData.data.userName}`,
						"showMessage": true
					}
				})
			})
			.catch(err => console.log(err))


	}

	render() {
		return (
			<div className="card p-2" >
				<div className="m-4">
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
						type=""
						className="btn btn-outline-success"
						onClick={this.signup_btn}
					>
						Submit
					</button>
				</div>
			</div>
		)
	}
}