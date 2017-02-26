import React, {Component} from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import styled from 'styled-components';
import ReactEmoji from 'react-emoji';

const Title = styled.span`
	font-size: 18px;
	font-weight: bold;
`;

const ContainerTitle = styled.span`
	font-size: 24px;
	font-weight: 800;
	opacity: 0.2;
`;


const MealContainer = styled.div`
	display: flex;
	margin: 5px;
`;

const MealType = styled.div`
	font-size: 18px;
	padding: 5px;
`;

const MealName = styled.div`
	font-size: 14px;
	padding: 5px;
	vertical-align: middle;
`;

const style = {
	cardStyle: {
		opacity: '0.95',
		width: '500px',
		// minHeight: '300px',
		margin: 10
	}
};


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
		fetch('http://altepost.sipgate.net/api.php', {
			method: 'GET',
		})
			.then((response) => response.json())
			.then(function (json) {
				console.log('sipgate food', json);
				_this.setState({response: json, fetched: true});
			})
			.catch((e) => {
				_this.setState({fetched: true});
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
		if (response && response.meals) {
			return (
				<div>
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
				</div>
			)
		} else {
			return (
				<div>
					{
						'Probably something awesome!'
					}
				</div>
			)
		}
	};

	render() {

		return (
			<Card style={style.cardStyle}>
				<CardHeader
					title={<ContainerTitle>{'sipgate food'}</ContainerTitle>}
					actAsExpander={false}
					showExpandableButton={false}
				/>
				<CardText expandable={false}>
				{this.renderMeals()}
				</CardText>
			</Card>
		)
	}
}

export default SgFood;