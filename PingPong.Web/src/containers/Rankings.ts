import { connect } from 'react-redux'
import Filters from "../models/Filters";
import { requestRankings } from '../state/actions/Rankings'
import { ApplicationState } from '../state/ApplicationState'
import Rankings from '../components/AppPages/Rankings'

const mapStateToProps = (state: ApplicationState) => 
{	
	return {	  	
	  	request: state.Rankings.RequestResult, 
	  	dataState: state.Rankings.DataState
	}
}

const mapDispatchToProps = dispatch => 
{
	return {
		onGetRankings: (filter: Filters) => { dispatch(requestRankings(filter)) }		  
	}
}

const RankingsContainer = connect(mapStateToProps, mapDispatchToProps)(Rankings)

export default RankingsContainer;