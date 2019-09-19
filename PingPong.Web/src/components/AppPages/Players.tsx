import React, { RefObject } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import Page from '../Page/Page'
import Filterbox from '../Filtering/Filterbox'
import Searchbox from '../Filtering/Searchbox'
import NoResults from '../Utilities/NoResults'
import Player from '../../viewModels/Player'
import Filters from '../../models/Filters'
import { PageDataState } from '../../state/ApplicationState'
import AddEditPlayer from './AddEditPlayer'
import Spinner from '../Utilities/Spinner'
import { requestPlayers } from '../../state/actions/Players'

export default class Players extends React.Component<{ onGetPlayers: (filters: Filters) => void, players: Player[], dataState: PageDataState }>
{
	private AddEditPlayer: RefObject<AddEditPlayer>; 
	private Filter: Filters;

	constructor(props)
	{
		super(props);

		this.AddEditPlayer = React.createRef();

		this.Filter = { Search: "", PageCount: 20, PageIndex: 0 }		
	}

	componentWillMount = () =>
	{
		this.props.onGetPlayers(this.Filter);
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
					<Searchbox onSearchClicked={ () => { this.props.onGetPlayers(this.Filter); } } onSearchChanged={ (text) => { this.Filter.Search = text } } placeholder="Search Players...">

					</Searchbox>					
					<a href="javascript:void()" className="btn btn-success btn-icon-split float-right" onClick={ this.handleAddPlayerClick }>
                    	<span className="icon text-white-50">
                      		<FontAwesomeIcon icon={ faPlus }></FontAwesomeIcon>
                    	</span>
                    	<span className="text">Add Player</span>
                  	</a>
				</Filterbox>
				{ this.props.players && this.props.players.length > 0 && this.props.dataState != PageDataState.FETCHING &&
				<div className="row">
					<div className="col-sm-12">
						<table className="table table-bordered dataTable">
							<thead>
								<tr role="row">									
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
												{p.name}
											</td>
											<td>
												{p.gamesPlayed}
											</td>
											<td>
												{p.gamesWon}
											</td>
											<td>
												{p.gamesLost}
											</td>
										</tr>
									)
								}
							</tbody>
						</table>
					</div>
				</div>	}
				
				{ this.props.dataState === PageDataState.FETCHING &&
					<Spinner></Spinner>
				}

				{ (this.props.players === null || this.props.players.length === 0) && this.props.dataState != PageDataState.FETCHING &&
					<NoResults></NoResults>
				}	

				<AddEditPlayer onPlayerAdded={ () => { this.props.onGetPlayers(this.Filter) } } ref={this.AddEditPlayer}></AddEditPlayer>	
			</Page>
		);
	}
}