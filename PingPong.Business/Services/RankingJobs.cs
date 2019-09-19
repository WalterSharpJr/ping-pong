using System;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace PingPong.Business.Services
{
    public class RankingJobs
    {
		private readonly Data.PingPongContext Context;

        public RankingJobs(Data.PingPongContext context)
		{
			Context = context;
		}

		protected void RankPlayers(Data.RankingJob job)
		{
			try
			{
				//get the player win metrics
				var playerMetrics = Context.Games.AsQueryable()
												.GroupBy(g => g.WinningPlayerId)
												.Select(g => new { PlayerId = g.Key, WinCount = g.Count() })
												.OrderByDescending(m => m.WinCount);

				int ranking = 1;

				foreach (var metric in playerMetrics)
				{
					var rank = new Data.Ranking();
					rank.Id = Guid.NewGuid();
					rank.PlayerId = metric.PlayerId;
					rank.RankingJobId = job.Id;
					rank.Rank = ranking;

					ranking++;
					Context.Rankings.Add(rank);
				}

				job.FinishedOn = DateTime.Now;
				job.State = Data.RankingJobStates.Finished;

				Context.SaveChanges();
			}
			catch (Exception)
			{
				//log the failure to rank players
			}			
		}

		/// <summary>
		/// Creates a new ranking job entity in the database and fires off a task to rank the players in the background
		/// </summary>
		/// <returns></returns>
		public Models.RequestResult StartRankingJob()
		{
			try
			{
				var rankingJob = new Data.RankingJob();
				rankingJob.Id = Guid.NewGuid();
				rankingJob.StartedOn = DateTime.Now;
				rankingJob.State = Data.RankingJobStates.Running;
				
				Context.RankingJobs.Add(rankingJob);
				Context.SaveChanges();

				//begin the process of ranking
				Task.Run(() => RankPlayers(rankingJob));

				return Models.RequestResult.GetSuccess();
			}
			catch (Exception)
			{
				return Models.RequestResult.GetFail(StatusCodes.Status500InternalServerError);
			}
		}

		/// <summary>
		/// Returns a paginated collection of ranking jobs
		/// </summary>		
		/// <param name="pageIndex">The offset to begin returning result from</param>
		/// <param name="pageCount">The total number of results to return</param>
		/// <returns>Collection of Data.RankingJob objects</returns>
		public Models.RequestResult<IEnumerable<Data.RankingJob>> Get(int pageIndex, int pageCount)
		{
			try	
			{
				var results = Context.RankingJobs.OrderByDescending(j => j.StartedOn).Skip(pageIndex * pageCount).Take(pageCount).ToList();
								
				return Models.RequestResult<IEnumerable<Data.RankingJob>>.GetSuccess(results);
			}
			catch(Exception)
			{
				return Models.RequestResult<IEnumerable<Data.RankingJob>>.GetFail(StatusCodes.Status500InternalServerError, null);
			}
		}
    }
}