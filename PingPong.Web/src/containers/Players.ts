import { connect } from 'react-redux'
import Filters from "../models/Filters";
import { fetchGames } from '../state/actions/Games'
import { ApplicationState } from '../state/ApplicationState'
import Players from '../components/AppPages/Players'

const mapStateToProps = (state: ApplicationState) => 
{
	return {
	  	filter: state.Players.Filter, 
	  	players: state.Players.Data, 
	  	dataState: state.Players.DataState
	}
}

const mapDispatchToProps = dispatch => 
{
	return {
	  	onSearchClick: (filter: Filters) => { dispatch(fetchGames(filter)) }
	}
}

const GamesContainer = connect(mapStateToProps, mapDispatchToProps)(Players)

export default GamesContainer;