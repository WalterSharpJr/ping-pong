import Ranking from '../viewModels/Ranking'
import Filters from '../models/Filters'
import { TypedRequestResult } from '../models/RequestResult'
import { httpService } from './HTTPService'

export default class Rankings
{
	GetRankings(filter: Filters): Promise<TypedRequestResult<Ranking[]>>
	{		
		return httpService.Post("ranking/GetRankings/", filter);
	}	
}