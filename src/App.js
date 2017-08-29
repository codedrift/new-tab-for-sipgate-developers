import React, {Component} from 'react';
import styled from 'styled-components';
import FlatButton from 'material-ui/FlatButton';
import SettingsDialog from './SettingsDialog';
import LoginCard from './LoginCard';
import SgFoodCard from './SgFoodCard';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { chromeRuntime } from './chromehelper';
import 'normalize.css';
import './style/core.css';

const MainContainer = styled.div`
	padding: 20px 10px;
	display: flex;
	justify-content: center;
	flex-direction: row;
	flex-wrap: wrap;
	overflow: hidden;
	height: 100%;
	width: 100%;
	font-family: Roboto,sans-serif;
`;

const FooterContainer = styled.div`
	position: absolute;
	padding: 5px;
	bottom: 0;
	right: 0;
	display: flex;
`;

const defaultAccountSetup = {
	dev: {
		basic: [
			{username: 'foo-basic@bar.de', password: 'foobar'}
		],
		simquadrat: [],
		team: [
			{username: 'foo-team@bar.de', password: 'foobar'}
		],
	},
	live: {
		basic: [
			{username: 'foo-basic@bar.de', password: 'foobar'}
		],
		simquadrat: [],
		team: [
			{username: 'foo-team@bar.de', password: 'foobar'}
		],
	}
};

class App extends Component {

	state = {
		editDialogOpen: false,
		accountSettings: defaultAccountSetup
	};

	handleSave = (e) => {
		let value = this.textInput.value;
		console.log(value);
		let settings = null;

		try {
			settings = JSON.parse(value);
		} catch (e) {
			alert('invalid json!');
			return;
		}
		this.setState({
			accountSettings: settings,
		});
		chromeRuntime().postMessage({
			type: 'SIPGATE_TEST_ACCOUNT_SETTINGS_SAVE',
			content: settings
		});
		this.handleCloseDialog();
	};

	handleEdit = (e) => {
		/* eslint-disable */
		this.setState({editDialogOpen: true})
		/* eslint-enable */
	};

	handleCloseDialog = () => {
		this.setState({editDialogOpen: false})
	};

	componentDidMount() {
		const _this = this;
		const runtime = chromeRuntime();
		runtime.postMessage({
			type: 'SIPGATE_TEST_ACCOUNT_SETTINGS_LOAD',
			content: {}
		});
		runtime.onMessage.addListener(function (message) {
			console.log('runtime says:', message);
			const accountSettings = message.SIPGATE_TEST_ACCOUNT_SETTINGS;
			if (accountSettings !== null) {
				_this.setState({accountSettings: accountSettings});
			}
		});
	}

	render() {
		const { dev, live} = this.state.accountSettings;
		return (
			<MuiThemeProvider muiTheme={getMuiTheme()}>
				<div>
					<MainContainer>
						<LoginCard
							title={'Team login'}
							linkConfig={{
								sub: 'secure',
								domain: 'sipgate.de'
							}}
							environments={{local: {name: 'local', port: '3443'}}}
							accounts={{
								local: [...dev.team],
								dev: [...dev.team],
								live: [...live.team],
							}}
						/>
						<LoginCard
							title={'App login'}
							linkConfig={{
								sub: 'app',
								domain: 'sipgate.com'
							}}
							environments={{
								local: {name: 'local', port: '3443'},
								live: {name: '', port: ''}
							}}
							accounts={{
								local: [...dev.basic, ...dev.team, ...dev.simquadrat],
								dev: [...dev.basic, ...dev.team, ...dev.simquadrat],
								live: [...live.basic, ...live.team, ...live.simquadrat],
							}}
						/>
						<SgFoodCard />
					</MainContainer>
					<FooterContainer>
						<FlatButton label="Settings" labelStyle={{color: 'white'}} primary={true} onClick={this.handleEdit}/>
					</FooterContainer>
					<SettingsDialog
						open={this.state.editDialogOpen}
						inputRef={(input) => this.textInput = input}
						accountsettings={this.state.accountSettings}
						onRequestClose={this.handleCloseDialog}
						handleSave={this.handleSave}
					/>
				</div>
			</MuiThemeProvider>
		);
	}
}

export default App;
