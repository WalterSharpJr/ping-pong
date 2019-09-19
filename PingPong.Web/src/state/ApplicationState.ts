import Filters from "../models/Filters";
import Game from "../viewModels/Game";
import Player from "../viewModels/Player";
import Ranking from "../viewModels/Ranking";
import RankingJob from "../models/RankingJob";

export enum PageDataState { NO_DATA, FETCHING, SUCCESS, ERROR }

export interface PageState<T = {}>
{
	DataState: PageDataState;
	Filter: Filters;
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
	Games: { Data: null, DataState: PageDataState.NO_DATA, Filter: { PageCount: 20, PageIndex: 0, Search: "" } },
	Players: { Data: null, DataState: PageDataState.NO_DATA, Filter: { PageCount: 20, PageIndex: 0, Search: "" } },
	Rankings: { Data: null, DataState: PageDataState.NO_DATA, Filter: { PageCount: 50, PageIndex: 0, Search: "" } },
	RankingJobs: { Data: null, DataState: PageDataState.NO_DATA, Filter: { PageCount: 10, PageIndex: 0, Search: "" } },
};