using Microsoft.AspNetCore.Mvc;
using PingPong.Business.Services;

namespace PingPong.API.Controllers
{
	[Route("api/rankingjobs")]
    public class RankingJobsController: Controller
    {
        IRankingJobsService RankingJobsService;

        public RankingJobsController(IRankingJobsService rankingJobsService)
		{
			RankingJobsService = rankingJobsService;
		}

		[HttpPost]
		public Business.Models.RequestResult Create()
		{
			return RankingJobsService.StartRankingJob();
		}

		[HttpPost("GetRankingJobs")]
		public Business.Models.RequestResult GetRankingJobs([FromBody]Business.Models.Filter filter)
		{
			return RankingJobsService.Get(filter.PageIndex, filter.PageCount);
		}
    }
}