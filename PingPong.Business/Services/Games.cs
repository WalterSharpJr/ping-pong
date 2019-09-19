using System;
using System.Linq;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace PingPong.Business.Services
{
    public class Games: IGamesService
    {
		private readonly Data.PingPongContext Context;

        public Games(Data.PingPongContext context)
		{
			this.Context = context;
		}

		/// <summary>
		/// Returns a paginated list of games filtered by player names if provided
		/// </summary>
		/// <param name="search">String containing the search string to filter the results by</param>
		/// <param name="pageIndex">The offset to begin returning result from</param>
		/// <param name="pageCount">The total number of results to return</param>
		/// <returns>Collection of Models.Game objects</returns>
		public Models.RequestResult<IEnumerable<Models.Game>> Get(string search, int pageIndex, int pageCount)
		{
			try
			{				
				var query = Context.Games.AsQueryable();

				if(String.IsNullOrWhiteSpace(search) == false)
				{
					query = query.Where(g => g.Player1.FirstName.ToUpper().Contains(search.ToUpper()) || g.Player1.LastName.ToUpper().Contains(search.ToUpper()) || 
											g.Player2.FirstName.ToUpper().Contains(search.ToUpper()) || g.Player2.LastName.ToUpper().Contains(search.ToUpper()));
				}

				var results = query.OrderByDescending(g => g.PlayedOn).Skip(pageIndex * pageCount).Take(pageCount).
								Include(g => g.Player1).Include(g => g.Player2).ToList();

				var games = new List<Models.Game>();

				foreach (var result in results)
				{
					var game = new Models.Game();
					game.Id = result.Id;
					game.PlayedOn = result.PlayedOn;
					game.Player1 = result.Player1.GetName();
					game.Player2 = result.Player2.GetName();
					game.Player1Score = result.Player1Score;
					game.Player2Score = result.Player2Score;
					game.Winner = (result.WinningPlayerId == result.Player1Id ? game.Player1: game.Player2);

					games.Add(game);
				}

				return Models.RequestResult<IEnumerable<Models.Game>>.GetSuccess(games);
				
			}
			catch (Exception)
			{
				return Models.RequestResult<IEnumerable<Models.Game>>.GetFail(StatusCodes.Status500InternalServerError, null);
			}
		}

		/// <summary>
		/// Creates a new game entity in the database
		/// </summary>
		/// <param name="game"></param>
		/// <returns></returns>
		public Models.RequestResult Create(Data.Game game)
		{
			try
			{	
				if(game.IsValid() == true)			
				{
					game.Id = Guid.NewGuid();
					
					Context.Games.Add(game);
					Context.SaveChanges();

					return Models.RequestResult.GetSuccess();
				}

				return Models.RequestResult.GetFail(StatusCodes.Status400BadRequest);
				
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