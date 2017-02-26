import React from 'react';
import styled from 'styled-components';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import LoginLinks from './LoginLinks';

const style = {
	cardStyle: {
		opacity: '0.95',
		width: '500px',
		// minHeight: '300px',
		margin: 10
	}
};

const ContainerTitle = styled.span`
	font-size: 24px;
	font-weight: 800;
	opacity: 0.2;
`;

class LoginCard extends React.Component {

	render ()  {
		return (
			<Card style={style.cardStyle} initiallyExpanded>
				<CardHeader
					title={<ContainerTitle>{this.props.title}</ContainerTitle>}
				/>
				<CardText expandable>
					<LoginLinks
						linkConfig={this.props.linkConfig}
						environments={this.props.environments}
						accounts={this.props.accounts}
					/>
				</CardText>
			</Card>
		)
	}
}

export default LoginCard;