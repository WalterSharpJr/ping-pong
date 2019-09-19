import Filters from "../../models/Filters";
import Game from "../../viewModels/Game";
import { TypedRequestResult } from "../../models/RequestResult";

export enum GameActions { FETCH_GAMES = 'GAMES_FETCH', GAME_FETCH_SUCCESS = 'GAMES_FETCH_SUCCESS', GAME_FETCH_FAIL = 'GAMES_FETCH_FAIL' }

export function fetchGames(filters: Filters)
{
	return { type: GameActions.FETCH_GAMES, filters }
}

export function fetchGamesSucceeded(result: TypedRequestResult<Game[]>)
{
	return { type: GameActions.GAME_FETCH_SUCCESS, result }
}

export function fetchGamesFailed(error: Error)
{
	return { type: GameActions.GAME_FETCH_FAIL, error }
}