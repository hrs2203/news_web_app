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

// class UserPrefCard extends React.Component {
//   render() {
//     return (
//       <div className="card smallWidth mt-3 p-3">
//         <h5 className="text-center">
//           {this.props.userName}'s Preferences
//         </h5>
//         <ul className="list-group list-group-flush text-center">
//           <li className="list-group-item">
//             <div className="row">
//               <div className='col'>entertainment</div>
//               <div className='col'>government</div>
//               <div className='col'>others</div>
//               <div className='col'>technology</div>
//             </div>
//           </li>
//           <li className="list-group-item">
//             <div className="row">
//               <div className="row">
//                 <div className='col'>{
//                   this.props.userPref.ent
//                 }</div>
//                 <div className='col'>{
//                   this.props.userPref.gov
//                 }</div>
//                 <div className='col'>{
//                   this.props.userPref.oth
//                 }</div>
//                 <div className='col'>{
//                   this.props.userPref.tech
//                 }</div>
//               </div>
//             </div>
//           </li>
//         </ul>
//       </div>
//     )
//   }
// }

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
    this.state = {
      "historyDepth": 5
    }
    this.showMore = this.showMore.bind(this)
  }

  showMore() {
    this.setState({
      historyDepth: (this.state.historyDepth + 10) % 20
    })
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
    for (let ind = 0; ind < this.props.userHistory.length; ind++) {
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
          {this.props.userName}'s Search History
        </h5>
        <ul className="mt-3 list-group list-group-flush">
          {historyList}
        </ul>
        {/* <button
          onClick={
            () => { this.showMore(); }
          } className="btn m-2">
          Show {this.state.historyDepth === 5 ? "More" : "Less"}
        </button> */}
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
        {/* <UserPrefCard
          userName={this.props.userDetail.userName}
          userPref={this.props.userDetail.userPref}
        /> */}
        <UserSearchHistory
          userName={this.props.userDetail.userName}
          userHistory={this.props.userDetail.userSearchHistory}
        />
      </div>
    )
  }
}