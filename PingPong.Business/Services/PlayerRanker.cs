using System;
using System.Linq;

namespace PingPong.Business.Services
{
	public class PlayerRanker : IPlayerRanker
	{
		private readonly Data.PingPongContext Context;

		public PlayerRanker(Data.PingPongContext context)
		{
			Context = context;
		}

		/// <summary>
		/// Builds a new set of player ranking based on the amount of games they've won
		/// </summary>
		/// <param name="jobId">The Id of the job associated with this ranking</param>
		/// <returns>True if ranking completed successfully, false if not</returns>
		public bool RankPlayers(Guid jobId)
		{
			try
			{
				var job = Context.RankingJobs.FirstOrDefault(j => j.Id == jobId);

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
					rank.RankingJobId = jobId;
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
					rank.RankingJobId = jobId;
					rank.Rank = ranking;

					ranking++;
					Context.Rankings.Add(rank);
				}

				job.FinishedOn = DateTime.Now;
				job.State = Data.RankingJobStates.Finished;

				Context.SaveChanges();
				return true;
				
			}
			catch (Exception)
			{
				var job = Context.RankingJobs.FirstOrDefault(j => j.Id == jobId);
				job.State = Data.RankingJobStates.Error;

				Context.SaveChanges();

				return false;
			}		
		}
	}
}