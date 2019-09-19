import { Games as GamesReducer } from './Games'
import { Players as PlayersReducer } from './Players'
import { combineReducers, Action } from 'redux';
import { ApplicationState, initialState } from '../ApplicationState';

enum ReducerCategory { GAMES = 'GAMES', PLAYERS = 'PLAYERS'  }

function getReducerCategory(action: Action): ReducerCategory
{
	var actionType = <string>action.type;

	if(actionType.startsWith(ReducerCategory.GAMES)) return ReducerCategory.GAMES;
	if(actionType.startsWith(ReducerCategory.PLAYERS)) return ReducerCategory.PLAYERS;
}

function rootReducer(state: ApplicationState, action: Action)
{
	if(state === undefined)
	{
		return initialState;
	}

	var category = getReducerCategory(action);

	switch(category)
	{
		case ReducerCategory.GAMES:
			return Object.assign({}, state, { Games: GamesReducer(state.Games, action) });
		case ReducerCategory.PLAYERS:
			return Object.assign({}, state, { Players :PlayersReducer(state.Players, action) });			
		default:
			return state;
	}
}

export default rootReducer;