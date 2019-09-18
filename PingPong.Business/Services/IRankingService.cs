using System.Collections.Generic;

namespace PingPong.Business.Services
{
    public interface IRankingService
    {
         Models.RequestResult<IEnumerable<Models.Ranking>> Get(int pageIndex, int pageCount);
    }
}