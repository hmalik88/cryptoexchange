import React from 'react';
import '../scss/LandingPage.scss'

export default class LandingPage extends React.Component {

  //contructor - grab the root and give it a unique class to target the css with
  //set state for loginAddress for the login input box

  constructor(props) {
    super(props);
    let root = document.querySelector('#root');
    root.className = '';
    root.classList.toggle('landing-page');
    this.state = {loginAddress: ''};
  }

  //change handler for login input

  handleLoginAddress = e => {
    this.setState({loginAddress: e.target.value});
  }

  render() {
    return(
      <>
        <div className="landing-1">
          <div className="landing-title">CryptoXChange</div>
        </div>
        <div className="landing-2">
          <div className="login-box">
            <div className="login-header">
              <div className="login-text">
                Welcome! Sign In With Your MalikCoin Address
              </div>
            </div>
            <div className="login-body">
              <label className="login-address-label">
                MalikCoin Address
              </label>
              <input className="login-address" type="text" value={this.state.loginAddress} onChange={this.handleLoginAddress} />
              <div className="login-button" onClick={this.handleLogin}><div>Sign In</div></div>
            </div>
          </div>
          <div className="generate-address">
            <div className="generate-header">
              Generate An Address
            </div>
            <div type="text" className="generated-address"></div>
            <div className="generate-btn">Generate Address</div>
            <div className="claim-btn">Claim Address</div>
          </div>
        </div>
      </>
      )
  }
}
