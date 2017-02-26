import React, { Component } from 'react';
import styled from 'styled-components';

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


const LinksCategoryTitle = styled.span`
	font-size: 18px;
	font-weight: bold;
`;

const LoginList = styled.div`
	list-style: none;
	display: flex;
	flex-direction: column;
	margin: 5px 10px;
`;


const LoginListElement = styled.div`
	font-size: 14px;
	margin: 2px 0;
	padding: 5px;
	display: flex;
	flex-direction: column;
`;

class LoginLinks extends Component {

	buildLink = (config, env) => {
		const thePort = env.port ? ':' + env.port : '';
		const theEnv = env.name ? '.' + env.name : '';
		return `https://${config.sub}${theEnv}.${config.domain}${thePort}`;
	};

	handleLogin = (link, env, account) => {
		const theEnv = env.name.match(/dev|local/) ? '.dev' : '';

		let myHeaders = new Headers();

		myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

		const reqData = `username=${encodeURIComponent(account.username)}&password=${account.password}&client_id=sipgate-app-web&grant_type=password`;
		console.log(reqData);
		const apiUrl = `https://api${theEnv}.sipgate.com/login/sipgate-apps/protocol/openid-connect/token`;
		fetch(apiUrl, {
			method: 'POST',
			headers: myHeaders,
			body: reqData
		})
			.then((response) => { console.log(response); return response.json()})
			.then(function(json) {
				console.log('token data',json);
				const redirect = link + '/authenticate?token='+ json.access_token;
				console.log('redirect to', redirect);
				window.location.href = redirect;
			})
			.catch((e) => console.log("Oh no!", e));
	};

	render() {
		const { linkConfig, environments, accounts } = this.props;
		const envs = {
			local: {name: 'local', port: ''},
			dev: {name: 'dev', port: ''},
			live: {name: 'live', port: ''},
			...environments
		};
		return (
			<LoginList>
				{Object.keys(envs).map((key) => {
					if(!accounts[key]) return null;
					const link = this.buildLink(linkConfig, envs[key]);
					return (
						<div key={key}>
							<LinksCategoryTitle key={key + 'header'}>{key}</LinksCategoryTitle>
							<LoginListElement key={link}>
								{
									accounts[key].map((account) => {
										return (
											<Link key={account.username} onClick={() => this.handleLogin(link, envs[key], account)}>
												{account.username}
											</Link>
										)
									})
								}
							</LoginListElement>
						</div>
					)
				})}
			</LoginList>
		);
	}
}

export default LoginLinks;