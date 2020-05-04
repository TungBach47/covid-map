import React, { Component } from 'react';
import Slider from 'rc-slider/lib/Slider'
import 'rc-slider/assets/index.css'


class SeekBar extends Component {
    // constructor(props){
    //     super(props);
    //     this.state = {
    //     };
    // }

    // componentWillMount(){}
    // componentDidMount() {}
    // componentWillUnmount() {}

    

    // componentWillReceiveProps(){}
    // shouldComponentUpdate(){}
    // componentWillUpdate(){}
    // componentDidUpdate(){}

    render() {
        return (
            <div className="seekbar-layout">
                <button onClick={this.props.playSlider}>Play</button>
                <button onClick={this.props.pauseSlider}>Pause</button>
                <Slider 
                    min={Date.parse("08/12/2019")}
                    max={Date.parse(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()))}
                    step={Date.parse("02 Jan 1970 00:00:00 GMT")}
                    value={this.props.selectedDate}
                    onChange={this.props.onChange}
                    />
            </div>
        );
      }
}

export default SeekBar;