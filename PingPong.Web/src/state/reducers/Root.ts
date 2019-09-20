import { Games as GamesReducer } from './Games'
import { Players as PlayersReducer } from './Players'
import { RankingJobs as RankingJobsReducer } from './RankingJobs'
import { Rankings as RankingsReducer } from './Rankings'
import { Action } from 'redux';
import { ApplicationState, initialState } from '../ApplicationState';

enum ReducerCategory { GAMES = 'GAMES', PLAYERS = 'PLAYERS', JOBS = 'JOBS', RANKINGS = 'RANKINGS'   }

function getReducerCategory(action: Action): ReducerCategory
{
	var actionType = <string>action.type;

	if(actionType.startsWith(ReducerCategory.GAMES)) return ReducerCategory.GAMES;
	if(actionType.startsWith(ReducerCategory.PLAYERS)) return ReducerCategory.PLAYERS;
	if(actionType.startsWith(ReducerCategory.JOBS)) return ReducerCategory.JOBS;
	if(actionType.startsWith(ReducerCategory.RANKINGS)) return ReducerCategory.RANKINGS;
}

function rootReducer(state: ApplicationState, action: Action)
{
	if(state === undefined)
	{
		return initialState;
	}

	var category = getReducerCategory(action);

	switch(category)
	{
		case ReducerCategory.GAMES:
			return Object.assign({}, state, { Games: GamesReducer(state.Games, action) });
		case ReducerCategory.PLAYERS:
			return Object.assign({}, state, { Players: PlayersReducer(state.Players, action) });
		case ReducerCategory.JOBS:
			return Object.assign({}, state, { RankingJobs: RankingJobsReducer(state.RankingJobs, action) });
		case ReducerCategory.RANKINGS:
			return Object.assign({}, state, { Rankings: RankingsReducer(state.Rankings, action) });	
		default:
			return state;
	}
}

export default rootReducer;