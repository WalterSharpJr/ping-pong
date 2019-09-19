import { Filters } from "../models/Filters";
import { Game } from "../models/Game";
import { Player } from "../models/Player";
import { Ranking } from "../models/Ranking";
import { RankingJob } from "../models/RankingJob";

export enum PageDataState { NO_DATA, FETCHING, SUCCESS, ERROR }

export interface PageState<T = {}>
{
	DataState: PageDataState;
	Filter: Filters;
	Data?: T | null;
}

export interface ApplicationState
{
	Games: PageState<Game>;
	Players: PageState<Player>;
	Rankings: PageState<Ranking>;
	RankingJobs: PageState<RankingJob>;	
}