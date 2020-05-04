import React, { Component } from 'react';
import Patient from '../Patient/Patient';



class ListPatients extends Component {
    constructor(props){
        super(props);
        this.state = {
            items: []
        };
    }

    // componentWillMount(){}
    // componentWillUnmount(){}

    // componentWillReceiveProps(){}
    // shouldComponentUpdate(){}
    // componentWillUpdate(){}
    // componentDidUpdate(){}

    

    render() {
        return (
            <div className="list">
            {this.props.data.map((item, index) => {
                return (
                    <Patient key={index} name={item.name} 
                        address={item.address} 
                        time={item.verifyDate} 
                        note={item.note} 
                        lat={item.lat}
                        lng={item.lng}/>
                )
            })}
            </div>
        );
    }
}

export default ListPatients;