import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Item from './Item';
import Heading from './layout/Heading'

const List = styled.div`
    height: 100vh;
    overflow-y: scroll;
`;

const  ItemList = ({itemList, heading, ...rest}) => {

	const items = itemList.map((element, index) =>
		<Item key={index}
		      index={index}
		      item={element}
			  {...rest}/>
    );

	return (
		<React.Fragment>
			<Heading>
				{heading}
			</Heading>
			<List>
				{items}
			</List>
		</React.Fragment>
	)
};


export default ItemList;

ItemList.propTypes = {
	itemList: PropTypes.array.isRequired,
	heading: PropTypes.string.isRequired
};