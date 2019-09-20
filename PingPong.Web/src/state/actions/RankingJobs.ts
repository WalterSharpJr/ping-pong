import Filters from "../../models/Filters";
import RankingJob from "../../models/RankingJob";
import RankingJobs from '../../services/RankingJobs'
import { TypedRequestResult } from "../../models/RequestResult";

export enum RankingJobActions { FETCH_JOBS = 'JOBS_FETCH', JOB_FETCH_SUCCESS = 'JOBS_FETCH_SUCCESS', JOB_FETCH_FAIL = 'JOBS_FETCH_FAIL' }

export function fetchJobs()
{
	return { type: RankingJobActions.FETCH_JOBS }
}

export function fetchJobsSucceeded(result: TypedRequestResult<RankingJob[]>)
{
	return { type: RankingJobActions.JOB_FETCH_SUCCESS, result }
}

export function fetchJobsFailed(errorCode: number)
{
	return { type: RankingJobActions.JOB_FETCH_FAIL, errorCode }
}

export function requestJobs(filter: Filters)
{
	return function(dispatch) 
	{		
		dispatch(fetchJobs());
	
		var jobsService = new RankingJobs();

		return jobsService.GetJobs(filter).then((result) =>
		{			
			if(result.success)
			{
				dispatch(fetchJobsSucceeded(result));
			}
			else
			{
				dispatch(fetchJobsFailed(result.resultCode));
			}
		});			
	}
}