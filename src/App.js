import React, { Component } from 'react';
import './App.css';
import ListPatients from './Components/ListPatients/ListPatients';
import SeekBar from './Components/SeekBar/SeekBar';
import CovidMap from './Components/CovidMap/CovidMap';

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
            <div className="container">
                <CovidMap data={this.state.patientsDisplay}/>
                <ListPatients data={this.state.patientsDisplay}/>
                <SeekBar onChange={this.updateSelectDate} selectedDate={this.state.selectedDate} playSlider={this.playSlider} pauseSlider ={this.pauseSlider}/>
            </div>
        );
    }
}

export default App;
