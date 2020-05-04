import React, { Component } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import "./CovidMap.css"

import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});


class CovidMap extends Component {
    renderMarker = (list) => {
        return (list.map((item, index) => (
            <Marker position={[item.lat, item.lng]} key={index} >
                <Popup closeButton={false} maxWidth={200}>
                    <ul className="patient-info">
                        <li><strong>Tên:</strong> {item.name}</li>
                        <li><strong>Địa chỉ:</strong> {item.address}</li>
                        <li><strong>Thời gian:</strong> {item.verifyDate}</li>
                        <li><strong>Ghi chú:</strong> {item.note}</li>
                    </ul>
                </Popup>
            </Marker>
        )))
    }

    render() {
        return (
            <Map center={[16, 106]} zoom={6} style={{ width: '1000px', height: '600px'}} id="map">
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                {
                    this.renderMarker(this.props.data)
                }
            </Map>
        );
    }
}

export default CovidMap;