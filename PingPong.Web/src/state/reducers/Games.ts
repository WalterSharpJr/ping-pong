import { GameActions } from "../actions/Games";
import { PageState, PageDataState } from "../ApplicationState";
import { Game } from "../../models/Game";

export function Games(state: PageState<Game>, action) : PageState<Game>
{
	switch (action.type) 
	{
		case GameActions.FETCH_GAMES:
			return {...state, DataState: PageDataState.FETCHING }				
		default:
			break;
	}
}