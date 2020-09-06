import React, { Component } from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Extract from './components/Extract'
import Landing from './components/Landing'
import Navbar from './components/Navbar'
import Login from './components/Login'

 class App extends Component {
    render() {
        return (
            <div>
                
                <Router>
                <Navbar/>
                <div className="container-fluid">
                <Route exact path="/" component={Landing} />
                </div>
                <Route exact path="/transmission" render={() => (window.location = "https://chunk.lol/transmission")} />
                <div className="container-fluid">
                    <Route exact path="/extract" component={Extract}/>
                </div>
                <Route exact path="/login" component={Login} />
                </Router>
            </div>
        )
    }
}

export default App;