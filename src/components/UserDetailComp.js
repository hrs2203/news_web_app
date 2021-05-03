import React from 'react'
import img_avatar3 from '../static/image/user_avatar.png';

class UserCard extends React.Component {
  render() {
    return (
      <div className="card p-3">
        <div className="row">
          <div className="col-4">
            <img className="rounded-circle avatarCss"
              src={img_avatar3} alt="UserImg"
            />
          </div>
          <div className="col-8">
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <h5 className="">
                  User Detail
                </h5>
              </li>
              <li className="list-group-item">
                <div className="row">
                  <div className='col'>UserName</div>
                  <div className='col'>
                    {this.props.userName}
                  </div>
                </div>
              </li>
              <li
                className="list-group-item">
                <div className="row">
                  <div className='col'>Email</div>
                  <div className='col'>
                    {this.props.email}
                  </div>
                </div>
              </li>
              <li
                className="list-group-item">
                <div className="row">
                  <div className='col'>UserId</div>
                  <div className='col'>
                    {this.props.userId}
                  </div>
                </div>
              </li>
              <li className="mt-3 list-group-item">
                <h5 className="">
                  User Preferences
                </h5>
              </li>
              <li className="list-group-item">
                <div className="row">
                  <div className='col'>
                    entertainment : {
                      this.props.userPref.ent
                    }</div>
                  <div className='col'>
                    government : {
                      this.props.userPref.gov
                    }</div>
                </div>
              </li>
              <li className="list-group-item">
                <div className="row">
                  <div className='col'>
                    others : {
                      this.props.userPref.othe
                    }</div>
                  <div className='col'>
                    technology : {
                      this.props.userPref.tech
                    }</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

class HistoryListElement extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-6">
          {this.props.search.title}
        </div>
        <div className="col-2">
          {this.props.search.searchClass}
        </div>
        <div className="col-2">
          {this.props.search.searchTime}
        </div>
        <div className="col-2">
          <a href={this.props.search.searchUrl}>Read Again</a>
        </div>
      </div>
    )
  }
}

class UserSearchHistory extends React.Component {

  constructor() {
    super();
    this.state = {};
  }

  render() {
    var historyList = [];
    historyList.push(
      <li className="list-group-item">
        <div className="row">
          <div className="col-6">
            <b>Search Title</b>
          </div>
          <div className="col-2">
            <b>Search Category</b>
          </div>
          <div className="col-2">
            <b>Search Time</b>
          </div>
          <div className="col-2">
            <b>Search Link</b>
          </div>
        </div>
      </li>
    )
    console.log(this.props);
    for (let ind = this.props.userHistory.length - 1; ind >= 0; ind--) {
      historyList.push(
        <li className="list-group-item">
          <HistoryListElement
            search={this.props.userHistory[ind]}
          />
        </li>
      )
    }

    return (
      <div className="card mt-3 p-3">
        <h5 className="text-center">
          {this.props.user.userName}'s Search History
        </h5>
        <ul className="mt-3 list-group list-group-flush">
          {historyList}
        </ul>
        <button
          onClick={() => {
            const requestOptions = {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                user_email: this.props.user.email,
              })
            };
            fetch("http://127.0.0.1:8000/api/user/clean_history", requestOptions)
              .then(data => data.json())
              .then(data => {
                console.log(data);
                this.props.globalUpdate({
                  "userDetail": {
                    "userName": this.props.user.userName,
                    "email": this.props.user.email,
                    "userId": this.props.user.userId,
                    "userPref": { "ent": 0, "gov": 0, "othe": 0, "tech": 0 },
                    "userSearchHistory": []
                  },
                  "messageBody": {
                    "messageType": 0,
                    "messageBody": `History Cleaned`,
                    "showMessage": true
                  }
                })
              })
              .catch(err => {
                this.props.globalUpdate({
                  "messageBody": {
                    "messageType": 1,
                    "messageBody": `Error while cleaning history, please try again later.`,
                    "showMessage": true
                  }
                })
              })
          }} className="btn m-2">
          Clean History
        </button>
      </div>
    )
  }
}

export class UserDetailComp extends React.Component {
  render() {
    return (
      <div>
        <UserCard
          userName={this.props.userDetail.userName}
          email={this.props.userDetail.email}
          userId={this.props.userDetail.userId}
          userPref={this.props.userDetail.userPref}
        />
        <UserSearchHistory
          user={this.props.userDetail}
          userHistory={this.props.userDetail.userSearchHistory}
          globalUpdate={this.props.globalUpdate}
        />
      </div>
    )
  }
}