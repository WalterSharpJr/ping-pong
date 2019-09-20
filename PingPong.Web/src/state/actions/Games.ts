import Filters from "../../models/Filters";
import Game from "../../viewModels/Game";
import { TypedRequestResult } from "../../models/RequestResult";
import Games from "../../services/Games"

export enum GameActions { FETCH_GAMES = 'GAMES_FETCH', GAME_FETCH_SUCCESS = 'GAMES_FETCH_SUCCESS', GAME_FETCH_FAIL = 'GAMES_FETCH_FAIL' }

export function fetchGames()
{
	return { type: GameActions.FETCH_GAMES }
}

export function fetchGamesSucceeded(result: TypedRequestResult<Game[]>)
{
	return { type: GameActions.GAME_FETCH_SUCCESS, result }
}

export function fetchGamesFailed(errorCode: number)
{
	return { type: GameActions.GAME_FETCH_FAIL, errorCode }
}

export function requestGames(filter: Filters)
{
	return function(dispatch) 
	{		
		dispatch(fetchGames());
	
		var gamesService = new Games();

		return gamesService.GetGames(filter).then((result) =>
		{			
			if(result.success)
			{
				dispatch(fetchGamesSucceeded(result));
			}
			else
			{
				dispatch(fetchGamesFailed(result.resultCode));
			}
		});			
	}
}