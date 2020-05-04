import React, { Component, Text } from 'react';
import Slider from 'rc-slider/lib/Slider'
import 'rc-slider/assets/index.css'
import "./SliderBar.css"


class SliderBar extends Component {

    formatDate = (value) => {
        let date = new Date(value);
        return date.toLocaleDateString();
    }

    render() {
        return (
            <div className="slider">
                <button className="play-btn" onClick={this.props.playSlider}>Play</button>
                <button className="pause-btn" onClick={this.props.pauseSlider}>Pause</button>
                <div className="date-title">{this.formatDate(this.props.selectedDate)}</div>
                <Slider
                    min={Date.parse("08/12/2019")}
                    max={Date.parse(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()))}
                    step={Date.parse("02 Jan 1970 00:00:00 GMT")}
                    value={this.props.selectedDate}
                    onChange={this.props.onChange}
                    ariaValueTextFormatterForHandle={this.formatDate}
                    />
            </div>
        );
      }
}

export default SliderBar;