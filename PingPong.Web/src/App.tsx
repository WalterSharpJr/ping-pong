import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { createStore, applyMiddleware  } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk'
import rootReducer from './state/reducers/Root'
import { initialState } from './state/ApplicationState'

import Home from './components/Home/Home'

const store = createStore(rootReducer, initialState as any, applyMiddleware(thunkMiddleware));

export default class App extends React.Component
{
	render()
	{
		return (
			<div>
				<Provider store={ store }>
					<Router>
						<Route path="/" component={ Home } />
					</Router>
				</Provider>
			</div>
		)
	}
}