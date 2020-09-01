import React, { Component } from 'react'

class Directories extends Component {
    constructor(props){
        super(props)
        this.handleSelection = this.handleSelection.bind(this)
    }
    state = {
        selectedDirectory: ''
    }

    handleSelection(event){
        this.props.updateSelectedDirectory(event)
    }

    render() {
        return (
        <div >
            <center><h3>Directories</h3></center>
            <div className="directories"> 
                <ul className="list-group">
                    {this.props.directories.map((directory)=> (
                        <li className="list-group-item list-group-item-action " onClick={() => this.handleSelection(directory.directory)} key={directory.id}>{directory.directory}</li>
                    ))}
                </ul>
                
            </div>
        </div>
        )
    }
}

export default Directories
