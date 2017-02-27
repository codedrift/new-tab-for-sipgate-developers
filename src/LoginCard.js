import React from 'react';
import Card from './Card';
import LoginLinks from './LoginLinks';

class LoginCard extends React.Component {
	render ()  {
		return (
			<Card title={this.props.title}>
				<LoginLinks
						linkConfig={this.props.linkConfig}
						environments={this.props.environments}
						accounts={this.props.accounts}
					/>
			</Card>
		)
	}
}

export default LoginCard;