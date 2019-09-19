import { Games as GamesReducer } from './Games'
import { Players as PlayersReducer } from './Players'
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
	GamesReducer,
	PlayersReducer
});

export default rootReducer;