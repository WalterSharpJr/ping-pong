import fetch from 'cross-fetch';
import RankingJob from '../models/RankingJob'
import Filters from '../models/Filters'
import { RequestResult, TypedRequestResult } from '../models/RequestResult'

export default class RankingJobs
{
	GetJobs(filter: Filters): Promise<TypedRequestResult<RankingJob[]>>
	{		
		var promise = new Promise<TypedRequestResult<RankingJob[]>>((resolve, reject) =>
		{
			fetch("https://localhost:5001/api/rankingjobs/GetRankingJobs", 
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

	StartJob(): Promise<RequestResult>
	{
		var promise = new Promise<RequestResult>((resolve, reject) =>
		{
			fetch("https://localhost:5001/api/rankingjobs/", 
			{
				method: "POST",				
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