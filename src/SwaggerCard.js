import React, {Component} from 'react';
import styled from 'styled-components';
import Card from './Card';
 import { SwaggerUIBundle, SwaggerUIStandalonePreset } from "swagger-ui-dist"

class SwaggerCard extends Component {

	componentDidMount() {
		this.loadSwaggerUi();
	}

	loadSwaggerUi = () => {
		const ui = SwaggerUIBundle({
			url: "https://api.sipgate.com/v1/swagger.json",
			dom_id: '#swagger-mount-point',
			presets: [
				SwaggerUIBundle.presets.apis,
				SwaggerUIStandalonePreset
			],
			plugins: [
				SwaggerUIBundle.plugins.DownloadUrl
			],
			layout: "StandaloneLayout"
		});
	}

	render() {
		return (
			<Card title={'Swagger'}>
				<div id="swagger-mount-point"></div>
			</Card>
		)
	}
}

export default SwaggerCard;