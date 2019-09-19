import React, { RefObject } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import Page from '../Page/Page'
import Filterbox from '../Filtering/Filterbox'
import Searchbox from '../Filtering/Searchbox'
import NoResults from '../Filtering/NoResults'
import Player from '../../viewModels/Player'
import Filters from '../../models/Filters'
import { PageDataState } from '../../state/ApplicationState'
import AddEditPlayer from './AddEditPlayer'

export default class Players extends React.Component<{ filter: Filters, players: Player[], dataState: PageDataState }>
{
	private AddEditPlayer: RefObject<AddEditPlayer>; 

	constructor(props)
	{
		super(props);

		this.AddEditPlayer = React.createRef();
	}

	handleAddPlayerClick = (e: React.MouseEvent) =>
	{
		this.AddEditPlayer.current.showModal(true);
	}

	render()
	{
		return (
			<Page title="Players">
				<Filterbox>
					<Searchbox text={ this.props.filter.Search } placeholder="Search Players...">

					</Searchbox>					
					<a href="javascript:void()" className="btn btn-success btn-icon-split float-right" onClick={ this.handleAddPlayerClick }>
                    	<span className="icon text-white-50">
                      		<FontAwesomeIcon icon={ faPlus }></FontAwesomeIcon>
                    	</span>
                    	<span className="text">Add Player</span>
                  	</a>
				</Filterbox>
				{ this.props.players && this.props.players.length > 0 &&
				<div className="row">
					<div className="col-sm-12">
						<table className="table table-bordered dataTable">
							<thead>
								<tr role="row">
									<th>Rank</th>
									<th>Name</th>
									<th>Games Played</th>
									<th>Games Won</th>
									<th>Games Lost</th>
								</tr>
							</thead>                  
							<tbody>
								{ 
									this.props.players.map((p, i) => 
										<tr key={ 'player' + i}>
											<td>
												{p.Rank}
											</td>
											<td>
												{p.Name}
											</td>
											<td>
												{p.GamesPlayed}
											</td>
											<td>
												{p.GamesWon}
											</td>
											<td>
												{p.GamesLost}
											</td>
										</tr>
									)
								}
							</tbody>
						</table>
					</div>
				</div>	}

				{ (this.props.players === null || this.props.players.length === 0) &&
					<NoResults></NoResults>
				}	

				<AddEditPlayer ref={this.AddEditPlayer}></AddEditPlayer>	
			</Page>
		);
	}
}