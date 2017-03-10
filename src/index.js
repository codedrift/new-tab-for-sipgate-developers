import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import injectTapEventPlugin from 'react-tap-event-plugin';
import background0 from './assets/background.jpg';
import background1 from './assets/background-1.jpg';
import background2 from './assets/background-2.jpg';
import background3 from './assets/background-3.jpg';
import background4 from './assets/background-4.jpg';
import background5 from './assets/background-5.jpg';


const backgrounds = [
	background0,
	background1,
	background2,
	background3,
	background4,
	background5,
];

const randomBackground = () => {
	const position = Math.floor(Math.random() * backgrounds.length);
	return backgrounds[position];
};

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

document.getElementById('page-background').style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0)), url(${randomBackground()})`;

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
