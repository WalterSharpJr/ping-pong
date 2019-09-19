import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from './state/reducers/Root'
import { ApplicationState, PageDataState } from './state/ApplicationState'

import Home from './components/Home/Home'
import { Game } from './models/Game';

const state: ApplicationState = 
{  
	Games: { Data: null, DataState: PageDataState.NO_DATA, Filter: { PageCount: 20, PageIndex: 0, Search: "" } },
	Players: { Data: null, DataState: PageDataState.NO_DATA, Filter: { PageCount: 20, PageIndex: 0, Search: "" } },
	Rankings: { Data: null, DataState: PageDataState.NO_DATA, Filter: { PageCount: 50, PageIndex: 0, Search: "" } },
	RankingJobs: { Data: null, DataState: PageDataState.NO_DATA, Filter: { PageCount: 10, PageIndex: 0, Search: "" } },
};

const store = createStore(rootReducer, state);

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