import { RankingsActions } from "../actions/Rankings";
import { PageState, PageDataState, initialState } from "../ApplicationState";
import Ranking from "../../viewModels/Ranking";

export function Rankings(state: PageState<Ranking[]>, action) : PageState<Ranking[]>
{
	if(state === undefined)
	{
		return initialState.Rankings;
	}

	switch (action.type) 
	{
		case RankingsActions.FETCH_RANKS:
			return {...state, DataState: PageDataState.FETCHING }	
		case RankingsActions.RANKS_FETCH_SUCCESS:
			return {...state, DataState: PageDataState.SUCCESS, RequestResult: action.result }
		case RankingsActions.RANKS_FETCH_FAIL:
			return {...state, DataState: PageDataState.ERROR }
		default:
			return state;
	}
}