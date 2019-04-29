import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledItem = styled.li`
	padding: 10px;
    background: ${props => props.active ? '#2185db' : '#fff'}
    color: ${props => props.active ? '#fff' : '#2185db'}
    border-radius: 5px;
    cursor: pointer;
`;


// renders passed string or
const  Item = ({item, index, onClick, property, activeIndex}) =>
	<StyledItem
		active={index === activeIndex}
		onClick={() => onClick(index)}>
		{property ? item[property] :  item}
	</StyledItem>;

export default Item;

Item.propTypes = {
	item:  PropTypes.oneOfType([
		PropTypes.string.isRequired,
		PropTypes.object.isRequired
	]),
	onClick: PropTypes.func.isRequired,
	activeIndex: PropTypes.number.isRequired,
	property: PropTypes.string
};