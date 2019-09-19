import { Filters } from "../../models/Filters";

export enum GameActions { FETCH_GAMES }

export function fetchGames(filters: Filters)
{
	return { type: GameActions.FETCH_GAMES, filters }
}