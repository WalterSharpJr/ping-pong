import fetch from 'cross-fetch';
import Player from '../models/Player'
import Filters from '../models/Filters'
import { default as PlayerVM } from '../viewModels/Player'
import { RequestResult, TypedRequestResult } from '../models/RequestResult'

export default class Players
{
	GetPlayers(filter: Filters): Promise<TypedRequestResult<PlayerVM[]>>
	{		
		var promise = new Promise<TypedRequestResult<PlayerVM[]>>((resolve, reject) =>
		{
			fetch("https://localhost:5001/api/players/GetPlayers", 
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

	AddPlayer(player: Player): Promise<RequestResult>
	{
		var promise = new Promise<RequestResult>((resolve, reject) =>
		{
			fetch("https://localhost:5001/api/players/", 
			{
				method: "POST",
				body: JSON.stringify(player),
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