
import React, { Component } from 'react';
import { Navigation, Link, Router, Route, IndexRoute, browserHistory } from 'react-router'

import axios from 'axios';

import {DOMAIN, LENGTH_TO_FOUND, TYPO_LENGTH} from './settings';
import Autocomplete from './Autocomplete';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {  birds: [],
                        selectedBirds: [],
                        birdName: ''
                        };
        this.addBird = this.addBird.bind(this);
        this.selectedItemHandler = this.selectedItemHandler.bind(this);
        this.searchForm = this.searchForm.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
    }

    componentWillUnmount(){
        this.serverRequest.abort();
    }

    componentWillMount(){
        var _this = this;
        this.serverRequest =
            axios.get(DOMAIN + '/api/birds.json')
                .then((res) => {
                    _this.setState({
                        birds: res.data
                    });
                });
    }

    addBird(){
        var addBirds = this.state.selectedBirds.slice();
        addBirds.push(this.state.birdName);
        this.setState({selectedBirds: addBirds, birdName:''});
    }

    deleteElementFromBirds(el, item, position){
        var newBirdsList = this.state.selectedBirds;
        newBirdsList.splice(item, 1);
        this.setState({selectedBirds: newBirdsList});
    }

    tableTemplate(){
        var tableTpl = null;
        if (this.state.selectedBirds.length) {
            tableTpl = (
                <div className="row">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Bird Name</th>
                            <td>Remove from list</td>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.selectedBirds.map((el,i)=>{
                            let deleteFunctionality = this.deleteElementFromBirds.bind(this, el, i);
                            return (
                                <tr>
                                    <td>
                                        {el}
                                    </td>
                                    <td style={{width:'10%'}}>
                                        <button type="button" onClick={deleteFunctionality} class="btn btn-error">
                                            Delete
                                        </button>
                                    </td>
                                </tr>)
                        })}
                        </tbody>
                    </table>
                </div>
            );
        }
        return (tableTpl)
    }

    selectedItemHandler(value){
        //get values from child component
        this.setState({birdName:value});
    }

    searchForm(){
        return (
                <div className="row">
                    <div className="col-md-3 text-right">
                        <label>Bird Name</label>
                    </div>
                    <div className="col-md-6">
                        <Autocomplete
                            data={this.state.birds}
                            value={this.state.birdName}
                            placeholder="Search Bids Name..."
                            limit={LENGTH_TO_FOUND}
                            typoLength={TYPO_LENGTH}
                            selectedItemHandler={this.selectedItemHandler}
                            classes={{
                                root: 'autocomplete',
                                input: 'autocomplete-input',
                                listContainer: 'autocomplete-container',
                                listItems: 'autocomplete-items'
                            }}
                        />
                    </div>
                    <div className="col-md-3">
                        <button type="button" onClick={(e)=>{this.addBird(e)}} class="btn btn-success">Add + </button>
                    </div>
                </div>
        )
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                       <h1>This is React SPA to find birds names</h1>
                    </div>
                </div>
                {this.searchForm()}
                {this.tableTemplate()}
            </div>
        );
    }
}

export default App;


