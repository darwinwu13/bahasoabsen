import React from 'react'
import * as firebase from 'firebase'

import Home from './Pages/Home'
import Login from './Pages/Login'
import History from './Pages/History'
import Splash from './Pages/Splash'
import UserRoute from './Routes/UserRoute'
import GuestRoute from './Routes/GuestRoute'

class App extends React.Component {
    state = {user: null, loading: true}

    componentWillMount = () => {
        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                this.setState({user, loading: false})

                firebase.database().ref(`users/${user.uid}`).set({
                    name: user.displayName,
                    email: user.email,
                    lastOnline: (new Date()).toString()
                })
            } else
                this.setState({user: {}, loading: false})
        })
    }

    render = () => {
        if(this.state.loading) return <Splash/>

        return (
            <div>
                <UserRoute exact path="/" component={() => <Home user={this.state.user}/>}/>
                <UserRoute exact path="/home" component={() => <Home user={this.state.user}/>}/>
                <GuestRoute exact path="/login" component={Login}/>
            </div>
        )
    }
}

export default App
