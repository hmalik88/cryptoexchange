import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import LandingPage from './containers/LandingPage';
import AccountPage from './containers/AccountPage';

class App extends React.Component {
  render() {
    return(
      <>
        <Switch>
          <Route exact path="/account" component={AccountPage} />
          <Route exact path="/" component={LandingPage} />
        </Switch>
      </>
      )
  }
}

export default withRouter(App);
