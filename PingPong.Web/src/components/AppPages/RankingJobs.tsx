import React from 'react'
import Page from '../Page/Page'
import Filterbox from '../Filtering/Filterbox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import NoResults from '../Utilities/NoResults';
import Spinner from '../Utilities/Spinner';
import Paginationbar from '../Filtering/Paginationbar';
import Filters from '../../models/Filters';
import RankingJob from '../../models/RankingJob';
import RankingJobsService from '../../services/RankingJobs'
import { PageDataState } from '../../state/ApplicationState';
import { TypedRequestResult } from '../../models/RequestResult';

export default class RankingJobs extends React.Component<{ onGetJobs: (filters: Filters) => void, request: TypedRequestResult<RankingJob[]>, dataState: PageDataState }>
{
	private Filter: Filters;

	constructor(props)
	{
		super(props);

		this.Filter = { Search: "", PageCount: 20, PageIndex: 0 }
	}

	componentWillMount = () =>
	{
		this.props.onGetJobs(this.Filter);
	}

	handleAddJobClick = () =>
	{
		var jobService = new RankingJobsService();

		jobService.StartJob().then((result) =>
		{
			this.props.onGetJobs(this.Filter);
			
		}).catch((error) =>
		{

		})
	}

	render()
	{
		return (			
			<Page title="Ranking Jobs">
				<Filterbox>											
					<a href="javascript:void()" className="btn btn-success btn-icon-split float-right" onClick={ this.handleAddJobClick }>
						<span className="icon text-white-50">
								<FontAwesomeIcon icon={ faPlus }></FontAwesomeIcon>
						</span>
						<span className="text">Start Ranking Job</span>
						</a>
				</Filterbox>
				{ this.props.request && this.props.request.data.length > 0 && this.props.dataState != PageDataState.FETCHING &&
				<div>
				<div className="row">
					<div className="col-sm-12">
						<table className="table table-bordered dataTable">
							<thead>
								<tr role="row">									
									<th>State</th>
									<th>Started</th>
									<th>Finished</th>									
								</tr>
							</thead>                  
							<tbody>
								{ 
									this.props.request.data.map((g, i) => 
										<tr key={ 'job' + i}>
											<td>
												{ g.state == 0 ? "Running" : "Finished" }
											</td>											
											<td>
												{ g.startedOn.toString().split("T")[0] } at { g.startedOn.toString().split("T")[1].split(".")[0] }
											</td>
											<td>
												{ (g.finishedOn) ? g.finishedOn.toString().split("T")[0] + " at " + g.finishedOn.toString().split("T")[1].split(".")[0]: "N/A" }
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
							<Paginationbar 	onNextClick={ (p) => { this.Filter.PageIndex = p; this.props.onGetJobs(this.Filter) } } 
								onPreviousClick={ (p) => { this.Filter.PageIndex = p; this.props.onGetJobs(this.Filter) } }
								pageCount={this.props.request.totalPages} pageIndex={ this.Filter.PageIndex }></Paginationbar>
						</div>
					</div>
				</div>
				}
				
				<Spinner show={ this.props.dataState === PageDataState.FETCHING }></Spinner>
								
				<NoResults text="No Ranking Jobs have been started yet. Click Start Ranking Job to start one!" 
					show={ (this.props.request === null || this.props.request.data === null || this.props.request.data.length === 0) && this.props.dataState != PageDataState.FETCHING }></NoResults>
				
			</Page>			
		);
	}
}