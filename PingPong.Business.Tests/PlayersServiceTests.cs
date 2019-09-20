using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using PingPong.Business.Services;

namespace PingPong.Business.Tests
{
	[TestClass]
    public class PlayersServiceTests
    {
		Data.PingPongContext Context;
		Business.Services.Players PlayersService;

		[TestInitialize]
		public void Initialise()
		{
			var options = new DbContextOptionsBuilder<Data.PingPongContext>().UseInMemoryDatabase(databaseName: "PingPong" + Guid.NewGuid().ToString()).Options;
            
            Context = new Data.PingPongContext(options);

			//populate some players
			var player1 = new Data.Player() { Id = Guid.NewGuid(), FirstName = "Test1Firstname", LastName= "Test1Lastname"  };
			var player2 = new Data.Player() { Id = Guid.NewGuid(), FirstName = "Test2Firstname", LastName= "Test2Lastname"  };
			var player3 = new Data.Player() { Id = Guid.NewGuid(), FirstName = "Test3Firstname", LastName= "Test3Lastname"  };
			var player4 = new Data.Player() { Id = Guid.NewGuid(), FirstName = "Test4Firstname", LastName= "Test4Lastname"  };
			var player5 = new Data.Player() { Id = Guid.NewGuid(), FirstName = "Test5Firstname", LastName= "Test5Lastname"  };
			var player6 = new Data.Player() { Id = Guid.NewGuid(), FirstName = "Test6Firstname", LastName= "Test6Lastname"  };

			Context.Players.Add(player1);
			Context.Players.Add(player2);
			Context.Players.Add(player3);
			Context.Players.Add(player4);
			Context.Players.Add(player5);
			Context.Players.Add(player6);

			Context.SaveChanges();

			PlayersService = new Business.Services.Players(Context);
		}

		[TestMethod]
		public void SearchShouldReturnAllResults()
		{			
			Assert.AreEqual(Context.Players.Count(), PlayersService.Search("Test").Data.Count());
		}

		[TestMethod]
		public void SearchShouldReturnSingle()
		{
			Assert.AreEqual(1, PlayersService.Search("Test1").Data.Count());
			Assert.AreEqual(1, PlayersService.Search("Test2").Data.Count());
			Assert.AreEqual(1, PlayersService.Search("Test3").Data.Count());
			Assert.AreEqual(1, PlayersService.Search("Test4").Data.Count());
			Assert.AreEqual(1, PlayersService.Search("Test5").Data.Count());
		}
    }
}