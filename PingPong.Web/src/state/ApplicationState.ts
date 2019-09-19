import Filters from "../models/Filters";
import Game from "../viewModels/Game";
import Player from "../viewModels/Player";
import Ranking from "../viewModels/Ranking";
import RankingJob from "../models/RankingJob";

export enum PageDataState { NO_DATA, FETCHING, SUCCESS, ERROR }

export interface PageState<T = {}>
{
	DataState: PageDataState;	
	Data?: T | null;
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
	Games: { Data: null, DataState: PageDataState.NO_DATA },
	Players: { Data: null, DataState: PageDataState.NO_DATA },
	Rankings: { Data: null, DataState: PageDataState.NO_DATA },
	RankingJobs: { Data: null, DataState: PageDataState.NO_DATA },
};