import Player from '../models/Player'
import Filters from '../models/Filters'
import { default as PlayerVM } from '../viewModels/Player'
import { RequestResult, TypedRequestResult } from '../models/RequestResult'
import { httpService } from './HTTPService'

export default class Players
{
	GetPlayers(filter: Filters): Promise<TypedRequestResult<PlayerVM[]>>
	{		
		return httpService.Post("players/GetPlayers", filter);		
	}

	AddPlayer(player: Player): Promise<RequestResult>
	{
		return httpService.Post("players/", player);		
	}
}