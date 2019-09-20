import RankingJob from '../models/RankingJob'
import Filters from '../models/Filters'
import { RequestResult, TypedRequestResult } from '../models/RequestResult'
import { httpService } from './HTTPService'

export default class RankingJobs
{
	GetJobs(filter: Filters): Promise<TypedRequestResult<RankingJob[]>>
	{		
		return httpService.Post("rankingjobs/GetRankingJobs", filter);
	}

	StartJob(): Promise<RequestResult>
	{
		return httpService.Post("rankingjobs/", null);		
	}
}