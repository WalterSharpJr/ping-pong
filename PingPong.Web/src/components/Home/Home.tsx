import React from 'react';
import { Route, Switch } from 'react-router-dom'

import Sidebar from '../Sidebar/Sidebar'
import Games from '../AppPages/Games';
import Players from '../AppPages/Players';
import Topbar from '../Topbar/Topbar';

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
								</Switch>
							</div>							
          				</div>
        			</div>
      			</div>
			</div>
		);
	}
}