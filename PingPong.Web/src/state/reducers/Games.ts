import { GameActions } from "../actions/Games";
import { PageState, PageDataState } from "../ApplicationState";
import Game from "../../viewModels/Game";
import { initialState } from '../ApplicationState'

export function Games(state: PageState<Game[]>, action) : PageState<Game[]>
{
	if(state === undefined)
	{
		return initialState.Games;
	}

	switch (action.type) 
	{
		case GameActions.FETCH_GAMES:
			return {...state, DataState: PageDataState.FETCHING }				
		default:
			return state;
	}
}