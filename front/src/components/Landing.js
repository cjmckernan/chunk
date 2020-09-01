import React, { Component } from 'react'
import chunky from '../assets/chunky.gif'
 class Landing extends Component {
    render() {
        return (
            <div className="container">
                <img  src={chunky} alt="Logo" />
            </div>
        )
    }
}

export default Landing;