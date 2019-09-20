using System;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace PingPong.Business.Services
{
    public class RankingJobs: IRankingJobsService
    {
		private readonly Data.PingPongContext Context;
		private readonly RankingJobRunner JobRunner;

        public RankingJobs(Data.PingPongContext context, RankingJobRunner jobRunner)
		{
			Context = context;
			JobRunner = jobRunner;
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
				JobRunner.JobId = rankingJob.Id;
				JobRunner.StartAsync(new System.Threading.CancellationToken(false));

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
				var totalPages = (int)Math.Ceiling(decimal.Divide(Context.RankingJobs.Count(), pageCount));

				return Models.RequestResult<IEnumerable<Data.RankingJob>>.GetSuccess(results, totalPages);
			}
			catch(Exception)
			{
				return Models.RequestResult<IEnumerable<Data.RankingJob>>.GetFail(StatusCodes.Status500InternalServerError, null);
			}
		}
    }
}