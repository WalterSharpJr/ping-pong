import Filters from "../models/Filters";
import Game from "../viewModels/Game";
import Player from "../viewModels/Player";
import Ranking from "../viewModels/Ranking";
import RankingJob from "../models/RankingJob";
import { TypedRequestResult } from "../models/RequestResult";

export enum PageDataState { NO_DATA, FETCHING, SUCCESS, ERROR }

export interface PageState<T = {}>
{
	DataState: PageDataState;	
	RequestResult: TypedRequestResult<T>;	
}

export interface ApplicationState
{
	Games: PageState<Game[]>;
	Players: PageState<Player[]>;
	Rankings: PageState<Ranking[]>;
	RankingJobs: PageState<RankingJob[]>;	
}

export const initialState: ApplicationState = 
{  
	Games: { RequestResult: null, DataState: PageDataState.NO_DATA },
	Players: { RequestResult: null, DataState: PageDataState.NO_DATA },
	Rankings: { RequestResult: null, DataState: PageDataState.NO_DATA },
	RankingJobs: { RequestResult: null, DataState: PageDataState.NO_DATA },
};