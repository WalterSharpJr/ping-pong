import Filters from "../../models/Filters";
import Ranking from "../../viewModels/Ranking";
import Rankings from '../../services/Rankings'
import { TypedRequestResult } from "../../models/RequestResult";

export enum RankingsActions { FETCH_RANKS = 'RANKINGS_FETCH', RANKS_FETCH_SUCCESS = 'RANKINGS_FETCH_SUCCESS', RANKS_FETCH_FAIL = 'RANKINGS_FETCH_FAIL' }

export function fetchRankings()
{
	return { type: RankingsActions.FETCH_RANKS }
}

export function fetchRankingsSucceeded(result: TypedRequestResult<Ranking[]>)
{
	return { type: RankingsActions.RANKS_FETCH_SUCCESS, result }
}

export function fetchRankingsFailed(errorCode: number)
{
	return { type: RankingsActions.RANKS_FETCH_FAIL, errorCode }
}

export function requestRankings(filter: Filters)
{
	return function(dispatch) 
	{		
		dispatch(fetchRankings());
	
		var rankingsService = new Rankings();

		return rankingsService.GetRankings(filter).then((result) =>
		{			
			if(result.success)
			{
				dispatch(fetchRankingsSucceeded(result));
			}
			else
			{
				dispatch(fetchRankingsFailed(result.resultCode));
			}
		});			
	}
}