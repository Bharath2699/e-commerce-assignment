import {Component} from 'react'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {
    email: '',
    password: '',
    name:"",
    signingType:"",
    secretKey:"",
    showSubmitError: false,
    errorMsg: '',
    userType:"",
  }

onChangeSecretKey=(event)=>{
  this.setState({secretKey:event.target.value})
}

  onSigning=(event)=>{
    this.setState({signingType:event.target.value})
  }

  onChangeUsername=(event)=>{
     this.setState({name:event.target.value})
  }

  onClickUserType=(event)=>{
     this.setState({userType:event.target.value})
  }

  onChangeemail = event => {
    this.setState({email: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {


    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
  window.location.href="/product"
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {email, password,userType,secretKey,name,signingType} = this.state
    const userDetails = signingType==="Login"?{email, password}:userType==="Admin"?(secretKey,name,email,password):(name,email,password)
    const url = signingType ==="Login"?'http://localhost:4003/login':'http://localhost:4003/register'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderPasswordField = () => {
    const {password} = this.state

    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="password-input-field"
          value={password}
          onChange={this.onChangePassword}
          placeholder="Password"
        />
      </>
    )
  }

  renderEmailField = () => {
    const {email} = this.state

    return (
      <>
        <label className="input-label" htmlFor="email">
          EMAIL
        </label>
        <input
          type="text"
          id="email"
          className="username-input-field"
          value={email}
          onChange={this.onChangeemail}
          placeholder="Email"
        />
      </>
    )
  }

  renderUserNameField=()=>{
    const {name} = this.state

    return (
    <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="username-input-field"
          value={name}
          onChange={this.onChangeUsername}
          placeholder="Username"
        />
    </>
    )
  }

  renderSecretKeyField=()=>{
    const {secretKey} = this.state

    return (
    <>
        <label className="input-label" htmlFor="scretkey">
          SECRET KEY
        </label>
        <input
          type="text"
          id="secretkey"
          className="username-input-field"
          value={secretKey}
          onChange={this.onChangeSecretKey}
          placeholder="Secret Key"
        />
    </>
    )
  }

  render() {
    const {showSubmitError, errorMsg,signingType,userType} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
       window.location.href="/product"
    }

    return (
      <div className="login-form-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
          className="login-website-logo-mobile-img"
          alt="website logo"
        />
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
          className="login-img"
          alt="website login"
        />
        <form className="form-container" onSubmit={this.submitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
            className="login-website-logo-desktop-img"
            alt="website logo"
          />
        
           <div className='signing'>
            <div className='signing'>
           <input type="radio"  className="usertype" name="usertype" id="register" onChange={this.onSigning} value="Register" selected/>
           <label className="input-label" htmlFor="register">Register</label>
           </div>
            <div className='signing'>
          <input type="radio" className="usertype" name="usertype" id="login" onChange={this.onSigning} value="Login" />
          <label className="input-label" htmlFor="login">Login</label>
          </div>
          </div>
          {signingType==="Login"?
             (
              <>
              <div className="input-container">{this.renderEmailField()}</div>
             <div className="input-container">{this.renderPasswordField()}</div>
             </>):
             (
              <>
              <div className='registered-as'>
              <p>Register As</p>
              <>
                <input type="radio"  className="usertype" name="usertype" id="admin" onChange={this.onClickUserType} value="Admin" />
                <label className="input-label" htmlFor="admin">Admin</label>
              </>
               <>
                <input type="radio" className="usertype" name="usertype"  id="user" onChange={this.onClickUserType} value="User" />
                <label className="input-label" htmlFor="user">User</label>
               </>
           
            </div>
            {userType==="Admin"?<div className="input-container">{this.renderSecretKeyField()}</div>:""}
            <div className="input-container">{this.renderUserNameField()}</div>
            <div className="input-container">{this.renderEmailField()}</div>
            <div className="input-container">{this.renderPasswordField()}</div>
            </>
            )
             
        }
         

          <button type="submit" className="login-button">
            {signingType==="Register"?"Register":"Login"}
          </button>
          {showSubmitError && <p className="error-message">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default Login
