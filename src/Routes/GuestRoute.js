import React from 'react'
import * as firebase from 'firebase'
import { Route, Redirect } from 'react-router-dom'

const GuestRoute = ({ component: Component, ...rest }) => {
    const isAuthenticated = !!firebase.auth().currentUser
    return <Route {...rest} render={props => !isAuthenticated ? <Component {...props} /> : <Redirect to="/home" />}/>
}

export default GuestRoute
