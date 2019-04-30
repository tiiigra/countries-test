import React from 'react';
import ItemList from '../componets/ItemList';
import MapContainer from './Map';
import styled from 'styled-components';
import data from "../clients";
import {countBy, sort, unique} from "../helpers";

const Container = styled.div`
  display: flex;
  height: 100vh;
  overflow-y: hidden;
`;
const ItemListContainer = styled.div`
	flex: 2;
`;

const Column = styled.div`
	flex: 6;
`;


class Customers extends React.Component{

	constructor(props) {
		super(props);

		this.state = {
			customers: null,
			countries: null,
			cities: null,
			companies: null,
			address: null,
			init: false,

			activeIndexCountries: null,
			activeIndexCities: null,
			activeIndexCompanies: null
		}
	}

	componentDidMount() {
		this.init();
	}

	componentDidUpdate(prevProps, prevState, snapshot) {

		const {
			activeIndexCountries,
			activeIndexCities,
			activeIndexCompanies
		} = this.state;

		if (this.stateChanged(prevState.activeIndexCountries, activeIndexCountries)) {
			this.updateCities(activeIndexCountries);
		}

		if (this.stateChanged(prevState.activeIndexCities, activeIndexCities)) {
			this.updateCompanies(activeIndexCities);
		}

		if (this.stateChanged(prevState.activeIndexCompanies, activeIndexCompanies)) {
			this.updateAddress(activeIndexCompanies);
		}
	}

	render() {
		const {
			countries,
			cities,
			companies,
			address
		} = this.state;

		console.log(this.state);

		return (
			<Container>
				<ItemListContainer>
					{countries ?
						<ItemList
							heading='Countries'
							activeIndex={this.state.activeIndexCountries}
							onClick={(i) => this.onClick(i, 'activeIndexCountries')}
							itemList={countries}/> : null
					}
				</ItemListContainer>
				<ItemListContainer>
					{cities ?
						<ItemList
							heading='Cities'
							activeIndex={this.state.activeIndexCities}
							onClick={(i) => this.onClick(i, 'activeIndexCities')}
							itemList={cities}/> : null
					}
				</ItemListContainer>
				<ItemListContainer>
					{companies ?
						<ItemList
							heading='Companies'
							activeIndex={this.state.activeIndexCompanies}
							property='CompanyName'
							onClick={(i) => this.onClick(i, 'activeIndexCompanies')}
							itemList={companies}/> : null
					}
				</ItemListContainer>
				<Column>
					{
						address ?
							<MapContainer
								heading='Map'
								address={address}
								title={address}/> : null
					}
				</Column>
			</Container>
		)
	}

	stateChanged(prevState, state) {
		return prevState !== null &&prevState !== state;
	}

	onClick(i, prop) {
		this.setState({
			[prop]: i
		});
	}

	init() {
		this.setState(() => ({
				customers: data.Customers
			})
		);
		this.updateAll();
	}

	updateAll() {
		this.setState((state) => ({
				countries: this.getCountries(state.customers),
				activeIndexCountries: 0
			})
		);
		this.updateCities(0);
	}

	updateCities(index) {
		this.setState((state) => ({
				cities: this.getCities(state.countries[index], state.customers),
				activeIndexCities: 0
			})
		);
		this.updateCompanies(0);
		this.updateAddress(0);

	}

	updateCompanies(index) {
		this.setState((state) => ({
				companies: this.getCompanies(state.cities[index], state.customers),
				activeIndexCompanies: 0
			})
		);
		this.updateAddress(0);
	}

	updateAddress(index) {
		this.setState((state) => ({
				address: this.getAddress(state.companies[index])
			})
		);
	}

	getAddress(company) {
		const {Country, City, Address, PostalCode} = company;
		return `${PostalCode}, ${Address}, ${City}, ${Country}`;
	}

	//gets list of companies, sorted by alphabet
	getCompanies(city, customers) {
		const customersByCity = customers
			.filter((element) => element.City === city);
		return customersByCity.sort((a,b) => a.CompanyName > b.CompanyName);
	}

	//gets list of unique cities, sorted by companies number
	getCities(country, customers) {
		const customersByCountry = customers.filter((element) => element.Country === country);
		return this.getDistinct(customersByCountry, 'City');
	}

	//gets list of unique countries, sorted by cities number
	getCountries(customers) {
		const uniqueListByProp = unique(customers, 'City');
		return this.getDistinct(uniqueListByProp, 'Country');
	}

	// returns sorted list of unique entries
	getDistinct(list, prop) {
		const distinctCount = countBy(list, prop);
		return sort(distinctCount);
	}
}

export default Customers;