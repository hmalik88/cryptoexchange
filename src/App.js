import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import LandingPage from './containers/LandingPage';
import AccountPage from './containers/AccountPage';
import './scss/App.scss'

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {user: ''}
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
    .then(res => this.setState({user: res.user}))
    } else {
      this.props.history.push("/");
    }
  }

   handleLogin = () => {
    let loginInfo = {
      user: {
        address: this.state.loginAddress
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
    .then(res => res.json())
    .then(res => {
      localStorage.setItem("token", res.jwt)
      this.setState({user: res.user})
    })
    .then(() => {
      this.props.history.push("/account")
    })
  }

  componentDidMount() {
    this.getCurrentUser();
  }


  render() {
    return(
      <>
        <Switch>
          <Route exact path="/account" component={AccountPage} />
          <Route exact path="/" render={ () => <LandingPage handleLogin={this.handleLogin} />} />
        </Switch>
      </>
      )
  }
}

export default withRouter(App);
