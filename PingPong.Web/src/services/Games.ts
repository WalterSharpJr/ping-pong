import Game from '../models/Game'
import Filters from '../models/Filters'
import { default as GameVM } from '../viewModels/Game'
import { RequestResult, TypedRequestResult } from '../models/RequestResult'
import { httpService } from './HTTPService'

export default class Games
{
	GetGames(filter: Filters): Promise<TypedRequestResult<GameVM[]>>
	{		
		return httpService.Post("games/GetGames", filter);		
	}

	AddGame(game: Game): Promise<RequestResult>
	{		
		return httpService.Post("games/", game);		
	}
}