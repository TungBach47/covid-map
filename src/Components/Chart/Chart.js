import React, { Component, useState } from "react"
import { Line } from 'react-chartjs-2';

class Chart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            labels: "",
            infected: "",
            suspected: "",
            recover: ""
            }
        }


    componentDidMount(){
        fetch('https://td.fpt.ai/corona/corona-chart-vn.json')
        .then(res => res.json())
        .then((json) => {
            let values = Object.values(json);
            for (let i=0; i<values.lenght; i++) {
                console.log(values[i])
            }

        });
    }


 

    render () {
        return (
            <div className="line-vnchart">
                <Line
                    data = {this.state.datasets}
                />
                    
            </div>
        )
    }
}


// const Chart = () => {

//     const [chartData, setChartData] = useState({})

//     const vnlabels = []
//     const infected = []
//     const suspected = []
//     const recover = []


//     fetch("https://td.fpt.ai/corona/corona-chart-vn.json")
//     .then(res => res.json() )
//     .then((json) => {
//         vnlabels = Object.keys(json)
//         let values = Object.values(json)
//         for (let i=0; i<values.length; i++) {
//             console.log()
//         }  


        
//     })


//     const vnchart = () => {
//         setChartData({
//             labels: vnlabels
//         })
//     }
    

//     return (
//         <div>
//             <Line/>
//         </div>
//     )
// }

export default Chart;