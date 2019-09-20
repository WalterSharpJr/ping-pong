using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using PingPong.Business.Services;

namespace PingPong.Business.Tests
{
	[TestClass]
	public class PlayerRankerTests
    {        
        public PlayerRankerTests()
        {
            
        }
		
		void AddGame(Data.PingPongContext context, Guid player1, Guid player2, Byte player1Score, Byte player2Score, Guid winner)
		{
			context.Games.Add(new Data.Game() { Id = Guid.NewGuid(), 
													Player1Id = player1,
													Player2Id = player2,
													WinningPlayerId = winner,
													PlayedOn = DateTime.Now, Player1Score = player1Score, Player2Score = player2Score
												 });
		}

		[TestMethod]
        public void RanksPlayersCorrectly()
        {
            var options = new DbContextOptionsBuilder<Data.PingPongContext>().UseInMemoryDatabase(databaseName: "PingPong").Options;
            
            using (var context = new Data.PingPongContext(options))
            {		
				var jobId = Guid.NewGuid();

				var player1 = new Data.Player() { Id = Guid.NewGuid(), FirstName = "Test1Firstname", LastName= "Test1Lastname"  };
				var player2 = new Data.Player() { Id = Guid.NewGuid(), FirstName = "Test2Firstname", LastName= "Test2Lastname"  };
				var player3 = new Data.Player() { Id = Guid.NewGuid(), FirstName = "Test3Firstname", LastName= "Test3Lastname"  };
				var player4 = new Data.Player() { Id = Guid.NewGuid(), FirstName = "Test4Firstname", LastName= "Test4Lastname"  };
				var player5 = new Data.Player() { Id = Guid.NewGuid(), FirstName = "Test5Firstname", LastName= "Test5Lastname"  };
				var player6 = new Data.Player() { Id = Guid.NewGuid(), FirstName = "Test6Firstname", LastName= "Test6Lastname"  };

				context.Players.Add(player1);
				context.Players.Add(player2);
				context.Players.Add(player3);
				context.Players.Add(player4);
				context.Players.Add(player5);
				context.Players.Add(player6);

				context.RankingJobs.Add(new Data.RankingJob() { Id = jobId, State = Data.RankingJobStates.Running, StartedOn = DateTime.Now });

				//populate the games
				AddGame(context, player1.Id, player2.Id, 5, 3, player1.Id);
				AddGame(context, player1.Id, player3.Id, 7, 4, player1.Id);
				AddGame(context, player1.Id, player4.Id, 6, 3, player1.Id);
				AddGame(context, player2.Id, player3.Id, 5, 3, player2.Id);
				AddGame(context, player2.Id, player4.Id, 5, 3, player2.Id);
				AddGame(context, player3.Id, player4.Id, 5, 3, player3.Id);
													
				context.SaveChanges();

                var service = new PlayerRanker(context);

                service.RankPlayers(jobId);
				var rankings = context.Rankings.ToList();

				//make sure job is updated correctly
				Assert.AreEqual(context.RankingJobs.First().State, Data.RankingJobStates.Finished);
				Assert.IsNotNull(context.RankingJobs.First().FinishedOn);

				//make sure that there is a ranking for all 6 players
				Assert.AreEqual(rankings.Count, 6);

				//make sure the top 3 players are Test1, Test2 and Test3
				var rank1 = rankings.First(r => r.Rank == 1);
				var rank2 = rankings.First(r => r.Rank == 2);
				var rank3 = rankings.First(r => r.Rank == 3);

				Assert.AreEqual(rank1.PlayerId, player1.Id);
				Assert.AreEqual(rank2.PlayerId, player2.Id);
				Assert.AreEqual(rank3.PlayerId, player3.Id);

				//make sure they all have the correct job Ids assigned
				Assert.AreEqual(rankings.Count(r => r.RankingJobId == jobId), 6);
            }
        }
    }
}