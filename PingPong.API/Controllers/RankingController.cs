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
    }
}