import { connect } from 'react-redux'
import Filters from "../models/Filters";
import { requestGames } from '../state/actions/Games'
import { ApplicationState } from '../state/ApplicationState'
import Games from '../components/AppPages/Games'

const mapStateToProps = (state: ApplicationState) => 
{	
	return {	  	
	  	request: state.Games.RequestResult, 
	  	dataState: state.Games.DataState
	}
}

const mapDispatchToProps = dispatch => 
{
	return {
	  	onGetGames: (filter: Filters) => { dispatch(requestGames(filter)) }
	}
}

const GamesContainer = connect(mapStateToProps, mapDispatchToProps)(Games)

export default GamesContainer;