import { RankingJobActions } from "../actions/RankingJobs";
import { PageState, PageDataState, initialState } from "../ApplicationState";
import RankingJob from "../../models/RankingJob";

export function RankingJobs(state: PageState<RankingJob[]>, action) : PageState<RankingJob[]>
{
	if(state === undefined)
	{
		return initialState.RankingJobs;
	}

	switch (action.type) 
	{
		case RankingJobActions.FETCH_JOBS:
			return {...state, DataState: PageDataState.FETCHING }	
		case RankingJobActions.JOB_FETCH_SUCCESS:
			return {...state, DataState: PageDataState.SUCCESS, RequestResult: action.result }
		case RankingJobActions.JOB_FETCH_FAIL:
			return {...state, DataState: PageDataState.ERROR }
		default:
			return state;
	}
}