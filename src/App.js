import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import LandingPage from './containers/LandingPage';
import AccountPage from './containers/AccountPage';
import './scss/App.scss'

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {user: '', transfers: ''}
  }

  getCurrentUser = () => {
    let token = localStorage.getItem("token")
    if (token !== null ) {
      fetch('http://localhost:3000/api/v1/current_user', {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        Action: "application/json",
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(res => this.setState({user: res.user, transfers: res.transfers}))
    } else {
      this.props.history.push("/");
    }
  }

   handleLogin = (e, address) => {
    e.preventDefault();
    let loginInfo = {
      user: {
        address: address
      }
    }
    fetch('http://localhost:3000/api/v1/login', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(loginInfo)
    })
    .then(res => {
      if (res.ok) {
      return res.json()
      } else {
        throw new Error("Log in unsuccesfull...")
      }
    })
    .then(res => {
      localStorage.setItem("token", res.jwt)
      this.setState({user: res.user})
      console.log(this.state.user)
    })
    .then(() => {
      this.props.history.push("/account")
    })
    .catch(error => console.log(error))
  }

  componentDidMount() {
    this.getCurrentUser();
  }


  render() {
    return(
      <>
        <Switch>
          <Route exact path="/account" render={(props) => <AccountPage user={this.state.user} transfers={this.state.transfers} getCurrentUser={this.getCurrentUser} {...props} />}  />
          <Route exact path="/" render={ (props) => <LandingPage handleLogin={this.handleLogin} {...props} />} />
        </Switch>
      </>
      )
  }
}

export default withRouter(App);
