import { GameActions } from '../actions/Games'
import { Games as GamesReducer, Games } from './Games'
import { ApplicationState } from '../ApplicationState';
import { Action } from 'redux';

export function rootReducer(state: ApplicationState, action: Action)
{
	switch (action.type) 
	{
		case GameActions.FETCH_GAMES:
			return Object.assign({}, state, {  Games: GamesReducer(state.Games, action) });			
		default:
			break;
	}
}