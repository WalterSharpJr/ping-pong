import { connect } from 'react-redux'
import Filters from "../models/Filters";
import { fetchGames } from '../state/actions/Games'
import { ApplicationState } from '../state/ApplicationState'
import Games from '../components/AppPages/Games'

const mapStateToProps = (state: ApplicationState) => 
{
	return {
	  	filter: state.Games.Filter, 
	  	games: state.Games.Data, 
	  	dataState: state.Games.DataState
	}
}

const mapDispatchToProps = dispatch => 
{
	return {
	  	onSearchClick: (filter: Filters) => { dispatch(fetchGames(filter)) }
	}
}

const GamesContainer = connect(mapStateToProps, mapDispatchToProps)(Games)

export default GamesContainer;