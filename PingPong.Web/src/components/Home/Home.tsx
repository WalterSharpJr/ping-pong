import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'

import Sidebar from '../Sidebar/Sidebar';
import Topbar from '../Topbar/Topbar';
import Games from '../../containers/Games';
import Players from '../../containers/Players';
import Rankings from '../../containers/Rankings';
import RankingJobs from '../../containers/RankingJobs';

export default class Home extends React.Component
{
	render()
	{
		return (
			<div id="wrapper">
				<Sidebar></Sidebar>
				<div id="content-wrapper" className="d-flex flex-column">
					<Topbar></Topbar>
        			<div className="container-fluid">
          				<div className="row">
							<div className="col-12">
								<Switch>
									<Route path="/games" component={ Games } />
									<Route path="/players" component={ Players } />
									<Route path="/ranking" component={ Rankings } />
									<Route path="/rankingjobs" component={ RankingJobs } />
									<Redirect from="/" to="/games"/>
								</Switch>
							</div>							
          				</div>
        			</div>
      			</div>
			</div>
		);
	}
}