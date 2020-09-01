import React, { Component } from 'react'
import Directories from './Directories'
import {getBase, getDirectory, extractFiles} from './UserFunctions'

class Extract extends Component {
    constructor(props){
        super(props)

        this.showDirectories = this.showDirectories.bind(this);
        this.getRequestedDirectory = this.getRequestedDirectory.bind(this);
        this.updateSelectedDirectory = this.updateSelectedDirectory.bind(this);
        this.extract = this.extract.bind(this);
    }
    state = {
        inputValue: '',
        directories: []
    }
    
    showDirectories() {
        getBase()
        .then((data) => {
            this.setState({ directories : data})
        }).catch(console.log)
    }
    
    getRequestedDirectory(){
        getDirectory(this.state.inputValue)
        .then((data) => {
            this.setState({ directories: data })
        }).catch( err =>{
            console.log(err)
        })
    }

    extract(){
        extractFiles(this.state.inputValue)
        .then(res => {
            if(res['Status']==='Ok'){
                console.log("s'all good yo")
            }
        })
        
    }

    updateInputValue(evt) {
        this.setState({
            inputValue: evt.target.value
        });
    }

    updateSelectedDirectory(value){
        this.setState({
            inputValue: value
        });
    }
    

    render() {
        return (
            <div className="container-md">
                <button  className="btn btn-info" onClick={this.showDirectories}>Show Base Directory</button>
                <button type="button" className="btn btn-primary" onClick={this.getRequestedDirectory}>Get Folder</button>
                <button type="button" className="btn btn-danger" onClick={this.extract}>Extract</button>
                <input className="form-control" value={this.state.inputValue} onChange={evt => this.updateInputValue(evt)} type="text" name="folder"></input>
                <Directories updateSelectedDirectory={this.updateSelectedDirectory} directories={this.state.directories}/>
                <br/>
               
            </div>
        )
    }
}

export default Extract
