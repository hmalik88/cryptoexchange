import React from 'react';
import '../scss/AccountPage.scss'
import malikCoin from '../assets/coin.svg'
import CountUp from 'react-countup';
import user from '../assets/user.svg'

export default class AccountPage extends React.Component {

  constructor(props) {
    super(props)
    let root = document.querySelector('#root');
    root.className = ''
    root.classList.toggle('account-root');
    this.state = {sendAddress: '', amount: ''}
  }

  handleSignOut = () => {
    localStorage.removeItem("token");
    this.props.history.push('/')
  }

  handleSendField = e => {
    this.setState({
      [e.target.className]: e.target.value
    })
  }

  generateMalikCoin = () => {
    let token = localStorage.getItem("token")
    let transfer = {
      transfer: {
        user_id: 1,
        recipient_id: this.props.user.address,
        amount: 10.00
      }
    }
    fetch('http://localhost:3000/api/v1/transfers', {
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
      },
      method: 'POST',
      body: JSON.stringify(transfer)
    })
    .then(res => {
      if (res.ok) {
       return res.json()
      } else {
        throw new Error('MalikCoin could not be generated!')
      }
    })
    .catch(error => {
      alert(error);
    })
    .then(json => {
     this.props.getCurrentUser()
    })
  }

  handleTransfer = () => {
    if (this.state.sendAddress === this.props.user.address) {
      return;
    }
    let token = localStorage.getItem("token")
    let transfer = {
      transfer: {
        user_id: this.props.user.id,
        recipient_id: this.state.sendAddress,
        amount: parseFloat(this.state.amount)
      }
    }
     fetch('http://localhost:3000/api/v1/transfers', {
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
      },
      method: 'POST',
      body: JSON.stringify(transfer)
    })
    .then(res => {
      if (res.ok) {
       return res.json()
      } else {
        throw new Error('Transfer could not be completed!')
      }
    })
    .catch(error => {
      alert(error);
    })
    .then(json => {
      this.setState({sendAddress: '', amount: ''})
      this.props.getCurrentUser()
    })
  }

  generateCountUp = () => {
    if (this.props.user) {
      return <CountUp className={"balance-amount"} end={this.props.user.balance} duration={0.5} decimals={2} redraw={true} useEasing={false} />
    } else {
      return null
    }
  }

  render() {
    console.log(this.props.transfers)
    return(
      <>
        <div className="nav-bar">
          <img className="malik-coin-logo" src={malikCoin} alt=" "/>
          <div className="malik-coin-address">MalikCoin Address: {this.props.user ? (this.props.user.address) : (null)}</div>
          <div className="nav-right">
            <img className="user" alt="" src={user} />
            <div className="signed-in">Signed In</div>
            <div onClick={this.handleSignOut} className="sign-out">Sign Out</div>
          </div>
        </div>
        <div className="section-1">
          <div className="balance">
            <div className="balance-header">
              MalikCoin Balance
            </div>
            <div className="balance-body">
                {this.generateCountUp()}
            </div>
          </div>
          <div className="send-coin">
            <div className="send-coin-header">
              Send MalikCoin
            </div>
            <div className="send-coin-body">
              <label className="destination-label">
                Destination Address
              </label>
              <input type="text" className="sendAddress" onChange={this.handleSendField} value={this.state.sendAddress} />
              <label className="amount-label">
                Amount to Send
              </label>
              <input type="text" className="amount" onChange={this.handleSendField} placeholder="0" value={this.state.amount} />
              <button onClick={this.handleTransfer}>Send MalikCoins</button>
            </div>
          </div>
              <button className="generate-coin-btn" onClick={this.generateMalikCoin}>Generate 10 MalikCoin</button>
        </div>
        <div className="section-2">
          <div className="d3-graph"></div>
        </div>
      </>
      )
  }
}
