import { Meteor } from 'meteor/meteor'
import React from 'react'
import { Switch } from 'react-router'
import { Router, Route } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'

import Signup from '../ui/components/Signup'
import Dashboard from '../ui/components/Dashboard'
import NotFound from '../ui/components/NotFound'
import Login from '../ui/components/Login'

const history = createHistory()

const onEnterPublicPage = () => {
  if (Meteor.userId()) {
    history.replace('/dashboard')
  }
}

const onEnterPrivatePage = () => {
  if (!Meteor.userId()) {
    history.replace('/')
  }
}

const unauthenticatedPages = ['/', '/signup']
const authenticatedPages = ['/dashboard']

export const onAuthChange = isAuthenticated => {
  const pathname = history.location.pathname

  const inUnauthenticatedPage = unauthenticatedPages.includes(pathname)
  const inAuthenticatedPage = authenticatedPages.includes(pathname)
  if (isAuthenticated && inUnauthenticatedPage) {
    history.replace('/dashboard')
  }
  if (!isAuthenticated && inAuthenticatedPage) {
    history.replace('/')
  }
}

export const routes = (
  <Router history={history}>
    <Switch>
      <Route path="/" exact render={props => <Login {...props} onEnter={onEnterPublicPage} />} />
      <Route path="/signup" render={props => <Signup {...props} onEnter={onEnterPublicPage} />} />
      <Route path="/dashboard" render={props => <Dashboard {...props} onEnter={onEnterPrivatePage} />} />
      <Route path="*" component={NotFound} />
    </Switch>
  </Router>
)
