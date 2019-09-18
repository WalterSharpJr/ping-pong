import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Home from './components/Home/Home'

export default class App extends React.Component
{
	render()
	{
		return (
			<div>
				<Router>
					<Route path="/" component={ Home } />
				</Router>
			</div>
		)
	}
}