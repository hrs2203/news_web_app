import React from 'react'


export class NavigationComp extends React.Component {

  render() {

    if (!this.props.isLoggedIn) {
      return (
        <nav>
          <ul className="nav nav-pills justify-content-end">
            <li className="nav-item">
              <button onClick={() => {this.props.pageChanger(0)}}
                className="btn btn-dark m-2">HomePage</button>
            </li>
            <li className="nav-item">
              <button onClick={() => {this.props.pageChanger(1)}}
                className="btn btn-dark m-2">Search</button>
            </li>
            <li className="nav-item">
              <button onClick={() => {this.props.pageChanger(4)}}
                className="btn btn-dark m-2">Login</button>
            </li>
            <li className="nav-item">
              <button onClick={() => {this.props.pageChanger(5)}}
                className="btn btn-dark m-2">Sign Up</button>
            </li>
          </ul>
        </nav>
      )
    }
    return (
      <nav>
        <ul className="nav nav-pills justify-content-end">
          <li className="nav-item">
            <button onClick={() => {this.props.pageChanger(0)}}
              className="btn btn-dark m-2">HomePage</button>
          </li>
          <li className="nav-item">
            <button onClick={() => {this.props.pageChanger(1)}}
              className="btn btn-dark m-2">Search</button>
          </li>
          <li className="nav-item">
            <button onClick={() => {this.props.pageChanger(3)}}
              className="btn btn-dark m-2">Explore</button>
          </li>
          <li className="nav-item">
            <button onClick={() => {this.props.pageChanger(2)}}
              className="btn btn-dark m-2">{
              this.props.userName
              }</button>
          </li>
          <li className="nav-item">
            <button onClick={() => {this.props.logoutOption()}}
              className="btn btn-dark m-2">Logout</button>
          </li>
        </ul>
      </nav>
    )
  }
}