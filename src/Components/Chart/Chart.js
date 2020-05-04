import React, { Component, useState } from "react"
import { Line } from 'react-chartjs-2';

class Chart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chartDataVN: Object
            }
        }


    componentDidMount(){
        fetch('https://td.fpt.ai/corona/corona-chart-vn.json')
        .then(res => res.json())
        .then((json) => {
            let infected = [];
            let suspected = [];
            let recovered = [];
            let values = Object.values(json);

            values.map(item => {
                infected.push(item[0]);
                suspected.push(item[1]);
                recovered.push(item[2]);
            });

            let chartDataVN = {
                labels: Object.keys(json),
                datasets: [
                    {
                        label: "Infected",
                        data: infected,
                        borderColor: ["rgb(214,45,32)"],
                        borderWidth: 5,
                        fill: false
                    },
                    {
                        label: "Suspected",
                        data: suspected,
                        borderColor: ["rgb(255,167,0)"],
                        borderWidth: 5,
                        fill: false
                    },
                    {
                        label: "Recovered",
                        data: recovered,
                        borderColor: ["rgb(0,135,68)"],
                        borderWidth: 5,
                        fill: false
                    }
                    
                ]
            }
            this.setState({chartDataVN})
        })
    }


 

    render () {
        return (
            <div>
                <div className="line-vnchart">
                    <Line
                        data = {this.state.chartDataVN}
                    />   
                </div>
                <div className="line-worldchart">
                    <Line/>
                </div>
            </div>
        )
    }
}

export default Chart;