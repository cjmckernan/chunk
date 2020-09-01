import React, { Component } from 'react'
import { login } from './UserFunctions'

class Login extends Component {
    constructor(props){
        super(props)
        this.state ={
            username: '',
            password: ''
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    onChange(e){
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit(e){
        e.preventDefault()
        const user = {
            username : this.state.username,
            password: this.state.password
        }
        login(user)
            .then(
                this.props.history.push(`/extract`)
            )
            .catch(err => {
                this.props.history.push(`/login`)
            })
    }

    render() {
        return (
            <div className="container">
               <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <form onSubmit={this.onSubmit}>
                        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>

                            <div className="form-group">
                            <label >Username</label>
                            <input 
                                className="form-control"
                                name="username" 
                                placeholder="Enter username" 
                                value={this.state.username}
                                onChange={this.onChange}
                            />
                            </div>
                            <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input 
                                className="form-control"
                                type="password" 
                                name="password"
                                placeholder="Password"
                                value={this.state.password}
                                onChange={this.onChange}
                            />
                            </div>
                            <button  className="btn btn-lg btn-primary btn-block" type="submit">Sign In</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;