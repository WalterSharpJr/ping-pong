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

				//get the players
				var players = Context.Players.ToList();

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

					//remove the player from the players list
					players.RemoveAll(p => p.Id == metric.PlayerId);
				}

				//remaining players don't have any wins so arent ranked, we'll just rank them in the order they came back form the query
				foreach (var player in players)
				{
					var rank = new Data.Ranking();
					rank.Id = Guid.NewGuid();
					rank.PlayerId = player.Id;
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