import React, { Component } from 'react';
import PropTypes from 'prop-types'

class Patient extends Component {
    render(){
        return(
            <div className="list-item">
                <li><strong>Tên:</strong> {this.props.name}</li>
                <li><strong>Địa chỉ:</strong> {this.props.address}</li>
                <li><strong>Thời gian:</strong> {this.props.time}</li>
                <li><strong>Ghi chú:</strong> {this.props.note}</li>
            </div>
        );
    }
}

Patient.propTypes = {
    lat: PropTypes.any.isRequired,
    lng: PropTypes.any.isRequired,
    name: PropTypes.any.isRequired,
    address: PropTypes.any.isRequired,
    time: PropTypes.any.isRequired,
    note: PropTypes.any,
}

export default Patient;