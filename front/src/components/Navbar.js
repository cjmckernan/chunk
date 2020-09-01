import React, { Component } from 'react'
import {Link} from 'react-router-dom'

class Navbar extends Component {
    render() {
        return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <ul className="navbar-nav">
                <li>
                    <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link " to="/extract" >Extract</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link " to="/transmission" >Transmission</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link " to="/login" >Login</Link>
                </li>
            </ul>

        </nav>
        )
    }
}

export default Navbar;