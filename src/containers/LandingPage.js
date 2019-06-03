import React from 'react';
import '../scss/LandingPage.scss'
import coin from '../assets/coin.svg'
import CoinKey from 'coinkey';

export default class LandingPage extends React.Component {

  constructor(props) {
    super(props);
    let root = document.querySelector('#root');
    root.className = '';
    root.classList.toggle('landing-page');
    this.state = {loginAddress: '', generatedAddress: ''};
  }

  handleLoginAddress = e => {
    this.setState({loginAddress: e.target.value});
  }

  handleGenerate = () => {
    let ck = new CoinKey.createRandom();
    this.setState({generatedAddress: ck.publicAddress})
  }

  claimAddress = address => {
    let user = {
      user: {
        address: this.state.generatedAddress,
        balance: 0
      }
    }
    fetch('http://localhost:3000/api/v1/users', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(user)
    })
    .then(res => {
      if (res.ok) {
       return res.json()
      } else {
        throw new Error('Address already taken - generate a new address!')
      }
    })
    .catch(error => {
      alert(error);
    })
    .then(json => console.log(json))
  }

  render() {
    return(
      <>
        <div className="landing-1">
          <div className="landing-title">CryptoXChange</div>
          <img className="landing-coin" src={coin} alt="" />
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
              <div className="login-button" onClick={e => this.props.handleLogin(e, this.state.loginAddress)}><div>Sign In</div></div>
            </div>
          </div>
          <div className="generate-address">
            <div className="generate-header">
              <div>Generate An Address</div>
            </div>
            <div className="generate-body">
              <div type="text" value={this.state.generatedAddress} className="generated-address">{this.state.generatedAddress}</div>
              <div className="btn-set">
                <div className="generate-btn" onClick={this.handleGenerate}><div>Generate Address</div></div>
                <div className="claim-btn" onClick={this.claimAddress}><div>Claim Address</div></div>
              </div>
            </div>
          </div>
        </div>
      </>
      )
  }
}
