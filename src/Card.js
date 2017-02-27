import React from 'react';
import styled from 'styled-components';

const CardTitle = styled.div`
	font-size: 24px;
	font-weight: 800;
	opacity: 0.4;
	padding: 10px 15px;
	width: 100%;
`;

const CardBody = styled.div`
	width: 100%;
`;

const CardRoot = styled.div`
	width: 500px;
	border-radius: 2px;
	opacity: 0.95;
	border: 3px solid rgba(255,255,255, 0.7);
	color: white;
	background-color: transparent;
	margin: 10px;
	padding: 5px 0;
`;

class Card extends React.Component {

	render ()  {
		return (
			<CardRoot>
				<CardTitle>{this.props.title}</CardTitle>
				<CardBody>
					{this.props.children}
				</CardBody>
			</CardRoot>
		)
	}
}

export default Card;