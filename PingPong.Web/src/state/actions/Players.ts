import Filters from "../../models/Filters";
import { default as PlayerVM } from "../../viewModels/Player";
import Players from '../../services/Players'
import { TypedRequestResult } from "../../models/RequestResult";

export enum PlayerActions { FETCH_PLAYERS = 'PLAYERS_FETCH', PLAYER_FETCH_SUCCESS = 'PLAYERS_FETCH_SUCCESS', PLAYER_FETCH_FAIL = 'PLAYERS_FETCH_FAIL' }

export function fetchPlayers()
{
	return { type: PlayerActions.FETCH_PLAYERS }
}

export function fetchPlayersSucceeded(result: TypedRequestResult<PlayerVM[]>)
{
	return { type: PlayerActions.PLAYER_FETCH_SUCCESS, result }
}

export function fetchPlayersFailed(errorCode: number)
{
	return { type: PlayerActions.PLAYER_FETCH_FAIL, errorCode }
}

export function requestPlayers(filter: Filters)
{
	return function(dispatch) 
	{		
		dispatch(fetchPlayers());
	
		var playersService = new Players();

		return playersService.GetPlayers(filter).then((result) =>
		{			
			if(result.success)
			{
				dispatch(fetchPlayersSucceeded(result));
			}
			else
			{
				dispatch(fetchPlayersFailed(result.resultCode));
			}
		});			
	}
}