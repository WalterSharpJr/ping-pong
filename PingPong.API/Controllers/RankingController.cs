using Microsoft.AspNetCore.Mvc;
using PingPong.Business.Services;

namespace PingPong.API.Controllers
{
	[Route("api/ranking")]
    public class RankingController: Controller
    {
        IRankingService RankingService;

        public RankingController(IRankingService rankingService)
		{
			RankingService = rankingService;
		}

		[HttpPost("GetRankings")]
		public Business.Models.RequestResult GetRankings([FromBody]Business.Models.Filter filter)
		{
			return RankingService.Get(filter.PageIndex, filter.PageCount);
		}
    }
}