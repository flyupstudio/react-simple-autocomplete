/**
 * Created by maximvlasenko on 4/11/17.
 */


import React, { Component } from 'react';
import { Navigation, Link, Router, Route, IndexRoute, browserHistory } from 'react-router'

var Autocomplete = React.createClass({
    getInitialState: function () {
        return {
            birds: [],
            birdName:[]
        }
    },

    onChangeHandler: function(e){
        let typoLength = this.props.typoLength ? this.props.typoLength : 10;
        if(typoLength <= e.target.value.length){
            //run autocompleter finding by
            this.runFiltering(e.target.value);
        } else {
            // clear autocompleter results
            this.clearAutocompleter();
        }
        this.setState({birdName: e.target.value});
        this.props.selectedItemHandler(e.target.value);
    },

    filterByName: function(birdName){
        var elements = [];
        this.props.data.every((n) => {
            if(n.toLowerCase().indexOf(birdName.toLowerCase()) === 0){
                elements.push(n);
            }
            return elements.length < this.props.limit
        });
        return elements;
    },

    runFiltering: function(birdName){
        this.setState({birds: this.filterByName(birdName)});
    },

    clearAutocompleter: function(){
        this.setState({birds:[]});
    },

    selectedItemClick: function(value, e){
        this.clearAutocompleter();
        this.setState({birdName:value});
        this.props.selectedItemHandler(value);
    },

    render: function(){
        return (
            <div className={this.props.classes && this.props.classes.root ? this.props.classes.root : ''}>
                <input type="text" value={this.props.value} onChange={(e)=>{this.onChangeHandler(e)}} placeholder={this.props.placeholder ? this.props.placeholder : ''} />
                <ul className={this.props.classes && this.props.classes.listContainer ? this.props.classes.listContainer : ''}
                    style= {this.state.birds.length ? {display:'block'}:{display: 'none'}}>
                    {this.state.birds.length && this.state.birds.map((el,i)=>{
                        let clickHandler = this.selectedItemClick.bind(this, el);
                        return (<li onClick={clickHandler} className={this.props.classes &&
                        this.props.classes.listItems ? this.props.classes.listItems : ''}>{el}</li>)
                    })}
                </ul>
            </div>
        )
    }
});

export default Autocomplete;