import React, { Component, useState } from "react"
import { Line } from 'react-chartjs-2';

class Chart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chartDataVN: Object,
            chartDataWorld: Object
            }
        }


    componentDidMount(){
        //Vietnam data api fetch
        fetch('https://td.fpt.ai/corona/corona-chart-vn.json')
        .then(res => res.json())
        .then((json) => {
            let infected = [];
            let suspected = [];
            let recovered = [];
            let dateLabel = [];
            let keys = Object.keys(json);
            let values = Object.values(json);

            keys.map(item => {
                dateLabel.push(item.split(" ")[1])
            })

            values.map(item => {
                infected.push(item[0]);
                suspected.push(item[1]);
                recovered.push(item[2]);


            });

            let chartDataVN = {
                labels: dateLabel,
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

        //World data api fetch
        fetch('https://td.fpt.ai/corona/corona-total.json')
        .then(res => res.json())
        .then((json) => {
            let infected = [];
            let death = [];
            let cured = [];
            let values = Object.values(json);

            values.map(item => {
                infected.push(item[0]);
                death.push(item[1]);
                cured.push(item[2]);
            })

            let chartDataWorld = {
                labels: Object.keys(json),
                datasets: [
                    {
                        label: "Infected",
                        data: infected,
                        borderColor: ["rgb(255,0,0)"],
                        borderWidth: 5,
                        fill: false
                    },
                    {
                        label: "Death",
                        data: death,
                        borderColor: ["rgb(128,0,0)"],
                        borderWidth: 5,
                        fill: false
                    },
                    {
                        label: "Cured",
                        data: cured,
                        borderColor: ["rgb(0,135,68)"],
                        borderWidth: 5,
                        fill: false
                    }
                ]
            }
            this.setState({chartDataWorld})
        })
    }



 

    render () {
        return (
            <div>
                <div className="line-vnchart">
                    <Line
                        data = {this.state.chartDataVN}
                        options = {{
                            title: {
                                display: true,
                                text: "Vietnam Covid19 Line Chart",
                                fontSize: 20,
                                fontFamily: 'Arial',
                            },
                            legend: {
                                labels: {
                                    fontFamily: "Arial",
                                    fontSize: 16
                                }
                            }
                        }}
                    />   
                </div>
                <div className="line-worldchart">
                    <Line
                        data = {this.state.chartDataWorld}
                        options = {{
                            title: {
                                display: true,
                                text: "World Covid19 Line Chart",
                                fontSize: 20,
                                fontFamily: 'Arial',
                            },
                            legend: {
                                labels: {
                                    fontFamily: "Arial",
                                    fontSize: 16
                                }
                            }
                        }}
                        />
                </div>
            </div>
        )
    }
}

export default Chart;