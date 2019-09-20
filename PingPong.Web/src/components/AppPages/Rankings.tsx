import React from 'react'
import Page from '../Page/Page'
import Filterbox from '../Filtering/Filterbox';
import Searchbox from '../Filtering/Searchbox'
import NoResults from '../Utilities/NoResults';
import Spinner from '../Utilities/Spinner';
import Paginationbar from '../Filtering/Paginationbar';
import Filters from '../../models/Filters';
import { PageDataState } from '../../state/ApplicationState';
import { TypedRequestResult } from '../../models/RequestResult';
import Ranking from '../../viewModels/Ranking';

export default class Rankings extends React.Component<{ onGetRankings: (filters: Filters) => void, request: TypedRequestResult<Ranking[]>, dataState: PageDataState }>
{
	private Filter: Filters;

	constructor(props)
	{
		super(props);

		this.Filter = { Search: "", PageCount: 50, PageIndex: 0 }
	}

	componentWillMount = () =>
	{
		this.props.onGetRankings(this.Filter);
	}
	
	render()
	{
		return (			
			<Page title="Rankings">				
				{ this.props.request && this.props.request.data && this.props.request.data.length > 0 && this.props.dataState != PageDataState.FETCHING &&
				<div>
				<div className="row">
					<div className="col-sm-12">
						<table className="table table-bordered dataTable">
							<thead>
								<tr role="row">									
									<th>Rank</th>
									<th>Player</th>									
								</tr>
							</thead>                  
							<tbody>
								{ 
									this.props.request.data.map((r, i) => 
										<tr key={ 'rank' + i}>																					
											<td>
												{ r.rank }
											</td>
											<td>
												{ r.player }
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
							<Paginationbar 	onNextClick={ (p) => { this.Filter.PageIndex = p; this.props.onGetRankings(this.Filter) } } 
								onPreviousClick={ (p) => { this.Filter.PageIndex = p; this.props.onGetRankings(this.Filter) } }
								pageCount={this.props.request.totalPages} pageIndex={ this.Filter.PageIndex }></Paginationbar>
						</div>
					</div>
				</div>
				}
				
				<Spinner show={ this.props.dataState === PageDataState.FETCHING }></Spinner>
								
				<NoResults text="Search results turned up nothing. Make sure at least one ranking job has run successfully." 
					show={ (this.props.request === null || this.props.request.data === null || this.props.request.data.length === 0) && this.props.dataState != PageDataState.FETCHING }></NoResults>
				
			</Page>			
		);
	}
}