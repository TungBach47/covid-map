import React, { Component } from 'react';
import './App.css';
import PatientList from './Components/PatientList/PatientList';
import SliderBar from './Components/SliderBar/SliderBar';
import CovidMap from './Components/CovidMap/CovidMap';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

import Chart from "./Components/Chart/Chart"

class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            patientsDisplay: [],
            patients: [],
            selectedDate: Date.parse("08/12/2019"),
            isPlaying: false,
        };
    }

    tick = () => {
        var step = Date.parse("04 Jan 1970 00:00:00 GMT");
        if(this.state.isPlaying) {
            var newValue = this.state.selectedDate + step;
            this.setState({selectedDate: newValue});
            this.state.patientsDisplay = [];
            this.state.patients.map((item) => {
                if(this.state.selectedDate >= Date.parse(item.verifyDate)){
                    this.state.patientsDisplay.push(item);
                }
                else {
                    this.state.patientsDisplay.pop(item);
                }
            });
        }
        if(!this.state.isPlaying) {

        }
    }

// componentWillMount(){}

    componentWillUnmount(){
        clearInterval(this.interval);
    }

// componentWillReceiveProps(){}
// shouldComponentUpdate(){}
// componentWillUpdate(){}
// componentDidUpdate(){}
    componentDidMount(){
        fetch('https://cors-anywhere.herokuapp.com/https://maps.vnpost.vn/apps/covid19/api/patientapi/list')
        .then(res => res.json())
        .then((json, tmp) => {
            tmp = json.data;
            tmp.sort(function (a, b){
                return Date.parse(b.verifyDate) - Date.parse(a.verifyDate);
            });
            this.setState({patients: tmp});
        });
        this.interval = setInterval(() => this.tick(), 500);
    }

    updateSelectDate = (newDate) => {
        this.setState({selectedDate: newDate});
        this.state.patientsDisplay = [];
        this.state.patients.map((item) => {
            if(newDate >= Date.parse(item.verifyDate)){
                this.state.patientsDisplay.push(item);
            }
            else {
                this.state.patientsDisplay.pop(item);
            }
        });

    }

    playSlider = () => {
        this.setState({isPlaying: true});
    }

    pauseSlider = () => {
        this.setState({isPlaying: false});
    }

    render() {
        return (
            <Router>
                <Link to="/map">
                    <button className="map-btn"> Map </button>
                </Link>
                <Link to="/stats">
                    <button className="stats-btn"> Stats </button>
                </Link>

                <Switch>
                    <Route path="/map">
                        <div className="container">
                            <CovidMap data={this.state.patientsDisplay}/>
                            <PatientList data={this.state.patientsDisplay}/>
                            <SliderBar onChange={this.updateSelectDate} selectedDate={this.state.selectedDate} playSlider={this.playSlider} pauseSlider ={this.pauseSlider}/>
                        </div>
                    </Route>
                    <Route path="/stats">
                        <Chart/>
                    </Route>
                </Switch>
            </Router>
        );
    }
}

export default App;
