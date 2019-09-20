import { connect } from 'react-redux'
import Filters from "../models/Filters";
import { requestJobs } from '../state/actions/RankingJobs'
import { ApplicationState } from '../state/ApplicationState'
import RankingJobs from '../components/AppPages/RankingJobs'

const mapStateToProps = (state: ApplicationState) => 
{	
	return {	  	
	  	request: state.RankingJobs.RequestResult, 
	  	dataState: state.RankingJobs.DataState
	}
}

const mapDispatchToProps = dispatch => 
{
	return {
		onGetJobs: (filter: Filters) => { dispatch(requestJobs(filter)) }		  
	}
}

const RankingJobsContainer = connect(mapStateToProps, mapDispatchToProps)(RankingJobs)

export default RankingJobsContainer;