import { connect } from 'react-redux'
import Filters from "../models/Filters";
import { requestPlayers } from '../state/actions/Players'
import { ApplicationState } from '../state/ApplicationState'
import Players from '../components/AppPages/Players'

const mapStateToProps = (state: ApplicationState) => 
{	
	return {	  	
	  	request: state.Players.RequestResult, 
	  	dataState: state.Players.DataState
	}
}

const mapDispatchToProps = dispatch => 
{
	return {
		onGetPlayers: (filter: Filters) => { dispatch(requestPlayers(filter)) }		  
	}
}

const GamesContainer = connect(mapStateToProps, mapDispatchToProps)(Players)

export default GamesContainer;