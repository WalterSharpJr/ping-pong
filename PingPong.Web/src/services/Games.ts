import fetch from 'cross-fetch';
import Game from '../models/Game'
import Filters from '../models/Filters'
import { default as GameVM } from '../viewModels/Game'
import { RequestResult, TypedRequestResult } from '../models/RequestResult'

export default class Games
{
	GetGames(filter: Filters): Promise<TypedRequestResult<GameVM[]>>
	{		
		var promise = new Promise<TypedRequestResult<GameVM[]>>((resolve, reject) =>
		{
			fetch("https://localhost:5001/api/games/GetGames", 
			{
				method: "POST",
				body: JSON.stringify(filter),
				headers: { "Content-Type": "application/json" },
				credentials: "same-origin"

			}).then((response) => 
			{					  
				resolve(response.json());

			}, (error) =>
			{
				reject(error);
			});
		});

		return promise;
	}

	AddGame(game: Game): Promise<RequestResult>
	{		
		var promise = new Promise<RequestResult>((resolve, reject) =>
		{
			fetch("https://localhost:5001/api/games/", 
			{
				method: "POST",
				body: JSON.stringify(game),
				headers: { "Content-Type": "application/json" },
				credentials: "same-origin"

			}).then((response) => 
			{					  
				resolve(response.json());

			}, (error) =>
			{
				reject(error);
			});
		});

		return promise;
	}
}