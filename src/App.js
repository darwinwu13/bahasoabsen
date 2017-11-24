import React from 'react'
import * as firebase from 'firebase'

import Home from './Pages/Home'
import Login from './Pages/Login'
import History from './Pages/History'
import Splash from './Pages/Splash'

class App extends React.Component {
    state = {
        user: null,
        loading: true,
        splash: true,
    }

    componentWillMount = () => {
        this.to = setTimeout(() => {
            this.setState({splash: false})
        }, 2000)

        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                this.setState({user, loading: false})

                firebase.database().ref(`users/${user.uid}`).set({
                    name: user.displayName,
                    email: user.email,
                    lastOnline: (new Date()).toString()
                })
            } else
                this.setState({user: null, loading: false})
        })
    }

    componentWillUnmount = () => {
        clearTimeout(this.to)
    }

    render = () => {
        if(this.state.splash) return <Splash/>
        if(this.state.loading) return <Splash/>

        return this.state.user ? <Home user={this.state.user}/> : <Login/>
    }
}

export default App
