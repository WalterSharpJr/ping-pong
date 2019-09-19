import { PlayerActions } from "../actions/Players";
import { PageState, PageDataState } from "../ApplicationState";
import Player from "../../viewModels/Player";
import { initialState } from '../ApplicationState'

export function Players(state: PageState<Player[]>, action) : PageState<Player[]>
{
	if(state === undefined)
	{
		return initialState.Players;
	}

	switch (action.type) 
	{
		case PlayerActions.FETCH_PLAYER:
			return {...state, DataState: PageDataState.FETCHING }				
		default:
			return state;
	}
}