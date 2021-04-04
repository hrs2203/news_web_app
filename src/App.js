import React from 'react';

// Components
import { NavigationComp } from './components/NavigationComp';
import { HomePageComp } from './components/HomePageComp.js';
import { SearchPageComp } from './components/SearchPageComp.js';
import { UserDetailComp } from './components/UserDetailComp.js';
import { ExplorePageComp } from './components/ExplorePageComp.js';
import { LoginPageComp, SignupPageComp } from './components/LoginPageComp.js';
import { FooterComp } from './components/FooterComp.js';
import { NotificationComponent } from './components/NotificationComponent.js'

/**
 * Single Page Application
 * Page List:
 * - if loggedIn
 *    1. HomePage
 *    2. Search Page
 *    3. Explore Page
 *    4. User Detail
 *    5. Logout
 * - else:
 *    1. HomePage
 *    2. Search Page
 *    3. LogIn
 */
class SinglePageApp extends React.Component {

  constructor() {
    super();

    this.state = {
      "pageIndex": 0,
      "isLoggedIn": false,
      "userDetail": {
        "userName": "Raju",
        "email": "user@email.com",
        "userId": "ia321987913sda1234",
        "userPref": {
          "ent": 0,
          "gov": 0,
          "othe": 0,
          "tech": 0,
        },
        "userSearchHistory": []
      },
      "messageBody": {
        "messageType": 0,
        "messageBody": "Welcome Message",
        "showMessage": false
      }
    }

    this.changePage = this.changePage.bind(this);
    this.updateGlobal = this.updateGlobal.bind(this);
    this.logoutOption = this.logoutOption.bind(this);
    this.changeMessageBody = this.changeMessageBody.bind(this);
    this.updateSearchPref = this.updateSearchPref.bind(this);

  }

  /**
   * Show message on top
   * messageType : 0 -> success, 1 -> danger
   * messageBody : String of what to display
   * showMessage : wether to show or not
   */
  changeMessageBody(msgBody) {
    this.setState({
      "messageBody": msgBody
    })
  }

  /**
   * 0 : Homepage
   * 1 : Search
   * 2 : UserDetail
   * 3 : Explore
   * 4 : login page
   * 5 : signup page
   */
  changePage(indx) {
    this.setState({
      "pageIndex": indx
    })
  }

  updateGlobal(vals) {
    this.setState(vals);
  }

  logoutOption() {
    this.setState({
      "isLoggedIn": false,
      "pageIndex": 0,
      "messageBody": {
        "messageType": 1,
        "messageBody": "Logout Message",
        "showMessage": true
      }
    })
  }

  updateSearchPref(newSearchData) {
    var searchData = this.state.userDetail.userSearchHistory;
    searchData.push(newSearchData);
    var tempUserPref = this.state.userDetail.userPref;
    tempUserPref[newSearchData["searchClass"]] += 1;

    this.setState({
      "userDetail": {
        "userName": this.state.userDetail.userName,
        "email": this.state.userDetail.email,
        "userId": this.state.userDetail.userId,
        "userPref": tempUserPref,
        "userSearchHistory": searchData
      }
    })
  }

  componentDidMount() {
    var localData = JSON.parse(
      localStorage.getItem("globalContent")
    );
    if (localData === null) {
      console.log("No Data Present");
    } else {
      this.setState(localData);
    }
  }

  componentDidUpdate() {
    localStorage.setItem(
      "globalContent",
      JSON.stringify(this.state)
    );
  }

  render() {

    var childComponent = <HomePageComp />
    if (this.state.pageIndex === 0) {
      childComponent = <HomePageComp />
    }
    else if (this.state.pageIndex === 1) {
      childComponent = <SearchPageComp
        updateUserPref={this.updateSearchPref}
      />
    }
    else if (this.state.pageIndex === 2) {
      childComponent = <UserDetailComp
        userDetail={this.state.userDetail}
      />
    }
    else if (this.state.pageIndex === 3) {
      childComponent = <ExplorePageComp
        userDetail={this.state.userDetail}
      />
    }
    else if (this.state.pageIndex === 4) {
      childComponent = <LoginPageComp
        defaultUser={this.state.userDetail}
        updateGlobal={this.updateGlobal}
      />
    }
    else if (this.state.pageIndex === 5) {
      childComponent = <SignupPageComp
        defaultUser={this.state.userDetail}
        updateGlobal={this.updateGlobal}
      />
    }

    return (
      <div className="container p-2">
        <NavigationComp
          isLoggedIn={this.state.isLoggedIn}
          userName={this.state.userDetail.userName}
          pageChanger={this.changePage}
          logoutOption={this.logoutOption}
        />
        <hr></hr>
        <NotificationComponent
          changeMessageBody={this.changeMessageBody}
          NotificationDetail={this.state.messageBody}
        />
        { childComponent}
        <hr></hr>
        <FooterComp />
      </div>
    )
  }
}

export class App extends React.Component {
  render() {
    return <SinglePageApp />
  }
}
