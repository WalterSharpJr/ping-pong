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
		IPlayerRanker PlayerRanker;

		public RankingJobRunner(IPlayerRanker playerRanker)
		{
			PlayerRanker = playerRanker;
		}

		protected override Task ExecuteAsync(CancellationToken stoppingToken)
		{
			try
			{
				var success = PlayerRanker.RankPlayers(JobId);
				
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