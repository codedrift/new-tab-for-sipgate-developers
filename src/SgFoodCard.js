import React, {Component} from 'react';
import styled from 'styled-components';
import ReactEmoji from 'react-emoji';
import Card from './Card';

const Title = styled.span`
	font-size: 18px;
	font-weight: bold;
`;

const Container = styled.div`
	font-size: 18px;
	opacity: 0.95;
	padding: 10px 25px;
`;

const MealContainer = styled.div`
	display: flex;
	margin: 5px;
`;

const MealType = styled.div`
	font-size: 20px;
	padding: 5px;
`;

const MealName = styled.div`
	font-size: 16px;
	padding: 5px;
	vertical-align: middle;
`;

class SgFood extends Component {

	state = {
		response: null,
		fetched: false
	};

	componentWillMount() {
		this.getSgFood();
	}

	getSgFood = () => {
		const _this = this;
		const host = 'http://altepost.sipgate.net';

		let headers = new Headers();
		headers.append('New-Origin-Header', host);

		fetch(`${host}/api.php`, {
			method: 'GET',
			headers: headers,
		})
			.then((response) => response.json())
			.then(function (json) {
				_this.setState({response: json, fetched: true});
			})
			.catch((e) => {
				_this.setState({ fetched: true });
				console.log("sipgate food failed", e);
			});
	};

	getEmojiByType = (type) => {
		switch (type) {
			case "carne":
				return ":meat_on_bone:";
			case "fisch":
				return ":fish:";
			case "salat":
				return ":seedling:";
			case "vegi":
				return ":cherry_blossom:";
			default:
				return ":fork_and_knife:";
		}
	};

	renderMeals = () => {
		const {response} = this.state;
		return (response && response.meals)
		? (
			<Container>
				<Title>{`${response.day} (${response.date})`}</Title>
				{
					response.meals.map((meal) => {
						return (
							<MealContainer>
								<MealType>{ReactEmoji.emojify(this.getEmojiByType(meal.type))}</MealType>
								<MealName>{meal.name}</MealName>
							</MealContainer>
						)
					})
				}
			</Container>
		)
		: (
			<Container>
				{
					'Probably something awesome!'
				}
			</Container>
		)
	};

	render() {

		return (
			<Card title={'sipgate food'}>
				{this.renderMeals()}
			</Card>
		)
	}
}

export default SgFood;