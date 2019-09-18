using System;
using System.Linq;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace PingPong.Business.Services
{
    public class Ranking
    {
		private readonly Data.PingPongContext Context;

        public Ranking(Data.PingPongContext context)
		{
			Context = context;
		}

		/// <summary>
		/// Returns a paginated collection of ranking objects order by rank descending
		/// </summary>
		/// <param name="pageIndex">The offset to begin returning result from</param>
		/// <param name="pageCount">The total number of results to return</param>
		/// <returns>Collection of Models.Ranking objects</returns>
		public Models.RequestResult<List<Models.Ranking>> Get(int pageIndex, int pageCount)
		{
			try
			{
				//we get the latest ranking list by the last ranking job that was completed
				var latestJob = Context.RankingJobs.Where(j => j.State == Data.RankingJobStates.Finished)
													.OrderByDescending(j => j.FinishedOn).FirstOrDefault();

				if(latestJob == null)
				{
					//no ranking jobs have yet been run, return empty list
					return Models.RequestResult<List<Models.Ranking>>.GetSuccess(StatusCodes.Status204NoContent, null);
				}

				var results = Context.Rankings.Where(r => r.RankingJobId == latestJob.Id)
												.OrderByDescending(r => r.Rank)
												.Skip(pageIndex * pageCount).Take(pageCount)
												.Include(r => r.Player).Include(r => r.PreviousRank.Rank)
												.ToList();

				var rankings = new List<Models.Ranking>();

				foreach (var result in results)
				{
					var ranking = new Models.Ranking();
					ranking.Player = result.Player.GetName();
					ranking.PlayerId = result.PlayerId;
					ranking.PreviousRank = result.PreviousRank.Rank;
					ranking.Rank = result.Rank;

					rankings.Add(ranking);
				}

				return Models.RequestResult<List<Models.Ranking>>.GetSuccess(rankings);
			}
			catch (Exception)
			{				
				return Models.RequestResult<List<Models.Ranking>>.GetFail(StatusCodes.Status500InternalServerError, null);
			}
		}
    }
}