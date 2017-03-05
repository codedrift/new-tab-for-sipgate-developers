import React, { Component } from 'react';
import styled from 'styled-components';
import { chromeRuntime } from './chromehelper';
import incognitoIcon from './assets/incognito-16.png';
import copyIcon from './assets/copy-24.png';

const Link = styled.a`
	text-decoration: none;
	cursor: pointer;
	-webkit-transition:.3s;
	transition:.3s;
	opacity: 0.8;
	&:hover {
		opacity: 1;
		font-weight: bold;
	}
	&:focus {
		opacity: 1;
		font-weight: bold;
	}
`;

const LinksCategoryTitle = styled.span`
	font-size: 18px;
	padding: 10px 25px 5px 25px;
	font-weight: bold;
`;

const LoginList = styled.div`
	list-style: none;
`;

const LoginListElement = styled.div`
	font-size: 16px;
	margin-bottom: 5px;
	padding: 2px 30px;
	display: flex;
	flex-direction: row;
	-webkit-transition:.3s;
	transition:.3s;
	&:hover {
		background-color: rgba(255,255,255, 0.2);
	}
`;

const IncognitoLink = styled.span`
	width: 20px;
	height: 16px;
	margin-right: 10px;
	background-image: url(${incognitoIcon});
	opacity: 0.2;
	background-size: 20px 16px;
    background-repeat: no-repeat;
    &:hover {
    	opacity: 0.8;
	}
	cursor: pointer;
`;

const CopyLink = styled.span`
	width: 20px;
	height: 16px;
	margin-right: 10px;
	background-image: url(${copyIcon});
	opacity: 0.2;
	background-size: 20px 16px;
    background-repeat: no-repeat;
    &:hover {
    	opacity: 0.8;
	}
	cursor: pointer;
`;

class LoginLinks extends Component {

	buildLink = (config, env) => {
		const thePort = env.port ? ':' + env.port : '';
		const theEnv = env.name ? '.' + env.name : '';
		return `https://${config.sub}${theEnv}.${config.domain}${thePort}`;
	};

	getToken = (link, env, account, onSuccess) => {
		const theEnv = env.name.match(/dev|local/) ? '.dev' : '';
		const host = `https://api${theEnv}.sipgate.com`;

		let headers = new Headers();
		headers.append('Content-Type', 'application/x-www-form-urlencoded');
		headers.append('New-Origin-Header', host);

		const reqData = `username=${encodeURIComponent(account.username)}&password=${account.password}&client_id=sipgate-app-web&grant_type=password`;
		const apiUrl = `${host}/login/sipgate-apps/protocol/openid-connect/token`;

		fetch(apiUrl, {
			method: 'POST',
			headers: headers,
			body: reqData
		})
			.then((response) => { console.log(response); return response.json()})
			.then(function(json) {
				console.log('token data',json);
				const redirect = link + `/authenticate?token=${json.access_token}&refresh_token=${json.refresh_token}`;
				onSuccess(json.access_token, redirect)

			})
			.catch((e) => console.log("Oh no!", e));
	}

	handleLogin = (link, env, account) => {
		this.getToken(link, env, account, (token, redirect) => {
			window.location.href = redirect;
		});
	};

	handleCopyToken = (link, env, account) => {

		this.getToken(link, env, account, (token, redirect) => {
			let input = document.createElement('input');
			input.type = "text";
			input.id='tokenCopyInput'
			input.value = token;
			document.getElementById('hiddeninput').append(input);
			let documentInput = document.getElementById('tokenCopyInput');
			documentInput.select();
			document.execCommand('copy');
		});
	};

	handleIncognitoLogin = (link, env, account) => {
		this.getToken(link, env, account, (token, redirect) => {
			chromeRuntime().postMessage({
				type: 'OPEN_INCOGNITO_TAB',
				content: redirect
			});
		});
	}

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

								{accounts[key].map((account) => {
									return (
										<LoginListElement key={account.username}>
											<CopyLink onClick={() => this.handleCopyToken(link, envs[key], account)}/>
											<IncognitoLink onClick={() => this.handleIncognitoLogin(link, envs[key], account)}/>

											<Link onClick={() => this.handleLogin(link, envs[key], account)}>
												{account.username}
											</Link>
										</LoginListElement>
									)
								})}
						</div>
					)
				})}
			</LoginList>
		);
	}
}

export default LoginLinks;