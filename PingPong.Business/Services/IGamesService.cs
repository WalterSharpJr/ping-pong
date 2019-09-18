using System.Collections.Generic;

namespace PingPong.Business.Services
{
    public interface IGamesService
    {
         Models.RequestResult<IEnumerable<Models.Game>> Get(string search, int pageIndex, int pageCount);
		 Models.RequestResult Create(Data.Game game);
    }
}