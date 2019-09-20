using System.Collections.Generic;

namespace PingPong.Business.Services
{
    public interface IRankingJobsService
    {
         Models.RequestResult StartRankingJob();
		 Models.RequestResult<IEnumerable<Data.RankingJob>> Get(int pageIndex, int pageCount);
    }
}