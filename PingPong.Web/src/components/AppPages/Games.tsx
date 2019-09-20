import React, { RefObject } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import Page from '../Page/Page'
import Filterbox from '../Filtering/Filterbox'
import Searchbox from '../Filtering/Searchbox'
import NoResults from '../Utilities/NoResults'
import Game from '../../viewModels/Game'
import Filters from '../../models/Filters'
import { PageDataState } from '../../state/ApplicationState'
import AddGame from './AddGame'
import Spinner from '../Utilities/Spinner'
import Paginationbar from '../Filtering/Paginationbar'
import { TypedRequestResult } from '../../models/RequestResult'

export default class Games extends React.Component<{ onGetGames: (filters: Filters) => void, request: TypedRequestResult<Game[]>, dataState: PageDataState }>
{
	private AddGame: RefObject<AddGame>; 
	private Filter: Filters;

	constructor(props)
	{
		super(props);

		this.AddGame = React.createRef();

		this.Filter = { Search: "", PageCount: 20, PageIndex: 0 }		
	}

	componentWillMount = () =>
	{
		this.props.onGetGames(this.Filter);
	}

	handleAddGameClick = (e: React.MouseEvent) =>
	{
		this.AddGame.current.showModal(true);
	}

	render()
	{
		return (
			<Page title="Games">
				<Filterbox>
					<Searchbox onSearchClicked={ () => { this.props.onGetGames(this.Filter); } } onSearchChanged={ (text) => { this.Filter.Search = text } } placeholder="Search Games...">

					</Searchbox>					
					<a href="javascript:void()" className="btn btn-success btn-icon-split float-right" onClick={ this.handleAddGameClick }>
                    	<span className="icon text-white-50">
                      		<FontAwesomeIcon icon={ faPlus }></FontAwesomeIcon>
                    	</span>
                    	<span className="text">Add Game</span>
                  	</a>
				</Filterbox>
				{ this.props.request && this.props.request.data.length > 0 && this.props.dataState != PageDataState.FETCHING &&
				<div>
				<div className="row">
					<div className="col-sm-12">
						<table className="table table-bordered dataTable">
							<thead>
								<tr role="row">									
									<th>Played</th>
									<th>Players</th>
									<th>Winner</th>
									<th>Score</th>									
								</tr>
							</thead>                  
							<tbody>
								{ 
									this.props.request.data.map((g, i) => 
										<tr key={ 'game' + i}>											
											<td>
												{g.playedOn.toString().split("T")[0]}
											</td>
											<td>
												{g.player1} vs {g.player2}
											</td>
											<td>
												{g.winner}
											</td>
											<td>
												{g.player1}: {g.player1Score} | {g.player2}: {g.player2Score}
											</td>
										</tr>
									)
								}
							</tbody>
						</table>
					</div>
				</div>	
					<div className="row">
						<div className="col-12">
							<Paginationbar 	onNextClick={ (p) => { this.Filter.PageIndex = p; this.props.onGetGames(this.Filter) } } 
								onPreviousClick={ (p) => { this.Filter.PageIndex = p; this.props.onGetGames(this.Filter) } }
								pageCount={this.props.request.totalPages} pageIndex={ this.Filter.PageIndex }></Paginationbar>
						</div>
					</div>
				</div>
				}
				
				{ this.props.dataState === PageDataState.FETCHING &&
					<Spinner></Spinner>
				}

				{ (this.props.request === null || this.props.request.data === null || this.props.request.data.length === 0) && this.props.dataState != PageDataState.FETCHING &&
					<NoResults></NoResults>
				}	


				<AddGame onGameAdded={ () => { this.props.onGetGames(this.Filter) } } ref={this.AddGame}></AddGame>	
			</Page>
		);
	}
}