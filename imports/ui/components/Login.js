import React from 'react'
import { Link } from 'react-router-dom'
import { Meteor } from 'meteor/meteor'

export default class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: '',
    }

    this.props.onEnter()
  }

  handleSubmit(e) {
    e.preventDefault()

    const email = this.refs.email.value.trim()
    const password = this.refs.password.value.trim()

    Meteor.loginWithPassword({ email }, password, err => {
      if (err) {
        return this.setState({ error: 'Unable to login. Please check email and password.' })
      }

      this.setState({ error: '' })
    })
  }

  render() {
    return (
      <div className="boxed-view ">
        <div className="boxed-view__box">
          <h1>Login</h1>

          {this.state.error && <p>{this.state.error}</p>}

          <form noValidate onSubmit={this.handleSubmit.bind(this)} className="boxed-view__form">
            <input
              type="email"
              ref="email"
              name="email"
              id="email"
              placeholder="Email"
              autoComplete="username email"
            />
            <input
              type="password"
              ref="password"
              name="password"
              id="password"
              placeholder="Password"
              autoComplete="current-password"
            />
            <button className="button">Login</button>
          </form>

          <Link to="/signup">Need an account?</Link>
        </div>
      </div>
    )
  }
}
