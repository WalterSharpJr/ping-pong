using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace PingPong.Business.Services
{
    public class Players: IPlayersService
    {
		private readonly Data.PingPongContext Context;

        public Players(Data.PingPongContext context)
		{
			this.Context = context;
		}

		/// <summary>
		/// Simple query for quickly searching for players based on their names, returns a maximum of 20 players
		/// </summary>
		/// <param name="search">The search term to filter by</param>
		/// <returns>Collection of Player models with only their name and id properties populated</returns>
		public Models.RequestResult<IEnumerable<Models.Player>> Search(string search)
		{
			try	
			{
				var query = Context.Players.Where(p => p.FirstName.ToUpper().Contains(search.ToUpper()) || p.LastName.ToUpper().Contains(search.ToUpper()));
				var results = query.OrderBy(p => p.FirstName).Take(20).ToList();

				//convert to player models
				var players = new List<Models.Player>();

				foreach (var result in results)
				{
					var player = new Models.Player();
					player.Id = result.Id;
					player.Name = result.GetName();	
					
					players.Add(player);
				}

				return Models.RequestResult<IEnumerable<Models.Player>>.GetSuccess(players, 0);
			}
			catch(Exception)
			{
				return Models.RequestResult<IEnumerable<Models.Player>>.GetFail(StatusCodes.Status500InternalServerError, null);
			}
		}

		/// <summary>
		/// Returns a paginated collection of player entities filtered by first and last name if needed
		/// </summary>
		/// <param name="search">String containing the term to filter players by their first and last names</param>
		/// <param name="pageIndex">The offset to begin returning result from</param>
		/// <param name="pageCount">The total number of results to return</param>
		/// <returns>Collection of Models.Player objects</returns>
		public Models.RequestResult<IEnumerable<Models.Player>> Get(string search, int pageIndex, int pageCount)
		{
			try	
			{
				var query = Context.Players.AsQueryable();

				if(string.IsNullOrWhiteSpace(search) == false)
				{
					query = query.Where(p => p.FirstName.ToUpper().Contains(search.ToUpper()) || p.LastName.ToUpper().Contains(search.ToUpper()));
				}

				var totalPages = (int)Math.Ceiling(decimal.Divide(query.Count(), pageCount));
				var results = query.OrderBy(p => p.FirstName).Skip(pageIndex * pageCount).Take(pageCount).ToList();
				var playerIds = results.Select(p => p.Id);

				var games = Context.Games.Where(g => playerIds.Contains(g.Player1Id) || playerIds.Contains(g.Player2Id)).ToList();

				//convert to player models
				var players = new List<Models.Player>();

				foreach (var result in results)
				{
					var player = new Models.Player();
					player.Id = result.Id;
					player.Name = result.GetName();					
					player.GamesPlayed = games.Where(g => g.Player1Id == result.Id || g.Player2Id == result.Id).Count();
					player.GamesWon = games.Where(g => g.WinningPlayerId == result.Id).Count();
					player.GamesLost = player.GamesPlayed - player.GamesWon;

					players.Add(player);
				}

				return Models.RequestResult<IEnumerable<Models.Player>>.GetSuccess(players, totalPages);
			}
			catch(Exception)
			{
				return Models.RequestResult<IEnumerable<Models.Player>>.GetFail(StatusCodes.Status500InternalServerError, null);
			}
		}

		/// <summary>
		/// Creates a new player entity in the database
		/// </summary>
		/// <param name="player">Player model containing the player's details</param>
		/// <returns>RequestResult object</returns>
		public Models.RequestResult Create(Data.Player player)
		{
			try
			{				
				player.CreatedOn = DateTime.Now;
				player.Id = Guid.NewGuid();

				Context.Players.Add(player);
				Context.SaveChanges();

				return Models.RequestResult.GetSuccess();
			}
			catch(Microsoft.EntityFrameworkCore.DbUpdateException)
			{				
				return Models.RequestResult.GetFail(StatusCodes.Status400BadRequest);
			}
			catch(Exception)
			{
				return Models.RequestResult.GetFail(StatusCodes.Status500InternalServerError);
			}
		}

		/// <summary>
		/// Updates an exsting player entity in the database
		/// </summary>
		/// <param name="player">Player model containing the player's details</param>
		/// <returns>RequestResult object</returns>
		public Models.RequestResult Update(Data.Player player)
		{
			try
			{		
				var existingPlayer = Context.Players.FirstOrDefault(p => p.Id == player.Id);

				if(existingPlayer == null)
				{
					return Models.RequestResult.GetFail(StatusCodes.Status404NotFound);
				}

				existingPlayer.FirstName = player.FirstName;
				existingPlayer.LastName = player.LastName;

				Context.SaveChanges();

				return Models.RequestResult.GetSuccess();
			}
			catch(Microsoft.EntityFrameworkCore.DbUpdateException)
			{				
				return Models.RequestResult.GetFail(StatusCodes.Status400BadRequest);
			}
			catch(Exception)
			{
				return Models.RequestResult.GetFail(StatusCodes.Status500InternalServerError);
			}
		}
    }
}