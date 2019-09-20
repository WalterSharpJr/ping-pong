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
		case PlayerActions.FETCH_PLAYERS:
			return {...state, DataState: PageDataState.FETCHING }	
		case PlayerActions.PLAYER_FETCH_SUCCESS:
			return {...state, DataState: PageDataState.SUCCESS, RequestResult: action.result }
		case PlayerActions.PLAYER_FETCH_FAIL:
			return {...state, DataState: PageDataState.ERROR }
		default:
			return state;
	}
}