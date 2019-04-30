import React from 'react';
import {
	Map,
	Marker,
	GoogleApiWrapper
} from 'google-maps-react';
import geocoder from 'geocoder';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Heading from '../componets/layout/Heading';

const Container = styled.div`
  position: relative;
  height: 100vh;
`;

const GOOGLE_API_KEY  = 'AIzaSyB4rGlihrIhXfBMe162G2vzaZHzuT6KGqc';

class MapContainer extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			location: null,
			error: null
		}
	}

	componentDidUpdate(prevProps) {
		if ( prevProps.address !== this.props.address) {
			this.convertAddressToCoords(this.props.address);
		}
	}

	componentDidMount() {
		this.convertAddressToCoords(this.props.address);
	}


	render() {
		const {lat, lng} = this.state.location  || {lat: null, lng: null};
		return (
			<Container>
				<Heading>{this.props.heading}</Heading>
				<Map
					google={this.props.google}
					zoom={15}
					initialCenter={{
						lat,
						lng
					}}
					center={{
						lat,
						lng
				}}>
					<Marker
						position={{lat, lng}}
						title={this.props.title}/>
				</Map>
			</Container>
		)
	}

	convertAddressToCoords(address) {
		geocoder.geocode(address,  ( error, data ) =>  {
			if (data) {
				const location = data.results.length ? data.results[0].geometry.location : null;
				this.setState({location});
			}
			if(error) {
				this.setState({error});
			}
		},  {key: GOOGLE_API_KEY});
	}
}

export default GoogleApiWrapper({
	apiKey: GOOGLE_API_KEY
})(MapContainer)

MapContainer.propTypes = {
	address: PropTypes.string.isRequired,
	heading: PropTypes.string.isRequired
};


