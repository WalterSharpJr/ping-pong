import Filters from "../../models/Filters";
import { default as PlayerVM } from "../../viewModels/Player";

export enum PlayerActions { FETCH_PLAYER, PLAYER_FETCH_SUCCESS, PLAYER_FETCH_FAIL }

export function fetchPlayers(filters: Filters)
{
	return { type: PlayerActions.FETCH_PLAYER, filters }
}

export function fetchPlayersSucceeded(players: PlayerVM[])
{
	return { type: PlayerActions.PLAYER_FETCH_SUCCESS, players }
}

export function fetchPlayersFailed(error: Error)
{
	return { type: PlayerActions.PLAYER_FETCH_FAIL, error }
}