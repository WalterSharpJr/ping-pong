using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;

namespace PingPong.Business.Services
{
	public class RankingJobRunner : BackgroundService
	{
		public Guid JobId { get; set; }
		Data.PingPongContext Context;

		public RankingJobRunner(Data.PingPongContext context)
		{
			this.Context = context;
		}

		protected override Task ExecuteAsync(CancellationToken stoppingToken)
		{
			try
			{
				var job = Context.RankingJobs.FirstOrDefault(j => j.Id == JobId);

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
					rank.RankingJobId = this.JobId;
					rank.Rank = ranking;

					ranking++;
					Context.Rankings.Add(rank);
				}

				job.FinishedOn = DateTime.Now;
				job.State = Data.RankingJobStates.Finished;

				Context.SaveChanges();

				return Task.CompletedTask;
			}
			catch (Exception ex)
			{
				//log the failure to rank players
				return Task.FromException(ex);
			}			
		}
	}
}