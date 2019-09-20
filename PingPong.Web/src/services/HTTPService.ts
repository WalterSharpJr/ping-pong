import fetch from 'cross-fetch';

export class HTTPService
{
	Post<T>(endpoint: string, data: any): Promise<T>
	{
		var promise = new Promise<T>((resolve, reject) =>
		{
			fetch("https://localhost:5001/api/" + endpoint, 
			{
				method: "POST",
				body: (data) ? JSON.stringify(data) : null,
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

export var httpService = new HTTPService();