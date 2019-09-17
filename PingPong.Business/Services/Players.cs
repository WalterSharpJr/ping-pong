using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Http;

namespace PingPong.Business.Services
{
    public class Players
    {
		private readonly Data.PingPongContext Context;

        public Players(Data.PingPongContext context)
		{
			this.Context = context;
		}

		/// <summary>
		/// Returns a paginated collection of player entities filtered by first and last name if needed
		/// </summary>
		/// <param name="search">String containing the term to filter players by their first and last names</param>
		/// <param name="pageIndex">The offset to begin returning result from</param>
		/// <param name="pageCount">The total number of results to return</param>
		/// <returns>Collection of Data.Player models</returns>
		public Models.RequestResult<List<Data.Player>> Get(string search, int pageIndex, int pageCount)
		{
			try	
			{
				var query = Context.Players.AsQueryable();

				if(string.IsNullOrWhiteSpace(search) == false)
				{
					query = query.Where(p => p.FirstName.Contains(search) || p.LastName.Contains(search));
				}

				var results = query.OrderBy(p => p.FirstName).Skip(pageIndex * pageCount).Take(pageCount).ToList();

				return Models.RequestResult<List<Data.Player>>.GetSuccess(results);
			}
			catch(Exception)
			{
				return Models.RequestResult<List<Data.Player>>.GetFail(StatusCodes.Status500InternalServerError, null);
			}
		}

		/// <summary>
		/// Creates a player entity in the database
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
    }
}