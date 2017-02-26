import React, { Component } from 'react';
import styled from 'styled-components';

const LinksCategoryTitle = styled.span`
	font-size: 18px;
	font-weight: bold;
`;

const Link = styled.a`
	text-decoration: none;
	cursor: pointer;
	text-transform: uppercase;
	&:hover {
		font-weight: bold;
	}
	&:focus {
		font-weight: bold;
	}
`;


const LinksList = styled.div`
	list-style: none;
	display: flex;
	margin: 5px;
`;

const LinkListElement = styled.div`
	font-size: 14px;
	margin-top: 2px;
	padding-right: 5px;
`;

class EnvLinks extends Component {

	buildLink = (config, env, port) => {
		const thePort = port ? ':' + port : '';
		return `https://${config.sub}${'.' + env}.${config.domain}${thePort}`;
	};

	render() {
		const { linkConfig, environments } = this.props;
		const envs = {
			local: {name: 'local', port: ''},
			dev: {name: 'dev', port: ''},
			live: {name: 'live', port: ''},
			...environments
		};
		return (
			<div>
				<LinksCategoryTitle>{linkConfig.title}</LinksCategoryTitle>
				<LinksList>
					{Object.keys(envs).map((key) => {
						const link = this.buildLink(linkConfig, envs[key].name, envs[key].port);
						return (
							<LinkListElement key={link}>
								<Link href={link}>
									{key}
								</Link>
							</LinkListElement>
						)
					})}
				</LinksList>
			</div>
		);
	}
}



export default EnvLinks;