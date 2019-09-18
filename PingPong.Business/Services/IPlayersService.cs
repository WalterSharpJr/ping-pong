using System.Collections.Generic;

namespace PingPong.Business.Services
{
    public interface IPlayersService
    {
         Models.RequestResult<IEnumerable<Models.Player>> Get(string search, int pageIndex, int pageCount);
		 Models.RequestResult Create(Data.Player player);
		 Models.RequestResult Update(Data.Player player);
    }
}