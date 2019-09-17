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
			catch(Exception ex)
			{
				return Models.RequestResult<List<Data.Player>>.GetFail(StatusCodes.Status500InternalServerError, null);
			}
		}

		public Models.RequestResult Create(Data.Player player)
		{
			try
			{
				
					player.CreatedOn = DateTime.Now;
					player.Id = Guid.NewGuid();

					Context.Players.Add(player);
					Context.SaveChanges();

					return Models.RequestResult.GetSuccess();
				
					//return Models.RequestResult.GetFail(StatusCodes.Status400BadRequest);
				
			}
			catch(Exception ex)
			{
				return Models.RequestResult.GetFail(StatusCodes.Status500InternalServerError);
			}
		}
    }
}